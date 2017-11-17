const url_api = "https://pure-island-76277.herokuapp.com/api/rooms"

// create the vue for the dropdown menu in the formular.
var dropdownVue = createRoomsVue("dropdown", url_api);

function refresh() {
  // refresh the list of the rooms with the response from the url.
  axios.get(url_api + "/list-with-on-lights")
  .then(function(response) {
    dropdownVue.rooms = response.data;
    // check if the list of the rooms with a light on is not empty.
    if (response.data.length == 0) {
      $('select').attr('disabled', 'true');
      $('#submit').attr('disabled', 'true');
      var alert = $('.alert-secondary');
      alert.text("All the lights are off !");
      alert.fadeIn();
    }
  });
}

refresh();

$('form').on('submit', function(e) {
  // turn the light off when submitting the formular.
  e.preventDefault();
  var roomId = document.getElementById("inlineFormSelect").value;
  if (roomId != "Choose...") {
    axios.post(url_api +'/'+ roomId + "/switch-light");
    // leave a bit of time to the server before asking to refresh
    setTimeout(function() {
      refresh();
      var alert = $('.alert-success');
      alert.text("Light of the room " + roomId + " successfully turned off !");
      alert.fadeIn();
      setTimeout(function () {
        alert.fadeOut();
      }, 2000);
    }, 500);
  }
});
