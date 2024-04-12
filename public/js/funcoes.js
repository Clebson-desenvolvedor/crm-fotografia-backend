/**
 * Arquivo funcoes.js, responsvável por ações e estilizações e comportamento dos arquivos
 * da pasta view e inc de modo geral.
 */

/** Eventos */
$(document).ready(() => {

    $(window).on("load", () => {
        setTimeout(() => {
            $(window).scrollTop(0);
        }, 1);
    });

    /** Chama a função de abrir ou fechar modal */
    window.onclick = function (event) {
        if (event.target.className == "modal") {
            abreOuFechaModal();
        }
    }
});

/** Funções */

/** Abre ou fecha modal */
 function abreOuFechaModal() {
    if ($(".modal").css("display") == "block") {
        $(".modal").css("display", "none");
        limpaFormulario();
    } else {
        $(".modal").css("display", "block");
    }
}

/** Limpa o formulário */
function limpaFormulario() {
    $("form").each (function() {
        this.reset();
    }); 
}
