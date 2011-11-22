var StartPage = {
  init: function(app)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#home').css("width", $(window).width() + "px");

      $('#home div').css("position","absolute");
      $('#home div').css("top", (($('#home').height() - $('#home div').innerHeight()) / 2) + $('#home').scrollTop() + "px");
      $('#home div').css("left", (($('#home').width() - $('#home div').innerWidth()) / 2) + $('#home').scrollLeft() + "px");
    }
    theFunction();
    $(window).resize(theFunction);


    $("#home a").click(function() { app.moveToPosition($("#content").position().left); return false; });
  }
}