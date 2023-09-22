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
        mainPageButtonFamily: "Bouchons Viva",

        titlePageVideo: "Vidéo",
        titlePageDurability: "Durabilité",
        titlePageFamily: "Bouchons Viva",

    },
    en: {
        mainPageButtonVideo: "Video",
        mainPageButtonDurability: "Durability",
        mainPageButtonFamily: "Vivo Family", // depois modificar para o inglês

        titlePageVideo: "Video",
        titlePageDurability: "Durability",
        titlePageFamily: "Vivo Family" // depois modificar para o inglês
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

// function to pause and reset video
function pauseAndResetVideo() {
    var video = document.getElementById("video_institutional");
    video.pause();
    video.currentTime = 0;
}

// Função para rolar suavemente de volta ao topo ao sair da página
function scrollToTop(containerId) {
    var container = document.getElementById(containerId);

    if (container) {
        container.scrollTop = 0;
    }
}

// Função para rolar suavemente ao clicar no botão "voltar ao topo"
function scrollToTopSmooth(containerId) {
    var container = document.getElementById(containerId);
    var initialScrollTop = container.scrollTop;
    var startTime = null;
    var duration = 300; // Duração da animação em milissegundos

    function animateScroll(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }

        var elapsedTime = currentTime - startTime;
        var easing = easeInOutQuad(elapsedTime, 0, 1, duration); // Easing function (veja abaixo)

        container.scrollTop = initialScrollTop - initialScrollTop * easing;

        if (elapsedTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}


// Função de interpolação (easing function) para scroll suave
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}


// Função para criar um botão "Voltar ao Topo" e configurar o comportamento suave de rolagem
function createScrollToTopButton(item) {
    const containerId = item.id;
    const container = document.getElementById(containerId);

    // Verifique se o contêiner existe
    if (!container) {
        return;
    }

    // Crie um novo elemento de botão
    const button = document.createElement('div');
    button.classList.add('scroll-to-top');
    button.innerHTML = '<img src="./img/icons8-collapse-arrow-100.png" alt="" class="scroll-to-top-button">';
    
    // Adicione o botão ao contêiner
    container.appendChild(button);

    // Adicione um ouvinte de evento de clique ao botão para rolagem suave
    button.addEventListener('click', function () {
        scrollToTopSmooth(containerId);
    });

    // Adicione um ouvinte de evento de rolagem ao contêiner para mostrar/ocultar o botão
    container.addEventListener('scroll', function () {
        if (container.scrollTop > 100) {
            $(button).fadeIn(1000);
            button.style.display = 'flex';
        } else {
            $(button).fadeOut("slow", function() {
                button.style.display = 'none';
            });
        }
    });
}

// aplicando a função para o contêiner de rolagem da seção de durabilidade
createScrollToTopButton(document.getElementById('scroll_container_durability'));


// Selecione todos os itens da lista de navegação com a classe 'scrollable-item'
const scrollableItems = document.querySelectorAll('.scrollable-item');

// Crie um botão "Voltar ao Topo" para cada item da lista de navegação
scrollableItems.forEach(function (item) {
    createScrollToTopButton(item);
});

var inactivityTimer; // Variável para armazenar o temporizador de inatividade
var inactivityTimeout = 600000; // Tempo limite de inatividade em milissegundos (5 minutos)

// Função para iniciar o temporizador de inatividade
function startInactivityTimer() {
    // Limpa o temporizador se já estiver em execução
    clearTimeout(inactivityTimer);
    // Define um novo temporizador de inatividade
    inactivityTimer = setTimeout(function() {
        // Redirecione para a página inicial após o tempo limite de inatividade
        redirectToMainPage();
    }, inactivityTimeout);
}

// Evento de clique no body (ou em outro elemento comum a todas as páginas)
document.body.addEventListener("click", function() {
    // Reinicie o temporizador de inatividade quando houver interação do usuário
    startInactivityTimer();
});

startInactivityTimer();

// Função para redirecionar para a página inicial
function redirectToMainPage() {
    actualPage = "main_page";
    // Adicione aqui o código para ocultar as páginas atuais e mostrar a página inicial
    $("#carousel_catalog").css("display", "none");
    $("#institutional_video").css("display", "none");
    $("#information_durability").css("display", "none");
    $("#catalog_family").css("display", "none");
    $("#main_page").fadeIn(1000);
    $("#main_page").css("display", "block");
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
    const timeAnimation = 800;
    if (e.target.id === "back_main_page") {
        if (actualPage === "carousel_catalog") {
            scrollToTop("scroll_container_navigation_1");
            scrollToTop("scroll_container_navigation_2");
            scrollToTop("scroll_container_navigation_3");
            scrollToTop("scroll_container_navigation_4");
            scrollToTop("scroll_container_navigation_5");

            $("#carousel_catalog").css("display", "none");
            $("#catalog_family").fadeIn(1000);
            $("#catalog_family").css("display", "flex");
            actualPage = "catalog_family";
        } else {
            if (actualPage === "institutional_video") {
                pauseAndResetVideo();
            }

            if (actualPage === "information_durability") {
                scrollToTop("scroll_container_durability");
                console.log("scroll to top");
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
        const btnVideo = document.getElementById("btn_video");
        btnVideo.classList.add("animate__animated", "animate__pulse");
        setTimeout(function () {
            btnVideo.classList.remove("animate__animated", "animate__pulse");
            actualPage = "institutional_video";
            $("#main_page").css("display", "none");
            $("#carousel_catalog").css("display", "none");
            $("#information_durability").css("display", "none");
            $("#catalog_family").css("display", "none");
            $("#institutional_video").fadeIn(1000);
            $("#institutional_video").css("display", "flex");
            var video = document.getElementById("video_institutional");
            video.play();
        }, timeAnimation);
    }

    if (e.target.id === "btn_durability" || e.target.id === "btn_text_durability") {
        const btnDurability = document.getElementById("btn_durability");
        btnDurability.classList.add("animate__animated", "animate__pulse");
        setTimeout(function () {
            btnDurability.classList.remove("animate__animated", "animate__pulse");
            actualPage = "information_durability";
            $("#main_page").css("display", "none");
            $("#carousel_catalog").css("display", "none");
            $("#institutional_video").css("display", "none");
            $("#catalog_family").css("display", "none");
            $("#information_durability").fadeIn(1000);
            $("#information_durability").css("display", "flex");
        }, timeAnimation);
    }

    if (e.target.id === "btn_family" || e.target.id === "btn_text_family") {
        const btnFamily = document.getElementById("btn_family");
        btnFamily.classList.add("animate__animated", "animate__pulse");
        setTimeout(function () {
            btnFamily.classList.remove("animate__animated", "animate__pulse");
            actualPage = "catalog_family";
            $("#main_page").css("display", "none");
            $("#institutional_video").css("display", "none");
            $("#information_durability").css("display", "none");
            $("#carousel_catalog").css("display", "none");
            $("#catalog_family").fadeIn(1000);
            $("#catalog_family").css("display", "flex");
        }, timeAnimation);
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