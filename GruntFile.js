module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            build: {
                src: ['*.ts'],
            },
            options: {
                sourceMap: false,
            }   
        },
        express: {
            dev: {
                options: {
                    script: 'app.js',
                    delay: 100
                }
            }
        },
        watch: {
            files: ['*.ts'],
            tasks: ['ts', 'express:dev'],
            options: {
                spawn: false
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
      grunt.log.writeln(filepath + ' has ' + action);
    })

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
 
    grunt.registerTask('default', ['ts', 'express:dev', 'watch']);
}