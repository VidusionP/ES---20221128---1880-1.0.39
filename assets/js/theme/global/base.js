import $ from 'jquery';

export default function () {
    if (localStorage.getItem("shp-country")) {

    } else {                    
        fetch(`https://www.cloudflare.com/cdn-cgi/trace`)
        .then(r=>r.text())
        .then(data=> {
            data = data.trim().split('\n').reduce(function(obj, pair) {
                pair = pair.split('=');
                return obj[pair[0]] = pair[1], obj;
            }, {});                    
            if (data.loc) {
                localStorage.setItem("shp-country", data.loc);


                // Spain
                if (data.loc == 'FR') {
                    setTimeout(function () {
                        $('.popup-country').css({ display: 'flex', zIndex: '99999' });
                        $('.popup-country-title').append('CHOISISSEZ VOTRE EMPLACEMENT');
                        $('.popup-country-main').append(
                            "Il semble que vous nous rendiez visite depuis la France.<br/>Vous pouvez consulter notre site web en France pour les prix en Euros et les options d'expédition locales."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/fr.svg><span>France</span>")
                        $('.popup-country-lang').append("FRANÇAIS")
                        $('.popup-country-lang').attr('href', '//superhairpieces.fr');
                        $('.popup-country-lang1').append("ENGLISH")
                        $('.popup-country-lang1').attr('href', '//en.superhairpieces.fr');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/es.svg><span>Spain</span>")
                        $('.popup-country-lang2').append("ESPAÑOL")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.es');
                        // $('.popup-country-lang3').append("FRANÇAIS")
                        // $('.popup-country-lang3').attr('href', '//fr.superhairpieces.ca');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } else if (data.loc == 'NL') {
                    setTimeout(function () {

                        $('.popup-country').css({ display: 'flex', zIndex: '99999' });
                        $('.popup-country-title').append('kies je locatie');
                        $('.popup-country-main').append(
                            "Het lijkt erop dat u ons vanuit Nederland bezoekt.<br/>U kunt onze Nederlandse website bezoeken voor lokale prijzen en verzendopties."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/nl.svg><span>Nederland</span>")
                        $('.popup-country-lang').append("DEUTSCH")
                        $('.popup-country-lang').attr('href', '//superhairpieces.nl');
                        // $('.popup-country-lang1').append("ENGLISH")
                        // $('.popup-country-lang1').attr('href', '//en.superhairpieces.nl');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/es.svg><span>Spain</span>")
                        $('.popup-country-lang2').append("ESPAÑOL")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.es');
                        // $('.popup-country-lang3').append("ENGLISH")
                        // $('.popup-country-lang3').attr('href', '//en.superhairpieces.fr');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                }else if (data.loc == 'CA') {
                    setTimeout(function () {                            
                        $('.popup-country').css({ display: 'flex', zIndex: '99999' });
                        $('.popup-country-title').append('Choose your location');
                        $('.popup-country-main').append(
                            "It looks like you are visiting us from Canada.<br/>You can visit our Canadian website for CAD prices and local shipping options."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/ca.svg><span>Canada</span>")
                        $('.popup-country-lang').append("ENGLISH")
                        $('.popup-country-lang').attr('href', '//superhairpieces.ca');
                        // $('.popup-country-lang1').append("FRANÇAIS")
                        // $('.popup-country-lang1').attr('href', '//fr.superhairpieces.ca');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/es.svg><span>Spain</span>")
                        $('.popup-country-lang2').append("ESPAÑOL")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.es');
                        // $('.popup-country-lang3').append("ENGLISH")
                        // $('.popup-country-lang3').attr('href', '//en.superhairpieces.fr');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } else if (data.loc == 'US') {
                    setTimeout(function () {                            
                        $('.popup-country').css({ display: 'flex', zIndex: '99999' });
                        $('.popup-country-title').append('Choose your location');
                        $('.popup-country-main').append(
                            "Are you visiting Superhairpieces.nl from the U.S.?<br/>Visit our official global site for more relevant pricing, promotions and events."
                        );
                        $('.popup-country-flag').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/us.svg><span>United States</span>")
                        $('.popup-country-lang').append("ENGLISH")
                        $('.popup-country-lang').attr('href', '//superhairpieces.com');
                        // $('.popup-country-lang1').append("FRANÇAIS")
                        // $('.popup-country-lang1').attr('href', '//fr.superhairpieces.com');
                        $('.popup-country-flag1').append("<img style='width:24px; border-radius:3px; margin-right:5px;' src=https://cdn.stamped.io/cdn/flags/es.svg><span>Spain</span>")
                        $('.popup-country-lang2').append("ESPAÑOL")
                        $('.popup-country-lang2').attr('href', '//superhairpieces.es');
                        // $('.popup-country-lang3').append("ENGLISH")
                        // $('.popup-country-lang3').attr('href', '//en.superhairpieces.fr');
                        $('.popup-country-overlay').on('click', function () {
                            $('.popup-country').hide();
                        });
                    }, 3500);
                } 
    
            }
        })
        .catch(e=>console.log(e));
    }     


}
