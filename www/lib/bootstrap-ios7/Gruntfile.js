/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var generateRatchiconsData = require('./grunt/bs-ratchicons-data-generator.js');
  var updateShrinkwrap = require('./grunt/shrinkwrap.js');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap iOS7 v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\') }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist', 'docs/dist', 'fonts', 'dist/fonts']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      src: {
        src: 'js/*.js'
      },
      test: {
        src: 'js/tests/unit/*.js'
      },
      assets: {
        src: ['docs/assets/js/application.js', 'docs/assets/js/customizer.js']
      }
    },

    jscs: {
      options: {
        config: 'js/.jscs.json',
      },
      grunt: {
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      src: {
        src: 'js/*.js'
      },
      test: {
        src: 'js/tests/unit/*.js'
      },
      assets: {
        src: ['docs/assets/js/application.js', 'docs/assets/js/customizer.js']
      }
    },

    csslint: {
      options: {
        csslintrc: 'sass/.csslintrc'
      },
      src: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css',
        'docs/assets/css/docs.css',
        'docs/examples/**/*.css'
      ]
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: 'dist/js/bootstrap.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      bootstrap: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/bootstrap.min.js'
      },
      docsJs: {
        options: {
          preserveComments: 'some'
        },
        src: [
          'docs/assets/js/vendor/holder.js',
          'docs/assets/js/application.js'
        ],
        dest: 'docs/assets/js/docs.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          sourceComments: 'map',
          sourceMap: 'dist/css/bootstrap.map'
        },
        files: {
          'dist/css/bootstrap.css': 'sass/<%= pkg.name %>.scss'
        }
      },
      dist_min: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/bootstrap.min.css': 'sass/<%= pkg.name %>.scss'
        }
      },
      dist_theme: {
        options: {
          sourceComments: 'map',
          sourceMap: 'dist/css/bootstrap-theme.map'
        },
        files: {
          'dist/css/bootstrap-theme.css': 'sass/bootstrap-theme.scss'
        }
      },
      dist_theme_min: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/bootstrap-theme.min.css': 'sass/bootstrap-theme.scss'
        }
      }
    },

    cssmin: {
      compress: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        src: [
          'docs/assets/css/docs.css',
          'docs/assets/css/pygments-manni.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/bootstrap.css',
            'dist/css/bootstrap.min.css',
            'dist/css/bootstrap-theme.css',
            'dist/css/bootstrap-theme.min.css'
          ]
        }
      }
    },

    csscomb: {
      options: {
        config: 'sass/.csscomb.json'
      },
      dist: {
        files: {
          'dist/css/bootstrap.css': 'dist/css/bootstrap.css',
          'dist/css/bootstrap-theme.css': 'dist/css/bootstrap-theme.css'
        }
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
      }
    },

    copy: {
      ratchicons: {
        expand: true,
        flatten: true,
        src: 'bower_components/ratchet/fonts/*',
        dest: 'fonts/'
      },
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: 'dist/'
      },
      docs: {
        expand: true,
        cwd: './dist',
        src: [
          '{css,js}/*.min.*',
          'css/*.map',
          'fonts/*'
        ],
        dest: 'docs/dist'
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: 'js/tests/index.html'
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      docs: {}
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: '_gh_pages/**/*.html'
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      sass: {
        files: 'sass/*.scss',
        tasks: 'sass'
      }
    },

    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 10,
          urls: ['http://127.0.0.1:3000/js/tests/index.html'],
          browsers: grunt.file.readYAML('test-infra/sauce_browsers.yml')
        }
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      },
      npmShrinkWrap: {
        command: 'npm shrinkwrap --dev'
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'core') {
    testSubtasks = testSubtasks.concat(['dist-css', 'csslint', 'jshint', 'jscs', 'qunit']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'validate-html') {
    testSubtasks.push('validate-html');
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      (!process.env.TWBS_TEST || process.env.TWBS_TEST === 'sauce-js-unit')) {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['sass', 'cssmin', 'csscomb', 'usebanner']);

  // Docs distribution task.
  grunt.registerTask('dist-docs', 'copy:docs');

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'copy', 'dist-js', 'dist-docs']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist', 'build-ratchicons-data', 'update-shrinkwrap']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');

  grunt.registerTask('build-ratchicons-data', generateRatchiconsData);

  // Task for updating the npm packages used by the Travis build.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', 'exec:npmShrinkWrap', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () { updateShrinkwrap.call(this, grunt); });
};
