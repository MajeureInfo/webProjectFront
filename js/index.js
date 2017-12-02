// const url_api = "https://pure-island-76277.herokuapp.com/api"
const url_api = "http://localhost:8080/api"

function fillTableWithAllRooms() {
  // request all the rooms and put the response in the attribute "data" of the roomsVue.
  axios.get(url_api + "/rooms")
  .then(function(response) {
    roomsVue.rooms = response.data;
  })
  .then(function() {
    $(".roomLine").each(function(index) {
        $(this).delay(100*index).fadeIn();
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
    $(".roomLine").each(function(index) {
        $(this).delay(100*index).fadeIn();
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

// create the Building Vue for the dropdown menu...
var buildingVue = new Vue({
  el: "#buildingFilter",
  data: {
    buildings: []
  }
});

// ... and fill the menu with the buildings id
$(function () {
  axios.get(url_api + "/buildings")
  .then(function(response) {
    buildingVue.buildings = response.data;
  });
});

// create and fill the room vue for the table.
var roomsVue = createRoomsVue("roomsVue", url_api);
fillTableWithAllRooms();


// setup the filter on the building id
$('#inlineBuildingSelector').change(function() {
  $(".roomLine").hide();
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
