### 运行于JavaScript环境下的TypeScript脚本解释器。微信小游戏代码热更新技术。

【微信小游戏热更新，原作者开源仓库地址：https://gitee.com/jianyumofa/qyscript】
【微信小游戏热更新，原作者开源仓库地址：https://gitee.com/jianyumofa/qyscript】
【微信小游戏热更新，原作者开源仓库地址：https://gitee.com/jianyumofa/qyscript】

1. 可以直接在JavaScript的运行环境中运行TypeScript代码
2. 性能问题：一般游戏性能不会有问题。如果需要有高性能的需求，请把高性能的代码做成库文件
3. 代码体积问题，因为需要从服务器拉取代码，目前没有实现编译成字节码，暂时可以用jsmin先做简单的压缩

egret_demo工程说明
1. 自带一个简单的游戏，发布插件等都已经实现。
2. 资源包热更新只需要使用命令egret publish --target wxgame，然后把项目目录父目录下面的带remote后缀下面的resource打包成zip即可实现资源热更新
3. 代码热更新在Main.ts里面有示例
4. 送审的时候请把热更新逻辑也编译成js，审核通过之后，当有新版本要发布的时候，服务器开关切换成热更新代码，同时资源包也打包成zip

cocos_demo工程说明
1. cocos_demo有一个最基础的动态执行代码的例子

laya引擎暂无demo

以下为未实现（即将实现7、9、1、13）：
1. lambda表达式方式的匿名函数，比如()=>{console.log(this)}
2. await/async、yield
3. 类型转换，比如<Array>obj，建议用as代替
4. 泛型，比如class A<T>{}
5. 正则（推荐用new RegExp）
6. 在构造函数中super之前的定义，比如var a=2;super();
7. 枚举、枚举自定义值
8. 接口
9. for of
10. 装饰器-@
11. 当父模块有多级时，获取父模块在runTIme.getContextValue中可能有问题，解决办法，尽量不用模块或者同模块内的调用写全，比如new test.Start()，而不是new Start()
12. 变量前最多只支持两个非操作，即：var a = !!"123";（一般这种写法是强制转换到布尔类型，三个及以上的非基本是不需要的）
13. 运行时的报错信息不正确
14. 编译成字节码

简单的示例：
```
qs.run(`
            class Start{
                public constructor() {
                    console.log('你好，世界！');
                }
            }
        `, 'Start');
```


写在最后：应大家的要求，仓促的先发一个先行版，说明也不完善，可能还有未知的BUG没有发现。不过满足一般的开发是没问题的。有能力的开发者可以先拿着玩玩。