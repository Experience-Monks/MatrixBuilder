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
   'description':"<p>Quickly check if that cool feature you want to use is supported by the device and OS matrix for your web project.</p><p>Begin by selecting the features you need for your particular project. As different features are selected the list of supported devices shown on the right will update. While there are work arounds and <a href='https://en.wikipedia.org/wiki/Polyfill'>polyfills</a> for some of these features they will not work in every situation so it's important that you check with your developer before making any promises.</p>",
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
          { id: 'stream', question: 'Camera or Microphone', info: 'For unsupported browsers you may, depending on the usecase, be able to use a Flash fallback. This usually only works for very simple interactions.', value: false },
          { id: 'video', question: 'In Browser Video', info: 'Only one video at a time can play on iOS and Android.<br/>Browser videos on the iPhone plays using the native player.', value: false },
          { id: 'fullscreen', question: 'Browser Full Screen', info: '', value: false },
          { id: 'canvas', question: 'Canvas', info: '', value: false },
          { id: 'webgl', question: 'WebGL', info: 'While supported on most modern devices, in some cases it needs to be manually enabled by the user', value: false },
          { id: 'svg', question: 'SVG', info: 'Used for vector graphics. Vector graphics are great at scaling and can be animated.', value: false },
          { id: 'audio-api', question: 'Web Audio API', info: 'High-level JavaScript API for processing and synthesizing audio', value: false },
          { id: 'speech-recognition', question: 'Web Speech', info: 'Works well in desktop Chrome and Android Chrome. For other desktop browsers you can use a service such as <a href="http://developer.att.com/apis/speech">AT&T&apos;s Speach API</a>. Safari and Internet Explorer also require the Flash fallback for accessing the microphone. This will not work on iOS devices.', value: false },
          { id: 'clipboard', question: 'Clipboard', info: 'Sometimes needs a flash fallback and can be a bit finicky.', value: false }
      ],
      advanced: Browsers.getQuestions()
    }
  }
};



module.exports = model;