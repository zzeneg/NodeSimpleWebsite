module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            options: {
                fast: 'never'
            },
            server: {
                tsconfig: 'server/tsconfig.json',
            },
            client: {
                tsconfig: 'client/tsconfig.json'
            }
        },
        express: {
            dev: {
                options: {
                    script: 'build/server/server.js',
                    delay: 100
                }
            }
        },
        watch: {
            server: {
                files: ['server/**/*.ts', 'server/tsconfig.json'],
                tasks: ['ts:server', 'express:dev']
            },
            client: {
                files: ['client/**/*.ts', 'client/tsconfig.json'],
                tasks: ['ts:client']
            },
            html: {
                files: ['client/**/*.html'],
                tasks: ['copy']
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['client/**/*.html'],
                    dest: 'build/',
                    filter: 'isFile'
                }, ],
            },
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['server/**/*.ts', 'client/**/*.ts']
            }
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            }
        },
        concurrent: {
            watch: {
                tasks: ["watch:server", "watch:client", "watch:html"]
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(filepath + ' has ' + action);
    })

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['ts:server', 'ts:client', 'copy', 'env:dev', 'express:dev', 'concurrent']);
    grunt.registerTask('commit', ['tslint', 'ts:server', 'ts:client']);
}