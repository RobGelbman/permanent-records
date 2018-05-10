$(document).ready(function() {
  var wrapper         = $(".input_fields_wrap"); //Fields wrapper
  var add_button      = $(".add_field_button"); //Add button ID
  var picArr = ['fifty-cent.jpg', 'elvis-presley.jpg', 'frank-sinatra.jpg', 'Jimi-Hendrix.jpg', 'jim-morrison.jpg', 'johnny-cash.jpg', 'kurt-cobain.jpg', 'mick-jagger.jpg', 'sid-vicious.jpg' ];

var myNumber = Math.floor((Math.random() * 9));

  
  $(add_button).click(function(e){ //on add input button click
      e.preventDefault();
      
          $(wrapper).append('<div><li><input class="form-control form-control-sm" type="text" name="tracklist[]"/></li></div>'); //add input box

  });

  
$('body').css('backgroundImage','url(/images/background-images/'+picArr[myNumber]+')');


  // document.body.style.backgroundImage = `"url('/images/background-images/${picArr[myNumber]}')"`;
  
});