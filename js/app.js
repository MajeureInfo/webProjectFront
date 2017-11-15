const url_api = "https://pure-island-76277.herokuapp.com/api/rooms"

var roomsVue = new Vue({
  el: '#roomsVue',
  data: {
    rooms: []
  },
  methods: {
    switchLight(room) {
      axios.post(url_api +'/'+ room.id + "/switch-light")
      .then(function(response) {
        roomsVue.rooms=response.data;
      })
    },
    switchRinger(room) {
      axios.post(url_api +'/'+ room.id + "/switch-ringer")
      .then(function(response) {
        roomsVue.rooms=response.data;
      })
    }
  }
})

axios.get(url_api)
.then(function(response) {
  roomsVue.rooms = response.data;
});
