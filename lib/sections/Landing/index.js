'use strict';
var fs = require('fs');
var Vue = require('vue');
var model = require('../../model');
var _ = require('lodash');
var Tween = require('gsap');
var Browsers = require('../../util/browserQuery');
var test = require('caniuse-api');
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
      this.model.questions.data = this.model.questions.basic;
      this.model.matrix.data = _.cloneDeep(this.model.matrix._default);
      var containerVue = document.createElement('div');
      document.body.appendChild(containerVue);
      this.$mount(containerVue);
      this.$$.questionType.innerHTML = this.model.questions.isBasic ? 'Advanced' : 'Basic';
      this.trim();
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
    onClickFilter: function(e) {
      _.find(this.model.questions.data, { id: e.target.id }).value = e.target.checked;

      this.changeMatrix();
    },
    onClickQuestionType: function(e) {
      var isBasic = !this.model.questions.isBasic;
      this.model.questions.isBasic = isBasic;

      if(isBasic) {
        this.$$.questionType.innerHTML = 'Advanced';
        this.model.questions.data = this.model.questions.basic;
      } else {
        this.$$.questionType.innerHTML = 'Basic';
        this.model.questions.data = this.model.questions.advanced;
      }

      this.changeMatrix();
    },
    changeMatrix: function() {
      var questions = this.model.questions.isBasic 
                      ? this.model.questions.basic
                      : this.model.questions.advanced;

      this.model.matrix.data = _.cloneDeep(this.model.matrix._default);

      _.forEach(questions, function(q) {
        if(q.value){
          this.changeMatrixFromFeature(q.id);
        }
      }.bind(this));
      
      this.trim();
    },
    changeMatrixFromFeature: function(id) {
      var availableBrowsers = Browsers.feature(id);

      for(var browser in availableBrowsers) {
        switch(browser) {
          case 'chrome':
          this.changeModel('desktop', 'Chrome', availableBrowsers[browser]);
          break;
          case 'firefox':
          this.changeModel('desktop', 'Firefox', availableBrowsers[browser]);
          break;
          case 'ie':
          this.changeModel('desktop', 'Internet Explorer', availableBrowsers[browser]);
          break;
          case 'edge':
          this.changeModel('desktop', 'Edge', availableBrowsers[browser]);
          break;
          case 'safari':
          this.changeModel('desktop', 'Safari', availableBrowsers[browser]);
          break;
          case 'and_chr':
          this.changeModel('android', 'browser', availableBrowsers[browser]);
          break;
          case 'ios_saf':
          this.changeModel('ios', 'browser', availableBrowsers[browser]);
          break;
        }
      }
    },
    // platform: desktop, ios, or android
    // type: os, browser, or mobile device such as Galaxy, Nexus, etc.
    // value: array of values such as [ 'S3', 'S4', 'S5' ], etc.
    changeModel: function(platform, type, value) {
      var data;

      if(platform === 'desktop') {
        if(this.model.matrix.data.desktop.browsers)
          data = this.model.matrix.data.desktop.browsers;
      } else if(type === 'os' || type === 'browser') {
        if(this.model.matrix.data.mobile[platform])
          data = this.model.matrix.data.mobile[platform];
      } else {
        if(this.model.matrix.data.mobile[platform].devices)
          data = this.model.matrix.data.mobile[platform].devices;
      }

      if(data && data[type]) {
        data[type] = _.intersection(data[type], value);

        if(data[type].length === 0) {
          if(type === 'os' || type === 'browser') {
            // this.$$[platform].style.display = 'none';
            data[type] = false;
          } 
          // else {
          //   delete data[type];
          // }
        } 
        // else if(data[type].length > 1) {
        //   data[type] = data[type].slice(0, 1);
        //   data[type][0] += '+';
        // }
      }
    },
    trim: function() {
      var browsers = this.model.matrix.data.desktop.browsers;
      
      for(var browser in browsers) {
        if(browsers[browser].length === 0) {
          browsers[browser] = false;
        } else if(browsers[browser].length > 1) {
          browsers[browser] = browsers[browser].slice(0, 1);
          browsers[browser][0] += '+';

        }
      }
    }
  },
  components: {}
});

module.exports = Landing;