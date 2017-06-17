$(function() {
  'use strict';
  
  $('#fullpage').fullpage({
    menu: '#fullpage_menu',
    scrollBar: true,
    controlArrows: false,
    verticalCentered: true
  });
  
  
  
  var fotorama;
  
  $('.open-modal').click(function(e) {
    var target = $(this).attr('href');
    
    $('#fotorama').html($(target).html());
    
    $('#modal_gallery').fadeIn(400, function() {
      var fotorama_target = $('#fotorama').fotorama();
      fotorama = fotorama_target.data('fotorama');
      
      $('#fotorama').animate({ opacity: 1 }, 400);
    });
    
    $.fn.fullpage.setAllowScrolling(false);
    $('html').css('height', '100%').css('overflow', 'hidden');
    
    e.preventDefault();
  });
  
  $('#modal_close').click(function(e) {
    $.fn.fullpage.setAllowScrolling(true);
    $('html').css('height', 'auto').css('overflow', 'auto');
    
    $('#fotorama').animate({ opacity: 0 }, 400, function() {
      $('#modal_gallery').fadeOut(400, function() {
        fotorama.destroy();
      });
    });
    
    e.preventDefault();
  });
  
});