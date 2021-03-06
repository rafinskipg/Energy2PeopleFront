﻿
window.addBindings = function(){
    $( "#choice" ).buttonset();
    $("#getInfoButton").click(function() {
          
          getInformation('http://localhost:8080/kmlbi/biservlet?q=' + $("#measureSelect").val() + '&fYear=' + $("#fromYear option:selected").text() + '&tYear=' + $("#toYear option:selected").text() + '&fMonth=' + $("#fromMonth option:selected").val() + '&tMonth=' + $("#toMonth option:selected").val() +'&fDay=' + $("#datepickerFrom").val() + '&tDay=' + $("#datepickerTo").val() + '&aggr=' + $("#choice :radio:checked").val());

          console.log($("#measureSelect").val());
          console.log($("#fromYear option:selected").val());
          console.log($("#toYear option:selected").val());
          console.log($("#datepickerFrom").val());
          console.log($("#datepickerTo").val());
          console.log($("#choice :radio:checked").val());
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

    $("<option value='1'> January </option>").appendTo("#fromMonth");
    $("<option value='2'> February </option>").appendTo("#fromMonth");
    $("<option value='3'> March </option>").appendTo("#fromMonth");
    $("<option value='4'> April </option>").appendTo("#fromMonth");
    $("<option value='5'> May </option>").appendTo("#fromMonth");
    $("<option value='6'> June </option>").appendTo("#fromMonth");
    $("<option value='7'> July </option>").appendTo("#fromMonth");
    $("<option value='8'> August </option>").appendTo("#fromMonth");
    $("<option value='9'> September </option>").appendTo("#fromMonth");
    $("<option value='10'> October </option>").appendTo("#fromMonth");
    $("<option value='11'> November </option>").appendTo("#fromMonth");
    $("<option value='12'> December </option>").appendTo("#fromMonth");

    $("<option value='1'> January </option>").appendTo("#toMonth");
    $("<option value='2'> February </option>").appendTo("#toMonth");
    $("<option value='3'> March </option>").appendTo("#toMonth");
    $("<option value='4'> April </option>").appendTo("#toMonth");
    $("<option value='5'> May </option>").appendTo("#toMonth");
    $("<option value='6'> June </option>").appendTo("#toMonth");
    $("<option value='7'> July </option>").appendTo("#toMonth");
    $("<option value='8'> August </option>").appendTo("#toMonth");
    $("<option value='9'> September </option>").appendTo("#toMonth");
    $("<option value='10'> October </option>").appendTo("#toMonth");
    $("<option value='11'> November </option>").appendTo("#toMonth");
    $("<option value='12'> December </option>").appendTo("#toMonth");

}

window.tabs = function (){
    $('.tab').on('click', function(e){
        e.preventDefault();
        var id = $(this).attr('href');
        $('.contenido').css('display', 'none');
        $('#'+id).css('display', 'block');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        
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



window.init = function() {
   addBindings();
   tabs();
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
  ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
  ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);

}

function failureCallback(errorCode) {
}

$(document).ready(function(){
    init();
    $("#measureSelect").change(function() {
      console.log($("#measureSelect").val());
});});