var userNum = 0; //统计在线人数
var chatList = [];//记录聊天记录

var https=require('https');
var ws=require('ws');
var fs=require('fs');
var keypath=process.cwd()+'/server.key';//我把秘钥文件放在运行命令的目录下测试
var certpath=process.cwd()+'/server.crt';//console.log(keypath);
//console.log(certpath);
  
var options = {
  key: fs.readFileSync(keypath),
  cert: fs.readFileSync(certpath),
  passphrase:'1234'//如果秘钥文件有密码的话，用这个属性设置密码
};
  
var server=https.createServer(options, function (req, res) {//要是单纯的https连接的话就会返回这个东西
    res.writeHead(403);//403即可
    res.end("This is a  WebSockets server!\n");
}).listen(8001);
  
var wss = new ws.Server( { server: server } );//把创建好的https服务器丢进websocket的创建函数里，ws会用这个服务器来创建wss服务

//调用 broadcast 广播，实现数据互通和实时更新
wss.broadcast = function (msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

//同样，如果丢进去的是个http服务的话那么创建出来的还是无加密的ws服务
wss.on( 'connection', function ( ws ) {
    userNum++;//建立连接成功在线人数 +1
    wss.broadcast(JSON.stringify({ funName: 'userCount', users: userNum, chat: chatList })); //建立连接成功广播一次当前在线人数
    console.log('Connected clients:', userNum);
    //接收前端发送过来的数据
    ws.on('message', function (e) {
        var resData = JSON.parse(e)
        console.log('接收到来自clent的消息：' + resData.msg)
        chatList.push({ userId: resData.userId, content: resData.msg });//每次发送信息，都会把信息存起来，然后通过广播传递出去，这样此每次进来的用户就能看到之前的数据
        wss.broadcast(JSON.stringify({ userId: resData.userId, msg: resData.msg })); //每次发送都相当于广播一次消息

    });
    ws.on('close', function (e) {
        userNum--;//建立连接关闭在线人数 -1
        wss.broadcast(JSON.stringify({ funName: 'userCount', users: userNum, chat: chatList }));//建立连接关闭广播一次当前在线人数
        console.log('Connected clients:', userNum);
        console.log('长连接已关闭')
    })
});
console.log('服务器创建成功')