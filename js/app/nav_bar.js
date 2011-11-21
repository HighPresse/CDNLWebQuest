var NavBar = {
  initNavBarScroller: function(app)
  {
    $("#navBarScroller").draggable({
      containment: "#navBarScrollerContainer",
      drag: function() {
        var wantPosition = (($("#navBarScroller").position().left / $("#navBar").width()) * $('#makeMeScrollable .scrollableArea').width());
        app.moveToPosition(wantPosition);
        // console.log(wantPosition);
      }
    });
  },
  init: function(app)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#navBar').css("width", $(window).width() + "px");

      $('#navBar').css("position","absolute");
      $('#navBar').css("bottom", "50px");
      $('#navBar').css("left", (($(window).width() - $('#navBar').outerWidth()) / 2) + $(window).scrollLeft() + "px");

      NavBar.initNavBarScroller();
    }
    theFunction(app);
    NavBar.initNavBarScroller(app);
    $(window).resize(theFunction);

    // MiniFrieze Movements
    $("#navBar a").click(function() {
      linkTitle = "#" + $(this).attr('ref');
      console.log(linkTitle + " " +$(linkTitle).position().left);
      app.moveToPosition($(linkTitle).position().left);
      return false;
    });
  },

  setPosition: function(app)
  {
    var navBarPosition = (-app.position / ($("#makeMeScrollable .scrollableArea").width() - $("#makeMeScrollable").width()) * $('#navBar').width());
    // console.log("("+-app.position+" / "+($("#makeMeScrollable .scrollableArea").width() - $("#makeMeScrollable").width())+") * "+$('#navBar').width()+" = "+navBarPosition);
    $("#navBarScroller").css('margin-left', navBarPosition);
  }
}