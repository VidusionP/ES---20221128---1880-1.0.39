import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import productDisplayMode from './halothemes/haloProductDisplayMode';
import haloSideAllCategory from './halothemes/haloSideAllCategory';
import haloAddOptionForProduct from './halothemes/haloAddOptionForProductCard';
import haloStickyToolbar from './halothemes/haloStickyToolbar';
import fancybox from './halothemes/jquery.fancybox.min';

export default class Category extends CatalogPage {
    onReady() {
        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        this.showProductsPerPage();
        this.showMoreProducts();
        this.fancyboxVideoBanner();
        this.loadOptionForProductCard(this.context);

        haloSideAllCategory();
        productDisplayMode();
        haloStickyToolbar(this.context);
        this.reviewShow()

    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container .productListing');
        const $facetedSearchContainer = $('#faceted-search-container');
        const $paginatorContainer = $('.pagination');
        const $showMoreContainer = $('.halo-product-show-more');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'halothemes/gallery/halo-product-listing',
                sidebar: 'category/sidebar',
                paginator: 'halothemes/gallery/halo-product-paginator',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);
            $paginatorContainer.html($(content.paginator).find('.pagination').children());
            $showMoreContainer.html($(content.paginator).find('.halo-product-show-more').children());

            $('body').triggerHandler('compareReset');

            if($('#product-listing-container .product').length > 0){
                haloAddOptionForProduct(this.context, 'product-listing-container');
            }

            this.showProductsPerPage();
            this.showMoreProducts();

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    showProductsPerPage(){
        this.reviewShow()

        try {
            var url = new URL(window.location.href);
            var c = url.searchParams.get("limit");
            if(c != null){
                var limit = document.querySelectorAll('select#limit option');
                Array.prototype.forEach.call(limit, function(element) {
                    if(element.value == c){
                        element.selected = true;
                    }
                });
            }
        } catch(e) {}
    }

    showMoreProducts() {
        const context = this.context;

        $('#listing-showmoreBtn > a').on('click', (event) => {
            event.preventDefault();

            var nextPage = $(".pagination-item--current").next(),
                link = nextPage.find("a").attr("href");

            $('#listing-showmoreBtn > a').addClass('loading');

            $.ajax({
                type: 'get',
                url: link.replace("http://", "//"),
                success: function(data) {
                    function  reviewShow(x) {
                        var limit = document.querySelectorAll('.productSku1');
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
                                // console.log(item.innerHTML)
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
                
                                // console.log(reviewAvg)
                                // console.log()
                                $(item1.nextElementSibling).append(`
                                <style>    .checked {
                                    color: rgb(255, 210, 0);
                            
                            }
                            .fa-star-o {
                                color: rgb(255, 210, 0);
                        
                            }
                            @media (min-width: 768px) {
                                .checking {
                                    display: flex;
                                    gap:5px;
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
                            <div>
                                ${review3.length} Reseñas
                            </div>`)
                                // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
                            })
                            //   console.log(review2)
                          })
                
                          
                          .catch((err) => {
                              console.log(err);
                          });
                    }
                    if ($(data).find('#product-listing-container .productListing').length > 0) {
                        $('#product-listing-container .productListing').append($(data).find('#product-listing-container .productListing').children());
                        reviewShow()

                        $('.pagination-list').html($(data).find(".pagination-list").html());

                        $('#listing-showmoreBtn > a').removeClass('loading').blur();

                        if (Number($(data).find('.pagination-info .end').text()) <= Number($(data).find('.pagination-info .total').text())) {
                            $('.pagination .pagination-info .end').text($(data).find('.pagination-info .end').text());
                        } else {
                            $('.pagination .pagination-info .end').text($(data).find('.pagination-info .total').text());
                        }

                        nextPage = $(".pagination-item--current").next();

                        if (nextPage.length === 0) {
                            $('#listing-showmoreBtn > a').addClass('disable').text('No more products');
                        }

                        if($(data).find('#product-listing-container .product').length > 0){
                            haloAddOptionForProduct(context, 'product-listing-container');
                        }
                    }
                }
            });
        });
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

    loadOptionForProductCard(context){
        if($('#featured-products .card').length > 0){
            haloAddOptionForProduct(context, 'featured-products');
        }

        if($('#product-listing-container .product').length > 0){
            haloAddOptionForProduct(context, 'product-listing-container');
        }
    }
    reviewShow() {
        var limit = document.querySelectorAll('.productSku1');
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
                // console.log(item.innerHTML)
                $(item1.nextElementSibling).empty()
                if (item1.innerHTML == 'M106') {
                    item1.innerHTML = 'M106#1'
                }else if (item1.innerHTML == 'M106L') {
                    item1.innerHTML = 'M106L#1'
                } else if (item1.innerHTML == 'Queen_18') {
                    item1.innerHTML = 'Q18'
                } 
                let review3 = []
                
                const filterArr = review2.filter(item => item['Product SKU'] === item1.innerHTML)
                filterArr.forEach((goku) => {
                    review3.push(goku['Review rate'])
                })
                const reviewAvg = Math.round((review3.reduce((a,b ) => a+ b, 0)/review3.length) * 10)/10

                // console.log(reviewAvg)
                // console.log()
                $(item1.nextElementSibling).append(`
                <style>    .checked {
                    color: rgb(255, 210, 0);
            
            }
            .fa-star-o {
                color: rgb(255, 210, 0);
        
            }
            @media (min-width: 768px) {
                .checking {
                    display: flex;
                    gap:5px;
                }
            }
            @media (min-width: 1025px) {
                .checking {
                    display: unset;
                }
            }
            @media (min-width: 1425px) {
                .checking {
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
            <div>
                ${review3.length} Reseñas
            </div>`)
                // $(item1.nextElementSibling).append(`<div>${reviewAvg}</div>`)
            })
            //   console.log(review2)
          })

          
          .catch((err) => {
              console.log(err);
          });
    }
}
