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
      _default: {
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
      },
      data: {}
    },
    'questions': {
      isBasic: true,
      data: [],
      basic: [
          { id: 'stream', question: 'Camera or Microphone', value: false },
          { id: 'video', question: 'Browser Video', value: false },
          { id: 'fullscreen', question: 'Browser Full Screen', value: false },
          { id: 'canvas', question: 'Canvas', value: false },
          { id: 'webgl', question: 'WebGL', value: false },
          { id: 'svg', question: 'SVG', value: false },
          { id: 'audio-api', question: 'Web Audio', value: false },
          { id: 'speech-recognition', question: 'Web Speech', value: false }
      ],
      advanced: Browsers.getQuestions()
    },
  }
};



module.exports = model;