module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 任务名称，需依据插件的说明来写
        clean: ["tmp", "litetmp"],
        concat: {
            // 子任务名称，这名称随你起
            dev: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                  'tmp/**/*.js'
                  //'../mergeLibs/*.js'
                ],
                // 执行任务后生成的目标文件
                dest: '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib.js'
            },
            // 子任务名称，这名称随你起
            dev5: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                  'tmp/**/*.js'
                  //'../mergeLibs/*.js'
                ],
                // 执行任务后生成的目标文件
                dest: '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib.js'
            },
            dev2: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - d.ts for Description\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                  'tmp/**/*.d.ts'
                ],
                // 执行任务后生成的目标文件
                dest: '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib.d.ts'
            },
            dev3: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                  'litetmp/**/*.js'
                ],
                // 执行任务后生成的目标文件
                dest: '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib_lite.js'
            },
            dev4: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - d.ts for Description\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                  'litetmp/**/*.d.ts'
                ],
                // 执行任务后生成的目标文件
                dest: '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib_lite.d.ts'
            }
        },
        uglify: {
            prod: {
                options: {
                    banner: '/*!\n * <%= pkg.name %> - compressed JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n *  qq:93749937 | Licence: helojo\n */\n'
                },
                files: {
                    '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib.min.js': ['<%= concat.dev.dest %>']
                }
            },
            lite: {
                options: {
                    banner: '/*!\n * <%= pkg.name %> - compressed JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n *  qq:93749937 | Licence: helojo\n */\n'
                },
                files: {
                    '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib_lite.min.js': ['<%= concat.dev3.dest %>']
                }
            }
        },
        watch: {
            files: ['src/**/*.ts'],
            tasks: ['typescript']
        },
        typescript: {
            base: {
                src: [ '3party/**/*.ts', 'src/**/*.ts'],
                dest: 'tmp',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    base_path: 'src',
                    sourcemap: false,
                    declaration: true
                }
            },
            lite: {
                src: [
                    //协议
                    'src/common/mahjong_common.ts',
					'src/common/common.ts',
					'src/common/lobby_exchange.ts',
					'src/common/mahjong_room.ts',
					'src/common/poker_room.ts',
					'src/common/mahjong_common.ts',
					'src/common/lobby.ts',
					'src/common/lobby_room.ts',
					'src/common/lobby_history.ts',

					'src/com/zqb/mvc/Command.ts',
					'src/com/zqb/mvc/Mediator.ts',
					'src/com/zqb/mvc/MvcData.ts',
					'src/com/zqb/mvc/MvcSender.ts',
					'src/com/zqb/mvc/Proxy.ts',
					
					'src/com/zqb/component/BasePanel.ts',
                    'src/com/zqb/component/BaseVc.ts',
					'src/com/zqb/component/BitmapText.ts',
                    'src/com/zqb/component/DataLoading.ts',
					'src/com/zqb/component/GameButton.ts',
                    'src/com/zqb/component/HeadMc.ts',
					'src/com/zqb/component/LoadSecondPanel.ts',
                    'src/com/zqb/component/LobbyMildAlertVC.ts',
					'src/com/zqb/component/MsgBox.ts',
                    'src/com/zqb/component/PublicLoadingView.ts',
					'src/com/zqb/component/TJLoadingUI.ts',

					'src/com/zqb/net/HeadLoader.ts',
					'src/com/zqb/net/Loader.ts',
					'src/com/zqb/net/NetConsts.ts',
					'src/com/zqb/utils/LobbyUtils.ts',
					'src/com/zqb/utils/ResUtil.ts',
					'src/com/zqb/mjl/MahJongLobbyFacade.ts',
					'src/com/zqb/mjl/MahJongLobbyFacadeConsts.ts',
					'src/com/zqb/mjl/commonModel/GlobalControl.ts',

					'src/com/zqb/mjl/consts/CostsTypeConst.ts',
					'src/com/zqb/mjl/consts/LobbyUIEventConsts.ts',
					'src/com/zqb/mjl/consts/PlayTypeConsts.ts',

					'src/com/zqb/mjl/control/LobbyDataRequestCommand.ts',
					'src/com/zqb/mjl/control/LobbyRemoveCommand.ts',
					'src/com/zqb/mjl/control/LobbySocketDataCommand.ts',
					'src/com/zqb/mjl/control/LobbyStartUpCommand.ts',
					
					'src/com/zqb/mjl/core/LobbyDataCache.ts',
					'src/com/zqb/mjl/core/LobbyPopupManager.ts',
					'src/com/zqb/mjl/core/MJLobbyEventListener.ts',
					'src/com/zqb/mjl/core/MJLobbyInfo.ts',
					
					'src/com/zqb/mjl/model/LobbyServerMJProxy.ts',
					'src/com/zqb/mjl/model/NetMgr.ts',
					
					'src/com/zqb/mjl/model/data/MJLobbyData.ts',
					
					'src/com/zqb/mjl/model/vo/CheckInVo.ts',
					'src/com/zqb/mjl/model/vo/JoinRoomVo.ts',
					'src/com/zqb/mjl/model/vo/ListVo.ts',
					'src/com/zqb/mjl/model/vo/VoiceDataVo.ts'

                    //接口
             

                   
                ],
                dest: 'litetmp',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    base_path: 'src',
                    sourcemap: false,
                    declaration: true
                }
            }
        },
        jsObfuscate: {
            base: {
                options: {
                    concurrency: 2,
                    keepLinefeeds: false,
                    keepIndentations: false,
                    encodeStrings: true,
                    encodeNumbers: true,
                    moveStrings: true,
                    replaceNames: true,
                    variableExclusions: ['^_get_', '^_set_', '^_mtd_']
                },
                files: {
                    '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib.js': [
                      '../MahjongLobbyLib/bin/mahjongLobbyLib/mahjongLobbyLib.js'
                    ]
                }
            }
        }
    });

    // 加载要使用的插件
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('js-obfuscator');
    // 注冊任务
    //grunt.registerTask('default', ['typescript:base', 'concat:dev', 'concat:dev2', /*"jsObfuscate:base",*/ "uglify:prod", "clean"]);
    grunt.registerTask('default', ['typescript:base', 'concat:dev', 'concat:dev2','concat:dev5',/* "jsObfuscate:base",*/ "uglify:prod", "clean"]);
    grunt.registerTask('lite', ['typescript:lite', 'concat:dev3', 'concat:dev4', "uglify:lite", "clean"]);

};