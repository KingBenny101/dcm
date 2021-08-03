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
  if (page == '11') {
    $("#dcm").attr(
      "src",
      "assets/CURRENT ELECTRICITY/CURRENT ELECTRICITY AND ELECTRIC ENERGY-CONTENT.cmap.html"
    );
  }
  if (page == '21') {
    $("#dcm").attr(
      "src",
      "assets/MEASUREMENT/MEASUREMENT-CONTENT.cmap.html"
    );
  }
  if (page == '31') {
    $("#dcm").attr(
      "src",
      "assets/LAWS OF MOTION/LAWS OF MOTION- CONTENT.cmap.html"
    );
  }
  if (page == '41') {
    $("#dcm").attr(
      "src",
      "assets/LIGHT/LIGHT - CONTENT.cmap.html"
    );
  }
  if (page == '51') {
    $("#dcm").attr(
      "src",
      "assets/SOUND/SOUND - CONTENT.cmap.html"
    );
  }
  closeModal();

}

function backwardCheck(){
  history.back();
  setTimeout(function(){
    var url = document.getElementById("dcm").contentWindow.location.href;
  
    if(url == "about:blank"){
      location.reload();
    }
  },25);

}

function setPageLocal(page){
  //THIS WAS A TOTALLY STUPID THING TO DO BUT I AM MORE LAZY TO CHANGE IT
  openModal(page);
}

function openModal(page){
  $("#modal").css("display","block");



  $('#icon1').hover(function(){$('#iconName').html("Lesson Plan");},function(){$('#iconName').html("");});
  $('#icon2').hover(function(){$('#iconName').html("Content");},function(){$('#iconName').html("");});

  
  var icon1 = document.getElementById('icon1');
  var icon2 = document.getElementById('icon2');


  icon1.addEventListener("click",function(){
    goToPage(page+'0');
  });

  icon2.addEventListener("click",function(){
    goToPage(page+'1');
  });
  
}

function closeModal() {
  $("#modal").css("display","none");
  var icon1 = document.getElementById('icon1');
  var icon2 = document.getElementById('icon2');

  icon1.removeEventListener("click");

  icon2.removeEventListener("click");
 
  
}

