$(document).ready(function() {

    $(".color-input").on("change", function () {
        $(this).next(".pseudo-color-input").css("background-color", $(this).val());
    });

    //pegar cores da configuradas na base
    $.ajax({
        url: '/admin/configurations/',
        type: "GET",
        success: data => {
            // console.log(data)
        }
    });
});