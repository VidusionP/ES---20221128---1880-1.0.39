import $ from 'jquery';
import _, { min } from 'lodash';

import utils from '@bigcommerce/stencil-utils';

var allureException = [
    "coco",
    "rose",
    "adele",
    "angelina",
    "jessica",
    "selena",
    "taylor",
    "julia",
    "nicole",
    "gwyneth",
    "ev7914",
    "tl6814",
    "ev5714",
    "mo5514",
    "mo7608",
    "ev5512",
    "ev5706",
    "ev6810",
    "eg6612",
    "eh16",
    "mh2206",
    "sh5206",
    "ep3608",
    "mh2216",
    "maya",
    "noya",
];

var cartItems = null;
var skus=[];
var teamdeskItems = null;
var teamdeskPOItems = null;
var pShippingGroup={};


/**
 * Get the inventory and po from teamdesk
 */
 function cartGetDelivery() {    
    if (cartItems) {        
        skus = cartItems.lineItems.physicalItems.map(i=>{
            let sku = i.sku;
            if (sku.indexOf("_N")==sku.length-2) {
                sku = sku.slice(0,sku.length-2);                
            }
            return encodeURIComponent(sku)
        });
        fetch(`//shp-webserver.glitch.me/get-teamdesk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                table: 'Inventory',
                filter: `Any([SKU],'${skus.join(",")}')`
            })
        })
        .then(r=>r.json())
        .then(r=>{
            teamdeskItems = r;  

            teamdeskPOItems = [];       
            cartSetDelivery();
            // fetch(`//shp-webserver.glitch.me/get-teamdesk`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         table: 't_763479',
            //         options: `?filter=Any([SKU],'${skus.join(",")}') and [Incoming Quantity]>0 and [Arrival Due Date]>ToDate('1/1/1')&sort=Arrival Due Date//ASC`                        
            //     })
            // })
            // .then(r=>r.json())
            // .then(r=>{
            //     teamdeskPOItems = r;
            //     cartSetDelivery();
            // })
            // .catch(e=>{
            //     console.log(e);
            //     cartSetDelivery();
            // })
        })
        .catch(e=>console.log(e));
    }
}

/**
 * Fill in the delivery information
 */
function cartSetDelivery() {        
    if (teamdeskItems) {
        let qtyChecked=[];
        for (let [index, sku] of skus.entries()) {
            if (sku.indexOf("_N")==sku.length-2) {
                sku = sku.slice(0,sku.length-2);                
            }
            let item = teamdeskItems.find(s=>encodeURIComponent(s.SKU.toUpperCase())==sku.toUpperCase());                        
            if (item) {                 
                if ($(".productList").find("li.productList-item").eq(index).find("ul.product-options").find(".cart-delivery").length==0) {
                    let qty = cartItems.lineItems.physicalItems[index].quantity;                    
                    let buff = 0;
                    if (qtyChecked[item.SKU]) {
                        buff = qtyChecked[item.SKU];
                        qtyChecked[item.SKU]+=qty;
                    } else {
                        qtyChecked[item.SKU]=qty;
                    }
                    let content=`<strong>Tiempo estimado de envío:</strong><br/>`;

                    if (item["Total On Hand"] == item["Available Quantity"]) {
                        if (Number(item["Quantity USA"])>0) {
                            if (Number(item["Quantity USA"])-buff>0) {
                                content+=`En 3-4 días: cantidad <strong>${Math.min(item["Quantity USA"]-buff, qty)}</strong><br/>`;
                                qty = qty - Math.min(item["Quantity USA"]-buff, qty);
                                buff=0;
                            } else {
                                buff-=Number(item["Quantity USA"]);
                            }
                        }
                        if (Number(item["Quantity Canada"])>0 && qty>0) {
                            if (Number(item["Quantity Canada"])-buff>0) {
                                content+=`En 5-8 días: cantidad <strong>${Math.min(item["Quantity Canada"]-buff, qty)}</strong><br/>`;
                                qty = qty - Math.min(item["Quantity Canada"]-buff, qty);
                                buff=0;
                            } else {
                                buff -= Number(item["Quantity Canada"]);
                            }
                        }
                    } else {
                        if (Number(item["Available Quantity"])>0) {
                            if (Number(item["Available Quantity"])-buff>0) {
                                content+=`Dans 3-8 jours: cantidad <strong>${Math.min(item["Available Quantity"]-buff, qty)}</strong><br/>`;
                                qty = qty - Math.min(item["Available Quantity"]-buff, qty);
                                buff=0;
                            } else {
                                buff -= Number(item["Available Quantity"]);
                            }
                        }
                    }
                    // if (item["Virtual Quantity"] && qty>0) {                            
                    //     if (item["Lock Status"]!="Locked for processing" && Number(item["Unlocked for sale quantity"]) > 0 && qty>0) {
                    //         if (Number(item["Unlocked for sale quantity"])-buff > 0) {                                    
                    //             content+=`1 week later: quantity <strong>${Math.min(item["Unlocked for sale quantity"]-buff, qty)}</strong><br/>`;                                    
                    //             qty = qty - Math.min(item["Unlocked for sale quantity"]-buff, qty);                                    
                    //             buff=0;
                    //         } else {
                    //             buff-=Number(item["Unlocked for sale quantity"]);
                    //         }
                    //     }
                    //     let virtual={};                        
                    //     if (Number(item["Quantity Incoming"])-2 > 0 && qty>0) {
                    //         if (Number(item["Quantity Incoming"])-2 -buff > 0) {
                    //             let inItems = teamdeskPOItems.filter(p=>p.SKU.toUpperCase() == item["SKU"].toUpperCase());
                    //             let i=0, totalP=buff, tempqty = qty;
                    //             while (i<inItems.length && tempqty>0) {
                    //                 totalP+=Number(inItems[i]["Incoming Quantity"]);
                    //                 tempqty = tempqty - Math.min(Number(inItems[i]["Incoming Quantity"]), tempqty);
                    //                 i++;                                
                    //             }
                    //             if (i>0) {
                    //                 let inItem = inItems[i-1];                                    
                    //                 let mdiff = monthDiff(new Date(), new Date(inItem["Arrival Due Date"]));
                    //                 if (mdiff==0) {                                    
                    //                     if (allureException.includes(inItem["Part Number"])) {
                    //                         mdiff+=3;
                    //                     } else {
                    //                         mdiff+=1;
                    //                     }
                    //                 } else if (allureException.includes(inItem["Part Number"])) {
                    //                     mdiff+=2;
                    //                 }
                    //                 virtual[mdiff] = Math.min(totalP, qty);                                        
                    //                 qty = tempqty;
                    //                 buff=0;
                    //             }
                    //         } else {
                    //             buff = buff - Number(item["Quantity Incoming"]) + 2;
                    //         }
                    //     }
                    //     if (qty>0) {
                    //         let m = item["Virtual Location"].slice(0,-1);
                    //         if (virtual[m]) {
                    //             virtual[m]+=qty;
                    //         } else {
                    //             virtual[m]=qty;
                    //         }
                    //     }
                    //     // console.log(virtual);
                    //     if (Object.keys(virtual).length > 0) {
                    //         const options = {year: 'numeric', month: 'long'};
                    //         let vkeys = Object.keys(virtual).sort(function(a,b) {
                    //             return b-a;
                    //         })                
                    //         for (let key of vkeys) {
                    //             if (Number(key)) {
                    //                 let date = new Date();
                    //                 date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                    //                 date.setMonth(date.getMonth()+Number(key));
                    //                 content+=`${date.toLocaleDateString('en-US', options)}: quantity <strong>${virtual[key]}</strong><br/>`;
                    //             } else {
                    //                 content+=`${key.replace("_","-")} months later: quantity <strong>${virtual[key]}</strong><br/>`;
                    //             }
                    //         }
                    //     }
                    // }                     
                    if ($(".productList").find("li.productList-item").eq(index).find("ul.product-options").length>0) {
                        $(".productList").find("li.productList-item").eq(index).find("ul.product-options").append(`<li class="product-option cart-delivery">${content}</li>`);
                    } else {                        
                        $(".productList").find("li.productList-item").eq(index).find(".product-body").append(`
                            <ul class="product-options"><li class="product-option cart-delivery">${content}</li></ul>
                        `);
                    }
                } else {
                    let qty = cartItems.lineItems.physicalItems[index].quantity;
                    if (qtyChecked[item.SKU]) {                        
                        qtyChecked[item.SKU]+=qty;
                    } else {
                        qtyChecked[item.SKU]=qty;
                    }
                }
            } else if ($(".productList").find("li.productList-item").eq(index).find("ul.product-options").find(".cart-delivery").length==0) {
                var cmhRushItems = ['CMH', 'CMLACE', 'CMMONO', 'CMLACEPOLY', 'CMSKIN'];
                var hairService = [
                    "style#221",
                    "style#222",
                    "style#231",
                    "style#232",
                    "style#233",
                    "style#234",
                    "style#251",
                    "style#331",
                    "style#332",
                    "style#334",
                    "style#335",
                    "style#341",
                    "style#342",
                    "style#343",
                    "style#551",
                    "style#552",
                    "Style #Your_Own",
                    "Online Services Pack",
                    ];
                let content = "";
                if (cmhRushItems.includes(sku.toUpperCase())) {
                    content=`<strong>Tiempo estimado de envío:</strong><br/>Envío garantizado en 3 meses<br/>`;
                } else if (hairService.includes(sku)) {
                    content=`<strong>Tiempo estimado de envío:</strong><br/>Dans 2-3 semaines<br/>`;
                } 
                $(".productList").find("li.productList-item").eq(index).find("ul.product-options").append(`<div class="cart-delivery">${content}</div>`);
            }
        }
    }    
}
function checkProducts() {
    let token = $("[name=store-token]").val();
    if (cartItems) {
        let ids = cartItems.lineItems.physicalItems.map(i=>i.productId);        
        fetch('/graphql', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ query: `
            query SeveralProductsByID {
                site {
                    products(entityIds: [${ids.join(",")}]) {
                        edges {
                            node {
                                name
                                sku
                                entityId
                                metafields (namespace: "shipping.shipperhq") {
                                    edges {
                                        node {
                                            key
                                            value
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ` })
        })
        .then(data => data.json())
        .then(data=>{   
            if (data.data) {
                for (let product of data.data.site.products.edges) {
                    let shippingGroup = null;
                    if (product.node.metafields.edges.length>0) {
                        for (let group of product.node.metafields.edges) {
                            if (group.node.key == "shipping-groups") {
                                shippingGroup = group.node.value;
                                break;
                            }
                        }
                    }                    
                    pShippingGroup[product.node.entityId] = shippingGroup;
                }
                let totalhp=0;
                for (let item of cartItems.lineItems.physicalItems) {
                    
                        if (pShippingGroup[item.productId]) {
                            if (pShippingGroup[item.productId].toLowerCase().includes("hairpiece")) {
                                totalhp += item.quantity;
                            }
                        }         
                }  
                setShipment((cartItems.baseAmount) > 500 || totalhp > 2);
            }else {
                setShipment();
            }
         })
         .catch(error => {
            setShipment();
        });
    }
}

/**
 * Check and set shipment
 * 
 * @param {boolean} isLarger True if having more than 2 pieces of hairpieces or subtotal larger than 500
 */
 function setShipment(isLarger=false) {  
  
    let group = $("[name=customer-group]").val();
    switch (group) {
        case "Newcomer":
            if (isLarger) {                
                    return swal.fire({
                        text: "Como cliente nuevo se han impuesto algunas restricciones en su cuenta durante los tres primeros pedidos. Después de estos pedidos, se eliminarán todas las restricciones en su carrito de compra. Si desea pagar con tarjeta de crédito, por favor reduzca el valor total a menos de 500 €, o reduzca la cantidad de prótesis capilares en su carrito a 2 ó menos.",
                        icon: 'info',                        
                    }),             
                setInterval(() => {
                    $(".checkout-step--payment").find(".checkout-view-content").length > 0 &&
                        $(".checkout-step--payment")
                        .find(".checkout-view-content")
                        .find("li.form-checklist-item")
                        .filter(function () {
                            return (
                                $(this).find(".paymentProviderHeader-name").eq(0).text().toLowerCase().includes("credit card") || $(this).find("#radio-applepay").length>0 || $(this).find("#radio-googlepaystripeupe").length>0
                            );
                        })
                        .css("display", "none");
                }, 500);
            } 
            break;
        case 'Blocklist':
            setInterval(() => {
                $(".checkout-step--payment").find(".checkout-view-content").length > 0 &&
                    $(".checkout-step--payment")
                        .find(".checkout-view-content")
                        .find("li.form-checklist-item")
                        .filter(function () {
                            return (
                                $(this).find(".paymentProviderHeader-name").eq(0).text().toLowerCase().includes("credit card") || $(this).find("#radio-applepay").length>0 || $(this).find("#radio-googlepaystripeupe").length>0
                            );
                        })
                        .css("display", "none");
            }, 500);
            break;
    }
}
window.addEventListener("DOMContentLoaded", function() {    
    utils.api.cart.getCart({includeOptions: true}, (err, myCart) => {        
        if (err) {
            return;
        }        
        if (myCart) {
            cartItems = {
                id: myCart.id,
                baseAmount: myCart.baseAmount,
                lineItems: myCart.lineItems,
            };      
            let group = $("[name=customer-group]").val();
            if (group) {
                if (group == "Blocklist") {
                    setShipment()
                } else {
                    checkProducts()
                }
            }      
            var checkInit = setInterval(() => {
                if ($("#cart-edit-link").length>0 && (".cart-section").length>0) {
                    this.clearInterval(checkInit);
                    cartGetDelivery();
                    var baction = setInterval(() => {
                        if ($(".cart-actions button").length>0) {
                            clearInterval(baction);
                            $(".cart-actions button").on("click", function() {
                                setTimeout(function() {
                                    cartSetDelivery();
                                }, 500);
                            });
                        }
                    }, 500);
                }
            }, 500);                  
        }
    })
})

