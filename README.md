## 运行项目
```
npm install

初次运行需要执行命令安装依赖包
```

### 开发模式
```
npm run serve

启动成功后，在浏览器输入你的ip+端口号就可以看到页面了

注意：本地跑不了企业微信的授权，如需调授权相关的 请先部署到线上服务器后， 再通过企业微信的app里面调试
```

### 生产模式
```
npm run build

打包完成会在根目录下生成dist目录，里面的文件用于生产环境（带有js/css/html的压缩）
```

### 部署
```
在你的服务器根目录下 新建一个目录demo（名字随便起），然后
将npm run build 打包后的dist目录里构建的内容部署到demo里面

假设你的域名是http://www.baidu.com
那么访问登录页：http://www.baidu.com/demo/#/login

如果需要将代码部署到域名根路径上，那么需要修改vue.config.js里的publicPath的值为：’/’
那么访问登录页：http://www.baidu.com/#/login

关于publicPath更详细的介绍（https://cli.vuejs.org/zh/config/#publicpath）
```

## 项目结构

├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # api所有请求
│   ├── assets                 # 样式、字体、图片等静态资源
│   ├── components             # 全局组件
│   ├── filter                 # 全局过滤器
│   ├── functions              # 提出来的授权函数
│   ├── router                 # 路由
│   ├── store                  # 全局store管理
│   ├── theme                  # 主题样式配置
│   ├── utils                  # 全局公用方法和配置文件
│   ├── views                  # 所有模块（页面都在这里面）
│       ├── life-cycle         # 客户生命周期
|       ├── news               # 图文
|       ├── moment-all         # 企业朋友圈
|       ├── moments             # 客户朋友圈
|       ├── scrm-clue          # 客户线索模块
|       ├── sidebar-dev        # 侧边栏
|       |   ├── customerDetail        # 客户详情
|       |   ├── customerForm          # 客户基础信息及拓展信息编辑页
|       |   ├── customerInfo          # 客户画像
|       |   ├── customerTags          # 客户标签编辑页
|       |   ├── personalTags          # 客户个人标签编辑页
|       |   └── speechCraft           # 话术库
│       └── violation          # 消息违规
│   ├── App.vue                # 入口页面
│   └── main.js                # 入口文件 加载组件 初始化等
├── .editorConfig              # 编辑器格式配置
├── .eslintrc.js               # eslint 配置项
├── .eslintignore              # eslint 需要忽略检测的配置项
├── .gitignore                 # git 配置项
├── .babelrc                   # babel-loader 配置
├── .prettierrc                # prettier插件配置
├── vue.config.js              # vue-cli 配置
└── package.json               # package.json

