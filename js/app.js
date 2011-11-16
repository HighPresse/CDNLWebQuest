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
          // TODO, call a callback)
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
    // this.autoload();

    // init vars
    this.scrollNav = $("div#makeMeScrollable");
    this.AppWindow = this.defineWindow();
    $(window).resize(this.defineWindow());

    // set start page
    StartPage.init(this.appWindow);
    var self = this;
    $("#home a").click(function() {
      self.moveToPosition($("#content").position().left);

      // $("div#makeMeScrollable").smoothDivScroll("moveToElement", "number", 2);
      // this.scrollNav.smoothDivScroll("moveToElement", "number", 2);
    });

    // MiniFrieze Movements
    $("#navBar a").click(function() {
      linkTitle = "#" + this.title;
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
