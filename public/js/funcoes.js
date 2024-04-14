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

    /** busca as cores das configurações */

    // $.ajax({
    //     url: `/admin/clients`,
    //     data: { }
    // }).done(function(data) {
        
    // }).fail(function(er) {
    //     console.log("funcoes.js buscar cores er: ", er);
    // });



    // .sidebar-menu i { color:<%=  colors.cor_icone_painel_lateral %> }
    // a span { color: <%= colors.cor_texto_painel_lateral %> }

});

/** Funções */

/** Abre ou fecha modal */
 function abreOuFechaModal(id_modal = null) {
    console.log("funcao abre ou fecha modal")
    if ($(id_modal).css("display") == "block") {
        $(id_modal).css("display", "none");
        limpaFormulario();
    } else {
        $(id_modal).css("display", "block");
    }
}

/** Limpa o formulário */
function limpaFormulario() {
    $("form").each (function() {
        this.reset();
    }); 
}
