const url_api = "https://pure-island-76277.herokuapp.com/api"
//const url_api = "http://localhost:8080/api"

function fillTableWithAllRooms() {
  // request all the rooms and put the response in the attribute "data" of the roomsVue.
  axios.get(url_api + "/rooms")
  .then(function(response) {
    roomsVue.rooms = response.data;
  })
  .then(function() {
    $(".loading").hide();
    $(".roomLine").each(function() {
      $(this).fadeIn();
    });
  });
}

function fillTableWithFilter(buildingId) {
  // request the rooms of the chosen building and put the response in the attribute "data" of the roomsVue.
  axios.get(url_api + "/buildings/" + buildingId)
  .then(function(response) {
    roomsVue.rooms = response.data.rooms;
  })
  .then(function() {
    $(".loading").hide();
    $(".roomLine").each(function() {
      $(this).fadeIn();
    });
  });
}

function fillTable(value) {
  // fill the table depending on the value of the dropdown menu
  if (Number.isInteger(parseInt(value))) {
    fillTableWithFilter(value);
  } else if (value == "All"){
    fillTableWithAllRooms();
  }
}

// create the Building Vue for the dropdown menu
var buildingVue = new Vue({
  el: "#buildingFilter",
  data: {
    buildings: []
  }
});

// create the room vue for the table.
var roomsVue = createRoomsVue("roomsVue", url_api);

// fill the dropdown menu and the room table
$(function () {
  axios.get(url_api + "/buildings")
  .then(function(response) {
    buildingVue.buildings = response.data;
    setTimeout(function (){
      params = window.location.href.split("?")[1]
      if (params != undefined){
        params = params.split("=");
        param = params[0];
        value = parseInt(params[1]);
      }
      else {
        param="noParam";
        value="All";
      }
      if (param == "buildingId" && Number.isInteger(value)){
        // a building id is given in the url. We filter the table and change the dropdown menu.
        $('#inlineBuildingSelector').attr('disabled', false);
        $('#filterToggle').attr('checked', true);
        document.getElementById("inlineBuildingSelector").value=value;
      }
      fillTable(document.getElementById("inlineBuildingSelector").value);
    }, 100);
  });
});

// setup the filter on the building id
$('#inlineBuildingSelector').change(function() {
  $(".roomLine").hide();
  window.location.href.split("?")[0]; // remove parameters if any
  fillTable(document.getElementById("inlineBuildingSelector").value);
});

// Toggle the building selector depending of the checkbox state
$('#filterToggle').click(function() {
  if (this.checked) {
    $("#inlineBuildingSelector").attr('disabled', false);
    fillTable(document.getElementById("inlineBuildingSelector").value);
  }
  else {
    $("#inlineBuildingSelector").attr('disabled', true);
    fillTableWithAllRooms();
  }
});

// setup the mqtt client
var roomSubscriber = mqtt.connect("wss://roomSubscriber:roomSubscriber@m23.cloudmqtt.com:34160")

roomSubscriber.on('connect', function () {
  roomSubscriber.subscribe('rooms/#')
})

roomSubscriber.on('message', function (topic, message) {
  // change the picture of a light or ringer when receiving a mqtt message
  topic = topic.toString();
  if (!message.toString().includes(',')) {
    console.log("Bad message received.")
    return;
  }
  var sender = message.toString().split(',')[1];
  message = message.toString().split(',')[0];
  console.log("[mqtt] " + topic + " : " + message + " from " + sender)
  var type = topic.split('/')[2];
  var roomId = parseInt(topic.split('/')[1]);

  if (message == "switch" && (sender == "appClient" || sender == "arduinoClient") && Number.isInteger(roomId)) {
    // valid mqtt message received
    $(".roomLine").each(function (index, element){
      if (parseInt(element.childNodes[0].textContent) == roomId) {
        // element is the row of the table for the corresponding room
        switchPicture(element, type);
      }
    });
  }
  else if (roomId == "all"){
    $(".roomLine").each(function (index, element){
        // element is the row of the table for the corresponding room
        switchPicture(element, type);
    });
  }
})

function switchPicture(element, type) {
  // update the picture of an element
  if (type == "light"){
    if (element.childNodes[4].innerHTML == "<div><img src=\"img/light-on.png\"></div>") {
      element.childNodes[4].innerHTML = "<div><img src=\"img/light-off.png\"></div>";
    }
    else {
      element.childNodes[4].innerHTML = "<div><img src=\"img/light-on.png\"></div>";
    }
  }
  else if (type == "ringer"){
    if (element.childNodes[8].innerHTML == "<div><img src=\"img/ringer-on.png\"></div>") {
      element.childNodes[8].innerHTML = "<div><img src=\"img/ringer-off.png\"></div>";
    }
    else {
      element.childNodes[8].innerHTML = "<div><img src=\"img/ringer-on.png\"></div>";
    }
  }
}
