const url_api = "https://pure-island-76277.herokuapp.com/api"
//const url_api = "http://localhost:8080/api"

const objectType = $('h1').attr('class');

// create the vue for the dropdown menu in the formular.
var dropdownVue = createRoomsVue("switchOneRoom", url_api + "/rooms");

function refresh() {
  // refresh the list of the rooms depending on the chosen state.
  var state = document.getElementById('roomStateSelector').value;
  var alert = $('.alert-oneRoom-fail');
  if (state == "ON") {
    axios.get(url_api + "/rooms/list-with-" + objectType + "-on")
    .then(function(response) {
      dropdownVue.rooms = response.data;
      // check if the list of the rooms with state 'on' is not empty.
      if (response.data.length == 0) {
        $('#roomNumberSelector').attr('disabled', true);
        $('#submitSingleRoom').attr('disabled', true);
        alert.text("All the " + objectType + "s are off !");
        alert.fadeIn('fast');
      }
      else {
        $('#roomNumberSelector').attr('disabled', false);
        $('#submitSingleRoom').attr('disabled', false);
        alert.fadeOut('fast');
      }
    });
  }
  else {
    axios.get(url_api + "/rooms/list-with-" + objectType + "-off")
    .then(function(response) {
      dropdownVue.rooms = response.data;
      // check if the list of the rooms with state 'off' is not empty.
      if (response.data.length == 0) {
        $('#roomNumberSelector').attr('disabled', true);
        $('#submitSingleRoom').attr('disabled', true);
        alert.text("All the " + objectType + "s are on !");
        alert.fadeIn('fast');
      }
      else {
        $('#roomNumberSelector').attr('disabled', false);
        $('#submitSingleRoom').attr('disabled', false);
        alert.fadeOut('fast');
      }
    });
  }
}

refresh();

/******************************/
/* Switch the state of a room */
/******************************/
$('#roomStateSelector').change(function() {
  $('#roomStatus').text(document.getElementById('roomStateSelector').value);
  refresh();
});

$('#singleRoomForm').on('submit', function(e) {
  // turn the state off when submitting the formular.
  e.preventDefault();
  var roomId = document.getElementById("roomNumberSelector").value;
  if (roomId != "Choose...") {
    axios.post(url_api +'/rooms/'+ roomId + "/switch-" + objectType);
    axios.post("http://192.168.43.228/" + roomId);
    // leave a bit of time to the server before asking to refresh
    setTimeout(function() {
      refresh();
      var alert = $('.alert-oneRoom-success');
      var state = document.getElementById('roomStateSelector').value;
      state = state == "ON" ? "off" : "on";
      alert.text(objectType + " of the room " + roomId + " successfully turned " + state + " !");
      alert.fadeIn();
      setTimeout(function () {
        alert.fadeOut();
      }, 2000);
    }, 500);
  }
});

/*********************************/
/* Switch the state of all rooms */
/*********************************/
$('#globalStateSelector').change(function() {
  var state = document.getElementById('globalStateSelector').value;
  if (state == "ON") {
    $('#globalStatus').text("ON");
    $('#inverseGlobalStatus').text("OFF");
  } else {
    $('#globalStatus').text("OFF");
    $('#inverseGlobalStatus').text("ON");
  }
});

$('#allRoomsForm').on('submit', function(e) {
  // turn the light off when submitting the formular.
  e.preventDefault();
  var roomId = document.getElementById("roomNumberSelector").value;
  var state = document.getElementById('globalStateSelector').value;
  if (roomId != "Choose...") {
    var newState = state == "ON" ? "off" : "on";
    var arduinoCommand = state == "ON" ? 8 : 9;
    axios.post(url_api +"/rooms/switch-all-" + objectType + "s-" + newState);
    axios.post("http://192.168.43.228/" + arduinoCommand);
    // leave a bit of time to the server before asking to refresh
    setTimeout(function() {
      var alert = $('.alert-allRooms-success');
      alert.text("All the " + objectType + "s have been successfully turned " + newState + " !");
      alert.fadeIn();
      setTimeout(function () {
        alert.fadeOut();
      }, 2000);
    }, 500);
  }
});
