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
      browsers: [
        { id: 'chrome', name: 'Chrome', versions:'40, 41, 42, 43, 44' },
        { id: 'firefox', name: 'Firefox', versions:'20, 21, 22, 23, 24' },
        { id: 'edge', name: 'Edge', versions:'1' },
        { id: 'ie', name: 'Internet Explorer', versions:'8, 9, 10, 11' },
        { id: 'safari', name: 'Safari', versions:'6, 7, 8' }
      ],
      devices: [
        { id: 'iphone', name: 'iPhone', versions: '4, 5, 6' },
        { id: 'samsung', name: 'Samsung Galaxy', versions: 'S3, S4, S5, S6' },
        { id: 'nexus', name: 'Nexus', versions: '4, 5, 6' }
      ]
    },
    'questions': [
      { id:'q1', question:'Camera', value: false },
      { id:'q2', question:'Microphone', value: false },
      { id:'q3', question:'Custom Video Player', value: false },
      { id:'q4', question:'Utilizes Full Screen', value: false },
    ]
  }
};