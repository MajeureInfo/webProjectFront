// setup the mqtt client
var roomPublisher = mqtt.connect("wss://roomPublisher:roomPublisher@m23.cloudmqtt.com:34160")

function createRoomsVue(id, url_api) {
  // create a vue to contain all the rooms
  // and define methods for switching light and ringer status
  var roomVue = new Vue({
    el: "#" + id,
    data: {
      rooms: []
    },
    methods: {
      switchLight(room) {
        //Send MQTT message to switch the light
        console.log("Switch Light " + room.id);
        roomPublisher.publish( "rooms/" + room.id + "/light", "switch,webClient");

        axios.post(url_api +'/rooms/'+ room.id + "/switch-light")
        .then(function(response) {
          if ($("#inlineBuildingSelector").attr('disabled') == "disabled") {
            fillTable("All");
          }
          else {
            fillTable(document.getElementById("inlineBuildingSelector").value);
          }
        });
      },
      switchRinger(room) {
        //Send MQTT message to switch the ringer
        console.log("Switch Ringer " + room.id);
        roomPublisher.publish( "rooms/" + room.id + "/ringer", "switch,webClient");

        axios.post(url_api +'/rooms/'+ room.id + "/switch-ringer")
        .then(function(response) {
          if ($("#inlineBuildingSelector").attr('disabled') == "disabled") {
            fillTable("All");
          }
          else {
            fillTable(document.getElementById("inlineBuildingSelector").value);
          }
        });
      }
    }
  });
  return roomVue;
}
