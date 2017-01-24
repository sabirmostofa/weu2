jQuery(document).ready(function ($) {



//load data from data
    $.get("/api/technologies", function (data, status) {
        techs = JSON.parse(data).technologies;
        $.each(techs, function (i, item) {
            
            $('#technology').append($('<option>', {
                value: item.name,
                text: item.name
            }));
        });
    })

    $.get("/api/fluids?fluidType=liquid", function (data, status) {
        liquids = JSON.parse(data).liquids;
    })
    $.get("/api/fluids?fluidType=gas", function (data, status) {
        gases = JSON.parse(data).gases;
    })

  


});