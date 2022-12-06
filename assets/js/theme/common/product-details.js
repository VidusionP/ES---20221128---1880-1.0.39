import utils from '@bigcommerce/stencil-utils';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.reveal';
import ImageGallery from '../product/image-gallery';
import modalFactory, { defaultModal, showAlertModal, ModalEvents } from '../global/modal';
import _ from 'lodash';
import Wishlist from '../wishlist';
import { normalizeFormData } from './utils/api';

export default class ProductDetails {
    constructor($scope, context, productAttributesData = {}) {
        this.$overlay = $('[data-cart-item-add] .loadingOverlay');
        this.$scope = $scope;
        this.context = context;
        this.imageGallery = new ImageGallery($('[data-image-gallery]', this.$scope));
        this.imageGallery.init();
        this.listenQuantityChange();
        this.initRadioAttributes();
        Wishlist.load(this.context);
        this.getTabRequests();

        this.$pSKUList = [];
        this.$poSKUList = [];
        this.$pCurrent = null;
        this.$allureException = ['coco', 'rose', 'adele', 'angelina', 'jessica', 'selena', 'taylor', 'julia', 'nicole', 'gwyneth', 'ev7914', 'tl6814', 'ev5714', 'mo5514', 'mo7608', 'ev5512', 'ev5706', 'ev6810', 'eg6612', 'eh16', 'mh2206', 'sh5206', 'ep3608', 'mh2216', 'maya', 'noya'];
        this.$cart = null;
        this.$productAttributesData = productAttributesData;   

        const $form = $('form[data-cart-item-add]', $scope);
        const $productOptionsElement = $('[data-product-option-change]', $form);
        const hasOptions = $productOptionsElement.html().trim().length;
        const hasDefaultOptions = $productOptionsElement.find('[data-default]').length;

        $productOptionsElement.on('change', event => {
            this.productOptionsChanged(event);
            this.setProductVariant();
        });

        $form.on('submit', event => {
            this.addProductToCart(event, $form[0], this.context);
        });

        if(this.context.themeSettings.halo_buy_it_now == true){
            $('#form-action-buyItNow', $scope).on('click', () => {
                $form.find('input[name=action]').val('buy');
            });

            $('#form-action-addToCart', $scope).on('click', () => {
                $form.find('input[name=action]').val('add');
            });
        }

        // Update product attributes. Also update the initial view in case items are oos
        // or have default variant properties that change the view
        if ((_.isEmpty(productAttributesData) || hasDefaultOptions) && hasOptions) {
            const $productId = $('[name="product_id"]', $form).val();
            this.getCart(productAttributesData);
            utils.api.productAttributes.optionChange($productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
                const attributesData = response.data || {};
                const attributesContent = response.content || {};
                this.updateProductAttributes(attributesData);
                this.$productAttributesData = attributesData;
                if (hasDefaultOptions) {
                    this.updateView(this.$scope, attributesData, attributesContent);
                } else {
                    this.updateDefaultAttributesForOOS(attributesData);
                }
            });
        } else {
            this.updateProductAttributes(productAttributesData);
            if (hasOptions) {
                this.getCart(productAttributesData);
            } else {
                this.getCart(productAttributesData, false);
            }
        }

        $productOptionsElement.show();

        this.previewModal = modalFactory('#previewModal')[0];
    }

    /**
     * @summary Get the current cart data and then start getting Earlist ship out list
     * 
     * @param {json} attributesData Init option data
     * @param {boolean} hasOptions True if this product has options, or else false
     */
     getCart(attributesData, hasOptions=true) {
        utils.api.cart.getCart({}, (err,response)=>{
            if (err) {
                if (hasOptions) {
                    this.getTeamdeskInventoryList(attributesData);
                } else {
                    this.getTeamdeskInventoryBySKU(attributesData);
                }
                return;
            }
            this.$cart = response;
            if (hasOptions) {
                this.getTeamdeskInventoryList(attributesData);
            } else {
                this.getTeamdeskInventoryBySKU(attributesData);
            }
        })
    }

    setProductVariant() {
        const unsatisfiedRequiredFields = [];
        const options = [];

        $.each($('[data-product-attribute]'), (index, value) => {
            const optionLabel = value.children[0].innerText;
            const optionTitle = optionLabel.split(':')[0].trim();
            const required = optionLabel.toLowerCase().includes('required');
            const type = value.getAttribute('data-product-attribute');

            if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
                unsatisfiedRequiredFields.push(value);
            }

            if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
                unsatisfiedRequiredFields.push(value);
            }

            if (type === 'date') {
                const isSatisfied = Array.from(value.querySelectorAll('select')).every((select) => select.selectedIndex !== 0);

                if (isSatisfied) {
                    const dateString = Array.from(value.querySelectorAll('select')).map((x) => x.value).join('-');
                    options.push(`${optionTitle}:${dateString}`);

                    return;
                }

                if (required) {
                    unsatisfiedRequiredFields.push(value);
                }
            }

            if (type === 'set-select') {
                const select = value.querySelector('select');
                const selectedIndex = select.selectedIndex;

                if (selectedIndex !== 0) {
                    options.push(`${optionTitle}:${select.options[selectedIndex].innerText}`);
                    $(value.children[0]).find('[data-option-value]').text(select.options[selectedIndex].innerText);
                    return;
                }

                if (required) {
                    unsatisfiedRequiredFields.push(value);
                }
            }

            if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
                const checked = value.querySelector(':checked');
                if (checked) {
                    if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
                        const label = checked.labels[0].innerText;
                        if (label) {
                            options.push(`${optionTitle}:${label}`);
                            $(value.children[0]).find('[data-option-value]').text(label);
                        }
                    }

                    if (type === 'swatch') {
                        const label = checked.labels[0].children[0];

                        if (label) {
                            options.push(`${optionTitle}:${label.title}`);
                            $(value.children[0]).find('[data-option-value]').text(label.title);
                        }
                    }

                    if (type === 'input-checkbox') {
                        options.push(`${optionTitle}:Yes`);
                    }

                    return;
                }

                if (type === 'input-checkbox') {
                    options.push(`${optionTitle}:No`);
                }

                if (required) {
                    unsatisfiedRequiredFields.push(value);
                }
            }
        });

        let productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
        const view = $('.productView');

        if (productVariant) {
            productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

            if (view.attr('data-event-type')) {
                view.attr('data-product-variant', productVariant);
            } else {
                const productName = view.find('.productView-title')[0].innerText.replace(/"/g, '\\$&');
                const card = $(`[data-name="${productName}"]`);
                card.attr('data-product-variant', productVariant);
            }
        }

        let productVariant2 = unsatisfiedRequiredFields.length === 0 ? options.sort() : 'unsatisfied';

        if (productVariant2) {
            var listVariant = '';

            $.each(productVariant2, (index, value) => {
                if(index > 0){
                    listVariant += ' / ' + productVariant2[index].toString().split(':').pop();
                } else if (index == 0){
                    listVariant += productVariant2[index].toString().split(':').pop();
                }
            });

            this.$scope.find('.productView-notifyMe').attr('data-product-variant', listVariant);
        }
    }

    /**
     * Since $productView can be dynamically inserted using render_with,
     * We have to retrieve the respective elements
     *
     * @param $scope
     */
    getViewModel($scope) {
        return {
            $priceWithTax: $('[data-product-price-with-tax]', $scope),
            $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
            rrpWithTax: {
                $div: $('.rrp-price--withTax', $scope),
                $span: $('[data-product-rrp-with-tax]', $scope),
            },
            rrpWithoutTax: {
                $div: $('.rrp-price--withoutTax', $scope),
                $span: $('[data-product-rrp-price-without-tax]', $scope),
            },
            nonSaleWithTax: {
                $div: $('.non-sale-price--withTax', $scope),
                $span: $('[data-product-non-sale-price-with-tax]', $scope),
            },
            nonSaleWithoutTax: {
                $div: $('.non-sale-price--withoutTax', $scope),
                $span: $('[data-product-non-sale-price-without-tax]', $scope),
            },
            priceSaved: {
                $div: $('.price-section--saving', $scope),
                $span: $('[data-product-price-saved]', $scope),
            },
            priceNowLabel: {
                $span: $('.price-now-label', $scope),
            },
            priceLabel: {
                $span: $('.price-label', $scope),
            },
            $weight: $('.productView-info [data-product-weight]', $scope),
            $increments: $('.form-field--increments :input', $scope),
            $addToCart: $('#form-action-addToCart', $scope),
            $buyItNow: $('#form-action-buyItNow', $scope),
            $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
            stock: {
                $container: $('.form-field--stock', $scope),
                $input: $('[data-product-stock]', $scope),
            },
            sku: {
                $label: $('dt.sku-label', $scope),
                $value: $('[data-product-sku]', $scope),
            },
            upc: {
                $label: $('dt.upc-label', $scope),
                $value: $('[data-product-upc]', $scope),
            },
            quantity: {
                $text: $('.incrementTotal', $scope),
                $input: $('[name=qty\\[\\]]', $scope),
            },
            $bulkPricing: $('.productView-info-bulkPricing', $scope),
        };
    }

    /**
     * Checks if the current window is being run inside an iframe
     * @returns {boolean}
     */
    isRunningInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    /**
     *
     * Handle product options changes
     *
     */
    productOptionsChanged(event) {
        const $changedOption = $(event.target);
        const $form = $changedOption.parents('form');
        const productId = $('[name="product_id"]', $form).val();

        // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
        if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
            return;
        }

        utils.api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', (err, response) => {
            const productAttributesData = response.data || {};
            this.$productAttributesData = productAttributesData;
            const productAttributesContent = response.content || {};
            this.updateProductAttributes(productAttributesData);
            this.updateView(this.$scope, productAttributesData, productAttributesContent);
            this.updateDeliverTime(productAttributesData);
        });
    }

    showProductImage(image) {
        if (_.isPlainObject(image)) {
            const zoomImageUrl = utils.tools.imageSrcset.getSrcset(
                image.data,
                { '1x': this.context.zoomSize },
                /*
                    Should match zoom size used for data-zoom-image in
                    components/products/product-view.html

                    Note that this will only be used as a fallback image for browsers that do not support srcset

                    Also note that getSrcset returns a simple src string when exactly one size is provided
                */
            );

            const mainImageUrl = utils.tools.imageSrcset.getSrcset(
                image.data,
                { '1x': this.context.productSize },
                /*
                    Should match fallback image size used for the main product image in
                    components/products/product-view.html

                    Note that this will only be used as a fallback image for browsers that do not support srcset

                    Also note that getSrcset returns a simple src string when exactly one size is provided
                */
            );

            const mainImageSrcset = utils.tools.imageSrcset.getSrcset(image.data);

            this.imageGallery.setAlternateImage({
                mainImageUrl,
                zoomImageUrl,
                mainImageSrcset,
            });
        } else {
            this.imageGallery.restoreImage();
        }
    }

    /**
     *
     * Handle action when the shopper clicks on + / - for quantity
     *
     */
     listenQuantityChange() { 
        let updated=false;
        this.$scope.on('keypress', '.form-input--incrementTotal', event => {
            // If the browser supports event.which, then use event.which, otherwise use event.keyCode
            const x = event.which || event.keyCode;
            if (x === 13) {
                // Prevent default
                event.preventDefault();                
                $(event.target).trigger("change");
            }
        });

        this.$scope.on('change', '.form-input--incrementTotal', event => {               
            event.preventDefault();

            if (this.$pCurrent && updated==false) {                
                this.updateDeliverTime(this.$pCurrent);
            }
        });
    }

    /**
     *
     * Add a product to cart
     *
     */
    addProductToCart(event, form, context) {
        const $addToCartBtn = $('#form-action-addToCart', $(event.target));
        const originalBtnVal = $addToCartBtn.val();
        const waitMessage = $addToCartBtn.data('waitMessage');

        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // Prevent default
        event.preventDefault();

        $addToCartBtn
            .val(waitMessage)
            .prop('disabled', true);

        this.$overlay.show();

        // Add item to cart
        utils.api.cart.itemAdd(normalizeFormData(new FormData(form)), (err, response) => {
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .val(originalBtnVal)
                .prop('disabled', false);

            this.$overlay.hide();

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;

                return showAlertModal(tmp.textContent || tmp.innerText);
            }

            if (form.action.value === 'buy') {
                this.redirectTo(this.context.urls.checkout.single_address);
                return;
            }

            // Open preview modal and update content
            if (this.previewModal) {
                const modal = defaultModal();
                modal.close();

                if (context.themeSettings.halo_add_to_cart_popup === 'normal'){
                    this.previewModal.$modal.removeClass().addClass('modal modal--preview');
                    this.previewModal.open({ size: 'large' });
                } else if (context.themeSettings.halo_add_to_cart_popup === 'mini'){
                    this.previewModal.$modal.removeClass().addClass('modal modal--preview modal--previewMini');
                    this.previewModal.open({ size: 'small' });

                    if($(".modal-background:visible").length > 0){
                        $('.modal-background:visible').hide();
                    }
                }

                this.updateCartContent(this.previewModal, response.data.cart_item.id);
            } else {
                this.$overlay.show();
                // if no modal, redirect to the cart page
                this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
            }
        });
    }

    /**
     * Get cart contents
     *
     * @param {String} cartItemId
     * @param {Function} onComplete
     */
    getCartContent(cartItemId, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemId,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }

    /**
     * Redirect to url
     *
     * @param {String} url
     */
    redirectTo(url) {
        if (this.isRunningInIframe() && !window.iframeSdk) {
            window.top.location = url;
        } else {
            window.location = url;
        }
    }

    /**
     * Update cart content
     *
     * @param {Modal} modal
     * @param {String} cartItemId
     * @param {Function} onComplete
     */
    updateCartContent(modal, cartItemId, onComplete) {        
        this.getCartContent(cartItemId, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cartQuantity') || 0;

            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);
            
            if (onComplete) {
                onComplete(response);
            }
        });
        utils.api.cart.getCart({}, (err,response)=>{            
            if (err) {                
                return;
            }
            this.$cart = response;

            this.updateDeliverTime(this.$productAttributesData);
        })
    }

    /**
     * @summary Get Incoming Quantity and Time from PO  List
     *      
     * @param {integer} qty How many we would like to check
     * @param {integer} inItems PO List of same SKU 
     * @param {boolean} strict If strict will return null if it could not cover the qty
     * @param {integer} buff Total existent quantity in current cart
     * @returns {json} Returns Quantity Incoming that we will use and index of PO
     */
     getIncomingTime(qty, inItems, strict=true, buff=0) {
        let i = -1;
        let qPO = -2-buff;        
        while (qPO<qty && i<inItems.length-1) {
            i++;
            qPO+=inItems[i]["Incoming Quantity"];            
        }
        if (strict) {
            if (qPO>=qty && i<inItems.length) {
                return {
                    qPO,
                    i
                }
            } else {
                return null;
            }
        } else {
            return {
                qPO,
                i
            }
        }        
    }

    /**
     * 
     * @summary Get list of teamdesk Inventory from Part Number
     * 
     * @param {json} data The first data option, will be product sku if not choose option 
     */
     getTeamdeskInventoryList(data) {
        if (data.sku) {
            this.$pCurrent = data;
            fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    table: 'Inventory',
                    filter: encodeURIComponent(`Any([Part Number],'${data.sku}')`)
                })
            })
            .then(r=>r.json())
            .then(d=> {                                    
                if (d.length>0) {
                    $(".delivery-wrap").show();
                    this.$pSKUList = d;
                } else {                    
                    $(".delivery-wrap").remove();
                    if (data.stock) {
                        this.$pSKUList = [];
                        if (data.stock) {
                            $('[data-product-stock]').text(`Cantidad actual de existencias: ${data.stock}`).show();
                            $(".form-field--delivery").hide();
                        }
                        // $('[data-product-stock]').text(data.stock);
                        // $('[data-stock-label]').css({"display": "inline-block"});
                    }
                }
                
                // this.getTeamdeskPOList(data);
            })
            .catch(e=> {
                console.log(e);
                $(".delivery-wrap").remove();
                if (data.stock) {
                    this.$pSKUList = [];
                    // $('[data-product-stock]').text(data.stock);
                    // $('[data-stock-label]').css({"display": "inline-block"});
                }
            });  
        }
    }

    /**
     * 
     * @summary Get list of teamdesk PO from Part Number
     * 
     * @param {json} data The first data option, will be product sku if not choose option 
     */
    getTeamdeskPOList(data) {
        fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                table: 't_763479',
                options: `?filter=Any([Part Number],'${encodeURIComponent(data.sku)}') and [Incoming Quantity]>0 and [Arrival Due Date]>ToDate('1/1/1')&sort=Arrival Due Date//ASC`                        
            })
        })
        .then(r=>r.json())
        .then(d=> {
            // console.log(d);
            if (d.length>0) {
                this.$poSKUList = d;
            }
            if (this.$pSKUList.length>0) {
                // console.log(this.$pSKUList);
                this.setEarliestTime();
            }
        })
        .catch(e=> {
            console.log(e);                
        })
    }

    getTeamdeskInventoryBySKU(data) {        
        if (data.sku) {
            let sku = data.sku;
            if (sku.indexOf("_N")==sku.length-2) {
                sku = sku.slice(0,sku.length-2);                
            }
            fetch(`//shp-webserver.glitch.me/get-teamdesk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    table: 'Inventory',
                    filter: encodeURIComponent(`Any([SKU],'${sku}')`)
                })
            })
            .then(r=>r.json())
            .then(d=> {                
                if (d.length>0) {         
                    this.$pSKUList = d;              
                    this.updateDeliverTime(data, d);
                } else if (data.stock) {
                    $('[data-product-stock]').text(`Cantidad actual de existencias: ${data.stock}`).show();
                    $(".form-field--delivery").hide();
                    // $('[data-stock-label]').css({"display": "inline-block"});
                }
            })
            .catch(e=>{
                console.log(e);
                if (data.stock) {
                    // $('[data-product-stock]').text(data.stock).show();
                    $('[data-product-stock]').text(`Cantidad actual de existencias: ${data.stock}`).show();
                    $(".form-field--delivery").hide();
                    // $('[data-stock-label]').css({"display": "inline-block"});
                }
            });
        }  else if (data.stock) {
            $('[data-product-stock]').text(`Cantidad actual de existencias: ${data.stock}`).show();
            $(".form-field--delivery").hide();
        }
    }

    /**
     * @summary Add delivery note with not-in-stock case
     * 
     * @param {json} item Teamdesk item
     * @param {integer} buff Total added quantity in current cart if there is 
     * @param {integer} qty Current checked quantity
     * @param {Array} noteStock Array of note for Stock information
     * @param {Array} noteShip Array of note for Shipment information
     * 
     * @returns void
     */
    updateDeliverLabelNotInstock(item, buff, qty, noteStock, noteShip) {
        
        /**
         * @summary Calculate the difference of months between 2 date time
         * 
         * @param {Date} d1 First date
         * @param {Date} d2 Second date
         * @returns {integer} Number of months difference. Will be 0 if d1>d2
         */
        function monthDiff(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth();
            return months <= 0 ? 0 : months;
        }        

        if (item["Virtual Quantity"] && qty>0) {
            let vqty = Number(item["Available Quantity"])>0?0:Math.abs(Number(item["Available Quantity"]));
            if (item["Lock Status"]!="Locked for processing" && Number(item["Unlocked for sale quantity"]) > 0 && qty>0) {
                if (Number(item["Unlocked for sale quantity"])-buff > 0) {
                    let tqty = Number(item["Unlocked for sale quantity"])-buff<item["Virtual Quantity"]?Number(item["Unlocked for sale quantity"])-buff:item["Virtual Quantity"];
                    noteStock.push(`In transit: ${tqty}`);
                    // noteShip.push(`Expect to ship out <b>1 week</b> later: <b>${Math.min(Number(item["Unlocked for sale quantity"])-buff, qty)}</b>`);
                    noteShip.transit=Math.min(tqty, qty);
                    vqty+=Math.min(tqty, qty);
                    qty -= Math.min(tqty, qty);
                    buff = 0;
                } else {
                    buff -= Number(item["Unlocked for sale quantity"]);
                    vqty += Number(item["Unlocked for sale quantity"]);
                }
            }                   
            if (Number(item["Quantity Incoming"])-2 > 0 && qty>0) {                             
                if (Number(item["Quantity Incoming"])-2 - buff > 0) {
                    let inItems = this.$poSKUList.filter(po=>po.SKU.toUpperCase() == item["SKU"].toUpperCase())
                    if (inItems.length>0) {
                        let cPO = this.getIncomingTime(qty, inItems, false, buff);
                        // console.log(cPO);
                        if (cPO) {
                            let inItem = inItems[cPO.i];
                            let today = new Date();
                            let date = new Date(inItem["Arrival Due Date"]);                             
                            date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                            let mTime = monthDiff(new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()), date);                        
                            if (mTime == 0) {
                                if (this.$allureException.includes(inItem["Part Number"].toLowerCase()) && item["Classification"].includes("Women")) {                                                                    
                                    // date = new Date();
                                    // date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                                    // date.setMonth(date.getMonth()+3);
                                    mTime+=3;
                                } else {                                                                    
                                    // date = new Date();
                                    // date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                                    // date.setMonth(date.getMonth()+1);
                                    mTime+=1
                                }
                            } else if (this.$allureException.includes(inItem["Part Number"].toLowerCase()) && item["Classification"].includes("Women")) {
                                // date.setMonth(date.getMonth()+2);
                                mTime+=2;
                            }
                            let iqty = cPO.qPO+vqty<item["Virtual Quantity"]?cPO.qPO:Number(item["Virtual Quantity"])-vqty;
                            noteStock.push(`In production: ${iqty}`);
                            // noteShip.push(`Expect to ship out in <b>${date.toLocaleDateString('en-US', options)}</b>: <b>${Math.min(Number(item["Quantity Incoming"])-2-buff,qty)}</b>`);
                            if (noteShip.virtual[mTime]) {
                                noteShip.virtual[mTime]+=Math.min(iqty,qty);
                            } else {
                                noteShip.virtual[mTime]=Math.min(iqty,qty);
                            }
                            vqty+=Math.min(iqty, qty);
                            qty -= Math.min(iqty, qty);
                            buff=0;
                        }  
                    }
                } else {
                    buff = buff - Number(item["Quantity Incoming"]) - 2;
                    vqty += Number(item["Quantity Incoming"])+2;
                }
            }    
            if (qty>0 && vqty<Number(item["Virtual Quantity"])) {
                if (Number(item["Virtual Quantity"])-vqty-buff > 0) {
                    let regex = /[1-9_]+M/g;
                    let t = item["Virtual Location"].match(regex);
                    if (t.length>0) {
                        t = t[0].substring(0,t[0].length-1);
                        if (t.length>0) {
                            if (Number(item["Virtual Quantity"])-buff-vqty >10) {
                                noteStock.push(`Allowed Pre-order: Más de 10`);
                            } else {
                                noteStock.push(`Allowed Pre-order: ${Number(item["Virtual Quantity"])-buff-vqty }`);
                            }                        
                            let mTime = 0;
                            if (t.length>1) {
                                // noteShip.push(`Shipping could take up to <b>${t.replace('_','-')} months</b>: <b>${Math.min(Number(item["Virtual Quantity"])-buff, qty)}</b>`);
                                mTime = t.replace('_','-');                            
                            } else {                            
                                // noteShip.push(`Expect to ship out <b>${t} month${t>1?'s':''}</b> later: <b>${Math.min(Number(item["Virtual Quantity"])-buff, qty)}</b>`);     
                                mTime = t;                       
                            }                        
                            if (noteShip.virtual[mTime]) {
                                noteShip.virtual[mTime]+=Math.min(Number(item["Virtual Quantity"])-buff-vqty, qty);
                            } else {
                                noteShip.virtual[mTime]=Math.min(Number(item["Virtual Quantity"])-buff-vqty, qty);
                            }
                            qty = qty - Number(item["Virtual Quantity"])+buff+vqty;
                            // qty = qty - Math.min(Number(item["Virtual Quantity"])-buff-vqty, qty)
                            // buff = 0;
                        }
                    }                    
                }
            }
        }           
        
        // $(".productView-details").find(".form-field.form-field--increments").eq(0).before(`<div class="productView-deliver">${noteShip.join("<br/>")}</div>`)
        // console.log(noteShip);
        let lbShip=[];
        if (noteShip.today) {
            lbShip.push(`Expect to ship out <b>immediately</b>: <b>${noteShip.today}</b>`);
        }
        if (noteShip.transfer) {
            lbShip.push(`Warehouse transfer, expect ship out <b>2-4 days</b> later: <b>${noteShip.transfer}</b>`)
        }
        if (noteShip.pending) {
            lbShip.push(`Expect to ship out <b>1-3 days</b> later: <b>${noteShip.pending}</b>`)
        }
        if (noteShip.transit) {
            lbShip.push(`Expect to ship out <b>1 week</b> later: <b>${noteShip.transit}</b>`);
        }
        // console.log(noteShip);
        if (Object.keys(noteShip.virtual).length > 0) {
            const options = {year: 'numeric', month: 'long'};
            let vkeys = Object.keys(noteShip.virtual).sort(function(a,b) {
                return a-b;
            })                            
            for (let key of vkeys) {
                if (Number(key)) {
                    let date = new Date();
                    date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                    date.setMonth(date.getMonth()+Number(key));
                    lbShip.push(`Expect to ship out in <b>${date.toLocaleDateString('fr-FR', options)}</b>: <b>${noteShip.virtual[key]}</b>`);
                } else {
                    lbShip.push(`Expect to ship out <b>${key} months later</b>: <b>${noteShip.virtual[key]}</b>`);
                }
            }
        }
        // console.log(lbShip);
        if (qty>0) {
            lbShip.push(`Unavailable: ${qty}`);
        }
        if (lbShip.length>0) {
            $(".productView-details").find(".form-field.form-field--increments").eq(0).before(`<div class="productView-deliver">${lbShip.join("<br/>")}</div>`)
        }
        if (noteStock.length>0) {
            $('[data-product-stock]').html("Quantity:<br/>"+noteStock.join('<br/>')).show();
            $('[data-stock-label]').css({"display": "none"});
            $(".productView-deliver").after("<span class='productView-tooltip'></span><span class='productView-tooltip-text'>This is an estimate. We are getting shipments weekly so you can receive your order quicker.</span>");
        }
    }

    /**
     * Show delivery note
     * 
     * @param {Array} noteStock Array of stock string information
     * @param {json} noteShip Shipment information
     * @param {integer} qty The remain quantity
     */
    addDeliveryLabel(noteStock, noteShip, qty) {     
        let lbShip=[];
        if (noteShip.today) {
            lbShip.push(`En 3-4 días: <b>${noteShip.today}</b>`);
        }
        if (noteShip.transfer) {
            lbShip.push(`En 5-8 días: <b>${noteShip.transfer}</b>`)
        }
        if (noteShip.pending) {
            lbShip.push(`En 3-8 días: <b>${noteShip.pending}</b>`)
        }
        if (qty>0) {
            lbShip.push(`No disponible: <b>${qty}</b>`)
        }
        // if (lbShip.length>0) {
        //     $(".productView-details").find(".form-field.form-field--increments").eq(0).before(`<div class="productView-deliver">${lbShip.join("<br/>")}</div>`)
        // }
        // if (noteStock.length>0) {
        //     $('[data-product-stock]').html("Quantity:<br/>"+noteStock.join('<br/>')).show();
        //     $('[data-stock-label]').css({"display": "none"});
        //     $(".productView-deliver").after("<span class='productView-tooltip'></span><span class='productView-tooltip-text'>This is an estimate. We are getting shipments weekly so you can receive your order quicker.</span>");
        // }
        $(".form-field--stock-level").show();
        $(".form-field--delivery").show();        
        if (lbShip.length>0) {            
            $('[data-time-shipout]').html(lbShip.join('<br/>'));
        } else {
            $(".form-field--delivery").hide();
        }
        if (noteStock.length>0) {            
            $('[data-product-stock]').html(noteStock.join('<br/>'));            
        } else if (lbShip.length>0) {
            $(".form-field--stock-level").hide();
        }
    }

    /**
     * @summary Set Ship out Label in case there is pending/hold items
     * 
     * @param {json} item Teamdesk item value
     * @param {integer} buff Total added quantity in current cart if there is 
     */
    updateDeliverLabelWithPending(item, buff=0) {
        let qty = Number($("[id='qty[]']").val());
        let noteStock = [], noteShip={
            "today":null,
            "transfer":null,
            "pending":null,
            "transit":null,
            "virtual":{}
        };        
        if (Number(item["Available Quantity"]) > 0) {
            if (Number(item["Available Quantity"])-buff > 0) {
                if (Number(item["Available Quantity"])-buff>10) {
                    noteStock.push(`Cantidad actual de existencias: Más de 10`);
                } else {
                    noteStock.push(`Cantidad actual de existencias: ${Number(item["Available Quantity"])-buff }`)
                }
                // noteShip.push(`Expect to ship out <b>1-4 days</b> later: <b>${Math.min(Number(item["Quantity USA"])-buff, qty)}</b>`);                
                noteShip.pending = Math.min(Number(item["Available Quantity"])-buff, qty);
                qty = qty - Math.min(Number(item["Available Quantity"])-buff, qty);
                buff = 0;
            } else {
                buff -= Number(item["Available Quantity"]);
            }
        } else if (Number(item["Available Quantity"]) < 0) {
            buff += Math.abs(Number(item["Available Quantity"]));
        }
                
        // this.updateDeliverLabelNotInstock(item, buff, qty, noteStock, noteShip);
        this.addDeliveryLabel(noteStock, noteShip, qty);
    }

    /**
     * @summary Set Ship out Label when Available Quantity == Total On Hand (there is no pending or holding item)
     * 
     * @param {json} item Teamdesk item value
     * @param {integer} buff Total added quantity in current cart if there is 
     */
    updateDeliverLabel(item, buff=0) {
        let qty = Number($("[id='qty[]']").val());        
        let noteStock = [], noteShip={
            "today":null,
            "transfer":null,
            "pending":null,
            "transit":null,
            "virtual":{}
        };        
        if (Number(item["Quantity USA"]) > 0) {
            if (Number(item["Quantity USA"])-buff>0) {
                if (Number(item["Quantity USA"])-buff>10) {
                    noteStock.push(`En stock: Más de 10`);
                } else {
                    noteStock.push(`En stock: ${Number(item["Quantity USA"])-buff }`)
                }
                // noteShip.push(`Expect to ship out <b>immediately</b>: <b>${Math.min(Number(item["Quantity USA"])-buff, qty)}</b>`);     
                noteShip.today=Math.min(Number(item["Quantity USA"])-buff, qty);           
                qty = qty - Math.min(Number(item["Quantity USA"])-buff, qty);
                buff = 0;
            } else {
                buff -= Number(item["Quantity USA"]);
            }
        }
        if (Number(item["Quantity Canada"]) > 0 && qty>0) {
            if (Number(item["Quantity Canada"])-buff > 0) {            
                if (Number(item["Quantity Canada"])-buff>10) {
                    noteStock.push(`Bodega Canada: Más de 10`);
                } else {
                    noteStock.push(`Bodega Canada: ${Number(item["Quantity Canada"])-buff }`)
                }
                // noteShip.push(`Warehouse transfer, expect ship out <b>2-4 days</b> later: <b>${Math.min(Number(item["Quantity USA"]) + Number(item["Quantity Canada"])-buff, qty)}</b>`);
                noteShip.transfer = Math.min(Number(item["Quantity Canada"])-buff, qty);
                qty = qty - Math.min(Number(item["Quantity Canada"])-buff, qty);
                buff = 0;
            } else {
                buff -= Number(item["Quantity Canada"]);
            }
        }
                
        // this.updateDeliverLabelNotInstock(item, buff, qty, noteStock, noteShip);
        this.addDeliveryLabel(noteStock, noteShip, qty);
    }

    updateDeliverTime(data, sList=null) {        
        // $(".productView-deliver").remove();
        // $(".productView-tooltip").remove();
        // $(".productView-tooltip-text").remove();
        let arrCheck = sList?sList:this.$pSKUList;        
        if (arrCheck.length>0 && data.sku) {   
            // console.log(data);         
            this.$pCurrent = data;
            let sku = data.sku;
            if (sku.indexOf("_N")==sku.length-2) {
                sku = sku.slice(0,sku.length-2);                
            }
            let item = arrCheck.find(p=>p.SKU.toUpperCase()==sku.toUpperCase());            
            if (item) {                
                if (this.$cart) {
                    let totalbuff = 0;
                    try {
                        let titem = this.$cart.lineItems.physicalItems.filter(p=>p.sku.toUpperCase()==data.sku.toUpperCase())                            
                        if (titem.length>0) {
                            totalbuff = titem.reduce((a,b)=>a+b.quantity,0);                                
                        }
                        
                    } catch (error) {
                        console.log(error);                            
                    } finally {                            
                        if (Number(item["Total On Hand"])!=Number(item["Available Quantity"])) {
                            this.updateDeliverLabelWithPending(item, totalbuff);
                        } else {
                            this.updateDeliverLabel(item, totalbuff);
                        }
                    }
                } else {
                    if (Number(item["Total On Hand"])!=Number(item["Available Quantity"])) {
                        this.updateDeliverLabelWithPending(item);
                    } else {
                        this.updateDeliverLabel(item);
                    }
                }
            } else if (sList==null) {                
                this.getTeamdeskInventoryBySKU(data);
            }
        } else if (sList==null) {            
            this.getTeamdeskInventoryBySKU(data);
        }
    }

    /**
     * Show an message box if a message is passed
     * Hide the box if the message is empty
     * @param  {String} message
     */
    showMessageBox(message, $scope) {
        const $messageBox = $('.productAttributes-message', $scope);

        if (message) {
            $('.alertBox-message', $messageBox).text(message);
            $messageBox.show();
            $('.productView-notifyMe', $scope).show();
        } else {
            $messageBox.hide();
            $('.productView-notifyMe', $scope).hide();
        }
    }

    /**
     * Hide the pricing elements that will show up only when the price exists in API
     * @param viewModel
     */
    clearPricingNotFound(viewModel) {
        viewModel.rrpWithTax.$div.hide();
        viewModel.rrpWithoutTax.$div.hide();
        viewModel.nonSaleWithTax.$div.hide();
        viewModel.nonSaleWithoutTax.$div.hide();
        viewModel.priceSaved.$div.hide();
        viewModel.priceNowLabel.$span.hide();
        viewModel.priceLabel.$span.hide();
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updatePriceView(viewModel, price) {
        this.clearPricingNotFound(viewModel);

        if (price.with_tax) {
            viewModel.priceLabel.$span.show();
            viewModel.$priceWithTax.html(price.with_tax.formatted);
        }

        if (price.without_tax) {
            viewModel.priceLabel.$span.show();
            viewModel.$priceWithoutTax.html(price.without_tax.formatted);
        }

        if (price.rrp_with_tax) {
            viewModel.rrpWithTax.$div.show();
            viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
        }

        if (price.rrp_without_tax) {
            viewModel.rrpWithoutTax.$div.show();
            viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
        }

        if (price.saved) {
            viewModel.priceSaved.$div.show();
            viewModel.priceSaved.$span.html(price.saved.formatted);
        }

        if (price.non_sale_price_with_tax) {
            viewModel.priceLabel.$span.hide();
            viewModel.nonSaleWithTax.$div.show();
            viewModel.priceNowLabel.$span.show();
            viewModel.nonSaleWithTax.$span.html(price.non_sale_price_with_tax.formatted);
        }

        if (price.non_sale_price_without_tax) {
            viewModel.priceLabel.$span.hide();
            viewModel.nonSaleWithoutTax.$div.show();
            viewModel.priceNowLabel.$span.show();
            viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
        }
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updateView($scope, data, content = null) {
        const viewModel = this.getViewModel(this.$scope);

        if (_.isNumber(data.stock)) {
            if((data.stock <= parseInt(this.context.themeSettings.halo_stock_level_limit)) && (data.stock > 0)) {
                $('.productView-optionsStock').removeClass('u-hiddenVisually');
                $('[data-stock-left]').text(data.stock);
            } else{
                $('.productView-optionsStock').addClass('u-hiddenVisually');
            }
        }

        this.showMessageBox(data.stock_message || data.purchasing_message, $scope);

        if (_.isObject(data.price)) {
            this.updatePriceView(viewModel, data.price);
        }

        if (_.isObject(data.weight)) {
            viewModel.$weight.html(data.weight.formatted);
        }

        // Set variation_id if it exists for adding to wishlist
        if (data.variantId) {
            viewModel.$wishlistVariation.val(data.variantId);
        }

        // If SKU is available
        if (data.sku) {
            viewModel.sku.$value.text(data.sku);
            viewModel.sku.$label.show();
        } else {
            viewModel.sku.$label.hide();
            viewModel.sku.$value.text('');
        }

        // If UPC is available
        if (data.upc) {
            viewModel.upc.$value.text(data.upc);
            viewModel.upc.$label.show();
        } else {
            viewModel.upc.$label.hide();
            viewModel.upc.$value.text('');
        }

        // if stock view is on (CP settings)
        if (viewModel.stock.$container.length && _.isNumber(data.stock)) {
            // if the stock container is hidden, show
            viewModel.stock.$container.removeClass('u-hiddenVisually');

            viewModel.stock.$input.text(data.stock);
        } else {
            viewModel.stock.$container.addClass('u-hiddenVisually');
            viewModel.stock.$input.text(data.stock);
        }

        this.updateDefaultAttributesForOOS(data);

        // If Bulk Pricing rendered HTML is available
        if (data.bulk_discount_rates && content) {
            viewModel.$bulkPricing.html(content);
        } else if (typeof (data.bulk_discount_rates) !== 'undefined') {
            viewModel.$bulkPricing.html('');
        }
    }

    updateDefaultAttributesForOOS(data) {
        const viewModel = this.getViewModel(this.$scope);
        if (!data.purchasable || !data.instock) {
            viewModel.$addToCart.prop('disabled', true);
            viewModel.$buyItNow.prop('disabled', true);
            viewModel.$increments.prop('disabled', true);
        } else {
            viewModel.$addToCart.prop('disabled', false);
            viewModel.$buyItNow.prop('disabled', false);
            viewModel.$increments.prop('disabled', false);
        }
    }

    /**
     * Hide or mark as unavailable out of stock attributes if enabled
     * @param  {Object} data Product attribute data
     */
    updateProductAttributes(data) {
        const behavior = data.out_of_stock_behavior;
        const inStockIds = data.in_stock_attributes;
        const outOfStockMessage = ` (${data.out_of_stock_message})`;

        this.showProductImage(data.image);

        if (behavior !== 'hide_option' && behavior !== 'label_option') {
            return;
        }

        $('[data-product-attribute-value]', this.$scope).each((i, attribute) => {
            const $attribute = $(attribute);
            const attrId = parseInt($attribute.data('productAttributeValue'), 10);


            if (inStockIds.indexOf(attrId) !== -1) {
                this.enableAttribute($attribute, behavior, outOfStockMessage);
            } else {
                this.disableAttribute($attribute, behavior, outOfStockMessage);
            }
        });
    }

    disableAttribute($attribute, behavior, outOfStockMessage) {
        if (this.getAttributeType($attribute) === 'set-select') {
            return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.hide();
        } else {
            $attribute.addClass('unavailable');
        }
    }

    disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        const $select = $attribute.parent();

        if (behavior === 'hide_option') {
            $attribute.toggleOption(false);
            // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
            if ($select.val() === $attribute.attr('value')) {
                $select[0].selectedIndex = 0;
            }
        } else {
            $attribute.attr('disabled', 'disabled');
            $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
        }
    }

    enableAttribute($attribute, behavior, outOfStockMessage) {
        if (this.getAttributeType($attribute) === 'set-select') {
            return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.show();
        } else {
            $attribute.removeClass('unavailable');
        }
    }

    enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        if (behavior === 'hide_option') {
            $attribute.toggleOption(true);
        } else {
            $attribute.prop('disabled', false);
            $attribute.html($attribute.html().replace(outOfStockMessage, ''));
        }
    }

    getAttributeType($attribute) {
        const $parent = $attribute.closest('[data-product-attribute]');

        return $parent ? $parent.data('productAttribute') : null;
    }

    /**
     * Allow radio buttons to get deselected
     */
    initRadioAttributes() {
        $('[data-product-attribute] input[type="radio"]', this.$scope).each((i, radio) => {
            const $radio = $(radio);

            // Only bind to click once
            if ($radio.attr('data-state') !== undefined) {
                $radio.on('click', () => {
                    if ($radio.data('state') === true) {
                        $radio.prop('checked', false);
                        $radio.data('state', false);

                        $radio.trigger('change');
                    } else {
                        $radio.data('state', true);
                    }

                    this.initRadioAttributes();
                });
            }

            $radio.attr('data-state', $radio.prop('checked'));
        });
    }

    /**
     * Check for fragment identifier in URL requesting a specific tab
     */
    getTabRequests() {
        if (window.location.hash && window.location.hash.indexOf('#tab-') === 0) {
            const $activeTab = $('.tabs').has(`[href='${window.location.hash}']`);
            const $tabContent = $(`${window.location.hash}`);

            if ($activeTab.length > 0) {
                $activeTab.find('.tab')
                    .removeClass('is-active')
                    .has(`[href='${window.location.hash}']`)
                    .addClass('is-active');

                $tabContent.addClass('is-active')
                    .siblings()
                    .removeClass('is-active');
            }
        }
    }
}
