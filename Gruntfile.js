'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        app: 'app', // path to app files
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            compass: {
                files: ['<%= app %>/sass/*.scss'],
                tasks: ['compass:server']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app %>/*.html',
                    '<%= app %>/js/*.js',
                    '<%= app %>/css/*.css',
                    '<%= app %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        compass: {
            options: {
                sassDir: '<%= app %>/sass',
                cssDir: '<%= app %>/css',
                config: '<%= app %>/config.rb'
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
                '<%= app %>/js/*.js'
            ]
        },

        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['<%= app %>/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['<%= app %>/css/*.css']
            }
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
                    base: ['<%= app %>']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('serve', ['jshint', 'connect:livereload', 'watch']);
    grunt.registerTask('default', ['jshint', 'csslint:lax']);
};
