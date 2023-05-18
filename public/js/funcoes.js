/** abre ou fecha modal */
 function switchModal() {
    if ($('.modal').css('display') == 'block') {
        $('.modal').css('display', 'none');
        clearForm();

    } else {
        $('.modal').css('display', 'block');
    }
}

/** chama a função modal pra decidir se a abre ou fecha */
window.onclick = function (event) {
    if (event.target.className == 'modal') {
        switchModal();
    }
}

/** limpa o formulário */
function clearForm() {
    $('form').each (function(){
        this.reset();
    }); 
}

$(document).ready(function() {
    console.log("passou")
    setTimeout(() => {
        /* pega cores salvas na base e distribui para respectivas divs */
        $.ajax({
            url: '/admin/configurations/getColors',
            type: "GET",
            success: colors => {
                console.log("colors", colors);
                $(".sidebar").css("background-color", colors["cor_painel_lateral"]);
                $(".painel-lateral label").css("background-color",colors["cor_painel_lateral"]);

                $(".sidebar-menu span").css("color", colors["cor_texto_painel_lateral"]);
                $(".painel-lateral-texto label").css("background-color",colors["cor_texto_painel_lateral"]);

                $(".sidebar-menu i").css("color", colors["cor_icone_painel_lateral"]);
                $(".painel-lateral-icone label").css("background-color",colors["cor_icone_painel_lateral"]);

                $("main p").css('color', colors["cor_texto_painel_principal"]);
                $(".painel-principal-texto label").css("background-color",colors["cor_texto_painel_principal"]);
            }
        });
    }, 500);
});