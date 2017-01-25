
function calcuateDensity(d1, t1, t2, p1, p2) {
    d2 = d1 * ((273.15 + T1) / (273.15 + T2)) * (p2 / p1);
    return d2;

}

function calculateVisco(V1, T1, T2) {

    V2 = (V1 * (273.15 + T1)) / (273.15 + T2);
    return v2;
}


jQuery(document).ready(function ($) {

// try to get data from localStorage





    $('#productContainer').hide();
    $('#technoImg').hide();

//load data from api
    $.get("/api/technologies", function (data, status) {
        techs = JSON.parse(data).technologies;
        $.each(techs, function (i, item) {

            $('#technology').append($('<option>', {
                value: item.name,
                text: item.name
            }));
        });

    })




    // change product on technology change
    $('#technology').change(function () {
        $('#product').html("");
        var tech = this.value;
        var active = true;
        $.each(techs, function (i, item) {

            if (tech === item.name) {

                if (item.product.length === 1)
                    active = false;

                // alert(item.product.length);

                $.each(item.product, function (i, item) {
                    //change image
                    if (i === 0) {
                        var img = 'img/' + item.image + '.svg';
                        $('#technoImg').attr('src', img);
                        $('#technoImg').show();
                    }


                    $('#product').append($('<option>', {
                        value: item.image,
                        text: item.name
                    }));
                });
            }
        });

        // change image one on product change another one on technology change

        $('#product').change(function () {

            var prod = this.value;
            var img = 'img/' + prod + '.svg';

            $('#technoImg').attr('src', img);

        });


        // set select to unactive
        if (!active) {
            $('#product').removeClass('active');
        } else
            $('#product').addClass('active');

        $('#productContainer').show();


    });

    // end of change product

//load liquid data and initiate select
    $.get("/api/fluids?fluidType=liquid", function (data, status) {
        liquids = JSON.parse(data).liquids;
        var put = false;
        $.each(liquids, function (i, item) {
            if (!put) {
                putStandard(item);
                put = true;
            }


            $('#fluid').append($('<option>', {
                value: item.name,
                text: item.name
            }));

            $('#formula').append($('<option>', {
                value: item.formula,
                text: item.formula
            }));
        });

    })


//load gas data

    $.get("/api/fluids?fluidType=gas", function (data, status) {
        gases = JSON.parse(data).gases;
    })


//onchange fluid or formula

    function putStandard(item) {
        $("#operatingTmp").val(item.temp);
        $("#operatingVis").val(item.viscosity);
        $("#operatingPrs").val(item.pressure);
        $("#operatingDen").val(item.density);

    }

    $('#fluid').change(function () {

        var prod = this.value;
        $.each(liquids, function (i, item) {

            if (prod === item.name) {
                $('#formula').val(item.formula);
                putStandard(item);
            }
        });

        $.each(gases, function (i, item) {

            if (prod === item.name) {
                $('#formula').val(item.formula);
                putStandard(item);
            }
        });
    });


    $('#formula').change(function () {

        var prod = this.value;
        $.each(liquids, function (i, item) {

            if (prod === item.formula) {
                $('#fluid').val(item.name);
                putStandard(item);
            }
        });

        $.each(gases, function (i, item) {

            if (prod === item.formula) {
                $('#fluid').val(item.name);
                putStandard(item);
            }
        });
    });




    // change on clicks
    $('#liquidRadio').click(function () {

        $('#fluid').html("");
        $('#formula').html("");
        var put = false;
        $.each(liquids, function (i, item) {

            if (!put) {
                putStandard(item);
                put = true;
            }
            $('#fluid').append($('<option>', {
                value: item.name,
                text: item.name
            }));

            $('#formula').append($('<option>', {
                value: item.formula,
                text: item.formula
            }));
        });

    });

    $('#gasRadio').click(function () {


        $('#fluid').html("");
        $('#formula').html("");

        var put = false;
        $.each(gases, function (i, item) {
            if (!put) {
                putStandard(item);
                put = true;
            }

            $('#fluid').append($('<option>', {
                value: item.name,
                text: item.name
            }));

            $('#formula').append($('<option>', {
                value: item.formula,
                text: item.formula
            }));
        });

    });

//submit button triggers

$("#submit").click(function(e){
    
        var t2= $("#operatingTmp").val();
        var p2 = $("#operatingPrs").val();
        alert($('#formula').val());
        e.preventDefault();
    
});


});