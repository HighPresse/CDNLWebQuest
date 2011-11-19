var NavBar = {
  init: function(appWindow)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#navBar').css("width", $(window).width() + "px");

      $('#navBar').css("position","absolute");
      $('#navBar').css("bottom", "60px");
      $('#navBar').css("left", (($(window).width() - $('#navBar').outerWidth()) / 2) + $(window).scrollLeft() + "px");
    }
    theFunction();
    $(window).resize(theFunction);
  }
}