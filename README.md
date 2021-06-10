# tslive-pc-project

#### 唐僧直播音乐演唱会(pc 端)

#### 线上访问地址(测试服)

[音乐演唱会购票]http://tapi.whkuaiyu.com/tslivepc/pcLive

[音乐演唱会播放]http://tapi.whkuaiyu.com/concertHall?anchorId=2001026

#### 接口地址

[测试接口文档] http://tapi.whkuaiyu.com/live/swagger-ui.html

[正式接口文档] http://live.whkuaiyu.com/live:8888/swagger-ui.html

#### 项目相关地址

- 常用地址

```bash

# git 地址：

  http://git.whkuaiyu.com/wangshengxian/tslive-pc-project

#测试服务器地址：

  地址：54.222.167.84
  路径：/usr/share/nginx/html/tslivepc

#正式服务器地址：

  地址：lvs01 -- 18.162.251.202 lvs02 -- 18.166.101.144
  地址：lvs03 -- 18.166.33.162
  路径：/usr/share/nginx/html/tslivepc

#接口域名：

  测试：http://tapi.whkuaiyu.com
  正式：http://live.whkuaiyu.com:8888


```

#### 运行及打包

- 常用命令

```bash

# 运行项目
  yarn serve

# 以指定环境打包项目(目前环境有dev、test、prod，具体以项目的.env相关文件)
  yarn build:环境名； 例如：打包正式服 yarn build:prod

```

#### 结构

#### 代码规范

- 代码规范的目的是提高项目的可维护性。
- 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。
- 项目已配置 eslint + prettier，需要自行配置好编辑器才能生效。

#### vscode 相关配置

- KoroFileHeader (文件头部注释说明，cart + alt + i), 根据个人喜好自行选择

  1、安装 KoroFileHeader 插件
  2、打开 vscode 设置的 setting.json 添加如下配置

```bash

"fileheader.customMade": {
  "Author": "wangshengxian",
  "Date": "Do not edit",
  "LastEditors": "wangshengxian",
  "LastEditTime": "Do not edit",
  "Desc": ""
}


```

- eslint：

  1、安装 eslint 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "vue"
  ],
"eslint.options": {
  "plugins": ["html"]
},


```

- prettier：

  1、安装 prettier 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
  "prettier": {
    "eslintIntegration": true,
    "singleQuote": true,
    "semi": true
  }
},


```

- 还需要安装个插件：EditorConfig for VS Code (用来自动识别项目的.editorconfig 文件配置，保持编辑器编码风格的统一。)

  根路径下添加.editorconfig 文件，添加如下配置

```bash

  # https://editorconfig.org
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = crlf
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.md]
  insert_final_newline = false
  trim_trailing_whitespace = false


```
