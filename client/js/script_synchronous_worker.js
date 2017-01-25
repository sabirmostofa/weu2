/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//worker test
//set to async then later true
//jQuery.ajaxSetup({async:false});
//
//alert("test");
//console.log("worker");
//    $.get("/api/technologies", function (data, status) {
//        techs = JSON.parse(data).technologies;
//        $.each(techs, function (i, item) {
//
//            $('#technology').append($('<option>', {
//                value: item.name,
//                text: item.name
//            }));
//        });
//
//    });
//    
//    
//    
//    //load liquid data and initiate select
//    $.get("/api/fluids?fluidType=liquid", function (data, status) {
//        liquids = JSON.parse(data).liquids;
//        var put = false;
//        $.each(liquids, function (i, item) {
//            if (!put) {
//                putStandard(item);
//                put = true;
//            }
//
//
//            $('#fluid').append($('<option>', {
//                value: item.name,
//                text: item.name
//            }));
//
//            $('#formula').append($('<option>', {
//                value: item.formula,
//                text: item.formula
//            }));
//        });
//
//    });
//    
//    //load gas data
//
//    $.get("/api/fluids?fluidType=gas", function (data, status) {
//        gases = JSON.parse(data).gases;
//    });
//    
//    //back to original ajax settings
//jQuery.ajaxSetup({async:true});
