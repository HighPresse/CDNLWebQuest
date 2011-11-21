var NavBar = {
  initNavBarScroller: function(app)
  {
    // $("#navBarScroller").css({
    //   'width': '100px',
    //   'background-size': '100px 15px'
    // });
    // $("#navBarScroller").draggable({
    //   containment: "#navBarScrollerContainer",
    //   drag: function() {
    //     // (-app.position / ($("#makeMeScrollable .scrollableArea").width() - $("#makeMeScrollable").width()) * $('#navBar').width());
    //     var wantPosition = (($("#navBarScroller").position().left / ($("#navBar").width() - $("#navBarScroll").width())) * $('#makeMeScrollable .scrollableArea').width());
    //     app.moveToPosition(wantPosition);
    //     // console.log(wantPosition);
    //   }
    // });

    //scrollpane parts
    var scrollPane = $(".scrollWrapper"),
      scrollContent = $(".scrollableArea");

    //build slider
    var scrollbar = $("#navBarScroll").slider({
      slide: function( event, ui ) {
        if ( scrollContent.width() > scrollPane.width() ) {
          scrollContent.css( "margin-left", Math.round(
            ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
          ) + "px" );
        } else {
          scrollContent.css( "margin-left", 0 );
        }
      }
    });

    //append icon to handle
    var handleHelper = scrollbar.find( ".ui-slider-handle" )
    .mousedown(function() {
      scrollbar.width( handleHelper.width() );
    })
    .mouseup(function() {
      scrollbar.width( "100%" );
    })
    .append( "<span class='ui-icon ui-icon-grip-dotted-vertical'></span>" )
    .wrap( "<div class='ui-handle-helper-parent'></div>" ).parent();

    //change overflow to hidden now that slider handles the scrolling
    scrollPane.css( "overflow", "hidden" );

    //size scrollbar and handle proportionally to scroll distance
    function sizeScrollbar() {
      var remainder = scrollContent.width() - scrollPane.width();
      var proportion = remainder / scrollContent.width();
      var handleSize = scrollPane.width() - ( proportion * scrollPane.width() );
      scrollbar.find( ".ui-slider-handle" ).css({
        width: handleSize,
        "background-size": handleSize+' 15px',
        "margin-left": -handleSize / 2
      });
      handleHelper.width( "" ).width( scrollbar.width() - handleSize );
    }

    //reset slider value based on scroll content position
    function resetValue() {
      var remainder = scrollPane.width() - scrollContent.width();
      var leftVal = scrollContent.css( "margin-left" ) === "auto" ? 0 :
        parseInt( scrollContent.css( "margin-left" ) );
      var percentage = Math.round( leftVal / remainder * 100 );
      scrollbar.slider( "value", percentage );
    }

    //if the slider is 100% and window gets larger, reveal content
    function reflowContent() {
        var showing = scrollContent.width() + parseInt( scrollContent.css( "margin-left" ), 10 );
        var gap = scrollPane.width() - showing;
        if ( gap > 0 ) {
          scrollContent.css( "margin-left", parseInt( scrollContent.css( "margin-left" ), 10 ) + gap );
        }
    }

    //change handle position on window resize
    $( window ).resize(function() {
      resetValue();
      sizeScrollbar();
      reflowContent();
    });
    //init scrollbar size
    setTimeout( sizeScrollbar, 10 ); //safari wants a timeout

  },
  initItems: function(app) {
    $('#navBar a').each(function(index) { 
      // var elt = "#" + $(this).attr('ref');
      // var left = (($(elt).position().left + $(window).width()) / $("#makeMeScrollable .scrollableArea").width()) * $('#navBar').width();
      // console.log("#" + $(this).attr('ref') + "= "+left+" = ("+$(elt).position().left+" / "+$("#makeMeScrollable .scrollableArea").width()+") * "+$('#navBar').width());
      // $(this).parent().css("position","absolute").css('left', left);
    });
  },
  init: function(app)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#navBar').css("width", $(window).width() + "px");
      $('#navBarScrollerContainer').css("width", $(window).width() + "px");

      $('#navBar').css("position","absolute");
      $('#navBar').css("bottom", "30px");
      $('#navBar').css("left", (($(window).width() - $('#navBar').outerWidth()) / 2) + $(window).scrollLeft() + "px");

      NavBar.initNavBarScroller();
    }
    theFunction(app);
    NavBar.initNavBarScroller(app);
    NavBar.initItems(app);
    $(window).resize(theFunction);
    $(window).resize(function() {NavBar.initNavBarScroller(app);});

    // MiniFrieze Movements
    $("#navBar a").click(function() {
      var linkTitle = "#" + $(this).attr('ref');
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