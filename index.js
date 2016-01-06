'use strict';
var domready = require('detect-dom-ready');
var framework = require('./lib/framework');
var settings = require('./lib/util/Settings');

domready(function () {
  framework.init();


  var el = document.querySelector('body');
  el.className = (el.className) ? (el.className+' '+settings.classes) : settings.classes;

  window.onresize = function(){
    var className = settings.getClassName();
    if(el.className !== className){
      el.className = className;
    }
  }
});