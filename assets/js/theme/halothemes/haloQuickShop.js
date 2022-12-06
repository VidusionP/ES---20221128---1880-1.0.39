import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal, ModalEvents } from '../global/modal';

export default function (context) {
    const modal = defaultModal();
    function reviewShow(x) {
        var limit = document.querySelectorAll('.productView-sku1');

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
                .testing123 {
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
            //   console.log(review2)
          })

          
          .catch((err) => {
              console.log(err);
          });
    }
    $('body').on('click', '.halo-quick-shop', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');

        modal.$modal.removeClass().addClass('modal modal--quickShop');
        modal.open({ size: 'small' });

        utils.api.product.getById(productId, { template: 'halothemes/products/halo-quick-shop' }, (err, response) => {
            modal.updateContent(response);

            var productDetails = new ProductDetails(modal.$content.find('.quickShop'), context);
            productDetails.setProductVariant(modal.$content.find('.quickShop'));
            reviewShow()

            return productDetails;
        });
    });
}
