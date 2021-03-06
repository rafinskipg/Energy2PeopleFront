﻿var validateYear = false;
var validateMonth = true;
var validateDay = true;

window.addBindings = function(){
    $( "#choice" ).buttonset();
    $("#getInfoButton").click(function() {

      if (validateYear && validateMonth && validateDay) {
          
          getInformation('http://localhost:8080/kmlbi/biservlet?q=' + $("#measureSelect").val() + '&fYear=' + $("#fromYear option:selected").text() + '&tYear=' + $("#toYear option:selected").text() + '&fMonth=' + $("#fromMonth option:selected").val() + '&tMonth=' + $("#toMonth option:selected").val() +'&fDay=' + $("#datepickerFrom").val() + '&tDay=' + $("#datepickerTo").val() + '&aggr=' + $("#choice :radio:checked").val());

          console.log($("#measureSelect").val());
          console.log($("#fromYear option:selected").val());
          console.log($("#toYear option:selected").val());
          console.log($("#datepickerFrom").val());
          console.log($("#datepickerTo").val());
          console.log($("#choice :radio:checked").val());
      } else {
        alert('Invalid');
      }
    });

    var i;
    for(i = 0; i < 30; i++)
    {  var option = "<option value='"+ i +"'>"+ (1983+i) +"</option>"
      $(option).appendTo("#fromYear");
      $(option).appendTo("#toYear");
    }

    $( "#datepickerFrom" ).datepicker();
    $( "#datepickerTo" ).datepicker();

    $(function() {
        $( "#accordion" ).accordion();
      });

    $("<option value='1'>January</option>").appendTo("#fromMonth");
    $("<option value='2'>February</option>").appendTo("#fromMonth");
    $("<option value='3'>March</option>").appendTo("#fromMonth");
    $("<option value='4'>April</option>").appendTo("#fromMonth");
    $("<option value='5'>May</option>").appendTo("#fromMonth");
    $("<option value='6'>June</option>").appendTo("#fromMonth");
    $("<option value='7'>July</option>").appendTo("#fromMonth");
    $("<option value='8'>August</option>").appendTo("#fromMonth");
    $("<option value='9'>September</option>").appendTo("#fromMonth");
    $("<option value='10'>October</option>").appendTo("#fromMonth");
    $("<option value='11'>November</option>").appendTo("#fromMonth");
    $("<option value='12'>December</option>").appendTo("#fromMonth");

    $("<option value='1'>January</option>").appendTo("#toMonth");
    $("<option value='2'>February</option>").appendTo("#toMonth");
    $("<option value='3'>March</option>").appendTo("#toMonth");
    $("<option value='4'>April</option>").appendTo("#toMonth");
    $("<option value='5'>May</option>").appendTo("#toMonth");
    $("<option value='6'>June</option>").appendTo("#toMonth");
    $("<option value='7'>July</option>").appendTo("#toMonth");
    $("<option value='8'>August</option>").appendTo("#toMonth");
    $("<option value='9'>September</option>").appendTo("#toMonth");
    $("<option value='10'>October</option>").appendTo("#toMonth");
    $("<option value='11'>November</option>").appendTo("#toMonth");
    $("<option value='12'>December</option>").appendTo("#toMonth");
}

window.tabs = function (){
    $('.tab').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        $('.contenido').css('display', 'none');
        $('#'+id).css('display', 'block');
        $('.tab').removeClass('active');
        $(this).addClass('active');
 
        if(id == 'mapa'){
            $('#getInfoButton').css('display','block');
            $('#drawButton').css('display','none');
        }else{
            $('#getInfoButton').css('display','none');
            $('#drawButton').css('display','block');
        }
        
    });

}

var ge;
var currentKmlObject = null;

 function finished(kmlObject) {
    if (!kmlObject) {
      setTimeout(function() {
        alert('Bad or null KML.');
      }, 0);
      return;
    }else{
      console.log("LLEGO BIEN");
      currentKmlObject = kmlObject;
      ge.getFeatures().appendChild(kmlObject);
    }
  }

  var map_picker; 
  
window.pick = function(){
    if( $('#map_picker #get').length > 0){
         var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(40.4445904, -3.697276800000054),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_picker_map'),
                mapOptions);
        geocoder = new google.maps.Geocoder();
        google.maps.event.addListener(map, "click", function(event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                $('#lat').val(lat);
                $('#long').val(lng);
               
            });
        $('#map_picker #get').on('click', function(e){
            e.preventDefault();
            codeAddress();
               
            });
    }
   
       
   
}

  

  function codeAddress() {
    //In this case it gets the address from an element on the page, but obviously you  could just pass it to the method instead
    var address = document.getElementById("address").value;

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
        map.setCenter(results[0].geometry.location);
        $('#lat').val(results[0].geometry.location.jb);
        $('#long').val(results[0].geometry.location.kb);
            
        var marker = new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

window.init = function() {
   addBindings();
   tabs();
   //picker coordinates
   pick();
   google.earth.createInstance('map3d', initCallback, failureCallback);
}


window.getInformation = function (url){
  if (currentKmlObject) {
    ge.getFeatures().removeChild(currentKmlObject);
    currentKmlObject = null;
    }
  google.earth.fetchKml(ge, url, finished);
}

function initCallback(instance) {
  ge = instance;
  ge.getWindow().setVisibility(true);

  // add a navigation control
  ge.getNavigationControl().setVisibility(ge.VISIBILITY_AUTO);

  // add some layers
  //ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  //ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

}

function failureCallback(errorCode) {
}

$(document).ready(function(){
    init();
    $("#saveMeasure").html('(' + $("#measureSelection option:selected").text() + ')');
    $("#saveAggreg").html('(Total)');
});

// Validate
$(function(){
  var auxFromYear;
  var auxToYear;

  var auxFromMonth;
  var auxToMonth;

  var auxFromDay;
  var auxToDay;

  var auxMeasure;

  var auxAggreg;

  var validate = true;

  $("#fromYear").change(function() {
    auxFromYear = parseInt($("#fromYear option:selected").text());
    $("#saveYears").html("(" + auxFromYear + "-" + auxToYear + ")");
    validar(auxFromYear, auxToYear, 1);
  });
  $("#toYear").change(function() {
    auxToYear = parseInt($("#toYear option:selected").text());
    $("#saveYears").html("(" + auxFromYear + "-" + auxToYear + ")");
    validar(auxFromYear, auxToYear, 1);
  });

  $("#fromMonth").change(function() {
    auxFromMonth = ($("#fromMonth option:selected").text());
    $("#saveMonths").html("(" + auxFromMonth + "-" + auxToMonth + ")");
    validar($("#fromMonth option:selected").val(), $("#toMonth option:selected").val(), 2);
  });
  $("#toMonth").change(function() {
    auxToMonth = ($("#toMonth option:selected").text());
    $("#saveMonths").html("(" + auxFromMonth + "-" + auxToMonth + ")");
    validar($("#fromMonth option:selected").val(), $("#toMonth option:selected").val(), 2);
  });

  $("#datepickerFrom").change(function() {
    auxFromDay = ($("#datepickerFrom").val());
    $("#saveDays").html("(" + auxFromDay + "-" + auxToDay + ")");
    validar(date2int(auxFromDay), date2int(auxToDay), 3);
  });
  $("#datepickerTo").change(function() {
    auxToDay = ($("#datepickerTo").val());
    $("#saveDays").html("(" + auxFromDay + "-" + auxToDay + ")");
    validar(date2int(auxFromDay), date2int(auxToDay), 3);
  });

  $("#measureSelection").change(function() {
    auxMeasure = ($("#measureSelection option:selected").text());
    $("#saveMeasure").html('(' + auxMeasure + ')');
  });

  $("input[name='repeat']").change(function() {
    if(this.checked) {
      switch (parseInt(this.value)) {
        case 1:
        auxAggreg = "Total";
        break;
        case 2:
        auxAggreg = "Average";
        break;
        case 3:
        auxAggreg = "Maximum";
        break;
        case 4:
        auxAggreg = "Minimum";
        break;
      }
      $("#saveAggreg").html('(' + auxAggreg + ')');
    }
  });
});

function validar(from, to, type) {
  switch (type) {
    case 1:
    if ((to-from)<0)
      validateYear = false;
    else
      validateYear = true;
    break;
    case 2:
    if ((to-from)<0)
      validateMonth = false;
    else
      validateMonth = true;
    break;
    case 3:
    if ((to-from)<0)
      validateDay = false;
    else
      validateDay = true;
    break;
  }
}

function date2int(date) {
  if (date != undefined) {
    var n=date.split("/");
    return parseInt(n[0])*12 + parseInt(n[1]) + parseInt(n[2])*365;
  }
}