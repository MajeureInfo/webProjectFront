const url_api = "https://pure-island-76277.herokuapp.com/api/rooms"

// create the room vue for the table.
var roomsVue = createRoomsVue("roomsVue", url_api);

// put the response from the request to the url in the attribute "data" of the given vue.
axios.get(url_api)
.then(function(response) {
  roomsVue.rooms = response.data;
});
