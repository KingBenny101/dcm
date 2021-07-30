//Put everything that must happen after loading page here

window.addEventListener("load", function () {
  //close button
  var closeButton = document.getElementsByClassName("close")[0];
  closeButton.addEventListener("click", function () {
    window.close();
  });

  //navigator jquery
  $(".navigator").hover(
    function () {
      $("#popup").css("display", "block");
    },
    function () {
      setTimeout(function () {
        $("#popup").css("display", "none");
      }, 5000);
    }
  );

  //this is totally not needed
  setTimeout(function () {
    window.scroll(screen.width / 2, screen.height / 2);
  }, 1);
});

// functions
function hideCmaps(){
  $('#cmap1').css("display","none");
  $('#cmap2').css("display","none");

  $('#cmap3').css("display","none");

  $('#cmap4').css("display","none");
  $('#cmap5').css("display","none");

}

function goToPage(page){
  hideCmaps();
  $('#dcm').css("display","block");
  if(page == 1){
  $('#dcm').attr("src","")

  }

}
