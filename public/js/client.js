/**
 * Arquivo para tratar todas as funções referente a página de clientes.
 */

$(document).ready(() => {

    /** Valores padrões */
    $("#servico-tipo").text(0);
    $("#create-service-client-button").attr("disabled", true).css("opacity", 0.5);
    var id_cliente_atual = $("#servico-id-cliente").val();

    if ($(".cards").children().length == 0) {
        $(".cards").append("<p>Nenhum Cliente cadastrado ainda.</p>")
    }

    /** Abre modal para criar um novo cliente */
    $("#abre-modal-novo-cliente").click(() => {
        limpaFormulario();
        removerAvisoErro();
        abreModalNovoCliente();
    });

    /** Abre modal para criar um novo serviço a partir do painel de ações */
    $("#abre-modal-novo-servico").click(() => {
        limpaFormulario();
        abreModalNovoServico();
    });

    /** Abre modal para criar um novo lead */
    $("#abre-modal-novo-lead").click(() => {
        limpaFormulario();
        abreModalNovoLead();
        $(".modal .data-image-upload img").attr("src", "/img/no-photo.jpg");
    });

    /** Criar um cliente */
    $("#create-client-button").click(function(ev) {
        const data = {
            nome_cliente: $("input#nome-cliente").val(),
            whatsapp_cliente: $("input#whatsapp").val(),
            email_cliente: $("input#email").val(),
            cpf_cliente: $("input#cpf").val(),
            dtcad_cliente: $("input#dtcad_cliente").val(),
            origem_cliente: $("select#origem-cliente option:selected").val(),
            endereco_logradouro_cliente: $("input#endereco-cliente-logradouro").val(),
            endereco_numero_cliente: $("input#endereco-cliente-numero").val(),
            endereco_bairro_cliente: $("input#endereco-cliente-bairro").val()
        }

        if (validaCamposCliente(data) == false) {
            return;
        }

        const formData = new FormData();     

        const fotoFile = preparaFoto($("input#foto-cliente"));
        formData.append('foto_cliente', fotoFile);

        $("#create-client-button").prop("disabled", true);
        $("#create-client-button").css("opacity", "0.5");
        $.ajax({
            url: "/admin/clients/",
            type: 'POST',
            data: data,
        }).done(function(response) {
            // console.log("response", response);
            if (response.status == 200) {
                if (response.id) {
                    fetch(`/admin/photoclient/${response.id}`, {
                        method: "POST",
                        body: formData
                    }).then(response_photo => {
                        // console.log("response foto", response_photo);
                        $("#create-client-button").prop("disabled", false);
                        $("#create-client-button").css("opacity", "1");
                        fechaModal();
                        mensagemSucessoOuErro("alert-success", response);
                    });
                }
            } else {
                $("#create-client-button").prop("disabled", false);
                $("#create-client-button").css("opacity", "1");
                mensagemSucessoOuErro("alert-error", response);
            }
        }).fail(function(er) {
            console.log("client.js criar cliente er: ", er);
        });
    });

    /* Atualizar um cliente */
    $("#update-client-button").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/admin/clients/",
            type: "POST",
            data: {
                id_cliente: $("form input#id").val(),
                nome_cliente: $("form input#name").val(),
                whatsapp_cliente: $("form input#whatsapp").val(),
                email_cliente: $("form input#email").val(),
                cpf_cliente: $("form input#cpf").val(),
                dtcad_cliente: $("form input#date").val(),
                endereco_logradouro: $("form input#street").val(),
                endereco_numero: $("form input#number").val(),
                endereco_bairro: $("form input#district").val(),
                foto_cliente: $("form input#image").val() //precisará consertar futuramente, pois não está salvando a imagem selecionada na base
             },
        }).done(function(data) {
            // console.log("data", data);
            $("p.alert").text(data.message).addClass("alert-success");
            setTimeout(() => {
                $("p.alert").fadeOut(500);
            }, 3000);
        }).fail(function(er) {
            console.log("client.js atualizar cliente er: ", er);
        });
    });

    /* Deletar um cliente */
    $("#delete-client-button").click(function(e) {
        deletaCliente(parseInt($("#id-cliente")[0].innerText));
    });

    /* Abre a modal de adicionar serviço a partir de um cliente específico e carregar o nome dele */
    $("#add-service-client-button").click(function() {
        abreModalNovoServico();
    });

    /* Carrega o formulário de um serviço de acordo com o tipo de serviço escolhido */
    $("#select-service").on("change", function() {
        removerAvisoErro();
        let servico_selecionado = $("#select-service option:selected").val();
        if (servico_selecionado == "Acompanhamento") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposServicoBebe);
            $("#servico-tipo").text(1);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Casamento Civil") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposCasamentoCivil);
            $("#servico-tipo").text(2);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Casamento na Igreja") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposCasamentoIgreja);
            $("#servico-tipo").text(3);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Ensaio Gestante") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposEnsaioGestante);
            $("#servico-tipo").text(4);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Ensaio Infantil") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposEnsaioInfantil);
            $("#servico-tipo").text(5);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Newborn") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposServicoBebe);
            $("#servico-tipo").text(6);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Prewedding") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposPrewedding);
            $("#servico-tipo").text(7);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Festa Infantil") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposFestaInfantil);
            $("#servico-tipo").text(8);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Smash The Cake") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposServicoBebe);
            $("#servico-tipo").text(9);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Corporativo") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposCorporativo);
            $("#servico-tipo").text(10);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Ensaio Feminino") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposEnsaioFeminino);
            $("#servico-tipo").text(11);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else if (servico_selecionado == "Ensaio Família") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposEnsaioFamilia);
            $("#servico-tipo").text(12);
            $("#create-service-client-button").attr("disabled", false).css("opacity", 1);
        } else {
            limpaFormulario("#form-service-selected");
            $(".fechar-campo").slideUp(300);
            $("#servico-tipo").text(0);
            $("#create-service-client-button").attr("disabled", true).css("opacity", 0.5);
        }
    });

    /** Habilita ou desabilita os campos do endereço da recepção. */
    $("#recepcao").on("change", function() {
        if ($("#recepcao").is(":checked")) {
            $("#endereco-recepcao").css("display", "flex");
        } else {
            $("#endereco-recepcao").css("display", "none");
        }
    });

    /** Habilita ou desabilita os campos do endereço do Dia da Noiva. */
    $("#dia-noiva").on("change", function() {
        if ($("#dia-noiva").is(":checked")) {
            $("#endereco-dia-noiva").css("display", "flex");
        } else {
            $("#endereco-dia-noiva").css("display", "none");
        }
    });

    /** Cria o serviço de um cliente específico e salva na base */
    $("#create-service-client-button").click(function(e) {
        e.preventDefault();

        const campos = {
            servico_tipo: parseInt($("form#form-service-selected input#servico-tipo").text()),
            ambiente_servico: $("form#form-service-selected input#ambiente-servico-id").val(),
            dt_servico: $("form#form-service-selected input#dt-servico").val(),
            preco_total: parseFloat($("form#form-service-selected input#preco-total").val()).toFixed(2) != NaN ? parseFloat($("form#form-service-selected input#preco-total").val()).toFixed(2) : 0,
            preco_entrada: parseFloat($("form#form-service-selected input#preco-entrada").val()).toFixed(2) != NaN ? parseFloat($("form#form-service-selected input#preco-entrada").val()).toFixed(2) : 0,
            status_servico: $("form#form-service-selected select#status-servico-id").val(),
            nome_bebe: $("form#form-service-selected input#nome-bebe").val(),
            dt_nasc_bebe: $("form#form-service-selected input#dt-nasc-bebe").val(),
            sexo_bebe: $("input#sexo-bebe-m:checked").length == 1 ? "M" : $("input#sexo-bebe-f:checked").length == 1 ? "F" : "",
            cenario: $("form#form-service-selected input#cenario").val(),
            nome_noivos: $("form#form-service-selected input#nomes-noivos").val(),
            nome_crianca: $("form#form-service-selected input#nome-da-crianca").val(),
            dt_nasc_crianca: $("form#form-service-selected input#dt-nasc-crianca").val(),
            enderecos: [],
            profissao: $("form#form-service-selected input#profissao").val(),
            servico_id_cliente: parseInt(id_cliente_atual)
        }

        if ($("#endereco-evento-logradouro").val().length > 0) {
            campos.enderecos.push({
                endereco_tipo: "evento",
                endereco_logradouro: $("#endereco-evento-logradouro").val(),
                endereco_numero: $("#endereco-evento-numero").val(),
                endereco_bairro: $("#endereco-evento-bairro").val()
            });
        }

        if ($("input#recepcao:checked").length == 1 && $("#endereco-recepcao-logradouro").val().length > 0) {
            campos.enderecos.push({
                endereco_tipo: "recepcao",
                endereco_logradouro: $("#endereco-recepcao-logradouro").val(),
                endereco_numero: $("#endereco-recepcao-numero").val(),
                endereco_bairro: $("#endereco-recepcao-bairro").val()
            });
        }

        if ($("input#dia-noiva:checked").length == 1 && $("#endereco-dia-noiva-logradouro").val().length > 0) {
            campos.enderecos.push({
                endereco_tipo: "dia_noiva",
                endereco_logradouro: $("#endereco-dia-noiva-logradouro").val(),
                endereco_numero: $("#endereco-dia-noiva-numero").val(),
                endereco_bairro: $("#endereco-dia-noiva-bairro").val()
            });
        }

        let data = criaDataServico(campos);

        if (validaCamposServicos(data) == false) {
            return;
        }

        $("#create-service-client-button").prop("disabled", true);
        $("#create-service-client-button").css("opacity", "0.5");

        $.ajax({
            url: "/admin/services/",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function(response) {
            if (response.status == 200) {
                $("#create-service-client-button").prop("disabled", false);
                $("#create-service-client-button").css("opacity", "1");
                fechaModal();
                mensagemSucessoOuErro("alert-success", response);
            } else {
                $("#create-service-client-button").prop("disabled", false);
                $("#create-service-client-button").css("opacity", "1");
                mensagemSucessoOuErro("alert-error", response);
            }
        }).fail(function(er) {
            console.log(er)
        });
    })

    $(".clear-cancel").click(limpaFormulario);

    $(".td-acoes-deleta-cliente").click(() => {
        abreModalConfirmacaoExcluirCliente();
    });

    /** Abre a modal de criar novo cliente a partir de um cliente específico */
    $(".td-acoes-cria-servico-cliente").click((e) => {
        let tr = e.target.closest("tr");
        let cliente = {
            nome: $(tr).find("td#nome-cliente")[0].innerText,
            id: $(tr).find("td#id-cliente")[0].innerText
        }
        id_cliente_atual = cliente.id
        abreModalNovoServico(cliente);
    });

    $("#confirmacao-excluir-acoes-sim").click(() => {

    });

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

    $("#foto-cliente").on("change", (ev) => {
        let img = ev.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () =>{
            $("#image-preview").attr("src", reader.result);
        }
        reader.readAsDataURL(img);
    });

    $(document).on("change", "select#select-cliente", () => {
        const nome_cliente = $("select#select-cliente option:selected").text();
        id_cliente_atual = $("select#select-cliente option:selected").val();
        $("#servico-nome-cliente").text(nome_cliente);
    });
});

/** Funções */

/** Fecha todos os campos do formulário de serviço */
function fechaCamposFormulario(callback) {
    $(".fechar-campo").slideUp(300);
    setTimeout(() => {
        callback();
    }, 320);
}

function carregaCamposPadrao() {
    $("#dt-servico").css("display", "flex");
    $("#preco-total").css("display", "flex");
    $("#preco-entrada").css("display", "flex");
    $("#status-servico").css("display", "flex");
}

function carregaCamposServicoBebe() {
    $("#ambiente-servico-id").val("estúdio");
    carregaCamposPadrao();
    $("#nome-bebe").css("display", "flex");
    $("#dt-nasc-bebe").css("display", "flex");
    $("#sexo-bebe").css("display", "flex");
    $("#cenario").css("display", "flex");
}

function carregaCamposCasamentoCivil() {
    $("#ambiente-servico-id").val("fora");
    carregaCamposPadrao();
    $("#nomes-noivos").css("display", "flex");
    $("#endereco-evento").css("display", "flex");
    $("#endereco-evento-dados").css("display", "flex");
}

function carregaCamposCasamentoIgreja() {
    carregaCamposCasamentoCivil();
    $("#campos-casamento").css("display", "flex");
}

function carregaCamposEnsaioGestante() {
    $("#ambiente-servico-id").val("estúdio");
    carregaCamposPadrao();
}

function carregaCamposEnsaioInfantil() {
    $("#ambiente-servico-id").val("estúdio");
    carregaCamposPadrao();
    $("#nome-da-crianca").css("display", "flex");
    $("#dt-nasc-crianca").css("display", "flex");
}

function carregaCamposPrewedding() {
    $("#ambiente-servico-id").val("fora");
    carregaCamposPadrao();
    $("#nomes-noivos").css("display", "flex");
    $("#endereco-evento").css("display", "flex");
}

function carregaCamposFestaInfantil() {
    $("#ambiente-servico-id").val("fora");
    carregaCamposPadrao();
    $("#nome-da-crianca").css("display", "flex");
    $("#endereco-evento").css("display", "flex");
}

function carregaCamposCorporativo() {
    $("#ambiente-servico-id").val("estúdio");
    carregaCamposPadrao();
    $("#campo-profissao").css("display", "flex");
}

function carregaCamposEnsaioFeminino() {
    $("#ambiente-servico-id").val("estúdio");
    carregaCamposPadrao();
}

function carregaCamposEnsaioFamilia() {
    $("#ambiente-servico-id").val("estúdio");
    carregaCamposPadrao();
}

function criaDataServico(campos) {
    let data = {
        servico_tipo: campos.servico_tipo,
        ambiente_servico: campos.ambiente_servico,
        dt_servico: campos.dt_servico,
        preco_total: campos.preco_total,
        preco_entrada: campos.preco_entrada,
        status_servico: campos.status_servico,
        servico_id_cliente: campos.servico_id_cliente
    }
    switch (campos.servico_tipo) {
        case 1: // Acompanhamento
            data.nome_bebe = campos.nome_bebe; 
            data.dt_nasc_bebe = campos.dt_nasc_bebe;
            data.sexo_bebe = campos.sexo_bebe;
            data.cenario = campos.cenario;
            break;
        case 2: // Casamento Civil
            data.nome_noivos = campos.nome_noivos;
            data.enderecos = campos.enderecos;
            break;
        case 3: // Casamento na Igreja
            data.nome_noivos = campos.nome_noivos;
            data.enderecos = campos.enderecos;
            break;
        case 5: // Ensaio Infantil
            data.nome_crianca = campos.nome_crianca;
            data.dt_nasc_crianca = campos.dt_nasc_crianca;
            break;
        case 6: // Newborn
            data.nome_bebe = campos.nome_bebe;
            data.sexo_bebe = campos.sexo_bebe;
            data.cenario = campos.cenario;
            break;
        case 7: // Prewedding
            data.nome_noivos = campos.nome_noivos;
            data.enderecos = campos.enderecos;
            break;
        case 8: // Festa Infantil
            data.nome_crianca = campos.nome_crianca;
            data.enderecos = campos.enderecos;
            break;
        case 9: // Smash The Cake
            data.nome_bebe = campos.nome_bebe;
            data.dt_nasc_bebe = campos.dt_nasc_bebe;
            data.sexo_bebe = campos.sexo_bebe;
            data.cenario = campos.cenario;
            break;
        case 10: // Corporativo
            data.profissao = campos.profissao;
            break;
        default:
            // Gestante, Ensaio Feminino e Ensaio Família
            return data;
    }
    return data;
}

function validaCamposServicos(data) {
    removerAvisoErro();
    const validacao_nome_e_sexo_bebe = [1, 6, 9];
    const validacao_nomes_noivos = [2, 3, 7];
    const validacao_nome_crianca = [5, 8];
    let tem_erro = false;

    if (validacao_nome_e_sexo_bebe.includes(data.servico_tipo)) {
        if (data.nome_bebe == "") {
            tem_erro = true;
            notificaCampoErro("O nome do bebê é obrigatório. ", "nome-bebe");
        }
        if (data.sexo_bebe == "") {
            tem_erro = true;
            notificaCampoErro("O sexo do bebê é obrigarório. ", "sexo-bebe");
        }
    } else if (validacao_nomes_noivos.includes(data.servico_tipo)) {
        if (data.nome_noivos == "") {
            notificaCampoErro("O nome dos noivos é obrigatório. ", "nomes-noivos");
        }
    } else if (validacao_nome_crianca.includes(data.servico_tipo)) {
        if (data.nome_crianca == "") {
            tem_erro = true;
            notificaCampoErro("O nome da criança é obrigatório. ", "nome-da-crianca");
        }
    }

    if (data.dt_servico == "") {
        tem_erro = true;
        notificaCampoErro("A data do evento precisa ser definida. ", "dt-servico");
    }

    if (tem_erro) return false;
    return true;
}

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

function notificaCampoErro(mensagem_erro, id) {
    // $(`input#${id}`).css("border", "1px solid red");
    $(`input#${id}`).addClass("input-erro");
    $(`div#${id} .mensagem-erro span`).text(mensagem_erro);
}

function abreModalNovoLead() {
    $("#modal-novo-lead").css("display", "block");
}

function removerAvisoErro() {
    $(".mensagem-erro span").text("");
    $(".form").find(".input-erro").removeClass("input-erro");
}

async function abreModalNovoServico(cliente = {}) {
    $("div.select-cliente").empty();
    if (cliente.nome) {
        $("#modal-novo-servico").css("display", "block");
        $("#servico-nome-cliente").text(cliente.nome);
        $("#servico-id-cliente").text(cliente.id);
        $("div.select-cliente").empty();
    } else {
        $("#servico-nome-cliente").text("");
        $("#servico-id-cliente").text("");
        const clientes = await buscaNomesClientes();
        
        if (clientes.length > 0) {
            $("#modal-novo-servico").css("display", "block");
            $("div.select-cliente").append(`
                <label for="">Atribuir este serviço para </label>
                <select name="select-cliente" id="select-cliente" required>
                    <option value="">Selecione</option>
                </select>
            `);

            for (const ct in clientes) {
                let id = clientes[ct].id_cliente;
                let nome = clientes[ct].nome_cliente
                $("select#select-cliente").append(`<option value="${id}">${nome}</option>`);
            }
            
        } else {
            abreModalAviso("Aviso", "Voce só pode criar serviço se ter ao menos um cliente");
        }
        
    }
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

window.addEventListener('load', function() {
    verificaImagemInvalida();
});