'use strict';
module.exports = {
  settings: {
    'UA': '',
    'PATH': process.env.PATH,
    'ENVIRONMENT': process.env.ENVIRONMENT
  },
  '/': {
    'title': 'Matrix Builder',
    'matrix': {
      desktop: {
        browsers: [
          { id: 'chrome', name: 'Chrome', versions:'40, 41, 42, 43, 44' },
          { id: 'firefox', name: 'Firefox', versions:'20, 21, 22, 23, 24' },
          { id: 'edge', name: 'Edge', versions:'1' },
          { id: 'ie', name: 'Internet Explorer', versions:'8, 9, 10, 11' },
          { id: 'safari', name: 'Safari', versions:'6, 7, 8' }
        ]
      },
      mobile: {
        ios: {
          os: '6, 7, 8, 9',
          browser: {
            name: 'Safari',
            versions: '6, 7, 8, 9'
          },
          devices: [
            { id: 'iphone', name: 'iPhone', versions: '4, 5, 6' }
          ]
        },
        android: {
          os: '4, 5, 6',
          browser: {
            name: 'Chrome',
            versions: '44'
          },
          devices: [
            { id: 'galaxy', name: 'Galaxy', versions: 'S3, S4, S5, S6' },
            { id: 'nexus', name: 'Nexus', versions: '4, 5, 6' }
          ]
        }
      }
    },
    'questions': [
      { id:'q1', question:'Camera', value: false },
      { id:'q2', question:'Microphone', value: false },
      { id:'q3', question:'Custom Video Player', value: false },
      { id:'q4', question:'Full Screen', value: false },
      { id:'q5', question:'Canvas', value: false },
      { id:'q6', question:'WebGL', value: false },
      { id:'q7', question:'SVG', value: false },
      { id:'q8', question:'Web Audio', value: false },
      { id:'q9', question:'Web Speech', value: false },
      { id:'q10', question:'Browser Video', value: false }
    ]
  }
};