'use strict';

var browserslist = require('browserslist');
var features = require('./features');
var _ = require('lodash');

function Browsers() {
  var max = this.max;
    var latestBrowsers = this.latestBrowsers = {};

    _.forEach(this.browsers, function(browser) {
        var num = browser === 'safari' ? max + 10 : max;
        var bList = browserslist('last ' + num + ' ' + browser + ' versions');

      if(browser === 'safari' || browser === 'ios_saf') {
        latestBrowsers[browser] = _.chain(bList)
                                    .map(function(item) {
                                      return item.replace(/.* /, '');
                                    })
                                    .reduce(function(result, item) {
                                      var v = item.replace(/\..*/, '');

                                      if(parseInt(v) >= 6) {
                                        result.push(v);
                                      }

                                      return result;
                                    }, [])
                                    .uniq()
                                    .takeRight(max)
                                    .value()
                                    .reverse();

      } else if(browser === 'edge') {
        latestBrowsers[browser] = _.map(bList, function(item) { 
                                     return (parseInt(item.replace(/.* /, '')) - 11).toString();
                                   })
                                   .reverse();
      } else if(browser === 'ie') {
        latestBrowsers[browser] = _.chain(bList)
                                   .map(function(item) { 
                                     return item.replace(/.* /, '');
                                   })
                                   .reduce(function(result, item) {

                                      if(parseInt(item) >= 8) {
                                        result.push(item);
                                      }

                                      return result;
                                   }, [])
                                   .value()
                                   .reverse();
      } else {
        latestBrowsers[browser] = _.map(bList, function(item) { 
                                     return item.replace(/.* /, '');
                                   })
                                   .reverse();
      }
    });
}

Browsers.prototype = {
  _featureCache: {},
  max: 5,
  browsers: [
    'chrome',
    'firefox',
    'safari',
    'ie',
    'edge',
    'and_chr',
    'ios_saf'
  ],
  filter: function(versions) {
    var result = [];

    for(var version in versions) {
      if(versions[version][0] === 'y' || versions[version][0] === 'a') {
        if(version.match('-')) {
          version.split('-').forEach(function(v) {
            result.push(v);
          });
        } else {
          result.push(version);
        }
      }
    }

    return result;
  },
  feature: function(f) {
    if(this._featureCache[f])
      return this._featureCache[f];

    var result = {};  
    var browsers = {};

    this.browsers.forEach(function(browser) {
      browsers[browser] = this.filter(features[f]().stats[browser])
                              .sort(function(a, b) { return b-a; });
    }.bind(this));

    browsers['edge'] = _.map(browsers['edge'], function(item) { 
       return (parseInt(item.replace(/.* /, '')) - 11).toString();
     });

    this._featureCache[f] = browsers;

    return browsers;
  },
  getLatest: function(browser) {
    return this.latestBrowsers[browser];
  },
  getQuestions: function() {
    var questions = [];

    for(var feature in features) {
      questions.push(
        { id: feature, question: feature, value: false }
      );
    }

    return questions;
  }
};

module.exports = new Browsers();