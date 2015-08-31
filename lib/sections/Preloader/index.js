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
      Tween.set(this.$el, {
        opacity: 0
      });
      done();
    },
    animateIn: function (req, done) {
      Tween.to(this.$el, 1, {
        opacity: 1,
        onComplete: done
      });
      this.preloaded();
    },
    animateOut: function (req, done) {
      Tween.to(this.$el, 1, {
        opacity: 0,
        onComplete: done
      });
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