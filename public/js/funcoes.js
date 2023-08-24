/** Abre ou fecha modal */
 function abreOuFechaModal() {
    if ($('.modal').css('display') == 'block') {
        $('.modal').css('display', 'none');
        limpaFormulario();
    } else {
        $('.modal').css('display', 'block');
    }
}

/** Chama a função de abrir ou fechar modal */
window.onclick = function (event) {
    if (event.target.className == 'modal') {
        abreOuFechaModal();
    }
}

/** Limpa o formulário através do Id do formulário */
function limpaFormulario(form_id) {
    $('form' + form_id).each (function() {
        this.reset();
    }); 
}