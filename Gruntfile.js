'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: 'app', // path to app files
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                spawn: false
            },

            watchsass: {
                files: [
                    '<%= app %>/sass/**/*.scss',
                ],
                tasks: ['sass:dev']
            },

            js: {
                files: [
                    '<%= app %>/js/**/*.js'
                ],
                tasks: ['jshint'],
            },


            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app %>/*.html',
                    '<%= app %>/js/**/*.js',
                    '<%= app %>/css/*.css',
                    '<%= app %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        sass: {
            dev: {
                options: {
                    // outputStyle: 'expanded',
                    lineNumbers: true
                },
                files: {
                    '<%= app %>/css/main.css': '<%= app %>/sass/main.scss',
                    '<%= app %>/css/ie.css': '<%= app %>/sass/ie.scss',
                    '<%= app %>/css/print.css': '<%= app %>/sass/print.scss'
                }
            },
            prod: {
                options: {
                    // outputStyle: 'compressed',
                    lineNumbers: false
                },
                files: {
                    '<%= app %>/build/css/main.css': '<%= app %>/sass/main.scss',
                    '<%= app %>/build/css/ie.css': '<%= app %>/sass/ie.scss',
                    '<%= app %>/build/css/print.css': '<%= app %>/sass/print.scss'
                }
            }
        },

        clean: [ '<%= app %>/build/' ],

        tag: {
            banner: '/* <%= pkg.name %>\n*/' +
                    '/* v<%= pkg.version %>\n*/' +
                    '/* <%= pkg.author %>\n*/' +
                    '/* Last updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },

        uglify: {
            options: {
                banner: '<%= tag.banner %>'
            },
            dist: {
                src: ['<%= app %>/js/*.js'], // not vendor files
                dest: '<%= app %>/build/js/app.min.js'
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
                hostname: 'localhost',
            },
            livereload: {
                options: {
                    base: ['<%= app %>']
                }
            }
        }

    });

    grunt.registerTask('default', ['connect:livereload', 'watch']);
    grunt.registerTask('lint', ['jshint', 'csslint:lax']);
    grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'sass:prod']);
};
