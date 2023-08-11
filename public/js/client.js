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
                ec_cep: $('form input#cep')[0].value,
                ec_logradouro: $('form input#street')[0].value,
                ec_numero: $('form input#number')[0].value,
                ec_bairro: $('form input#district')[0].value,
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
        $(".form-service-selected h2").text($("input#name").val());
    })

    /* Evento para carregar formulário de um serviço de acordo com o tipo de serviço escolhido */
    $('#select-service').on('change', function() {
        let servico_selecionado = $('#select-service option:selected').val();
        if (servico_selecionado == "Acompanhamento") {
            carregaCamposAcompanhamento();
        } else if (servico_selecionado == "Casamento Civil") {
            carregaCamposCasamentoCivil();
        }
    });

});


/** Funções */

function carregaCamposAcompanhamento() {
    $("#ambiente-servico select").val("Estúdio");
    $("#dt-servico").css("display", "flex");
    $("#preco-total").css("display", "flex");
    $("#status-servico").css("display", "flex");
    $("#nome-bebe").css("display", "flex");
    $("#dt-nasc-bebe").css("display", "flex");
    $("#sexo-bebe").css("display", "flex");
    $("#cenario").css("display", "flex");
}

function carregaCamposCasamentoCivil() {
    $("#ambiente-servico select").val("Fora");
    $("#dt-servico").css("display", "flex");
    $("#preco-total").css("display", "flex");
    $("#status-servico").css("display", "flex");
    $("#nomes-noivos").css("display", "flex");
    $("#endereco-evento").css("display", "flex");
    $("#endereco-evento-dados").css("display", "flex");
}

