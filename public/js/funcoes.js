/**
 * Arquivo funcoes.js, responsvável por ações e estilizações e comportamento dos arquivos
 * da pasta view e inc de modo geral.
 */

/** Eventos */
$(document).ready(() => {

    /** Pega o alvo do click e se for na classe modal, a fecha */
    window.onclick = function (event) {
        if (event.target.className == "modal") {
            $(".modal").css("display", "none");
        }
    }

    /** Cancela alguma ação na modal, botão Não */
    $("#confirmacao-excluir-acoes-nao").click(() => {
        fechaModal();
    });

    $("#modal-aviso-ok").click(() => {
        fechaModal();
    });

    $("span.logout").click(function() {
        sessionStorage.clear();
        window.location.assign("/admin/login");
    });

    
    /** Busca as cores das preferências */
    $.ajax({
        url: `/admin/colors`,
        type: "GET"
    }).done(function(cores) {
        // console.log("cores", cores)
        $(".primaria").css("background-color", cores.cor_primaria);
    }).fail(function(er) {
        console.log("funcoes.js buscar cores error: ", er);
    });
});

/** Funções */

/** Fecha a modal */
function fechaModal() {
    $(".modal").css("display", "none");
}

function abreModalAviso(titulo, aviso) {
    $("#modal-aviso").css("display", "block");
    $(".modal-aviso-header h2").text(titulo);
    $(".modal-aviso-texto p").text(aviso);
}

/** Limpa o formulário */
function limpaFormulario() {
    $("form").each (function() {
        this.reset();
    }); 
}

async function buscaNomesClientes() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/admin/nomesclientes`,
            type: "GET"
        }).done(function(clientes) {
            // console.log("clientes", clientes);
            resolve(clientes);
        }).fail(function(er) {
            console.log("funcoes.js buscar nome dos clientes fail: ", er);
            reject(er);
        });
    });
}
