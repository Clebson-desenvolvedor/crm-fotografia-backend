$(document).ready(function() {
    console.log("chamou")

    //pegar cores da configuradas na base
    $.ajax({
        url: '/admin/configurations/',
        type: "GET",
        success: data => {
            // console.log(data)
        }
    });
});