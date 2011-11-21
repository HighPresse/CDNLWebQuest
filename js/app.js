function App(parametre1, parametre2)
{
  // Properties
  this.scrollNav = $("div#makeMeScrollable");
  this.scrollWrapper = $(".scrollWrapper");
  this.configs = {
    animate_duration: 1000
  };
  // this.autoloadFiles = ["app/start_page.js"];
  this.appWindow = {};
  this.position = 0;

  //
  // Move to
  //
  this.moveToPosition = function(posX, callback)
  {
    var self = this;
    $(".scrollableArea").animate({
        left: -posX
      }, {
        duration: self.configs.animate_duration,
        complete: function() {
          if (callback && typeof(callback) === "function") {
            callback();
          }
        }
    });
    // $("div#makeMeScrollable").smoothDivScroll("moveToElement", "number", 2);
    // this.scrollNav.smoothDivScroll("moveToElement", "number", 2);
  }

  //
  // Content is moving
  //
  this.contentIsMoving = function() {
    var self = this;
    self.position = $('.scrollableArea').position().left;

    NavBar.setPosition(self);
  }

  //
  // initialize the App on load of Window
  //
  this.initLoad = function()
  { 
    // Load DivScroll
    this.scrollNav.smoothDivScroll({
      scrollStep: 5
    });

    return true; 
  }

  //
  // initialize the App
  //
  this.init = function()
  {
    var self = this;
    // this.autoload();

    // init vars
    self.scrollNav = $("div#makeMeScrollable");
    self.AppWindow = self.defineWindow(self);
    $(window).resize(function() { self.defineWindow(self) });

    // set start page
    StartPage.init(self);

    // set nav bar
    NavBar.init(self);

    $('.scrollableArea').bind('animating', function(event) { self.contentIsMoving(); });
    $('.scrollingHotSpotRight, .scrollingHotSpotLeft').bind('mousemove', function(event) { self.contentIsMoving(); });

    // jwplayer
    jwplayer('mediaspace').setup({
      'flashplayer': 'player.swf',
      'file': 'http://content.longtailvideo.com/videos/flvplayer.flv',
      'lightcolor': 'FFFFFF',
      'controlbar': 'bottom',
      'width': '470',
      'height': '320'
    });

    return true;
  }

  //
  // Define window
  //
  this.defineWindow = function(self)
  {
    self.appWindow = {
      width: $(window).width(),
      height: $(window).height()
    };

    var margin_top = ((($(window).height() - $('div.scrollWrapper').outerHeight()) / 2) + $(window).scrollTop()) - 50;
    $('div.scrollWrapper').css("margin-top", (margin_top >= 0 ? margin_top : 0 )+ "px");

    var page_width = $('div.scrollableArea .element').each(function(index) { 
      page_width += $(this).width();
    });
    $('div.scrollableArea').width(page_width);

    // self.scrollNav.smoothDivScroll("recalculateScrollableArea");

    return self.appWindow;
  }

  // Autoloader
  // this.autoload = function() {
  //   this.autoloadFiles.forEach(function(elt, index, array) {
  //     var fileref=document.createElement('script');
  //     fileref.setAttribute("type","text/javascript");
  //     fileref.setAttribute("src", elt);
  //     if (typeof fileref!="undefined") {
  //       document.getElementsByTagName("head")[0].appendChild(fileref);
  //     }
  //   });
  // }
}


// Launch
var application = new App();

$(window).load(function() {
  application.initLoad();
});

$(document).ready(function() {
  application.init();
});
