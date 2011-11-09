var StartPage = {
  init: function(appWindow)
  {
    document.getElementById("animateTest").style.width = appWindow.width + "px";
    document.getElementById("animateTest").style.marginTop = appWindow.height /2 + "px";
    document.getElementById("content").style.marginTop = appWindow.height /2 - 150 + "px";
  }
}