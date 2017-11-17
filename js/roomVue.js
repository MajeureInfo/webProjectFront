function createRoomsVue(id, url_api) {
  // create a vue to contain all the rooms
  // and define methods for switching light and ringer status
  var genericVue = new Vue({
    el: "#" + id,
    data: {
      rooms: []
    },
    methods: {
      switchLight(room) {
        axios.post(url_api +'/'+ room.id + "/switch-light")
        .then(function(response) {
          genericVue.rooms = response.data;
        })
      },
      switchRinger(room) {
        axios.post(url_api +'/'+ room.id + "/switch-ringer")
        .then(function(response) {
          genericVue.rooms = response.data;
        })
      }
    }
  });
  return genericVue;
}
