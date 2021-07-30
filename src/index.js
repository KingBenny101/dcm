window.addEventListener("load", function () {
  //close button
  var closeButton = document.getElementsByClassName("close")[0];
  console.log("yolo");
  closeButton.addEventListener("click", function () {
    console.log("yolo");

    window.close();
  });
  setTimeout(function () {
    window.scroll(screen.width / 2, screen.height / 2);
  }, 1);
});
