const mainPage = document.getElementById('main_page');
const videoPage = document.getElementById('institutional_video');
const durabilityPage = document.getElementById('information_durability');
const familyPage = document.getElementById('catalog_family');
const carouselCatalog = document.getElementById('carousel_catalog');

const btnTextViva1 = document.getElementById('btn_text_viva1');
const btnTextViva2 = document.getElementById('btn_text_viva2');
const btnTextVivaNeoPrestige = document.getElementById('btn_text_viva_neo_prestige');
const btnTextVivaNeoPlus = document.getElementById('btn_text_viva_neo_plus');
const btnTextVivaMillesime = document.getElementById('btn_text_viva_millesime');

const languages = {
    fr: {
        mainPageButtonVideo: "Vidéo",
        mainPageButtonDurability: "Durabilité",
        mainPageButtonFamily: "Vivo Famille",

        titlePageVideo: "Vidéo",
        titlePageDurability: "Durabilité",
        titlePageFamily: "Vivo Famille",

    },
    en: {
        mainPageButtonVideo: "Video",
        mainPageButtonDurability: "Durability",
        mainPageButtonFamily: "Vivo Family",

        titlePageVideo: "Video",
        titlePageDurability: "Durability",
        titlePageFamily: "Vivo Family"
    }
}

function setDefaultLanguage(language) {
    if (localStorage.getItem('language') == null) {
        localStorage.setItem('language', language);
    }
}

let currentLanguage = "fr";
changeLanguage(currentLanguage);

function changeLanguage(language) {
    const languageData = languages[language];

    // MAIN PAGE
    $('#btn_text_video').text(languageData.mainPageButtonVideo);
    $('#btn_text_durability').text(languageData.mainPageButtonDurability);
    $('#btn_text_family').text(languageData.mainPageButtonFamily);

    // TITLES PAGES
    $('#title_page_video').text(languageData.titlePageVideo);
    $('#title_page_durability').text(languageData.titlePageDurability);
    $('#title_page_family').text(languageData.titlePageFamily);

}

(function($) {
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();

        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);
            var target = connector(item, carouselStage);

            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });

        var totalItems = carouselStage.jcarousel('items').length;

        $('.carousel-stage').swipe({
            swipeLeft: function() {
                if (carouselStage.jcarousel('target').index() === totalItems - 1) {
                    carouselStage.jcarousel('scroll', '0'); // Vai para o início
                } else {
                    carouselStage.jcarousel('scroll', '+=1'); // Rolar para a direita
                }
            },
            swipeRight: function() {
                if (carouselStage.jcarousel('target').index() === 0) {
                    carouselStage.jcarousel('scroll', '-1'); // Vai para o fim
                } else {
                    carouselStage.jcarousel('scroll', '-=1'); // Rolar para a esquerda
                }
            }
        });
    });

})(jQuery);

function pauseAndResetVideo() {
    var video = document.getElementById("video_institutional");
    video.pause();
    video.currentTime = 0;
}


// Display default para quando abre a app
var actualPage = "main_page";
$("#carousel_catalog").css("display", "none");
$("#institutional_video").css("display", "none");
$("#information_durability").css("display", "none");
$("#catalog_family").css("display", "none");
$("#main_page").css("display", "block");

// Função de clique para navegação entre as telas
document.addEventListener("click", function(e) {
    if (e.target.id === "back_main_page") {
        if (actualPage === "carousel_catalog") {
            $("#carousel_catalog").css("display", "none");
            $("#catalog_family").fadeIn(1000);
            $("#catalog_family").css("display", "flex");
            actualPage = "catalog_family";
        } else {
            if (actualPage === "institutional_video") {
                pauseAndResetVideo();
            }
            $("#carousel_catalog").css("display", "none");
            $("#institutional_video").css("display", "none");
            $("#information_durability").css("display", "none");
            $("#catalog_family").css("display", "none");
            console.log("botão de voltar clicado");
            $("#main_page").fadeIn(1000);
            $("#main_page").css("display", "block");
        }
        return; // Impede que o código abaixo seja executado
    }

    if (e.target.id === "btn_video"  || e.target.id === "btn_text_video") {
        actualPage = "institutional_video";
        $("#main_page").css("display", "none");
        $("#carousel_catalog").css("display", "none");
        $("#information_durability").css("display", "none");
        $("#catalog_family").css("display", "none");
        $("#institutional_video").fadeIn(1000);
        $("#institutional_video").css("display", "flex");
        var video = document.getElementById("video_institutional");
        video.play();
    }

    if (e.target.id === "btn_durability" || e.target.id === "btn_text_durability") {
        actualPage = "information_durability";
        $("#main_page").css("display", "none");
        $("#carousel_catalog").css("display", "none");
        $("#institutional_video").css("display", "none");
        $("#catalog_family").css("display", "none");
        $("#information_durability").fadeIn(1000);
        $("#information_durability").css("display", "flex");
    }

    if (e.target.id === "btn_family" || e.target.id === "btn_text_family") {
        actualPage = "catalog_family";
        $("#main_page").css("display", "none");
        $("#institutional_video").css("display", "none");
        $("#information_durability").css("display", "none");
        $("#carousel_catalog").css("display", "none");
        $("#catalog_family").fadeIn(1000);
        $("#catalog_family").css("display", "flex");
    }

    console.log(actualPage);
});


// Evento de clique para botões da classe button_catalog
$(document).on('click', '.button_catalog', function() {
    actualPage = "carousel_catalog";
    $("#catalog_family").css("display", "none");
    $("#carousel_catalog").fadeIn(1000);
    $("#carousel_catalog").css("display", "flex");

    var targetIndex = $(this).data('index');
    var stageCarousel = $('.carousel-stage');
    stageCarousel.jcarousel('scroll', targetIndex);
});