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
                tsconfig: 'client/tsconfig.json',
            }
        },
        express: {
            dev: {
                options: {
                    script: 'build/server/server.js',
                }
            }
        },
        watch: {
            server: {
                files: ['server/**/*.ts', 'server/tsconfig.json'],
                tasks: ['clean:server', 'ts:server', 'express:dev'],
                options: {
                    spawn: false,
                }
            },
            client: {
                files: ['client/**/*.ts', 'client/tsconfig.json'],
                tasks: ['clean:client', 'ts:client', 'copy']
            },
            html: {
                files: ['client/**/*.html'],
                tasks: ['clean:html', 'copy']
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
                tasks: ["watch:server", "watch:client", "watch:html"],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        clean: {
            build: ["build"],
            server: ["build/server"],
            client: ["build/client"],
            html: ["build/client/**/*.html"]
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
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean:build', 'ts:server', 'ts:client', 'copy', 'env:dev', 'express:dev', 'concurrent']);
    grunt.registerTask('commit', ['tslint', 'ts:server', 'ts:client']);
}