var NavBar = {
  initNavBarScroller: function(app)
  {
    //scrollpane parts
    var scrollPane = $(".scrollWrapper"),
      scrollContent = $(".scrollableArea");

    //build slider
    var scrollbar = $("#navBarScroll").slider({
      slide: function( event, ui ) {
        if ( scrollContent.width() > scrollPane.width() ) {
          scrollPane.scrollLeft( - Math.round(
            ui.value / 100 * ( scrollPane.width() - scrollContent.width() )
          ) );
        } else {
          scrollPane.scrollLeft( 0 );
        }

      $(".scrollingHotSpotRight, .scrollingHotSpotLeft").show();
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
      var leftVal = scrollContent.scrollLeft() === "auto" ? 0 :
        parseInt( scrollContent.scrollLeft() );
      var percentage = Math.round( leftVal / remainder * 100 );
      scrollbar.slider( "value", percentage );
    }

    //if the slider is 100% and window gets larger, reveal content
    function reflowContent() {
        var showing = scrollContent.width() + parseInt( scrollContent.scrollLeft(), 10 );
        var gap = scrollPane.width() - showing;
        if ( gap > 0 ) {
          scrollContent.css( "scrollLeft", parseInt( scrollContent.scrollLeft(), 10 ) + gap );
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
      if ($(this).attr('rel') != undefined) {
        var elt = $("#" + $(this).attr('rel'));
        var left = ((elt.position().left + $("#makeMeScrollable").width()) / $("#makeMeScrollable .scrollableArea").width()) * $('#navBar').width();
        console.log("#" + elt.attr('rel') + "= "+left+" = ("+(elt.position().left + $("#makeMeScrollable").width())+" / "+$("#makeMeScrollable .scrollableArea").width()+") * "+$('#navBar').width());
        $(this).parent().css('left', left);
      }
    });
  },

  init: function(app)
  {
    var theFunction = function () {
      // $('#home').css("margin-top", (($(window).height() - $('#home').outerHeight()) / 2) + $(window).scrollTop() + "px");
      $('#navBar').css("width", $(window).width() + "px");
      $('#navBarScrollerContainer').css("width", $(window).width() + "px");

      $('#navBar').css("position","absolute");
      $('#navBar').css("bottom", "43px");
      $('#navBar').css("left", (($(window).width() - $('#navBar').outerWidth()) / 2) + $(window).scrollLeft() + "px");
    }
    theFunction(app);
    NavBar.initNavBarScroller(app);
    $(window).resize(theFunction);
    // $(window).resize(function() {NavBar.initNavBarScroller(app);});

    // MiniFrieze Movements
    $("#navBar a.navLink").click(function() {
      var linkTitle = "#" + $(this).attr('rel');
      // console.log(linkTitle + " " +$(linkTitle).position().left);
      app.moveToPosition($(linkTitle).position().left + $(window).width());
      return false;
    });

    NavBar.initItems(app);
  },

  setPosition: function(app)
  {
    var remainder = $(".scrollWrapper").width() - $(".scrollableArea").width();
    var leftVal = $(".scrollWrapper").scrollLeft() === "auto" ? 0 :
      parseInt( $(".scrollWrapper").scrollLeft() );
    var percentage = Math.round( leftVal / remainder * 100 );

    $("#navBarScroll").slider( "value", -percentage );
  }
}