
function calcuateDensity(d1, t1, t2, p1, p2) {
    d2 = d1 * ((273.15 + t1) / (273.15 + t2)) * (p2 / p1);
    return d2;

}

function calculateVisco(v1, t1, t2) {

    v2 = v1 * ((273.15 + t1) / (273.15 + t2));
    return v2;
}


jQuery(document).ready(function ($) {

// try to get data from localStorage





    $('#productContainer').hide();
    $('#technoImg').hide();
    $('.fourth_section_2 input').prop('disabled',true);

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

    $("#submit").click(function (e) {

        // var t1, p1,d1,v1;
        t2 = $("#operatingTmp").val();
        p2 = $("#operatingPrs").val();
        var liquid = $('#formula').val();
        $.each(liquids, function (i, item) {

            if (liquid === item.formula) {
                t1 = item.temp;
                p1 = item.pressure;
                d1 = item.density;
                v1 = item.viscosity;
            }
        });

        $.each(gases, function (i, item) {

            if (liquid === item.formula) {
                t1 = item.temp;
                p1 = item.pressure;
                d1 = item.density;
                v1 = item.viscosity;
            }
        });

        d2 = calcuateDensity(d1, t1, t2, p1, p2);
        v2 = calculateVisco(v1, t1, t2);

        $("#operatingVis").val(v2.toFixed(4));

        $("#operatingDen").val(d2.toFixed(4));
        //alert(d2 + ' ' + v2 );

        e.preventDefault();

    });

    // custom fluid
    $("#customFluid").change(function () {
        if (this.checked) {
            $('#fluid').hide();
            $('#formulaContainer').hide();
            $('#customFluidInput').show();

            $('.fourth_section_2 input').val("").prop('disabled', false);
            //Do stuff
        } else {
            $('#customFluidInput').hide();
            $('#fluid').show();
            $('#formulaContainer').show();
            $('.fourth_section_2 input').prop('disabled',true);


        }
    });


});