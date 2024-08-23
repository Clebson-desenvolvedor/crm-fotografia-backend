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
        $.ajax({
            url: `/admin/logout`,
            type: "POST"
        }).done(function(response) {
            window.location.assign("/admin/login");
        }).fail(function(er) {
            console.log("funcoes.js logout error: ", er);
        });
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

    $(".clear-cancel").click(limpaFormulario);

    $("#confirmacao-excluir-acoes-sim").click(() => {

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

/** Limpa o formulário atual */
function limpaFormulario() {
    $(".form input").each((i, el) => {
        $(el).val("");
    })
}

function mensagemSucessoOuErro(tipo_classe, data) {
    if (tipo_classe == "alert-success" || tipo_classe == "alert-error") {
        $(".alert").addClass(tipo_classe).fadeIn(600).find("p").text(data.message);
        setTimeout(() => {
            $(".alert").fadeOut(300);
        }, 3000);
    } else {
        console.error("A classe recebida como parâmetro para a função mensagemSucessoOuErro é inválida. ");
    }
}

function preparaFoto(input) {
    return input[0].files[0];
}

function verificaImagemInvalida() {
    $('tr img').each((i, img) => {
        fetch(img.src).then(function(response) {
            if (response.ok == false) {
                $(img).attr("src", "/img/no-photo.jpg");
            }
        }).catch(function(error) {
            console.log('URL de imagem inválida. error:', error);
        });
    });
}

function notificaCampoErro(mensagem_erro, id) {
    $(`input#${id}`).addClass("input-erro");
    $(`div#${id} .mensagem-erro span`).text(mensagem_erro);
}

function removerAvisoErro() {
    $(".mensagem-erro span").text("");
    $(".form").find(".input-erro").removeClass("input-erro");
}

window.addEventListener('load', function() {
    verificaImagemInvalida();
});

