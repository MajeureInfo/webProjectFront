// const url_api = "http://localhost:8080/api"
const url_api = "https://pure-island-76277.herokuapp.com/api"

function fillTableWithBuildings() {
  axios.get(url_api + "/buildings")
  .then(function(response) {
    buildingVue.buildings=response.data;
  })
  .then(function() {
    $(".buildingLine").each(function(index) {
      $(this).delay(100*index).fadeIn();
    });
  });
}

var buildingVue = new Vue({
  el: "#buildingVue",
  data: {
    buildings: [],
  }
});

fillTableWithBuildings();
