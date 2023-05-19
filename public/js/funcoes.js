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