
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'dist/.',
          livereload: true
        }
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      styles: {
        src: [
          'bower_components/semantic-ui/dist/**/*.css',
          'styles/**/*.css'
        ],
        dest: 'dist/css/app.css'
      },      
      app: {
        src: [
          'bower_components/semantic-ui/dist/**/*.js',
          'lib/**/*.js',

          'application/app.js', 
          'application/models/**/*.js',
          'application/filters/**/*.js',
          'application/controllers/**/*.js'
        ],
        dest: 'dist/js/app.js'
      },
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/app.css': [
            '<%= concat.styles.dest %>',            
          ]
        }
      }
    },

    uglify: {
      options: {        
      },      
      app: {
        files: {          
          'dist/js/app.js': [            
            '<%= concat.app.dest %>'
          ]
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'], options : { reload: true } },
      application: {
        files: ['application/**/*.js'],
        tasks: ['concat'],
        options: {
          debounceDelay: 200
        }
      },
      all : {
          files: ['dist/**/*.css','dist/**/*.html', 'dist/**/*.js'],
          options: {
            livereload: true
          }
      }
    },

  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('build',['concat']);
  grunt.registerTask('dist',['concat','uglify','cssmin']);
  grunt.registerTask('default', ['build','connect','watch']);
}
