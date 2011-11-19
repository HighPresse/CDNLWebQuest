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

  //
  // Move to
  //
  this.moveToPosition = function(posX, callback)
  {
    var self = this;
    $(".scrollWrapper").animate({
        scrollLeft: posX
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
    self.AppWindow = self.defineWindow();
    $(window).resize(self.defineWindow);

    // set start page
    StartPage.init(self.appWindow);
    $("#home a").click(function() { self.moveToPosition($("#content").position().left); });

    // set nav bar
    NavBar.init(self.appWindow)

    // MiniFrieze Movements
    $("#navBar a").click(function() {
      linkTitle = "#" + $(this).attr('ref');
      self.moveToPosition($(linkTitle).position().left);
    });

    // INIT the app

    return true;
  }

  //
  // Define window
  //
  this.defineWindow = function()
  {
    this.appWindow = {
      width: $(window).width(),
      height: $(window).height()
    };

    var margin_top = ((($(window).height() - $('div.scrollWrapper').outerHeight()) / 2) + $(window).scrollTop()) - 50;
    $('div.scrollWrapper').css("margin-top", (margin_top >= 0 ? margin_top : 0 )+ "px");

    var page_width = $('div.scrollableArea .element').each(function(index) { 
      page_width += $(this).width();
    });
    $('div.scrollableArea').width(page_width);

    return this.appWindow
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


