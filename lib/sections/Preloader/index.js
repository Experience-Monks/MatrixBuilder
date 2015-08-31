'use strict';
var fs = require('fs');
var Vue = require('vue');
var model = require('../../model');
var Tween = require('gsap');
var Preloader = Vue.extend({
  replace: true,
  data: function () {
    return this.model;
  },
  template: fs.readFileSync(__dirname + '/template.vue', 'utf8'),
  created: function () {},
  ready: function () {},
  computed: {},
  methods: {
    init: function (req, done) {
      this.model = {};
      var containerVue = document.createElement('div');
      document.body.appendChild(containerVue);
      this.$mount(containerVue);
      done();
    },
    animateIn: function (req, done) {
      done();
      this.preloaded();
    },
    animateOut: function (req, done) {
      done();
    },
    resize: function (w, h) {},
    destroy: function (req, done) {
      this.$destroy(true);
      done();
    }
  },
  components: {}
});
module.exports = function (onComplete) {
  var vue = new Preloader();
  vue.preloaded = onComplete;
  return vue;
};