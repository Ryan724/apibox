#APIBOX

## 本地运行
* 安装[nodejs](http://ux.beisen.co/redmine/attachments/download/2/node-v0.8.18-x64.msi)；
* 获取项目源码：`git clone <项目地址>`；
* 进入项目源码目录；
* 安装node modules：`npm install`；
* apibox目录下：npm link
* 运行项目：`apibox	-s` 在浏览器上 打开http://127.0.0.1:3000;

*一種接口文檔管理工具
	*提高前后端开发效率
	*迅速定位接口数据问题
*接口定义数据的校验
	*生成mockurl，可在开发环境使用模拟数据
*服务器端数据校验
	*迅速定位模拟数据和真实数据的差别，快速发现问题
*接口记录
	*便于代码重构时数据源的查找

###How to use

``````
npm install apibox -g
apibox	-h, --help                    output usage information
apibox	-V, --version                 output the version number
apibox	-i, --init [projectRoot]      接口环境初始化
apibox	-w, --watch [configFilePath]  开启编辑时随时编译
apibox	-m, --mock [projectRoot]      启动接口mock服务器
apibox	-s, --server [port]           启动ApiClient服务器
apibox	-t, --test                    测试基础功能


``````