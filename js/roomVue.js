var publisher = mqtt.connect("wss://publisher:publisher@m14.cloudmqtt.com:34219")

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
        publisher.publish( "room" + room.id + "/light", "switch");

        axios.post(url_api +'/rooms/'+ room.id + "/switch-light")
        .then(function(response) {
          roomVue.rooms = response.data;
        })
      },
      switchRinger(room) {
        //Send MQTT message to switch the ringer
        console.log("Switch Ringer " + room.id);
        publisher.publish( "room" + room.id + "/ringer", "switch");

        axios.post(url_api +'/rooms/'+ room.id + "/switch-ringer")
        .then(function(response) {
          roomVue.rooms = response.data;
        })
      }
    }
  });
  return roomVue;
}
