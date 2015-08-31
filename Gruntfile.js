module.exports = function (grunt) {
  'use strict';
  var lessPrefixPlugin = new(require('less-plugin-autoprefix'))({
    browsers: ['last 2 versions', 'Chrome 42', 'Firefox 37', 'iOS 7', 'Safari 5', 'Explorer 8']
  });
  var loader = require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    config: {
      'assets': 'raw-assets',
      'src': 'lib',
      'dev': '.tmp',
      'dist': 'release',
      'libs': '',
      'devPath': './assets/images/',
      'livePath': './assets/images/'
    },
    licensechecker: {
      'options': {
        'warn': true,
        'outFile': null,
        'acceptable': ['MIT', 'MIT/X11', 'BSD', 'ISC', 'WTFPL', 'BSD-2', 'BSD-3', 'Apache2', 'Apache-2.0'],
        'include': ['dependencies', 'devDependencies', 'peerDependencies']
      }
    },
    less: {
      'dev': {
        'options': {
          'compress': true,
          'sourceMap': true,
          'sourceMapFilename': '<%= config.dev %>/main.css.map',
          'sourceMapBasepath': '<%= config.dev %>/',
          'plugins': [lessPrefixPlugin],
          'modifyVars': {
            'path': '<%= "config.devPath" %>'
          }
        },
        'files': {
          '<%= config.dev %>/main.css': '<%= config.src %>/less/main.less'
        }
      },
      'dist': {
        'options': {
          'compress': true,
          'cleancss': true,
          'plugins': [lessPrefixPlugin],
          'modifyVars': {
            'path': '<%= "config.livePath" %>'
          }
        },
        'files': {
          '<%= config.dist %>/main.css': '<%= config.src %>/less/main.less'
        }
      }
    },
    browserify: {
      'dev': {
        'src': 'index.js',
        'dest': '<%= config.dev %>/bundle.js',
        'options': {
          'debug': true,
          'watch': true,
          'verbose': true,
          'open': true,
          'browserifyOptions': {
            'debug': true
          },
          'transform': [
            ['envify',
            {
              'ENVIRONMENT': 'dev',
              'PATH': '<%= config.devPath %>'
            }]
          ]
        }
      },
      'dist': {
        'src': 'index.js',
        'dest': '<%= config.dist %>/bundle.js',
        'options': {
          'debug': false,
          'verbose': false,
          'transform': [
            ['envify',
            {
              'ENVIRONMENT': 'prod',
              'PATH': '<%= config.livePath %>'
            }]
          ]
        }
      }
    },
    connect: {
      'dev': {
        'options': {
          'base': ['<%= config.dev %>/', 'app/', '*'],
          'keepalive': false,
          'hostname': '0.0.0.0'
        }
      }
    },
    pngmin: {
      'dynamic': {
        'options': {
          'force': true,
          'ext': '.png'
        },
        'files': [{
          'expand': true,
          'cwd': '<%= config.dev %>/assets/images/',
          'src': ['*.png', 'tp/*.png'],
          'dest': '<%= config.dist %>/assets/images/'
        }]
      }
    },
    watch: {
      'options': {
        'livereload': true
      },
      'less': {
        'files': ['<%= config.src %>/less/**/*.less', '<%= config.src %>/**/*style.*'],
        'tasks': ['less:dev']
      },
      'browserify': {
        'files': ['<%= config.src %>/**/*.js', '*.js', '<%= config.src %>/**/*template.*'],
        'tasks': ['browserify:dev']
      },
      'assets': {
        'files': ['<%= config.assets %>/**/*'],
        'tasks': ['copy:dev']
      }
    },
    copy: {
      'dev': {
        'files': [{
          'expand': true,
          'cwd': '<%= config.assets %>/json/',
          'src': '**',
          'dest': '<%= config.dev %>/assets/json/'
        },
        {
          'expand': true,
          'cwd': '<%= config.assets %>/images/',
          'src': ['**'],
          'dest': '<%= config.dev %>/assets/images/'
        },
        {
          'expand': true,
          'cwd': '<%= config.assets %>/sounds/',
          'src': ['**'],
          'dest': '<%= config.dev %>/assets/sounds/'
        },
        {
          'expand': true,
          'cwd': '<%= config.assets %>/videos/',
          'src': ['**'],
          'dest': '<%= config.dev %>/assets/videos/'
        },
        {
          'expand': true,
          'cwd': '<%= config.assets %>/fonts/',
          'src': ['**'],
          'dest': '<%= config.dev %>/assets/fonts/'
        }]
      },
      'dist': {
        'files': [{
          'expand': true,
          'cwd': '<%= config.dev %>/assets/json/',
          'src': ['**'],
          'dest': '<%= config.dist %>/assets/json/'
        },
        {
          'expand': true,
          'cwd': '<%= config.dev %>/assets/images/',
          'src': ['**'],
          'dest': '<%= config.dist %>/assets/images/'
        },
        {
          'expand': true,
          'cwd': '<%= config.dev %>/assets/sounds/',
          'src': ['**'],
          'dest': '<%= config.dist %>/assets/sounds/'
        },
        {
          'expand': true,
          'cwd': '<%= config.dev %>/assets/videos/',
          'src': ['**'],
          'dest': '<%= config.dist %>/assets/videos/'
        },
        {
          'expand': true,
          'cwd': '<%= config.dev %>/assets/fonts/',
          'src': ['**'],
          'dest': '<%= config.dist %>/assets/fonts/'
        },
        {
          'dot': true,
          'expand': true,
          'cwd': 'app/',
          'src': ['**'],
          'dest': '<%= config.dist %>'
        }]
      }
    },
    uglify: {
      'options': {
        'preserveComments': 'some'
      },
      'release': {
        'files': {
          '<%= config.dist %>/bundle.js': ['<%= config.dist %>/bundle.js']
        }
      }
    },
    compress: {
      'main': {
        'options': {
          'mode': 'gzip'
        },
        'files': [{
          'expand': true,
          'cwd': '<%= config.dist %>/',
          'src': '*.js',
          'dest': '<%= config.dist %>/',
          'ext': '.js.gz'
        },
        {
          'expand': true,
          'cwd': '<%= config.dist %>/',
          'src': '*.css',
          'dest': '<%= config.dist %>/',
          'ext': '.css.gz'
        }]
      }
    }
  });
  grunt.registerTask('default', ['copy:dev', 'licensechecker', 'newer:browserify:dev', 'newer:less:dev', 'connect', 'watch']);
  grunt.registerTask('release', ['browserify:dist', 'pngmin', 'copy:dist', 'less:dist', 'uglify', 'compress']);
};