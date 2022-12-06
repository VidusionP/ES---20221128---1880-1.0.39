import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import fancybox from './halothemes/jquery.fancybox.min';
import PageManager from './page-manager';
import utils from '@bigcommerce/stencil-utils';
import haloAddOption from './halothemes/haloAddOptionForProductCard';
import parallax from './halothemes/parallax/jquery.parallax-scroll.min';
import ProductDetails from './common/product-details';
import { defaultModal, modalTypes } from './global/modal';
import haloYoutubeCarousel from './halothemes/haloVideo';
import haloNotifyMe from './halothemes/haloNotifyMe';

export default class Home extends PageManager {
    constructor(context) {
        super(context);
    }

    onReady() {
        this.countDownHeroCarousel();
        this.customPaging();
        this.loadProductByCategory();
        this.loadProductTabByCategory();
        this.loadProductByCategoryWithBanner();
        this.fancyboxVideoBanner();
        this.faqsToggle();
        this.recentBlogSlider();
        this.homeSpecialProduct();
        this.homeParallaxBanner();
        this.loadOptionForProductCard();
        this.customerReviewCarousel();
        this.homeProductRecommended();
        this.reviewCarousel()

    }

    countDownHeroCarousel() {
        $('.heroCarousel-countdown').each((index, element) => {
            $(element).parents('.slick-slide').addClass('has-count-down');

            var countDown = $(element).data('carousel-countdown'),
                countDownDate = new Date(countDown).getTime(),
                seft = $(element);

            var countdownfunction = setInterval(function() {
                var now = new Date().getTime(),
                distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(countdownfunction);
                    seft.html('');
                } else {
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
                    var strCountDown = "<span class='num'>"+days+"<span>DAYS</span></span><span class='num'>"+hours+"<span>HOURS</span></span><span class='num'>"+minutes+"<span>MINS</span></span><span class='num'>"+seconds+"<span>SECS</span></span>";

                    seft.html(strCountDown);
                }
            }, 1000);
        });
    }

    customPaging(){
        const heroCustom = $('.heroCarousel-custom');
        const heroCustomSlide = $('.heroCarousel-custom .slick-dots li');
        heroCustom.slick({
            dots: true,
            arrows: false,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: heroCustom.data('autoplay'),
            infinite: true,
            asNavFor: ".heroCarousel"
        });
        //ADA
        $('.heroCarousel-custom .slick-dots li').each(function(i){
            var slide = $(this).find('button').text();
            $(this).find('button').text('0' + slide).addClass('slick-dots-item');
        })

        heroCustom.on('afterChange', (event, slider, i) => {
            var pos = $(slider.$slides[i]).find('div[data-position]').data('position');

            if(pos === 'right'){
                heroCustom.removeClass('heroCarousel-customLeft').addClass('heroCarousel-customRight');
            } else{
                heroCustom.removeClass('heroCarousel-customRight').addClass('heroCarousel-customLeft');
            }
        });
        
        if ($('.heroCarousel-slide--first .heroCarousel-content-wrapper .heroCarousel-content--right').length) {
            heroCustom.removeClass('heroCarousel-customLeft').addClass('heroCarousel-customRight');
        }
    }

    loadProductByCategory(){
        const context = this.context;

        const options = {
            template: 'products/carousel-2'
        };

        if($('.halo-block[data-category-id]').length > 0){
            var  header_height = $('.header').height();

            $(window).on('scroll load', function() {
                var scroll = $(window).scrollTop(),
                    setFlag = false;

                if (scroll > header_height) {
                    setFlag = true;
                }

                if(setFlag){
                    $('.halo-block[data-category-id]').each((index, element) => {
                        var wrap = $(element).find('.productCarousel'),
                            catId = $(element).data('data-category'),
                            catUrl = $(element).data('category-url'),
                            blockId = $(element).attr('id');

                        if(!$('#product-by-cate-'+catId+' .productCarousel .productCarousel-slide').length){
                            loadCategory(catId, catUrl, options, wrap, blockId);
                        }
                    });

                    setFlag = false;
                }
            });
        }

        function loadCategory(id, url, option, wrap, blockId){
            utils.api.getPage(url, option, (err, response) => {
                if(!wrap.find('.productCarousel-slide').length){
                    wrap.html(response);
                    slickCarousel(wrap);
                    wrap.parents('.halo-block[data-category-id]').find('.loadingOverlay').remove();

                    haloAddOption(context, blockId);
                }
            }); 
        }

        function slickCarousel(wrap){
            wrap.slick({
                dots: true,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        slidesToShow: parseInt(context.themeSettings.home_product_block_col)
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: parseInt(context.themeSettings.home_product_block_col) - 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: parseInt(context.themeSettings.home_product_block_col) - 2
                    }
                }]
            });
        }
    }

    loadProductTabByCategory(){
        const context = this.context;

        const options = {
            template: 'products/carousel-3'
        };
        if($('.productCarousel-tabs').length > 0){
            if(!$('.productCarousel-tabs .tab-content.is-active .productCarousel .productCarousel-slide').length){
                Array.from($('.tab-content.is-active')).forEach((item) => {
                    let $itemEle = $(item)
                    var block = $itemEle,
                    wrap = block.find('.productCarousel'),
                    catId = block.data('tab-category-id'),
                    catUrl = block.data('tab-category-url'),
                    blockId = block.attr('id');

                    if (catUrl.includes("http")) {
                        if (location.host.includes("en.superhairpieces.es")) {
                            catUrl = catUrl.replace("//superhairpieces.es","//en.superhairpieces.es");
                        }
                    }
                if(!$('.productCarousel-tabs .tab-content.is-active .productCarousel .productCarousel-slide').length){
                    block.find('.loadingOverlay').show();
                    loadCategory(catId, catUrl, options, wrap, blockId);
                }
                })
            }
        }

        function reviewShow(x) {
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
                    
                    const vidu = review2.filter(item => item['Product SKU'] === item1.innerHTML)
                    vidu.forEach((goku) => {
                        review3.push(goku['Review rate'])
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
                    ${review3.length} Reseñas
                </div>`)
                    // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
                })

              })
    
              
              .catch((err) => {
                  console.log(err);
              });
        }
    //     function reviewShow(x) {
    //         var limit = document.querySelectorAll('.reviewCard1');

    //         for (let i = 0; i < limit.length; i++) {
    //             let review3=[]
    //             let review2 = []
    //             // console.log(limit[i].innerHTML)
    //             fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     "table": "Review",
    //                     "options":`?filter=[Product SKU]='${limit[i].innerHTML}'`
    //                 })
    //             })
    //             .then(r=>r.json())

    //             .then(r=> review2.push(...r))
    //             .then(r => {
    //                 $(limit[i].nextElementSibling).empty()
    //                 // const goku1 = review2.filter(item => item['Product SKU'] === limit[i].innerHTML)
    //                 // console.log(review2)
    //                 // console.log(review2.length)
    //                 for (let i=0; i<review2.length; i++) {
    //                     review3.push(review2[i]['Review rate'])

    //                 }
    //                 // review2.forEach((rev) => {
    //                 //     review3.push(rev['Review rate'])
    //                 // })
    //                 const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10
    //                 $(limit[i].nextElementSibling).append(`
    //                 <style>    .checked {
    //                     color: rgb(255, 210, 0);
                
    //             }
    //             .fa-star-o {
    //                 color: rgb(255, 210, 0);
            
    //             }
    //             @media (min-width: 768px) {
    //                 .productReview2 {
    //                     display: flex;
    //                 }
    //             }
    //             @media (min-width: 1025px) {
    //                 .productReview2 {
    //                     display: unset;
    //                 }
    //             }
    //             @media (min-width: 1400px) {
    //                 .productReview2 {
    //                     display: flex;
    //                 }
    //             }
    //             </style>
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    
    //                 <span>
    //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    //             </span>
    //             <div style=padding-left:5px;>
    //                 ${review3.length} Reseñas
    //             </div>`)
    //             })
    //         }
    // //         limit.forEach((item1) => {
                
    // //             let review3=[]
    // //             let review2 = []

    // //             fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    // //                 method: 'POST',
    // //                 headers: {
    // //                     'Content-Type': 'application/json',
    // //                     'Accept': 'application/json'
    // //                 },
    // //                 body: JSON.stringify({
    // //                     "table": "Review",
    // //                     "options":`?filter=[Product SKU]='${item1.innerHTML}'`
    // //                 })
    // //             })
    // //             .then(r=>r.json())

    // //             .then(r=> review2.push(...r))
    // //             .then(r => {
    // //                 $(item1.nextElementSibling).empty()
    // //                 const goku1 = review2.filter(item => item['Product SKU'] === item1.innerHTML)
    // //                 goku1.forEach((rev) => {
    // //                                         review3.push(rev['Review rate'])
    // //                                     })
    // //                 const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10
    // //                 $(item1.nextElementSibling).append(`
    // //                 <style>    .checked {
    // //                     color: rgb(255, 210, 0);
                
    // //             }
    // //             .fa-star-o {
    // //                 color: rgb(255, 210, 0);
            
    // //             }
    // //             @media (min-width: 768px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             @media (min-width: 1025px) {
    // //                 .productReview2 {
    // //                     display: unset;
    // //                 }
    // //             }
    // //             @media (min-width: 1400px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             </style>
    // // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    
    // //                 <span>
    // //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    // //             </span>
    // //             <div style=padding-left:5px;>
    // //                 ${review3.length} Reseñas
    // //             </div>`)
    // //             })

    // //         })
            
    // //         let review2 = []
    // //         fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
    // //             method: 'POST',
    // //             headers: {
    // //                 'Content-Type': 'application/json',
    // //                 'Accept': 'application/json'
    // //             },
    // //             body: JSON.stringify({
    // //                 "table": "Review",
    // //                 "options":``
    // //             })
    // //         })
    // //         .then(r=>r.json())
    // //         .then(r=> review2.push(...r))
    // //         .then((r) => {
    // //             limit.forEach((item1) => {
    // //                 $(item1.nextElementSibling).empty()
    
    // //                 let review3 = []
                    
    // //                 const filteredAr = review2.filter(item => item['Product SKU'] === item1.innerHTML)
    // //                 filteredAr.forEach((rev) => {
    // //                     review3.push(rev['Review rate'])
    // //                 })
    // //                 const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10

    // //                 $(item1.nextElementSibling).append(`
    // //                 <style>    .checked {
    // //                     color: rgb(255, 210, 0);
                
    // //             }
    // //             .fa-star-o {
    // //                 color: rgb(255, 210, 0);
            
    // //             }
    // //             @media (min-width: 768px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             @media (min-width: 1025px) {
    // //                 .productReview2 {
    // //                     display: unset;
    // //                 }
    // //             }
    // //             @media (min-width: 1400px) {
    // //                 .productReview2 {
    // //                     display: flex;
    // //                 }
    // //             }
    // //             </style>
    // // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    
    // //                 <span>
    // //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
    // //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
    // //             </span>
    // //             <div style=padding-left:5px;>
    // //                 ${review3.length} Reseñas
    // //             </div>`)
    // //                 // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
    // //             })

    // //           })
    
              
    // //           .catch((err) => {
    // //               console.log(err);
    // //           });
    //     }
        function loadCategory(id, url, option, wrap, blockId){
            utils.api.getPage(url, option, (err, response) => {
                if(!wrap.find('.productCarousel-slide').length){
                    wrap.html(response);
                    slickCarousel(wrap);
                    wrap.parents('.tab-content').find('.loadingOverlay').remove();

                    haloAddOption(context, blockId);
                    reviewShow()

                }
            }); 
        }

        function slickCarousel(wrap){
            wrap.slick({
                dots: false,
                arrows: true,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: "<svg class='slick-tab1 slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                prevArrow: "<svg class='slick-tab2 slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        slidesToShow: parseInt(context.themeSettings.home_product_block_tab_col)
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: parseInt(context.themeSettings.home_product_block_tab_col) - 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: parseInt(context.themeSettings.home_product_block_tab_col) - 2
                    }
                }]
            });
        }
    }

    loadProductByCategoryWithBanner(){
        const context = this.context;

        const options = {
            template: 'products/carousel-4'
        };

        if($('.halo-block[data-category-with-banner-id]').length > 0){
            var  header_height = $('.header').height();
            const $tabSorting = $('.tab-sorting .tab-title');

            $(window).on('scroll load', function() {
                var scroll = $(window).scrollTop(),
                    setFlag = false;

                if (scroll > header_height) {
                    setFlag = true;
                }

                if(setFlag){
                    $('.halo-block[data-category-with-banner-id]').each((index, element) => {
                        if ($('.home-layout-2').length && !$(element).hasClass('home2-flash-deals')) {
                            var wrap = $(element).find('.tabContent-new .productCarousel');
                        }
                        else {
                            var wrap = $(element).find('.productCarousel');
                        }

                        var catId = $(element).data('category-with-banner-id'),
                            catUrl = $(element).data('category-with-banner-url'),
                            blockId = $(element).attr('id');

                        if(!$('#product-with-banner-'+catId+' .productCarousel .productCarousel-slide').length){
                            loadCategory(catId, catUrl, options, wrap, blockId);
                        }
                    });

                    setFlag = false;
                }
            });

            $tabSorting.on('click', (e) => {
                e.preventDefault();
                const $target = $(e.currentTarget);
                const dataTab = $target.data('tab');
                const $thisBlock = $target.closest('.halo-block-product');
                var wrap = $thisBlock.find('.tabContent-'+dataTab+' .productCarousel'),
                    catId = $target.data('cate-id'),
                    catUrl = $target.data('cate-url'),
                    blockId = $thisBlock.find('.tabContent-'+dataTab).attr('id');

                if (dataTab == 'viewall') {
                    window.location.href = $target.attr('href');
                    return;
                }

                $thisBlock.find('.tab-sorting').removeClass('is-active');
                $target.parent().addClass('is-active');
                $thisBlock.find('.tab-content').removeClass('is-active');
                $thisBlock.find('.tabContent-'+dataTab).addClass('is-active');
                console.log('aff')
                if(!$target.hasClass('is-loaded')){
                    $target.addClass('is-loaded');
                    loadCategory(catId, catUrl, options, wrap, blockId);
                }
                else {
                    $thisBlock.find('.tabContent-'+dataTab+' .productCarousel').slick('refresh');
                }
            });

            if ($('.countDowntimer').length) {
                var countDownDate = new Date( $('.countDowntimer').attr('data-count-down')).getTime();

                var countdownfunction = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = countDownDate - now;
                    if (distance < 0) {
                        clearInterval(countdownfunction);
                        $(".countDowntimer").html('');
                    } else {
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        var strCountDown = "<div class='clock-item'><span class='num'>"+days+"</span><span class='text'>d</span></div><div class='clock-item'><span class='num'>"+hours+":</span></div><div class='clock-item'><span class='num'>"+minutes+":</span></div><div class='clock-item'><span class='num'>"+seconds+"</span></div>";
                        $(".countDowntimer").html(strCountDown);
                    }
                }, 1000);
            }
        }

        function loadCategory(id, url, option, wrap, blockId){
            utils.api.getPage(url, option, (err, response) => {
                if(!wrap.find('.productCarousel-slide').length){
                    wrap.html(response);

                    if(wrap.parents('.halo-block[data-category-with-banner-id]').hasClass('halo-block-product-banners')){
                        if ($('.home-layout-2').length) {
                            if (wrap.parents('.halo-block[data-category-with-banner-id]').hasClass('home2-flash-deals')) {
                                labelFlashDeals(wrap);
                                slickCarousel4(wrap);
                            }
                            else {
                                slickCarousel3(wrap);
                            }
                        }
                        else {
                            slickCarousel(wrap);
                        }
                    } else if(wrap.parents('.halo-block[data-category-with-banner-id]').hasClass('halo-block-product-banners2')){
                        slickCarousel2(wrap);
                    }

                    wrap.parents('.halo-block[data-category-with-banner-id]').find('.loadingOverlay').remove();

                    haloAddOption(context, blockId);
                }
            }); 
        }

        function slickCarousel(wrap){
            wrap.slick({
                dots: true,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
            });
        }

        function slickCarousel2(wrap){
            wrap.slick({
                dots: true,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        slidesToShow: parseInt(context.themeSettings.home_product_block_with_banner_col)
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: parseInt(context.themeSettings.home_product_block_with_banner_col) - 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: parseInt(context.themeSettings.home_product_block_with_banner_col) - 2
                    }
                }]
            });
        }

        function slickCarousel3(wrap){
            wrap.slick({
                dots: true,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
            });
        }

        function slickCarousel4(wrap){
            wrap.slick({
                dots: true,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                nextArrow: "<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                prevArrow: "<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }]
            });
        }

        function labelFlashDeals(wrap) {
            const $itemSide = wrap.find('.productCarousel-slide');

            $itemSide.each((index, element) => {
                const $thisLabel = $(element).find('.sale-badge');

                if ($thisLabel.length) {
                    const label = $thisLabel.find('.text').data('sale');

                    $(element).find('.card-price').addClass('has-labelSale').append('<div class="card-label-sale"><span>-'+label+'</span></div>');
                    $thisLabel.remove();
                }
            });
        }
    }

    fancyboxVideoBanner(){
        if ($(".video-block-image[data-fancybox]").length > 0) {
            $(".video-block-image[data-fancybox]").fancybox({
                'autoDimensions': false,
                'padding' : 0,
                'width' : 970,
                'height' : 600,
                'autoScale' : false,
                'transitionIn' : 'none',
                'transitionOut' : 'none'
            });
        }

        if ($(".button-popup-video[data-fancybox]").length > 0) {
            $(".button-popup-video[data-fancybox]").fancybox({
                'autoDimensions': false,
                'padding' : 0,
                'width' : 970,
                'height' : 600,
                'autoScale' : false,
                'transitionIn' : 'none',
                'transitionOut' : 'none'
            });
        }
    }

    faqsToggle(){
        $('.halo-short-faqs .card .title').on('click', (event) => {
            event.preventDefault();

            var $target = $(event.currentTarget);

            $('.halo-short-faqs .card .title').not($target).removeClass('collapsed');

            if($target.hasClass('collapsed')){
                $target.removeClass('collapsed');
            } else{
                $target.addClass('collapsed');
            }

            $('.halo-short-faqs .card').each((index, element) => {
                if($(element).find('.title').hasClass('collapsed')){
                    $(element).find('.collapse').slideDown("slow");
                } else{
                    $(element).find('.collapse').slideUp("slow");
                }
            });
        });
    }

    recentBlogSlider(){
        if ($(window).width() <= 1024) {
            if ($('.halo-recent-post').length) {
                if ($('.halo-recent-post').hasClass('slick-slider')){
                    $('.halo-recent-post').slick('unslick');
                }
            }
        } else{
            if ($('.halo-recent-post').length) {
                if (!$('.halo-recent-post').hasClass('slick-slider')){
                    $('.halo-recent-post').slick();
                }
            }
        }

        $(window).resize(function() {
            if ($(window).width() <= 1024) {
                if ($('.halo-recent-post').length) {
                    if ($('.halo-recent-post').hasClass('slick-slider')){
                        $('.halo-recent-post').slick('unslick');
                    }
                }
            } else {
                if ($('.halo-recent-post').length) {
                    if (!$('.halo-recent-post').hasClass('slick-slider')){
                        $('.halo-recent-post').slick();
                    }
                }
            }
        });
    }

    homeSpecialProduct(){
        const context = this.context;

        if(context.themeSettings.home_product_block_special == true){
            var productId = $('[data-special-product-id]').data('special-product-id'),
                setFlag = false;

            const options ={
                template: 'halothemes/products/halo-special-product-tmp'
            }

            $(window).on('scroll load', function() {
                var scroll = $(window).scrollTop(),
                    header_height = $('.header').height();

                if (scroll > header_height) {
                    setFlag = true;
                }

                if(setFlag){
                    if(!$('.halo-spacial-product .productView').length){
                        utils.api.product.getById(productId, options, (err, response) => {
                            setFlag = false;

                            var scope = '.halo-spacial-product';

                            if(!$(scope).find('.productView').length){
                                $(scope).html(response);

                                soldProduct($(scope).find('.productView-soldProduct'));
                                viewingProduct($(scope).find('.productView-ViewingProduct'));
                                countDownProduct($(scope).find('.productView-countDown'));

                                $(scope).find('[data-slick]').slick();
                                $(scope).find('.productView-for').get(0).slick.setPosition();

                                initThumbnailsHeight(scope);
                                haloNotifyMe($(scope), context);
                                haloYoutubeCarousel($(scope).find('[data-slick]'));

                                $(scope).on('click', '.dropdown-menu-button', event => {
                                    var $target = $(event.currentTarget);

                                    if($target.hasClass('is-open')){
                                        $target
                                            .removeClass('is-open')
                                            .attr('aria-expanded', false);

                                        $target
                                            .siblings('.dropdown-menu')
                                            .removeClass('is-open')
                                            .attr('aria-hidden', true);
                                    } else{
                                        $target
                                            .addClass('is-open')
                                            .attr('aria-expanded', true);

                                        $target
                                            .siblings('.dropdown-menu')
                                            .addClass('is-open')
                                            .attr('aria-hidden', false);
                                    }

                                    event.stopPropagation();
                                });

                                $(document).on('click', event => {
                                    if ($(scope).find('.dropdown-menu-button').hasClass('is-open')) {
                                        if (($(event.target).closest('.dropdown-menu-button').length === 0) && ($(event.target).closest('.dropdown-menu').length === 0)){
                                            $(scope)
                                                .find('.dropdown-menu-button')
                                                .removeClass('is-open')
                                                .attr('aria-expanded', false);

                                            $(scope)
                                                .find('.dropdown-menu-button')
                                                .siblings('.dropdown-menu')
                                                .removeClass('is-open')
                                                .attr('aria-hidden', true);
                                        }
                                    }
                                });

                                var productDetails = new ProductDetails($(scope), context);
                                productDetails.setProductVariant();

                                return productDetails;
                            }
                        });

                        function viewingProduct(wrapper) {
                            if(wrapper.length > 0){ 
                                var viewerText = context.themeSettings.product_viewingProduct_text,
                                    numbersViewer_text = context.themeSettings.product_viewingProduct_viewer,
                                    numbersViewerList =  JSON.parse("[" + numbersViewer_text + "]"); 
                                
                                setInterval(function() {
                                    var numbersViewerItem = (Math.floor(Math.random()*numbersViewerList.length));

                                    wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-eye"/></svg>' + numbersViewerList[numbersViewerItem] + " " + viewerText);
                                    wrapper.removeClass('u-hiddenVisually');
                                }, 10000);  
                            }
                        }

                        function countDownProduct(wrapper) {
                            if(wrapper.length > 0){
                                var countDown = wrapper.data('countdown'),
                                    countDownDate = new Date(countDown).getTime(),
                                    seft = wrapper;

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

                        function soldProduct(wrapper) {
                            if(wrapper.length > 0){ 
                                var numbersProduct_text = context.themeSettings.product_soldProduct_products,
                                    numbersHours_text = context.themeSettings.product_soldProduct_hours,
                                    soldProductText = context.themeSettings.product_soldProduct_text,
                                    soldProductText2 = context.themeSettings.product_soldProduct_hours_text;

                                var numbersProductList =  JSON.parse("[" + numbersProduct_text + "]"), 
                                    numbersProductItem = (Math.floor(Math.random()*numbersProductList.length)),
                                    numbersHoursList =  JSON.parse("[" + numbersHours_text + "]"),
                                    numbersHoursItem = (Math.floor(Math.random()*numbersHoursList.length));

                                wrapper.html('<svg class="icon" aria-hidden="true"><use xlink:href="#icon-fire"/></svg><span>' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + " " + soldProductText2 + '</span>');
                                wrapper.removeClass('u-hiddenVisually').show();
                            }
                        }

                        function initThumbnailsHeight($scope){
                            var el = $($scope);

                            var $carousel_nav = el.find('.productView-nav'),
                                $carousel_for = el.find('.productView-for');

                            if ($carousel_for.find('.slick-arrow').length > 0) {
                                $carousel_for.parent().addClass('arrows-visible');
                            } else {
                                $carousel_for.parent().addClass('arrows-disable');
                            }
                        }
                    }

                    setFlag = false;
                }
            });
        }
    }

    homeParallaxBanner(){
        if($('#halo_parralax_banners').length > 0){
            var wrap = $('#halo_parralax_banners'),
                image = wrap.find('[data-image]').data('image');
            
            wrap.find('[data-image]').css('background-image', 'url('+image+')');
        }
    }

    loadOptionForProductCard(){
        const context = this.context;

        if($('.productCarousel').length > 0){
            $('.productCarousel').each((index, element) => {
                var $prodWrapId = $(element).attr('id');

                haloAddOption(context, $prodWrapId);
            });
        }

        if($('.halo-block .productGrid').length > 0){
            $('.halo-block .productGrid').each((index, element) => {
                var $prodWrapId = $(element).attr('id');

                haloAddOption(context, $prodWrapId);
            });
        }
    }

    // Banner parallax 2
    customerReviewCarousel() {
        if ($('#halo_parralax_banners .halo-row').length) {
            if (!$('#halo_parralax_banners .halo-row').hasClass('slick-slider')) {
                $('#halo_parralax_banners .halo-row').slick({
                    dots: true,
                    arrows: false,
                    infinite: false,
                    mobileFirst: true,
                    adaptiveHeight: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: "<svg class='slick-next slick-arrow' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>", 
                    prevArrow: "<svg class='slick-prev slick-arrow' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",
                    responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: true
                        }
                    }]
                });
            }
            
        }
    }
    reviewCarousel() {
        $(window).on("resize orientationchange", function() {
            $(".blocktiktok").css('display', 'none')
 
        })
        let productIds = $("[function=list-product]").data("ids").toString().split(",").map(function
        
            (item) {
            return parseInt(item, 10);

        });
        // let stoken = $("[name=store-token]").val();
        let skus = ['M101','HD111', 'M111', 'HD111', 'M105']

        $('#r-test1').slick({
            "dots": false,
            "arrows": false,
            "infinite": true,
            "asNavFor": "#r-test2",
            "swipe": false,
            "pauseOnFocus" : false,
            "pauseOnHover": false,
            "fade": true,
            "autoplay": true,
            "slidesToShow": 1, 
            "slidesToScroll": 1
            })

            $('#r-test3').slick({
                "dots": false,
                "arrows": false,
                "infinite": true,
                "asNavFor": "#r-test2",
                "autoplay": true,
                "pauseOnFocus" : false,
                "pauseOnHover": false,

                "swipe": false,
                "slidesToShow": 1, 
                "slidesToScroll": 1,        
                "fade": true
                })
                $('#r-test2').slick({
                    "dots": false,
                "arrows": true,
                "infinite": true,
                "swipe": false,
                "pauseOnFocus" : false,
                "pauseOnHover": false,

                "autoplay": true,
                "adaptiveHeight": true,
                "asNavFor": ".reviewSlider",
                "slidesToShow": 1,
                "slidesToScroll": 1,
                "fade": true,
                "appendArrows": "#gokuvidu6"
                    })
                    $('#reviewblock1').slick({
                        "dots": false,
                        "arrows": true,
                        "pauseOnFocus" : false,
                                        "pauseOnHover": false,

                        "infinite": true,
                        "swipe": false,
                        "autoplay": true,
                        "asNavFor": ".reviewSlider",

                        "adaptiveHeight": true,
                        "slidesToShow": 1,
                        "slidesToScroll": 1,
                        "nextArrow": "<svg id=slick-next class=slick-next test1 slick-arrow aria-label=Next Slide><use xlink:href=#slick-arrow-next></use></svg>", 
                        "prevArrow": "<svg class=slick-prev slick-arrow aria-label=Previous Slide><use xlink:href=#slick-arrow-prev></use></svg>",
                        "appendArrows": "#arr1"
                        })
                        skus.map((item, i) => {
                            const rev =[]
                            // fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
                            //     method: 'POST',
                            //     headers: {
                            //         'Content-Type': 'application/json',
                            //         'Accept': 'application/json'
                            //     },
                            //     body: JSON.stringify({
                            //         "table": "Inventory",
                            //         "filter":`Any([SKU], '${item}')`
                            //     })
                            // })
                            // .then(r=> r.json())
                            // .then(r=> console.log(r))
                            fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    "table": "Review",
                                    "options":`?filter=[Product SKU]= '${item}'`
                                })
                            })
                            .then(r=> r.json())
        
                            .then(r=> {
                                r.forEach((item) => {
                                    rev.push(item['Review rate'])
                                })
                                const reviewAvg = Math.round((rev.reduce((a,b ) => a+ b, 0)/rev.length) * 10)/10
                                var content = `<style>    .checked {
                                    color: rgb(255, 210, 0);
                                    
                            }
                            .fa-star-o {
                                color: rgb(255, 210, 0);
                        
                            }
                            .fa {
                                font-size:20px !important;
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
                            <div style="padding-left:5px;color:#5a5a5a;">
                                ${rev.length} Reseñas
                            </div>`
        
                                $('.vidujen').eq(i).html(content)
                                $('.vidujen1').eq(i).html(content)
                                
            
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        })
        // console.log($('.thingIWant'))
    //     fetch('/graphql', {

    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${stoken}`
    //         },
    //         body: JSON.stringify({ 
    //             query: `
    //             query productsById {
    //                 site {
    //                     products  (entityIds: [${productIds}]) {    
    //                         edges {
    //                             node {
    //                                 sku                    
    //                                 name
    //                                 addToCartUrl
    //                                 path
    //                                 id
    //                                 entityId
    //                                 inventory {
    //                                     isInStock
    //                                 }
    //                                 prices {
    //                                     price {
    //                                         value
    //                                         currencyCode
    //                                     }
    //                                     salePrice {
    //                                         ...MoneyFields
    //                                     }
    //                                 }
    //                                 brand {
                                        
    //                                     name
    //                                   }
    //                                 defaultImage {
    //                                     url (width: 200)
    //                                 }                                    
    //                                 productOptions {
                                        
    //                                     ...OptionFields
    //                                 }         
    //                             }
    //                         }
                            
                                       
    //                     }
    //                 }
    //             }
    //             fragment MoneyFields on Money {
    //                 value
    //                 currencyCode
    //             }
    //             fragment OptionFields on ProductOptionConnection {
    //                 edges {
    //                     node {
    //                         entityId
    //                         displayName
                                                                                
    //                         ... on MultipleChoiceOption {
    //                             values {
    //                                 edges {
    //                                     node {
    //                                         entityId
    //                                         label                                                                    
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }`                
    //         })
    //     })
    //     .then(r=>r.json())
    //     .then(r=> {
    //         if (r.data) {
    //             // console.log(r.data.site.products.edges)
    //             let content="";
    //             let content1="";
    //             const skus=[]
    //             const filterArr = r.data.site.products.edges
    //             // console.log(filterArr)
    //             $('.thingIWant').each((i,item1) => {
    //                 // console.log(item1)
    //                 filterArr.forEach((item) => {
    //                     if(item.node.entityId == parseInt(item1.value)) {
    //                         console.log(item)
    //                     }
    //             })
    //         })
    //     }
    // })
        //                     skus.push(item.node.sku)
        //             // console.log(item.node.sku)
        //             content += `
        //                     <a class=r-item href=${item.node.path}>
        //                         <div>
        //                             <img src=${item.node.defaultImage.url}>
        //                         </div>
        //                         <div>
        //                             <div>
        //                                 <div class='vidujen'></div>
        //                                 <div class=r-name style="-webkit-box-orient: vertical">${item.node.name}</div>
        //                                 <div class=r-price>${item.node.prices.price.value},00€</div>
        //                             </div>
        //                         </div>
        //                     </a>
                        
        //                 `
        //                 content1 += `
        //                 <a class=r-item href=${item.node.path}>
        //                     <div>
        //                         <img src=${item.node.defaultImage.url}>
        //                     </div>
        //                     <div>
        //                         <div>
        //                             <div class='vidujen1'></div>
        //                             <div class=r-name style="-webkit-box-orient: vertical">${item.node.name}</div>
        //                             <div class=r-price>${item.node.prices.price.value},00€</div>
        //                         </div>
        //                     </div>
        //                 </a>
                    
        //             `
        //                 }
        //             })
        //         })

        //         $("#r-test1").html(content)
        //                 $('#r-test1').slick({
        //                     "dots": false,
        //                     "arrows": false,
        //                     "infinite": true,
        //                     "asNavFor": "#r-test2",
        //                     "swipe": false,
        //                     "pauseOnFocus" : false,
        //                     "pauseOnHover": false,
        //                     "fade": true,
        //                     "autoplay": true,
        //                     "slidesToShow": 1, 
        //                     "slidesToScroll": 1
        //                     })
        //             $("#r-test3").html(content1)
        //                     $('#r-test3').slick({
        //                         "dots": false,
        //                         "arrows": false,
        //                         "infinite": true,
        //                         "asNavFor": "#r-test2",
        //                         "autoplay": true,
        //                         "pauseOnFocus" : false,
        //                     "pauseOnHover": false,
        //                         "swipe": false,
        //                         "slidesToShow": 1, 
        //                         "slidesToScroll": 1,        
        //                         "fade": true
        //                         })
        //                         $('#r-test2').slick({
        //                             "dots": false,
        //                         "arrows": true,
        //                         "infinite": true,
        //                         "swipe": false,
        //                         "pauseOnFocus" : false,
        //                     "pauseOnHover": false,
        //                         "autoplay": true,
        //                         "adaptiveHeight": true,
        //                         "asNavFor": ".reviewSlider",
        //                         "slidesToShow": 1,
        //                         "slidesToScroll": 1,
        //                         "fade": true,
        //                         "appendArrows": "#gokuvidu6"
        //                             })
        //                             $('#reviewblock1').slick({
        //                                 "dots": false,
        //                                 "arrows": true,
        //                                 "pauseOnFocus" : false,
        //                     "pauseOnHover": false,
        //                                 "infinite": true,
        //                                 "swipe": false,
        //                                 "autoplay": true,
        //                                 "asNavFor": ".reviewSlider",

        //                                 "adaptiveHeight": true,
        //                                 "slidesToShow": 1,
        //                                 "slidesToScroll": 1,
        //                                 "nextArrow": "<svg id=slick-next class=slick-next test1 slick-arrow aria-label=Next Slide><use xlink:href=#slick-arrow-next></use></svg>", 
        //                                 "prevArrow": "<svg class=slick-prev slick-arrow aria-label=Previous Slide><use xlink:href=#slick-arrow-prev></use></svg>",
        //                                 "appendArrows": "#arr1"
        //                                 })
        //         skus.map((item, i) => {
        //             const rev =[]
        //             fetch(`https://shp-webserver.glitch.me/get-teamdesk`, {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Accept': 'application/json'
        //                 },
        //                 body: JSON.stringify({
        //                     "table": "Review",
        //                     "options":`?filter=[Product SKU]= '${item}'`
        //                 })
        //             })
        //             .then(r=> r.json())

        //             .then(r=> {
        //                 r.forEach((item) => {
        //                     rev.push(item['Review rate'])
        //                 })
        //                 const reviewAvg = Math.round((rev.reduce((a,b ) => a+ b, 0)/rev.length) * 10)/10
        //                 var content = `<style>    .checked {
        //                     color: rgb(255, 210, 0);
                            
        //             }
        //             .fa-star-o {
        //                 color: rgb(255, 210, 0);
                
        //             }
        //             .fa {
        //                 font-size:20px !important;
        //             }
        //             @media (min-width: 768px) {
        //                 .productReview2 {
        //                     display: flex;
        //                 }
        //             }
        //             @media (min-width: 1025px) {
        //                 .productReview2 {
        //                     display: unset;
        //                 }
        //             }
        //             @media (min-width: 1400px) {
        //                 .productReview2 {
        //                     display: flex;
        //                 }
        //             }
        //             </style>
        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                        
        //                 <span>
        //                 <span class="fa fa-star`+(0.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
        //                 <span class="fa fa-star`+(1.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
        //                 <span class="fa fa-star`+(2.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
        //                 <span class="fa fa-star`+(3.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>
        //                 <span class="fa fa-star`+(4.5 <= reviewAvg? ' checked': ' fa-star-o') + `"></span>      
        //             </span>
        //             <div style="padding-left:5px;color:#5a5a5a;">
        //                 ${rev.length} Reseñas
        //             </div>`

        //                 $('.vidujen').eq(i).html(content)
        //                 $('.vidujen1').eq(i).html(content)
                        
    
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //             });
        //         })
                
        //     }
        // })


        $('.arr1 .slick-prev').on('click', function () {
            $('#r-test1').slick("slickPrev");
            $('#r-test2').slick("slickPrev")
            $('#r-test3').slick("slickPrev")

    });
    $('.arr1 .slick-next').on('click', function () {
        $('#r-test1').slick("slickNext");
        $('#r-test2').slick("slickNext")
        $('#r-test3').slick("slickNext")

    });
    $('.arr4 .slick-prev').on('click', function () {
        // $('#r-test1').slick("slickPrev");
        $('#r-test2').slick("slickPrev")
        $('#r-test3').slick("slickPrev")

});
$('.arr4 .slick-next .slick-arrow').on('click', function () {
    console.log('hoi')
    // $('#r-test1').slick("slickNext");
    $('#r-test2').slick("slickNext")
    $('#r-test3').slick("slickNext")

});
    }
    homeProductRecommended() {
        const $homePGF = $('.home2-block-recommended');
        const $homePGF_grid = $homePGF.find('.productGrid');
        const homePGF_itemLength = $homePGF_grid.find('.product').length;
        const $homePGF_btnBlock = $('.homePGF_btn');
        const $homePGF_btn = $('.homePGF_btn a');
        const dataColumn = $homePGF_grid.data('columns');
        let tt_productShow;

        if ($homePGF.length && homePGF_itemLength > 0) {
            const fWidth = window.innerWidth;

            if (fWidth > 1279 && homePGF_itemLength > 10) {
                $homePGF_btnBlock.addClass('is-show');
            }
            else if (fWidth <= 1279 && fWidth > 991 && homePGF_itemLength > 8) {
                $homePGF_btnBlock.addClass('is-show');
            }
            else if (fWidth <= 991 && fWidth > 767 && homePGF_itemLength > 6) {
                $homePGF_btnBlock.addClass('is-show');
            }
            else if (fWidth <= 767 && homePGF_itemLength > 4) {
                $homePGF_btnBlock.addClass('is-show');
            }

            $homePGF_btn.on('click', (e) => {
                e.preventDefault();
                const wWidth = window.innerWidth;

                if (wWidth > 1279) {
                    tt_productShow = 10;
                }
                else if (wWidth <= 1279 && wWidth > 991) {
                    tt_productShow = 8;
                }
                else if (wWidth <= 991 && wWidth > 767) {
                    tt_productShow = 6;
                }
                else {
                    tt_productShow = 4;
                }

                if ($homePGF_grid.find('.product:hidden').length > 0) {
                    $homePGF_grid.find('.product:hidden:lt('+tt_productShow+')').css('display', 'inline-block');

                    if ($homePGF_grid.find('.product:hidden').length == 0) {
                        $homePGF_btn.text('No More Products').attr('disabled', '').addClass('disable');
                    }
                }
            });
        }
    }
}
