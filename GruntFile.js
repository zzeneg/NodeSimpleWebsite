module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            build: {
                src: ['src/**/*.ts'],
                outDir: 'build'
            },
            options: {
                sourceMap: false,
            }
        },
        express: {
            dev: {
                options: {
                    script: 'build/app.js',
                    delay: 100
                }
            }
        },
        watch: {
            files: ['src/**/*.ts'],
            tasks: ['tslint', 'ts', 'express:dev'],
            options: {
                spawn: false
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['src/**/*.ts']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(filepath + ' has ' + action);
    })

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['tslint', 'ts', 'express:dev', 'watch']);
}