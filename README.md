#App Template

Webapp template, using

- Grunt
- Compass/Sass

##Installation

1. Clone this repo
2. Run `npm install` in the root folder

##Usage

Currently there are three grunt tasks:

1. `grunt` - will run CSSLint in lax mode (warnings not errors) and JSHint. JSHint options are set in 
.jshintrc in the root folder.
1. `grunt csslint` - runs CSSLint on files in /app/css and treat all rules as errors. Options are 
currently listed here: https://github.com/gruntjs/grunt-contrib-csslint , but there's no local config yet. 
1. `grunt serve` opens the site in a browser and auto-refreshes when a change is made to a CSS, JS, HTML or image file.
Also compiles SASS files - config set in /app/config.rb and Gruntfile. Stop the server with Ctrl+C
