// const url_api = "http://localhost:8080/api"
const url_api = "https://pure-island-76277.herokuapp.com/api"

var buildingVue = new Vue({
  el: "#buildingVue",
  data: {
    buildings: [],
  },
  methods: {
    goToDetails: function (event) {
      // redirect the user to the room page and set the building filter for the chosen one
      target = event.target;
      if (target.nodeName == "IMG") {
        // fix issue with Chrome browser
        target = target.parentNode
      }
      buildingId = parseInt(target.parentNode.parentNode.childNodes[0].textContent);
      root_url = window.location.href.slice(0, window.location.href.length-15);
      document.location.href=(root_url + "/rooms.html?buildingId=" + buildingId);
    }
  }
});

$(function () {
  // fill the building table with all the available data
  axios.get(url_api + "/buildings")
  .then(function(response) {
    buildingVue.buildings=response.data;
  })
  .then(function() {
    $(".loading").hide();
    $(".buildingLine").each(function() {
      $(this).fadeIn();
    });
  });
});
