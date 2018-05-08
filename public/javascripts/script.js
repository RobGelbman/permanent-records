$(document).ready(function() {
  var wrapper         = $(".input_fields_wrap"); //Fields wrapper
  var add_button      = $(".add_field_button"); //Add button ID
  
  $(add_button).click(function(e){ //on add input button click
      e.preventDefault();
      
          $(wrapper).append('<div><li><input class="form-control form-control-sm" type="text" name="tracklist[]"/></li></div>'); //add input box

  });
  
});