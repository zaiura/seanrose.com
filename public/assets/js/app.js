document.write('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfsbaXxP_nvLtPZrCF7a7oqHoCz3aJPyg&callback=myMap"></script>');

function myMap() {
    myCenter=new google.maps.LatLng(38.2221055, -80.536283);
    var mapOptions= {
      center:myCenter,
      zoom:15, scrollwheel: true, draggable: true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);
  
    var marker = new google.maps.Marker({
      position: myCenter,
    });     
    marker.setMap(map);
  } 
  
  function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  window.onscroll = function() {myFunction()};
  function myFunction() {
      var navbar = document.getElementById("myNavbar");
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
      } else {
          navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
      }
  }
  
  function toggleFunction() {
      var x = document.getElementById("navDemo");
      if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
      } else {
          x.className = x.className.replace(" w3-show", "");
      }
  }
//</script>
