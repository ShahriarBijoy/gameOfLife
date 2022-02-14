
	// init controller
	var controller = new ScrollMagic.Controller();

 //flow
  $(".flow").each(function(){
    $(this).addClass('out');
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0,
      duration: 600
    })
    .on("enter", function(ev){$(ev.target.triggerElement()).removeClass('out');})
    .on("leave", function(ev){$(ev.target.triggerElement()).addClass('out');})
    .addTo(controller);
  });

 //fade
  $(".fade").each(function(){
    $(this).addClass('out');
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.65
    })
    .on("enter", function(ev){$(ev.target.triggerElement()).removeClass('out');})
    .on("leave", function(ev){$(ev.target.triggerElement()).addClass('out');})
    .addTo(controller);
  });

$('.container').removeClass('out');

if ($('#back-to-top').length) {
    var scrollTrigger = 1000, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').stop().animate({
            scrollTop: 0
        }, 700);
    });
}
