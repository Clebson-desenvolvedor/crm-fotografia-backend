$(document).ready(function() {

    //pegar cores da configuradas na base
    $.ajax({
        url: '/admin/configurations/colors',
        type: "GET",
        success: data => {
            // console.log(data)
        }
    });
});