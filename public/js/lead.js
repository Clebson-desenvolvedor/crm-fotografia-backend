/**
 * Arquivo para tratar todas as funções referente a página de leads.
 */

$(document).ready(() => {

     /** Criar um lead */
     $("#create-lead-button").click(function(ev) {
        $.ajax({
            url: `/admin/leads`,
            type: "POST",
            data: { 
                nome_lead: $("form input#name").val(),
                whatsapp_lead: $("form input#whatsapp").val(),
                email_lead: $("form input#email").val(),
                dtcad_lead: $("form input#date").val(),
                foto_lead: $("form input#image").val(),//precisará consertar futuramente, pois não está salvando a imagem selecionada na base
                origem_lead: $("form select#origin option:selected").val()
             },
        }).done(function(data) {
            if (data.status == "error") {
                if ($("form input#name").val() == "") {
                    $("form input#name").addClass("input-error");
                    return false
                }

                if ($("form select#origin option:selected").val() == "") {
                    $("form select#origin").addClass("input-error");
                    return false;
                }
            } else {
                $("p.alert").text(data.message).addClass("alert-success");
                setTimeout(() => {
                    $("p.alert").fadeOut(500);
                }, 3000);
            }
            
        }).fail(function(er) {
            console.log("lead.js criar um lead ajax erro: ", er);
        });
    });

    /** Atualizar um lead */
    $("#update-lead-button").click(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/admin/leads/",
            type: "POST",
            data: {
                id_lead: $("form input#id").val(),
                nome_lead: $("form input#name").val(),
                whatsapp_lead: $("form input#whatsapp").val(),
                email_lead: $("form input#email").val(),
                dtcad_lead: $("form input#date").val(),
                foto_lead: $("form input#image").val(),//precisará consertar futuramente, pois não está salvando a imagem selecionada na base
                origem_lead: $("form select#origin option:selected").val()
             },
        }).done(function(data) {
            $("p.alert").text(data.message).addClass("alert-success");
            setTimeout(() => {
                $("p.alert").fadeOut(500);
            }, 3000);
        }).fail(function(er) {
            console.log("lead.js atualizar lead ajax erro: ", er);
        });
    });

    /** Detelar um lead */
    $("#delete-lead-button").click(function(e) {
        e.preventDefault();
        id =  $("form input#id").val();
        $.ajax({
            url: `/admin/leads/${id}`,
            type: "POST",
            data: { id: id },
        }).done(function(data) {
            $("p.alert").text(data.message).addClass("alert-success");
            setTimeout(() => {
                $("p.alert").fadeOut(500);
            }, 3000);
        }).fail(function(er) {
            console.log("lead.js deletar lead ajax erro: ", er);
        });
    });

    $("select#origin").val($("input#origin-value").val());

     /** Abre modal para criar um novo lead */
     $("#abre-modal-novo-lead").click(() => {
        limpaFormulario();
        abreModalNovoLead();
        $(".modal .data-image-upload img").attr("src", "/img/no-photo.jpg");
    });
});

/** Funções */

function abreModalNovoLead() {
    $("#modal-novo-lead").css("display", "block");
}