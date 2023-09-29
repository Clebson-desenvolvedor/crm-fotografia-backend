/**
 * Arquivo para tratar todas as funções referente a página de clientes.
 */


/** Eventos */
$(document).ready(() => {

    /* Evento para atualizar um cliente */
    $('#update-client-button').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/admin/clients/',
            type: 'POST',
            data: {
                id_cliente: $('form input#id')[0].value,
                nome_cliente: $('form input#name')[0].value,
                whatsapp_cliente: $('form input#whatsapp')[0].value,
                email_cliente: $('form input#email')[0].value,
                cpf_cliente: $('form input#cpf')[0].value,
                dtcad_cliente: $('form input#date')[0].value,
                endereco_logradouro: $('form input#street')[0].value,
                endereco_numero: $('form input#number')[0].value,
                endereco_bairro: $('form input#district')[0].value,
                foto_cliente: $('form input#image')[0].value//precisará consertar futuramente, pois não está salvando a imagem selecionada na base
             },
        }).done(function(data) {
            // console.log('data', data);
            $('p.alert').text(data.message).addClass('alert-success');
            setTimeout(() => {
                $('p.alert').fadeOut(500);
            }, 3000);
        }).fail(function(er) {
            console.log(er)
        });
    });

    /* Evento para deletar um cliente */
    $('#delete-client-button').click(function(e) {
        id =  $('form input#id')[0].value;
        $.ajax({
            url: `/admin/clients/${id}`,
            type: 'POST',
            data: { id: id },
        }).done(function(data) {
            // console.log('data', data);
            $('p.alert').text(data.message).addClass('alert-success');
            setTimeout(() => {
                $('p.alert').fadeOut(500);
            }, 3000);
        }).fail(function(er) {
            console.log(er)
        })
    });

    /* Evento para abrir a modal de criar serviço a partir de um cliente específico e carregar o nome dele */
    $("#create-service-client-button").click(function() {
        $(".modal").css("display", "block");
        $("#form-service-selected h2").text($("input#name").val());
    })

    /* Evento para carregar formulário de um serviço de acordo com o tipo de serviço escolhido */
    $('#select-service').on('change', function() {
        let servico_selecionado = $('#select-service option:selected').val();
        if (servico_selecionado == "Acompanhamento") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposServicoBebe);
            $("#servico-tipo").text(1);
        } else if (servico_selecionado == "Casamento Civil") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposCasamentoCivil);
            $("#servico-tipo").text(2);
        } else if (servico_selecionado == "Casamento na Igreja") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposCasamentoIgreja);
            $("#servico-tipo").text(3);
        } else if (servico_selecionado == "Ensaio Gestante") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposEnsaioGestante);
            $("#servico-tipo").text(4);
        } else if (servico_selecionado == "Ensaio Infantil") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposEnsaioInfantil);
            $("#servico-tipo").text(5);
        } else if (servico_selecionado == "Newborn") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposServicoBebe);
            $("#servico-tipo").text(6);
        } else if (servico_selecionado == "Prewedding") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposPrewedding);
            $("#servico-tipo").text(7);
        } else if (servico_selecionado == "Festa Infantil") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposFestaInfantil);
            $("#servico-tipo").text(8);
        } else if (servico_selecionado == "Smash The Cake") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposServicoBebe);
            $("#servico-tipo").text(9);
        } else if (servico_selecionado == "Corporativo") {
            limpaFormulario("#form-service-selected");
            fechaCamposFormulario(carregaCamposCorporativo);
            $("#servico-tipo").text(10);
        }
    });

    /** Habilitar ou desabilitar os campos do endereço da recepção. */
    $('#recepcao').on("change", function() {
        if ($("#recepcao").is(":checked")) {
            $("#endereco-recepcao").css("display", "flex");
        } else {
            $("#endereco-recepcao").css("display", "none");
        }
    });

    /** Habilitar ou desabilitar os campos do endereço do Dia da Noiva */
    $('#dia-noiva').on("change", function() {
        if ($("#dia-noiva").is(":checked")) {
            $("#endereco-dia-noiva").css("display", "flex");
        } else {
            $("#endereco-dia-noiva").css("display", "none");
        }
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
    $("#status-servico").css("display", "flex");
}

function carregaCamposServicoBebe() {
    $("#ambiente-servico select").val("estúdio");
    carregaCamposPadrao();
    $("#nome-bebe").css("display", "flex");
    $("#dt-nasc-bebe").css("display", "flex");
    $("#sexo-bebe").css("display", "flex");
    $("#cenario").css("display", "flex");
}

function carregaCamposCasamentoCivil() {
    $("#ambiente-servico select").val("fora");
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
    $("#ambiente-servico select").val("estúdio");
    carregaCamposPadrao();
}

function carregaCamposEnsaioInfantil() {
    $("#ambiente-servico select").val("estúdio");
    carregaCamposPadrao();
    $("#nome-da-crianca").css("display", "flex");
    $("#dt-nasc-crianca").css("display", "flex");
}

function carregaCamposPrewedding() {
    $("#ambiente-servico select").val("fora");
    carregaCamposPadrao();
    $("#nomes-noivos").css("display", "flex");
    $("#endereco-evento").css("display", "flex");
}

function carregaCamposFestaInfantil() {
    $("#ambiente-servico select").val("fora");
    carregaCamposPadrao();
    $("#nome-da-crianca").css("display", "flex");
    $("#endereco-evento").css("display", "flex");
}

function carregaCamposCorporativo() {
    $("#ambiente-servico select").val("estúdio");
    carregaCamposPadrao();
    $("#campo-profissao").css("display", "flex");
}

function carregaCamposEnsaioFeminino() {
    
}

