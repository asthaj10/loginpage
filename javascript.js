function myFunction() {
  var x = document.getElementById("forms");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
    window.location.href = 'http://www.google.com';
  }
}