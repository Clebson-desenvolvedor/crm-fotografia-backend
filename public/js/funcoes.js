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

    /** Verifica se existe alguma modal aberta e a fecha */
    window.onclick = function (event) {
        if (event.target.className == "modal") {
            $(".modal").css("display", "none");
        }
    }

    /** Cancela alguma ação na modal, botão Não */
    $("#confirmacao-excluir-acoes-nao").click(() => {
        fechaModal();
    });

    $("span.logout").click(function() {
        sessionStorage.clear();
        window.location.assign("/admin/login");
    });

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

/** Fecha a modal */
function fechaModal() {
    $(".modal").css("display", "none");
}

/** Limpa o formulário */
function limpaFormulario() {
    $("form").each (function() {
        this.reset();
    }); 
}
