'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            compass: {
                files: ['sass/*.scss'],
                tasks: ['compass:server']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '*.html',
                    'js/*.js',
                    'css/*.css',
                    'img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        compass: {
            options: {
                sassDir: 'sass',
                cssDir: 'css',
                config: 'config.rb'
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'js/*.js'
            ]
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: ['.']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('serve', ['jshint', 'connect:livereload', 'watch']);
    grunt.registerTask('default', ['jshint']);
};
