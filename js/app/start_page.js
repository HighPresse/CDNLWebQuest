var StartPage = {
  init: function(appWindow)
  {
    document.getElementById("home").style.width = appWindow.width + "px";
    document.getElementById("home").style.marginTop = appWindow.height /2-150 + "px";
    document.getElementById("content").style.marginTop = appWindow.height /2 - 150 + "px";
  }
}