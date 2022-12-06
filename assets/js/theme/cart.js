import PageManager from './page-manager';
import _ from 'lodash';
import giftCertCheck from './common/gift-certificate-validator';
import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from './cart/shipping-estimator';
import { defaultModal } from './global/modal';
import swal from './global/sweet-alert';
import QuickEditCart from './halothemes/haloQuickEditCart';
import haloCalculateFreeShipping from './halothemes/haloCalculateFreeShipping';

export default class Cart extends PageManager {
    constructor(context) {
        super(context);
    }
    
    onReady() {
        this.$cartContent = $('[data-cart-content]');
        this.$cartMessages = $('[data-cart-status]');
        this.$cartTotals = $('[data-cart-totals]');
        this.$overlay = $('[data-cart] .loadingOverlay')
            .hide(); // TODO: temporary until roper pulls in his cart components

        this.bindEvents();
        QuickEditCart(this.context);
        haloCalculateFreeShipping(this.context);

        if ($('body').hasClass('page-type-cart')) {
            const $cart = $('[data-cart-preview]');
            const $cart2 = $('[data-cart-preview2]');

            $cart.on('click', event => {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $('[data-cart]').offset().top,
                }, 700);
            });

            $cart2.on('click', event => {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $('[data-cart]').offset().top,
                }, 700);
            });
        }

        if($('.halo-cart-notification').length){
            if(!$('.halo-cart-notification').hasClass('is-running')){
                var duration = $('.halo-cart-notification').data('coundown') * 60,
                    element = $('.halo-cart-notification .time');
                $('.halo-cart-notification').addClass('is-running');
                this.startTimer(duration, element);
            }
        }
    }

    cartUpdate($target) {
        const itemId = $target.data('cartItemid');
        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return swal.fire({
                text: minError,
                icon: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            return swal.fire({
                text: maxError,
                icon: 'error',
            });
        }

        this.$overlay.show();

        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            this.$overlay.hide();

            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);

                this.refreshContent(remove);
            } else {
                $el.val(oldQty);
                swal.fire({
                    text: response.data.errors.join('\n'),
                    icon: 'error',
                });
            }
        });
    }

    cartUpdateQtyTextChange($target, preVal = null) {
        const itemId = $target.data('cartItemid');
        const $el = $(`#qty-${itemId}`);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const oldQty = preVal !== null ? preVal : minQty;
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = parseInt(Number($el.val()), 10);
        let invalidEntry;

        // Does not quality for min/max quantity
        if (!newQty) {
            invalidEntry = $el.val();
            $el.val(oldQty);
            return swal.fire({
                text: `${invalidEntry} is not a valid entry`,
                icon: 'error',
            });
        } else if (newQty < minQty) {
            $el.val(oldQty);
            return swal.fire({
                text: minError,
                icon: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            $el.val(oldQty);
            return swal.fire({
                text: maxError,
                icon: 'error',
            });
        }

        this.$overlay.show();
        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            this.$overlay.hide();

            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);

                this.refreshContent(remove);
            } else {
                $el.val(oldQty);
                swal.fire({
                    text: response.data.errors.join('\n'),
                    icon: 'error',
                });
            }
        });
    }

    cartRemoveItem(itemId) {
        this.$overlay.show();
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                this.refreshContent(true);
            } else {
                swal.fire({
                    text: response.data.errors.join('\n'),
                    icon: 'error',
                });
            }
        });
    }

    cartEditOptions(itemId) {
        const modal = defaultModal();
        const options = {
            template: 'cart/modals/configure-product',
        };

        modal.open();

        utils.api.productAttributes.configureInCart(itemId, options, (err, response) => {
            modal.updateContent(response.content);

            this.bindGiftWrappingForm();
        });

        utils.hooks.on('product-option-change', (event, option) => {
            const $changedOption = $(option);
            const $form = $changedOption.find('form');
            const $submit = $('input.button', $form);
            const $messageBox = $('.alertMessageBox');
            const item = $('[name="item_id"]', $form).attr('value');

            utils.api.productAttributes.optionChange(item, $form.serialize(), (err, result) => {
                const data = result.data || {};

                if (err) {
                    swal.fire({
                        text: err,
                        icon: 'error',
                    });
                    return false;
                }

                if (data.purchasing_message) {
                    $('p.alertBox-message', $messageBox).text(data.purchasing_message);
                    $submit.prop('disabled', true);
                    $messageBox.show();
                } else {
                    $submit.prop('disabled', false);
                    $messageBox.hide();
                }

                if (!data.purchasable || !data.instock) {
                    $submit.prop('disabled', true);
                } else {
                    $submit.prop('disabled', false);
                }
            });
        });
    }

    /**
     * @summary Get SKU list from table GUI and display ship out time
     * 
     * @param {Array} items Item list from Teamdesk
     * @param {Array} skus List of SKU
     * @param {Array} po PO list of item from Teamdesk
     */
     cartGetDelivery(items=null, skus=[], po=null) {        
        if (items==null) {            
            Array.from($("tr.cart-item")).forEach(r=>{
                let sku = $(r).data("sku");
                if (sku.indexOf("_N")==sku.length-2) {
                    sku = sku.slice(0,sku.length-2);                
                }
                skus.push(sku.replace("#","%23"));            
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
                if (r.length>0) {
                    this.cartGetDelivery(r, skus);
                }
            })
            .catch(e=>console.log(e));
        } else if (po==null) {            
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
            //     if (r.length>0) {
            //         this.cartGetDelivery(items, skus, r);
            //     } else {
            //         this.cartGetDelivery(items, skus, []);
            //     }
            // })
            // .catch(e=>{
            //     this.cartGetDelivery(items, skus, []);
            // })
            this.cartGetDelivery(items, skus, []);
        } else {            
            let qtyChecked={};            
            Array.from($("tr.cart-item")).forEach(r=>{
                let $el = $(r);                                            
                let isSpecial = false;
                try {             
                    let sku = $el.data("sku");
                    if (sku.indexOf("_N")==sku.length-2) {
                        sku = sku.slice(0,sku.length-2);                
                    }
                    let item = items.find(s=>s.SKU.toUpperCase()==sku.toUpperCase());
                    if (item) {                        
                        let qty = $el.find(".cart-item-quantity input").val();
                        let buff = 0;
                        if (qtyChecked[item.SKU]) {
                            buff = qtyChecked[item.SKU];
                            qtyChecked[item.SKU]+=qty;
                        } else {
                            qtyChecked[item.SKU]=qty;
                        }            
                        let content=``;
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
                                    content+=`En 3-8 días: cantidad <strong>${Math.min(item["Available Quantity"]-buff, qty)}</strong><br/>`;
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
                        //             content+=`2 weeks later: quantity <strong>${Math.min(item["Unlocked for sale quantity"]-buff, qty)}</strong><br/>`;                                    
                        //             qty = qty - Math.min(item["Unlocked for sale quantity"]-buff, qty);                                    
                        //             buff=0;
                        //         } else {
                        //             buff-=Number(item["Unlocked for sale quantity"]);
                        //         }
                        //     }
                        //     let virtual={};                        
                        //     if (Number(item["Quantity Incoming"])-2 > 0 && qty>0) {                                
                        //         if (Number(item["Quantity Incoming"])-2 -buff > 0) {
                        //             isSpecial = true;
                        //             let inItems = po.filter(p=>p.SKU.toUpperCase() == item["SKU"].toUpperCase());
                        //             let i=0, totalP=buff, tempqty = qty;
                        //             while (i<inItems.length && tempqty>0) {
                        //                 totalP+=Number(inItems[i]["Incoming Quantity"]);
                        //                 tempqty = tempqty - Math.min(Number(inItems[i]["Incoming Quantity"]), tempqty);
                        //                 i++;                                
                        //             }
                        //             if (i>0) {
                        //                 let inItem = inItems[i-1];
                        //                 let allureException = ['coco', 'rose', 'adele', 'angelina', 'jessica', 'selena', 'taylor', 'julia', 'nicole', 'gwyneth', 'ev7914', 'tl6814', 'ev5714', 'mo5514', 'mo7608', 'ev5512', 'ev5706', 'ev6810', 'eg6612', 'eh16', 'mh2206', 'sh5206', 'ep3608', 'mh2216', 'maya', 'noya'];
                        //                 let mdiff = this.monthDiff(new Date(), new Date(inItem["Arrival Due Date"]));
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
                        //         isSpecial = true;
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
                        //                 content+=`${date.toLocaleDateString('fr-FR', options)}: cantidad  <strong>${virtual[key]}</strong><br/>`;
                        //             } else {
                        //                 content+=`Dans ${key.replace("_","-")} mois: cantidad  <strong>${virtual[key]}</strong><br/>`;
                        //             }
                        //         }
                        //     }
                        // }
                        // $el.find(".cart-item-title").find(".cart-shipout").html(content).css({"height": "auto"});                                    
                        $el.find(".cart-item-info").find(".cart-shipout .definitionList-key").html("Tiempo estimado de envío:");
                        $el.find(".cart-item-info").find(".cart-shipout .definitionList-value").html(content);
                        // if (isSpecial) {
                        //     $el.find(".cart-item-title").find(".cart-shipout").addClass("delivery-highlight");
                        // }
                    } else {
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
                        if (cmhRushItems.includes($el.data("sku").toUpperCase())) {
                            content=`Envío garantizado en 3 meses`;
                            $el.find(".cart-item-title").find(".cart-shipout .definitionList-key").html("Tiempo estimado de envío:");
                            $el.find(".cart-item-title").find(".cart-shipout .definitionList-value").html(content);                            
                        } else if (hairService.includes($el.data("sku"))) {
                            content=`Expédition prévue dans 2-3 semaines`;
                            $el.find(".cart-item-title").find(".cart-shipout .definitionList-key").html("Tiempo estimado de envío:");
                            $el.find(".cart-item-title").find(".cart-shipout .definitionList-value").html(content);   
                        }                         
                    }
                    
                } catch (err) {
                    console.log(err);
                }       
            });            
        }         
    }

    refreshContent(remove) {
        const $cartItemsRows = $('[data-item-row]', this.$cartContent);
        const $cartPageTitle = $('[data-cart-page-title]');
        const options = {
            template: {
                content: 'cart/content',
                totals: 'cart/totals',
                pageTitle: 'cart/page-title',
                statusMessages: 'cart/status-messages',
            },
        };

        this.$overlay.show();

        // Remove last item from cart? Reload
        if (remove && $cartItemsRows.length === 1) {
            return window.location.reload();
        }

        utils.api.cart.getContent(options, (err, response) => {
            this.$cartContent.html(response.content);
            this.$cartTotals.html(response.totals);
            this.$cartMessages.html(response.statusMessages);

            $cartPageTitle.replaceWith(response.pageTitle);
            this.bindEvents();
            this.$overlay.hide();

            const quantity = $('[data-cart-quantity]', this.$cartContent).data('cartQuantity') || 0;

            $('body').trigger('cart-quantity-update', quantity);
            $('body .cart-quantity').text(quantity);
            this.cartGetDelivery();
        });
        haloCalculateFreeShipping(this.context);
    }

    bindCartEvents() {
        const debounceTimeout = 400;
        const cartUpdate = _.bind(_.debounce(this.cartUpdate, debounceTimeout), this);
        const cartUpdateQtyTextChange = _.bind(_.debounce(this.cartUpdateQtyTextChange, debounceTimeout), this);
        const cartRemoveItem = _.bind(_.debounce(this.cartRemoveItem, debounceTimeout), this);
        let preVal;

        // cart update
        $('[data-cart-update]', this.$cartContent).on('click', event => {
            const $target = $(event.currentTarget);

            event.preventDefault();

            // update cart quantity
            cartUpdate($target);
        });

        // cart qty manually updates
        $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
            preVal = this.value;
        }).change(event => {
            const $target = $(event.currentTarget);
            event.preventDefault();

            // update cart quantity
            cartUpdateQtyTextChange($target, preVal);
        });

        $('.cart-remove', this.$cartContent).on('click', event => {
            const itemId = $(event.currentTarget).data('cartItemid');
            const string = $(event.currentTarget).data('confirmDelete');
            swal.fire({
                text: string,
                icon: 'warning',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    // remove item from cart
                    cartRemoveItem(itemId);
                }
            });
            event.preventDefault();
        });

        $('[data-item-edit]', this.$cartContent).on('click', event => {
            const itemId = $(event.currentTarget).data('itemEdit');

            event.preventDefault();
            // edit item in cart
            this.cartEditOptions(itemId);
        });
    }

    bindPromoCodeEvents() {
        const $couponContainer = $('.coupon-code');
        const $couponForm = $('.coupon-form');
        const $codeInput = $('[name="couponcode"]', $couponForm);

        $('.coupon-code-add').on('click', event => {
            event.preventDefault();

            $(event.currentTarget).hide();
            $couponContainer.show();
            $('.coupon-code-cancel').show();
            $codeInput.trigger('focus');
        });

        $('.coupon-code-cancel').on('click', event => {
            event.preventDefault();

            $couponContainer.hide();
            $('.coupon-code-cancel').hide();
            $('.coupon-code-add').show();
        });

        $couponForm.on('submit', event => {
            const code = $codeInput.val();

            event.preventDefault();

            // Empty code
            if (!code) {
                return swal.fire({
                    text: $codeInput.data('error'),
                    icon: 'error',
                });
            }

            utils.api.cart.applyCode(code, (err, response) => {
                if (response.data.status === 'success') {
                    this.refreshContent();
                } else {
                    swal.fire({
                        text: response.data.errors.join('\n'),
                        icon: 'error',
                    });
                }
            });
        });
    }

    bindGiftCertificateEvents() {
        const $certContainer = $('.gift-certificate-code');
        const $certForm = $('.cart-gift-certificate-form');
        const $certInput = $('[name="certcode"]', $certForm);

        $('.gift-certificate-add').on('click', event => {
            event.preventDefault();
            $(event.currentTarget).toggle();
            $certContainer.toggle();
            $('.gift-certificate-cancel').toggle();
        });

        $('.gift-certificate-cancel').on('click', event => {
            event.preventDefault();
            $certContainer.toggle();
            $('.gift-certificate-add').toggle();
            $('.gift-certificate-cancel').toggle();
        });

        $certForm.on('submit', event => {
            const code = $certInput.val();

            event.preventDefault();

            if (!giftCertCheck(code)) {
                return swal.fire({
                    text: $certInput.data('error'),
                    icon: 'error',
                });
            }

            utils.api.cart.applyGiftCertificate(code, (err, resp) => {
                if (resp.data.status === 'success') {
                    this.refreshContent();
                } else {
                    swal.fire({
                        text: resp.data.errors.join('\n'),
                        icon: 'error',
                    });
                }
            });
        });
    }

    bindGiftWrappingEvents() {
        const modal = defaultModal();

        $('[data-item-giftwrap]').on('click', event => {
            const itemId = $(event.currentTarget).data('itemGiftwrap');
            const options = {
                template: 'cart/modals/gift-wrapping-form',
            };

            event.preventDefault();

            modal.open();

            utils.api.cart.getItemGiftWrappingOptions(itemId, options, (err, response) => {
                modal.updateContent(response.content);

                this.bindGiftWrappingForm();
            });
        });
    }

    bindGiftWrappingForm() {
        $('.giftWrapping-select').on('change', event => {
            const $select = $(event.currentTarget);
            const id = $select.val();
            const index = $select.data('index');

            if (!id) {
                return;
            }

            const allowMessage = $select.find(`option[value=${id}]`).data('allowMessage');

            $(`.giftWrapping-image-${index}`).hide();
            $(`#giftWrapping-image-${index}-${id}`).show();

            if (allowMessage) {
                $(`#giftWrapping-message-${index}`).show();
            } else {
                $(`#giftWrapping-message-${index}`).hide();
            }
        });

        $('.giftWrapping-select').trigger('change');

        function toggleViews() {
            const value = $('input:radio[name ="giftwraptype"]:checked').val();
            const $singleForm = $('.giftWrapping-single');
            const $multiForm = $('.giftWrapping-multiple');

            if (value === 'same') {
                $singleForm.show();
                $multiForm.hide();
            } else {
                $singleForm.hide();
                $multiForm.show();
            }
        }

        $('[name="giftwraptype"]').on('click', toggleViews);

        toggleViews();
    }

    startTimer(duration, element) {
        var timer = duration, minutes, seconds;
        var startCoundown = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            element.text(minutes + ":" + seconds);

            if (--timer < 0) {
                clearInterval(startCoundown);
                $('.halo-cart-notification').remove();
            }
        }, 1000);
    }

    bindEvents() {
        this.bindCartEvents();
        this.bindPromoCodeEvents();
        this.bindGiftWrappingEvents();
        this.bindGiftCertificateEvents();
        if ($("[content-init]").attr("content-init")=="true") {            
            this.cartGetDelivery();
            $("[content-init]").attr("content-init", false);
        }
        // initiate shipping estimator module
        this.shippingEstimator = new ShippingEstimator($('[data-shipping-estimator]'));
    }
}
