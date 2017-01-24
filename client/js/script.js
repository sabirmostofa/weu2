jQuery(document).ready(function ($) {

    $('#productContainer').hide();
    $('#technoImg').hide();

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
                    if(i === 0){
                        var img = 'img/'+ item.image+'.svg';
                         $('#technoImg').attr('src',img);
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
            var img = 'img/'+prod+'.svg';
            
            $('#technoImg').attr('src',img);
     
        });


        // set select to unactive
        if (!active) {
            $('#product').removeClass('active');
        } else
            $('#product').addClass('active');

        $('#productContainer').show();


    });

    // end of change product

    $.get("/api/fluids?fluidType=liquid", function (data, status) {
        liquids = JSON.parse(data).liquids;
    })
    $.get("/api/fluids?fluidType=gas", function (data, status) {
        gases = JSON.parse(data).gases;
    })




});