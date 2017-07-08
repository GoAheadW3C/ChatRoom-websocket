# ChatRoom-websocket
ChatRoom based on websocket
-------------
demo说明：
该聊天室是基于websocket.io搭建的，websocket实现了浏览器与服务器全双工通信，本demo是websocket的简单应用，其本身应用更加丰富，例如可以创建房间、频道等。读者详细阅读相关API接口文档进行相应开发。
demo使用：
1. 首先你需要进入项目文件夹，在CLI中输入命令npm server.js 开启器聊天室的服务端；
2.打开浏览器，在地址栏输入http://localhost:8798启动客户端，并连接服务端。
 - 注意：代码中的端口设置为8798，如需修改，请在server.js文件中最后的httpServer.listen部分进行修改，修改完后重新启动服务端。
3. 该聊天室主要功能有：
 - 即时聊天
 - 私聊
 - 查看聊天记录
 - 同网内多人聊天
4. 读者可同时打开多个浏览器登录，进行相应功能测试
5. 如有不解，请联系WeChat：809742006
