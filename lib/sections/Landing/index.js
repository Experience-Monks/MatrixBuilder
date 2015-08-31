'use strict';
var fs = require('fs');
var Vue = require('vue');
var model = require('../../model');
var _ = require('lodash');
var Tween = require('gsap');
var Landing = Vue.extend({
  replace: true,
  data: function () {
    return model['/'];
  },
  template: fs.readFileSync(__dirname + '/template.vue', 'utf8'),
  created: function () {},
  ready: function () {},
  computed: {},
  methods: {
    init: function (req, done) {
      this.model = model[req.route];
      var containerVue = document.createElement('div');
      document.body.appendChild(containerVue);
      this.$mount(containerVue);
      done();
    },
    animateIn: function (req, done) {
      done();
    },
    animateOut: function (req, done) {
      done();
    },
    resize: function (w, h) {},
    destroy: function (req, done) {
      this.$destroy(true);
      done();
    },
    onClick: function(e) {
      _.find(this.model.questions, { id: e.target.id }).value = e.target.checked;
      this.changeMatrix();
    },
    changeMatrix: function() {
      var questions = _.filter(this.model.questions, function(q) {
        return q.value;
      });
    }
  },
  components: {}
});
module.exports = Landing;