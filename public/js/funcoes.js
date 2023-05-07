/** abrir ou fechar modal */
 function switchModal() {
    if ($('.modal').css('display') == 'block') {
        $('.modal').css('display', 'none');
        clearForm();

    } else {
        $('.modal').css('display', 'block');
    }
}

window.onclick = function (event) {
    if (event.target.className == 'modal') {
        switchModal();
    }
}

function clearForm() {
    $('form').each (function(){
        this.reset();
    }); 
}