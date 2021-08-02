//Put everything that must happen after loading page here

window.addEventListener("load", function () {
  //close button
  var closeButton = document.getElementsByClassName("close")[0];
  closeButton.addEventListener("click", function () {
    window.close();
  });

  //navigator jquery
  // $(".navigator").hover(
  //   function () {
  //     $("#popup").css("display", "block");
  //   },
  //   function () {
  //     setTimeout(function () {
  //       $("#popup").css("display", "none");
  //     }, 5000);
  //   }
  // );

  //this is totally not needed
  setTimeout(function () {
    window.scroll(screen.width / 2, screen.height / 2);
  }, 1);
});

// functions
function hideCmaps() {
  $("#cmap1").css("display", "none");
  $("#cmap2").css("display", "none");

  $("#cmap3").css("display", "none");

  $("#cmap4").css("display", "none");
  $("#cmap5").css("display", "none");
  $(".title").css("display", "none");
  $("#profile").css("display", "none");

}

function goToPage(page) {
  hideCmaps();
  $("#dcm").css("display", "block");
  if (page == 1) {
    $("#dcm").attr(
      "src",
      "assets/CURRENT ELECTRICITY/CURRENT ELECTRICITY AND ELECTRIC ENERGY-CONTENT.cmap.html"
    );
  }
  if (page == 2) {
    $("#dcm").attr(
      "src",
      "assets/MEASUREMENT/MEASUREMENT-CONTENT.cmap.html"
    );
  }
  if (page == 3) {
    $("#dcm").attr(
      "src",
      "assets/LAWS OF MOTION/LAWS OF MOTION- CONTENT.cmap.html"
    );
  }
  if (page == 4) {
    $("#dcm").attr(
      "src",
      "assets/LIGHT/LIGHT - CONTENT.cmap.html"
    );
  }
  if (page == 5) {
    $("#dcm").attr(
      "src",
      "assets/SOUND/SOUND - CONTENT.cmap.html"
    );
  }
}

function backwardCheck(){
  document.getElementById("dcm").contentWindow.history.back();
  setTimeout(function(){
    var url = document.getElementById("dcm").contentWindow.location.href;
  
    if(url == "about:blank"){
      location.reload();
    }
  },25);

}



