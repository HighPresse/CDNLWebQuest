var StartPage = {
  initWindow: function()
  {
    
  }
  ,init: function(appWindow)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#home').css("width", $(window).width() + "px");

      $('#home div').css("position","absolute");
      $('#home div').css("top", (($('#home').height() - $('#home div').outerHeight()) / 2) + $('#home').scrollTop() + "px");
      $('#home div').css("left", (($('#home').width() - $('#home div').outerWidth()) / 2) + $('#home').scrollLeft() + "px");
    }
    theFunction();
    $(window).resize(theFunction);
  }
}