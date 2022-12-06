/*
 Import all product specific js
 */
import Sortable from 'sortablejs';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
import haloAddOption from './halothemes/haloAddOptionForProductCard';
import haloProductLookbook from './halothemes/haloProductLookbook';
import haloBundleProducts from './halothemes/haloBundleProducts';
import haloNextProducts from './halothemes/haloNextProducts';
import haloStickyAddToCart from './halothemes/haloStickyAddToCart';
import haloYoutubeCarousel from './halothemes/haloVideo';
import haloNotifyMe from './halothemes/haloNotifyMe';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });
        

        this.productReviewHandler();
        this.bulkPricingHandler();
        this.productCustomTab();
        // this.productTabToggle();
        this.compareColors();
        this.productViewInfoTabs();
        this.soldProduct($('.productView-soldProduct'));
        this.viewingProduct($('.productView-ViewingProduct'));
        this.countDownProduct($('.productView-countDown'));
        this.loadOptionForProductCard();
        this.reviewShow()
        
        haloNextProducts(this.context);
        haloStickyAddToCart($('.productView'), this.context);
        haloProductLookbook(this.context, $('.productView-lookbook'));
        haloBundleProducts($('.productView-slick'), this.context);
        haloNotifyMe($('.productView-slick'), this.context);
        haloYoutubeCarousel($('.productView-slick [data-slick]'));
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }
    reviewShow(x) {
        var limit = document.querySelectorAll('.reviewCard1');

        let review2 = []
        Promise.all([
            fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json").then(r => r.json()).then(r=>{
          
                              review2.push(...r)}),
            fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json?skip=500").then(r => r.json()).then(r=>{
          
                              review2.push(...r)}),
            fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json?skip=1000").then(r => r.json()).then(r=>{
          
                              review2.push(...r)}),
            fetch("https://www.teamdesk.net/secure/api/v2/56554/BEA2566590EF4D14AA8D35AD0E2CEA77/Review/select.json?skip=1500").then(r => r.json()).then(r=>{
          
                              review2.push(...r)}),
          ])
          .then((r) => {
            limit.forEach((item1) => {
                $(item1.nextElementSibling).empty()
                if (item1.innerHTML == 'M106') {
                    item1.innerHTML = 'M106#1'
                }else if (item1.innerHTML == 'M106L') {
                    item1.innerHTML = 'M106L#1'
                } else if (item1.innerHTML == 'Queen_18') {
                    item1.innerHTML = 'Q18'
                } 
                let review3 = []
                
                const filteredAr = review2.filter(item => item['Product SKU'] === item1.innerHTML)
                filteredAr.forEach((rev) => {
                    review3.push(rev['Review rate'])
                })
                const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10

                $(item1.nextElementSibling).append(`
                <style>    .checked {
                    color: rgb(255, 210, 0);
            
            }
            .fa-star-o {
                color: rgb(255, 210, 0);
        
            }
            @media (min-width: 768px) {
                .productReview2 {
                    display: flex;
                }
            }
            @media (min-width: 1025px) {
                .productReview2 {
                    display: unset;
                }
            }
            @media (min-width: 1400px) {
                .productReview2 {
                    display: flex;
                }
            }
            </style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                
                <span>
                <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
                <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
                <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
                <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
                <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
            </span>
            <div style=padding-left:5px;>
                ${review3.length}  Reseñas
            </div>`)
                // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
            })

          })

          
          .catch((err) => {
              console.log(err);
          });
    }
    productCustomTab(){
        if($('.productView-description [data-custom-tab]').length > 0){
            $('.productView-description [data-custom-tab]').appendTo('#halo-custom-tab .card-body');
            $('#halo-custom-tab').removeClass('u-hiddenVisually');
            $('.productView-shortDesc [data-custom-tab]').remove();
            $('#halo-productView-description .productView-tabs .card-body').addClass('has-customTab');
        } else {
            $('#halo-productView-description .productView-tabs .card.warranty .title').addClass('no-customTab');
        }
    }

    // productTabToggle(){
    //     $('.productView-tabs .card .title').on('click', event => {
    //         event.preventDefault();

    //         var $target = $(event.currentTarget);

    //         $('.productView-tabs .card .title').not($target).removeClass('collapsed');

    //         if($target.hasClass('collapsed')){
    //             $target.removeClass('collapsed');
    //         } else{
    //             $target.addClass('collapsed');
    //         }

    //         $('.productView-tabs .card').each((index, element) =>{
    //             if($('.title', element).hasClass('collapsed')){
    //                 $(element).find('.collapse').slideDown("slow");
    //             } else{
    //                 $(element).find('.collapse').slideUp("slow");
    //             }
    //         });
    //     });

    //     $('.productView-tabs .card:nth-child(1) .title').trigger('click');
    // }

    soldProduct($wrapper) {
        if($wrapper.length > 0) {
            var numbersProduct_text = this.context.themeSettings.product_soldProduct_products,
                numbersHours_text = this.context.themeSettings.product_soldProduct_hours,
                soldProductText = this.context.themeSettings.product_soldProduct_text,
                soldProductText2 = this.context.themeSettings.product_soldProduct_hours_text;

            var numbersProductList =  JSON.parse("[" + numbersProduct_text + "]"), 
                numbersProductItem = (Math.floor(Math.random()*numbersProductList.length)),
                numbersHoursList =  JSON.parse("[" + numbersHours_text + "]"),
                numbersHoursItem = (Math.floor(Math.random()*numbersHoursList.length));
         
            $wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-fire"/></svg><span class="text">' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + " " + soldProductText2 + '</span>');
            $wrapper.show();
        }
    }

    countDownProduct($wrapper) {
        if($wrapper.length > 0) {
            var countDown = $wrapper.data('countdown'),
                countDownDate = new Date(countDown).getTime(),
                seft = $wrapper;

            var countdownfunction = setInterval(function() {
                var now = new Date().getTime(),
                    distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(countdownfunction);
                    seft.remove();
                } else {
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds = Math.floor((distance % (1000 * 60)) / 1000),
                        strCountDown = '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-bell"/></svg><span class="text"><span>Limited time offer, end in:</span></span> <span class="num">'+days+'d :</span> <span class="num">'+hours+'h :</span> <span class="num">'+minutes+'m :</span> <span class="num">'+seconds+'s</span>';

                    seft.html(strCountDown);
                }
            }, 1000);
        }
    }

    viewingProduct($wrapper) {
        if($wrapper.length > 0) {
            var viewerText = this.context.themeSettings.product_viewingProduct_text,
                numbersViewer_text = this.context.themeSettings.product_viewingProduct_viewer,
                numbersViewerList =  JSON.parse("[" + numbersViewer_text + "]"); 
            
            setInterval(function() {
                var numbersViewerItem = (Math.floor(Math.random()*numbersViewerList.length));

                $wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-eye"/></svg>' + numbersViewerList[numbersViewerItem] + " " + viewerText);
                $wrapper.removeClass('u-hiddenVisually').show();
            }, 10000);  
        }
    }

    compareColors(){
        const $swatchWrapper = $('.halo-compareColors-swatch'),
            $imageWrapper = $('.halo-compareColors-image'),
            $textWrapper = $('.halo-compareColors-text');

        $('.form-option', $swatchWrapper).on('click',  event => {
            var $this = $(event.currentTarget);

            $this.toggleClass('show-color');

            var title = $this.find('.form-option-variant').attr('title'),
                id = $this.data('product-swatch-value'),
                $color, $color2, $color3, $img, $pattern;

            if ($this.hasClass('show-color')){
                if($this.find('.form-option-variant--color').length){
                    $color = $this.find('.form-option-variant--color').attr('style');

                    $imageWrapper.append('<div class="item item-color item-'+id+'"><span class="color" style="'+$color+';"></span><span class="title">'+title+'</span></div>');
                } else if($this.find('.form-option-variant--color2').length){
                    $color = $this.find('.form-option-variant--color2 span:nth-child(1)').attr('style');
                    $color2 = $this.find('.form-option-variant--color2 span:nth-child(2)').attr('style');

                    $('.halo-compareColors-image').append('<div class="item item-color item-'+id+'"><span class="color color2"><span style="'+$color+';"></span><span style="'+$color2+';"></span></span><span class="title">'+title+'</span></div>');
                } else if($this.find('.form-option-variant--color3').length){
                    $color =  $this.find('.form-option-variant--color3 span:nth-child(1)').attr('style');
                    $color2 =  $this.find('.form-option-variant--color3 span:nth-child(2)').attr('style');
                    $color3 =  $this.find('.form-option-variant--color3 span:nth-child(3)').attr('style');

                    $imageWrapper.append('<div class="item item-color item-'+id+'"><span class="color color3"><span style="'+$color+';"></span><span style="'+$color2+';"></span><span style="'+$color3+';"></span></span><span class="title">'+title+'</span></div>');
                } else if($this.find('.form-option-variant--pattern').length){
                    $img = $this.find('.form-option-variant--pattern').attr('style');
                    $pattern = $this.find('.form-option-variant--pattern').attr('data-pattern');

                    $imageWrapper.append('<div class="item item-partern item-'+id+'"><span class="image"><img src='+$pattern+' alt='+title+' title='+title+'></span><span class="title">'+title+'</span></div>');
                }
            } else{
                $('.item-'+id+'', $imageWrapper).remove();
            }

            if($imageWrapper.children().length > 0){
                $textWrapper.hide();
            } else{
                $textWrapper.show();
            }

            if ($(window).width() >= 1025) {
                var el = document.getElementById('color-swatch-image');
                
                new Sortable(el, {
                    animation: 150
                });
            }
        });
    }

    productViewInfoTabs(){
        $('.productView-infoTabs .productView-infoTab a').on('click', event => {
            event.preventDefault();

            var $block = $(event.currentTarget).attr('href');

            $('html, body').animate({
                scrollTop: $($block).offset().top - $('.header').height(),
            }, 700);

            if($block == '#halo-productView-description'){
                if(!$('.productView-tabs .card:nth-child(1) .title').hasClass('collapsed')){
                    $('.productView-tabs .card:nth-child(1) .title').trigger('click');
                }
            }
        });

        $('.productView-moreDesc a').on('click', event => {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $('#halo-productView-description').offset().top - $('.header').height(),
            }, 700);

            if(!$('.productView-tabs .card:nth-child(1) .title').hasClass('collapsed')){
                $('.productView-tabs .card:nth-child(1) .title').trigger('click');
            }
        });
    }

    loadOptionForProductCard(){
        if($('.productCarousel').length > 0){
            $('.productCarousel').each((index, element) => {
                var $prodWrapId = $(element).attr('id');

                haloAddOption(this.context, $prodWrapId);
            });
        }
    }
}
