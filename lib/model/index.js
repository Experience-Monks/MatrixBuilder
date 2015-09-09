'use strict';

var Browsers = require('../util/browserQuery');

var model = {
  settings: {
    'UA': '',
    'PATH': process.env.PATH,
    'ENVIRONMENT': process.env.ENVIRONMENT
  },
  '/': {
    'title': 'Matrix Builder',
    'matrix': {
      data: {},
      template: {
        desktop: {
          browsers: {
            'Chrome': Browsers.getLatest('chrome'),
            'Firefox': Browsers.getLatest('firefox'),
            'Edge': Browsers.getLatest('edge'),
            'Internet Explorer': Browsers.getLatest('ie'),
            'Safari': Browsers.getLatest('safari')
          }
        },
        mobile: {
          ios: {
            'os': Browsers.getLatest('ios_saf'),
            'browser': Browsers.getLatest('ios_saf'),
            'devices': {
              'iPhone': [ '5', '5c', '6', '6+' ],
              'iPad Air': [ '1', '2' ],
              'iPad Mini': [ '1', '2' ]
            }
          },
          android: {
            'os': [ '4', '5', '6' ],
            'browser': Browsers.getLatest('and_chr'),
            'devices': {
              'Galaxy': [ 'S4', 'S5', 'S6' ],
              'Nexus': [ '4', '5', '6' ],
              'Nexus Tablet': [ '9' ]
            }
          }
        }
      }
    },
    'questions': {
      data: [],
      isBasic: true,
      basic: [
          { id: 'stream', question: 'Camera or Microphone', info: 'Extra information goes here!<br/>More information goes here!', value: false },
          { id: 'video', question: 'In Browser Video', info: 'Only one video at a time can play on iOS and Android.<br/>Browser videos on the iPhone only plays using the native player.', value: false },
          { id: 'fullscreen', question: 'Browser Full Screen', info: 'Extra information goes here!', value: false },
          { id: 'canvas', question: 'Canvas', info: 'Extra information goes here!', value: false },
          { id: 'webgl', question: 'WebGL', info: 'Extra information goes here<br/>More information goes here!!', value: false },
          { id: 'svg', question: 'SVG', info: 'Extra information goes here!', value: false },
          { id: 'audio-api', question: 'Web Audio API', info: 'High-level JavaScript API for processing and synthesizing audio', value: false },
          { id: 'speech-recognition', question: 'Web Speech', info: 'Extra information goes here!', value: false },
          { id: 'clipboard', question: 'Clipboard', info: 'Extra information goes here!', value: false }
      ],
      advanced: Browsers.getQuestions()
    }
  }
};



module.exports = model;