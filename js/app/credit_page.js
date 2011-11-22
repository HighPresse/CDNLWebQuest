var CreditsPage = {
  init: function(app)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#credits').css("width", $(window).width() + "px");

      $('#credits div.to-center').css("position","absolute");
      $('#credits div.to-center').css("top", (($('#credits').height() - $('#credits div.to-center').innerHeight()) / 2) + $('#credits').scrollTop() + "px");
      $('#credits div.to-center').css("left", (($('#credits').width() - $('#credits div.to-center').innerWidth()) / 2) + $('#credits').scrollLeft() + "px");
    }
    theFunction();
    $(window).resize(theFunction);
  }
}