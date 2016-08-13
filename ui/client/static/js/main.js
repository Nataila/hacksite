var demo = new Vue({
  el: '#demo',
  data: {
    hackData: [],
    nowPage: 1
  },
  ready: function () {
    this.getJson(1);
  },
  methods: {
    testClick: function (arg) {
      console.log(arg);
    },
    getJson: function (page) {
      this.$http.get('http://127.0.0.1:3000/?page=' + page)
      .then(function (res) {
        console.log(res.data);
        this.hackData = res.data.result;
        this.nowPage = res.data.page;
      });
    },
    changePage: function (page) {
      this.getJson(page + 1);
    }
  }
});

// var pagination = new Vue({
//   el: '#pagination',
//   data: {
//     count: []
//   },
//   ready: function () {
//     this.getCount();
//   },
//   methods: {
//     getCount: function () {
//       this.$http.get('http://127.0.0.1:3000/pagination')
//       .then(function (res) {
//         console.log(res.data);
//         this.count = res.data.pageCount;
//       });
//     }
//   }
// });
// var App = Vue.extend({});
// var router = new VueRouter();
