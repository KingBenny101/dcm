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
  closeModal();

  $("#dcm").css("display", "block");

  var assetsPath = window.getPath();
  assetsPath =assetsPath.replace(/resources/, "/");
  assetsPath =assetsPath.replace(/app.asar/, "/");

  console.log(assetsPath);
  if (page == "10") {
    $("#dcm").attr(
      "src",
      assetsPath +
        "/CURRENT ELECTRICITY AND ELECTRIC ENERGY/CURRENT ELECTRICITYAND ELECTRIC ENERGY LESSON PLAN.cmap.html"
    );
  }
  if (page == "20") {
    $("#dcm").attr(
      "src",
      assetsPath + "/MEASUREMENT/MEASUREMENT LESSON PLAN.cmap.html"
    );
  }
  if (page == "30") {
    $("#dcm").attr(
      "src",
      assetsPath + "/LAWS OF MOTION/LAWS OF MOTION LESSON PLAN.cmap.cmap.html"
    );
  }
  if (page == "40") {
    $("#dcm").attr("src", assetsPath + "/LIGHT/LIGHT LESSON PLAN.cmap.html");
  }
  if (page == "50") {
    $("#dcm").attr("src", assetsPath + "/SOUND/SOUND LESSON PLAN.cmap.html");
  }

  if (page == "11") {
    $("#dcm").attr(
      "src",
      assetsPath +
        "/CURRENT ELECTRICITY AND ELECTRIC ENERGY/CURRENT ELECTRICITY AND ELECTRIC ENERGY-CONTENT.cmap.html"
    );
  }
  if (page == "21") {
    $("#dcm").attr(
      "src",
      assetsPath + "/MEASUREMENT/MEASUREMENT-CONTENT.cmap.html"
    );
  }
  if (page == "31") {
    $("#dcm").attr(
      "src",
      assetsPath + "/LAWS OF MOTION/LAWS OF MOTION- CONTENT.cmap.html"
    );
  }
  if (page == "41") {
    $("#dcm").attr("src", assetsPath + "/LIGHT/LIGHT - CONTENT.cmap.html");
  }
  if (page == "51") {
    $("#dcm").attr("src", assetsPath + "/SOUND/SOUND - CONTENT.cmap.html");
  }
}

function backwardCheck() {
  history.back();
  setTimeout(function () {
    var url = document.getElementById("dcm").contentWindow.location.href;

    if (url == "about:blank") {
      location.reload();
    }
  }, 25);
}

function setPageLocal(page) {
  //THIS WAS A TOTALLY STUPID THING TO DO BUT I AM MORE LAZY TO CHANGE IT
  openModal(page);
}

function openModal(page) {
  $("#modal").css("display", "block");

  $("#icon1").hover(
    function () {
      $("#iconName").html("Lesson Plan");
    },
    function () {
      $("#iconName").html("");
    }
  );
  $("#icon2").hover(
    function () {
      $("#iconName").html("Content");
    },
    function () {
      $("#iconName").html("");
    }
  );

  var icon1 = document.getElementById("icon1");
  var icon2 = document.getElementById("icon2");

  icon1.addEventListener("click", function () {
    goToPage(page + "0");
  });

  icon2.addEventListener("click", function () {
    goToPage(page + "1");
  });
}

function closeModal() {
  $("#modal").css("display", "none");
  var icon1 = document.getElementById("icon1");
  var icon2 = document.getElementById("icon2");

  icon1.removeEventListener("click",null);

  icon2.removeEventListener("click",null);
}
