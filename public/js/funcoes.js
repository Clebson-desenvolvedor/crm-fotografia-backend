/** Abre ou fecha modal */
 function abreOuFechaModal() {
    if ($('.modal').css('display') == 'block') {
        $('.modal').css('display', 'none');
        limpaFormulario();
    } else {
        $('.modal').css('display', 'block');
    }
}

/** Chama a função de abrir ou fechar modal */
window.onclick = function (event) {
    if (event.target.className == 'modal') {
        abreOuFechaModal();
    }
}

/** Limpa o formulário através do Id do formulário */
function limpaFormulario(form_id) {
    $('form' + form_id).each (function() {
        this.reset();
    }); 
}

function abreMenu() {
    $("main").css("opacity", "0.2");
    $(".main-galery").css("opacity", "0.2");
    $(".about").css("opacity", "0.2");
    $(".main-blog").css("opacity", "0.2");
    $(".nav-list li").css("opacity", "1");
    $(".mobile-menu").addClass("active");
}

function fechaMenu() {
    $("main").css("opacity", "1");
    $(".main-galery").css("opacity", "1");
    $(".about").css("opacity", "1");
    $(".main-blog").css("opacity", "1");
    $(".nav-list li").css("opacity", "0");
    $(".mobile-menu").removeClass("active");
}

$(document).ready(() => {
    $(".mobile-menu").click((i, el) => {
        console.log("this", $(el).hasClass("active"))
        if ($(".mobile-menu").hasClass("active")) {
            fechaMenu();
        } else {
            abreMenu();
        }
    });
});