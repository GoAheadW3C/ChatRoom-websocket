/**
 * Created by 俞华 on 2017/5/21.
 */
var express=require('express');
var http=require('http');

var app=express();

var httpServer=http.Server(app);

var io=require('socket.io')(httpServer);


var users=[];



app.use(express.static('./public'));


//当客户端连接，io对象触发connection事件，并且将客户端对象传入回调函数，以便使用客户端
io.on('connection', function(socket){

    /*------------------------断开-----------------------------*/
    //当客户端socket断开的时候，socket触发disconnect事件
    socket.on('disconnect', function(){
        console.log('有人退出了!');
        users=users.filter(function (item) {
            return item.userid!=socket.userid;
        });
        socket.history=[];
        users.forEach(function (user) {
            //向素有用户更新在线用户列表
            user.emit('Name',getAllusersInfo(users));
            //向所有用户更新总人数信息
            user.emit('Count', users.length);
        });
    });

    /*------------------------监听和发送-----------------------------*/
    //监听客户端socket发过来的'Name'事件
    //username就是客户端发送的socket.emit('Name',username)中的username，也就是挂载在register下的值
    socket.on('Name', function (username) {
        socket.username=username;
        socket.userid=Date.now();
        socket.history=[];
        users.push(socket);
        //要向所有用户传送这个列表
        users.forEach(function (user) {
            //向所有用户更新在线用户列表
            user.emit('Name',getAllusersInfo(users));

            //向所有用户更新总人数信息
            user.emit('Count',users.length);
        });
        
    });

    /*---------------------群聊接收客户端消息---------------------------*/
    socket.on('Meg',function (message){


        console.log(socket.history);
        users.forEach(function (user) {
            user.emit('Meg',[message,socket.username]);
            // user.history.push({
            //
            // });
        });
    });

    /*---------------------私聊接收客户端消息---------------------------*/
    socket.on('SelfMeg',function (SelfMessage) {
        //根据私聊对象的id，获得他的username
        var selfusername=null;

        users.filter(function (item,index) {
            if(item.userid == SelfMessage.selfuserid){
                selfusername=item.username;//根据私聊对象的id，获得他的username

            }
            return item.userid == SelfMessage.selfuserid;
        })[0].emit('SelfMeg1',[SelfMessage.message,socket.username,selfusername]);//发送的客户端 socket
        socket.emit('SelfMeg1',[SelfMessage.message,socket.username,selfusername]);
    });
    /*---------------------接收客户端查看历史消息请求，并返回其历史消息-------------------------*/

    socket.on("readHistory",function (Mdate) {
        console.log(typeof Mdate);
        socket.history=Mdate;
        console.log(socket.history,typeof socket.history);
        socket.emit("readHistory1",socket.history);
    });



});




//获得所有用户的username和userid
function getAllusersInfo(users){
    return users.map(function (item) {
        return {
            username:item.username,
            userid:item.userid
        }
    })
}

/*-------------------监听是否已经连接---------------------*/
httpServer.listen('8798',function (err) {
    console.log('端口链接成功');
});
