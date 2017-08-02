$("document").ready(function(){
  var $win = $(window);
  var $nav = $('.navbar');
  $win.on('scroll', function(){
    var scr = $win.scrollTop();
      console.log($nav.css('background-color'));
      var value = scr/2000;
      if(value>0.3)value=0.3;
       $nav.css("background-color",'rgba(255,255,255,'+value+')');
});
})
