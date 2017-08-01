$("document").ready(function(){
  console.log("I'm here")
  $("a").click(function(){checkLocation(this.href)})
})

function checkLocation(){
  if(window.location.pathname=='/'){

    $('.navbar').addClass('navbar_other');
    $('.navbar_other').removeClass('navbar');
    console.log('Hi there');
  }else{
    $('.navbar_other').addClass('navbar');
    $('.navbar').removeClass('navbar_other');
    console.log('Byeee');
  };
}
