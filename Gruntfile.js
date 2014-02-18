'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

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
                    '<%= app %>/js/**/*.js',
                    '<%= app %>/css/*.css',
                    '<%= app %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%= app %>/sass',
                    cssDir: '<%= app %>/css',
                    config: '<%= app %>/config.rb',
                    environment: 'development'
                }
            },

            prod: {
                options: {
                    sassDir: '<%= app %>/sass',
                    cssDir: '<%= app %>/build/css',
                    outputStyle: 'compressed',
                    noLineComments: true,
                    environment: 'production'
                }
            },

            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        clean: [ '<%= app %>/build/' ],

        uglify: {
            options: {
                banner: '/********************** <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("dd-mm-yyyy") %> **********************/\n'
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

    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-compass');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('default', ['connect:livereload', 'watch']);
    grunt.registerTask('lint', ['jshint', 'csslint:lax']);
    grunt.registerTask('build', ['clean', 'newer:uglify', 'compass:prod']);
};
