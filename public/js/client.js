/**
 * Arquivo para tratar todas as funções referente a página de clientes.
 */

$(document).ready(() => {

    /** Valores padrões */

    var id_cliente_atual = $("#servico-id-cliente").val();

    /** Abre modal para criar um novo cliente */
    $("#abre-modal-novo-cliente").click(() => {
        limpaFormulario();
        removerAvisoErro();
        abreModalNovoCliente();
    });

    /** Criar um cliente */
    $("#create-client-button").click(function(ev) {
        const data = {
            nome_cliente: $("input#nome-cliente").val(),
            whatsapp_cliente: $("input#whatsapp").val(),
            email_cliente: $("input#email").val(),
            cpf_cliente: $("input#cpf").val(),
            dtcad_cliente: $("input#dtcad_cliente").val(),
            origem_cliente: $("#origem-cliente option:selected").text(),
            endereco_logradouro_cliente: $("input#endereco-cliente-logradouro").val(),
            endereco_numero_cliente: $("input#endereco-cliente-numero").val(),
            endereco_bairro_cliente: $("input#endereco-cliente-bairro").val()
        }

        if (validaCamposCliente(data) == false) return;

        const formData = new FormData();     
        const fotoFile = preparaFoto($("input#foto-cliente"));

        formData.append('foto_cliente', fotoFile);

        $("#create-client-button").prop("disabled", true);
        $("#create-client-button").css("opacity", "0.5");

        $.ajax({ url: "/admin/clients/", type: 'POST', data })
        .done(function(response) {
            // console.log("response", response);
            let classe_alerta = "";

            if (response.status == 200) {
                if (response.id) {
                    fetch(`/admin/photoclient/${response.id}`, { method: "POST", body: formData })
                    .then(response_photo => {
                        // console.log("response foto", response_photo);
                        fechaModal();
                    });
                }

                classe_alerta = "alert-success";
            } else {
                classe_alerta = "alert-error";
            }

            $("#create-client-button").prop("disabled", false);
            $("#create-client-button").css("opacity", "1");

            mensagemSucessoOuErro(classe_alerta, response);
        }).fail(function(er) {
            console.log("client.js criar cliente er: ", er);
        });
    });

    /* Atualizar um cliente */
    $("#update-client-button").click(function(e) {
        e.preventDefault();

        const data = {
            id_cliente: parseInt($("#id-cliente").text()),
            nome_cliente: $("input#nome-cliente").val(),
            whatsapp_cliente: $("input#whatsapp").val(),
            email_cliente: $("input#email").val(),
            cpf_cliente: $("input#cpf").val(),
            dtcad_cliente: $("input#dtcad_cliente").val(),
            origem_cliente: $("#origem-cliente option:selected").text(),
            endereco_logradouro_cliente: $("input#endereco-cliente-logradouro").val(),
            endereco_numero_cliente: $("input#endereco-cliente-numero").val(),
            endereco_bairro_cliente: $("input#endereco-cliente-bairro").val()
        }

        if (validaCamposCliente(data) == false) return;

        const formData = new FormData();     
        const fotoFile = preparaFoto($("input#foto-cliente"));

        formData.append('foto_cliente', fotoFile);

        $("#update-client-button").prop("disabled", true);
        $("#update-client-button").css("opacity", "0.5");

        $.ajax({ url: "/admin/clients/", type: "POST", data })
        .done(function(response) {
            // console.log("response", response);
            let classe_alerta = "";

            if (response.status == 200) {
                if (response.id) {
                    fetch(`/admin/photoclient/${response.id}`, { method: "POST", body: formData })
                    .then(response_photo => {
                        // console.log("response foto", response_photo);
                        fechaModal();
                    });
                }

                classe_alerta = "alert-success";
            } else {
                classe_alerta = "alert-error";
            }

            $("#update-client-button").prop("disabled", false);
            $("#update-client-button").css("opacity", "1");

            mensagemSucessoOuErro(classe_alerta, response);
        }).fail(function(er) {
            console.log("client.js atualizar cliente er: ", er);
        });
    });

    /* Deletar um cliente */
    $("#delete-client-button").click(function(e) {
        deletaCliente(parseInt($("#id-cliente")[0].innerText));
    });

    $(".td-acoes-deleta-cliente").click(() => {
        abreModalConfirmacaoExcluirCliente();
    });

    /** Cria máscara para o campo do WhatsApp */
    $("#whatsapp input").on("input", (ent) => {
        let valor = ent.target.value.replace(/\D/g, "");
        let valor_formatado = '';

        if (valor.length > 0) {
            valor_formatado = '(' + valor.substring(0, 2); // Adiciona (XX)
            if (valor.length > 2) {
                valor_formatado += ') ' + valor.substring(2, 7); // Adiciona XXXX
            }
            if (valor.length > 7) {
                valor_formatado += '-' + valor.substring(7, 11); // Adiciona XXXX
            }
        }

        $("#whatsapp input").val(valor_formatado); // Atualiza o valor do input com a máscara
    });

    /** Cria máscara para o campo do CPF */
    $("#cpf input").on("input", (ent) => {
        let valor = ent.target.value.replace(/\D/g, "");
        let valor_formatado = '';

        if (valor.length > 0) {
            valor_formatado = valor.substring(0, 3);

        if (valor.length > 3) {
            valor_formatado += '.' + valor.substring(3, 6);
        }

        if (valor.length > 6) {
            valor_formatado += '.' + valor.substring(6, 9);
        }

        if (valor.length > 9) {
            valor_formatado += '-' + valor.substring(9, 11);
        }
        }
        $("#cpf input").val(valor_formatado);
    });

    /** Carrega preview da foto do cliente */
    $("#foto-cliente").on("change", (ev) => {
        let img = ev.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () =>{
            $("#image-preview").attr("src", reader.result);
        }
        reader.readAsDataURL(img);
    });
});

/** Funções */

function validaCamposCliente(data) {
    removerAvisoErro();
    let tem_erro = false;

    const nome_cliente = data.nome_cliente;
    const whatsapp_cliente = data.whatsapp_cliente;
    const origem_cliente = data.origem_cliente;

    if (nome_cliente.trim() === "") {
        tem_erro = true;
        notificaCampoErro("O nome do cliente é obrigatório. ", "nome-cliente");
    }

    if (whatsapp_cliente.trim().length < 15) {
        notificaCampoErro("Parece que falta algum dígito para o WhatsApp.", "whatsapp");
        tem_erro = true;
    }

    if (whatsapp_cliente.trim() === "") {
        notificaCampoErro("O WhatsApp do cliente é obrigatório.", "whatsapp");
        tem_erro = true;
    }

    if (origem_cliente == "" || origem_cliente == "Selecione") {
        notificaCampoErro("Por favor, responda como este cliente chegou a você. ", "form-origin");
        tem_erro = true;
    }

    if (tem_erro) return false;
    return true;
}

function abreModalNovoCliente() {
    $("#modal-novo-cliente").css("display", "block");
    $(".modal .data-image-upload img").attr("src", "/img/no-photo.jpg");
}

function abreModalConfirmacaoExcluirCliente() {
    $("#modal-confirmacao-excluir-cliente").css("display", "block");
}

function deletaCliente(id) {
    // e.preventDefault();
    console.log('id ', id)
    // id =  $("form input#id").val();
    // $.ajax({
    //     url: `/admin/clients/${id}`,
    //     type: "POST",
    //     data: { id: id },
    // }).done(function(data) {
    //     // console.log("data", data);
    //     $("p.alert").text(data.message).addClass("alert-success");
    //     setTimeout(() => {
    //         $("p.alert").fadeOut(500);
    //     }, 3000);
    // }).fail(function(er) {
    //     console.log("client.js deletar cliente er: ", er);
    // });
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