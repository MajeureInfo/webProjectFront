var roomsVue = new Vue({
  el: '#roomsVue',
  data: {
    rooms: [
      { id: 0,
        light: {
          level:32,
          status:"OFF"
        },
        noise: {
          level:32,
          status:"ON"
        }
      },
      { id: 1,
        light: {
          level:23,
          status:"ON"
        },
        noise: {
          level:15,
          status:"OFF"
        }
      },
    ]
  }
})
