$("document").ready(function(){
  var $win = $(window);
  var $nav = $('.navbar');
  $win.on('scroll', function(){
    var scr = $win.scrollTop();
      console.log($nav.css('background-color'));
      var value = scr/2000;
      // if(value>0.3)value=0.3;
      //  $nav.css("background-color",'rgba(255,255,255,'+value+')');

      //  var scr = $win.scrollTop();
      //    console.log($nav.css('background')+value);
      //    var value = scr/10;
      //    if(value>100)value=100;
      //     $nav.css("background",'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0) '+value+'%)');
});
})
