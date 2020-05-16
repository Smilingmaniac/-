<template>
  <div class="meeting ar-container">
    <div class="meeting_side">
      <el-aside :width="isCollapse ? '64px' : '140px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <div class="meeting_side_info">
          <img :src="userImg" alt="">
          <p>28医院</p>
        </div>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-menu-item index="1" @click="menuIndex=1">
            <i class="el-icon-menu"></i>
            <span slot="title">本地视频</span>
          </el-menu-item>
          <el-menu-item index="2"  @click="menuIndex=2;shareScreen()">
            <i class="el-icon-menu"></i>
            <span slot="title">分享屏幕</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </div>
    <div class="meeting_main">
      <div class="ar-meet_side">
          <!-- <button @click="showToggle">{{btnText}}</button> -->
          <div class="ar-container is-vertical" v-show="isShow">       
            <div class="ar-meet_info" >
                <!-- <div class="flex info_item isHoster1" v-show="isShow">
                </div> -->
              
                <div class="video info_item"  v-show="menuIndex==1">
                  <div class="my_video" ref="myVideoView"></div>
                  <span>本地视频窗口</span>
                </div>

                <div class="video info_item" v-show="menuIndex==2">
                  <div v-if="screenSharing">
                      <div class="my_video" ref="myScreenView"></div>
                      <button class="boxShow" @click="menuIndex=1;stopShareScreen()">结束屏幕共享</button>
                      <span>屏幕共享窗口</span>
                  </div>
                </div>

                

            </div>
            <div class="ar-meet_control" v-if="menuIndex==1">
              <div class="ar-meet_control_left">
                <!-- <button class="boxShow" v-if="!screenSharing" @click="shareScreen">屏幕共享</button> -->
                <!-- <button class="boxShow" @click="stopShareScreen">结束屏幕共享</button> -->
              </div>

              <div class="ar-meet_control_right">
                <button :class="videoEnable ? 'on': 'off'" style="margin-left: 5px;" hollow @click="switchVideo">视频 ： {{ videoEnable ? '开' : '关' }}</button>
                <button :class="audioEnable ? 'on': 'off'" style="margin-left: 5px;" hollow @click="switchAudio">音频 ： {{ audioEnable ? '开' : '关' }}</button>
                <button class="signOut" style="margin-left: 5px;" @click="leaveMeet">退出</button>
              </div>
            </div>
            <div class="ar-meet_box_background"></div>
            <!-- <input type="number" v-model="startIndex"><input type="number" v-model="endIndex"><button @click="setShow">setShow</button> -->
          </div>
        </div>
      
        <div class="ar-main ar-meet_view">
          <div class="ar-container is-vertical">
            <!-- <div class="ar-main"> -->
              <div class="video info_item1" >
                <div class="ar-video_view" ref="videoView" >
                  <div class="ar-video_wrap1" ref="videoWrap">
                    <!-- <div class="ar-video_box" v-for="(video, n) in videoList" :key="n" :id="video.id" :style="{'width': video.width, 'height': video.height}"> -->
                      <!-- <div>{{video.id}}</div> -->
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            <!-- </div> -->
          </div>
        </div>
    </div>
  
    <!-- 基本信息 -->
     <div class="ar-meet_side ar-right">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="病人信息" name="first">
          <el-row v-for="item in patients" :key="">
            <el-col :span="8"><span>姓名：</span> <span>{{item.Patient}}</span></el-col>
            <el-col :span="8"><span>性别：</span> <span>{{item.SexFmt}}</span></el-col>
            <el-col :span="8"><span>年龄：</span> <span>{{item.Age}}</span></el-col>
            <el-col :span="16"><span>  主治医生：</span> <span>{{item.UserName}}</span></el-col>
            <el-col :span="16"><span>  入院日期：</span> <span>{{item.P003}}</span></el-col>
            <el-col :span="24"><span>  入院诊断：</span> <span>{{item.P004}}</span></el-col>
            <el-col :span="24"><span>  所在医院：</span> <span>{{item.HId}}</span></el-col>
            <el-col :span="24"><span>  会诊原因：</span> <span>{{item.reason}}</span></el-col>
          </el-row>
          <!-- <el-row >
            <el-col :span="8"><span>姓名：</span> <span>{{form.Patient}}</span></el-col>
            <el-col :span="8"><span>性别：</span> <span>{{form.SexFmt}}</span></el-col>
            <el-col :span="8"><span>年龄：</span> <span>{{form.Age}}</span></el-col>
            <el-col :span="16"><span>  主治医生：</span> <span>{{form.UserName}}</span></el-col>
            <el-col :span="16"><span>  入院日期：</span> <span>{{form.P003}}</span></el-col>
            <el-col :span="24"><span>  入院诊断：</span> <span>{{form.P004}}</span></el-col>
            <el-col :span="24"><span>  所在医院：</span> <span>{{form.HId}}</span></el-col>
            <el-col :span="24"><span>  会诊原因：</span> <span>{{form.reason}}</span></el-col>
          </el-row> -->
        </el-tab-pane>

        <!--时间轴 -->
        <el-tab-pane label="时间轴" name="second">
          <el-row class="time_btn_box">
            <el-button type="primary" round>上一天</el-button>
            <el-button type="success" round>今天</el-button>
            <el-button type="info" round>下一天</el-button>
          </el-row>
          <div class="time_result_box">
          
            <!-- <span>  生命体征</span>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="时间" width="87">
              </el-table-column>
              <el-table-column prop="name" label="体温" width="87">
              </el-table-column>
              <el-table-column prop="name1" label="脉搏" width="87">
              </el-table-column>
              <el-table-column prop="name2" label="呼吸" width="87">
              </el-table-column>
            </el-table>
            <el-input class="time_result" type="textarea" :rows="4" v-model="textarea" :disabled="true"></el-input>
            <el-input class="time_result" type="textarea" :rows="4" v-model="textarea" :disabled="true"></el-input> -->

            <el-row v-for="tabs in times" :key="">
              
              <el-col :span="24"><span v-if="tabs.types ==1">生命体征</span><span v-if="tabs.types ==2">检查检验</span><span v-if="tabs.types ==3">会诊原因</span><span>{{tabs.Data}}</span></el-col>
              <!-- <el-col :span="24"><span v-if="tabs.types ==2">检查检验</span> <span>{{tabs.Data}}</span></el-col>
              <el-col :span="24"><span v-if="tabs.types ==3">会诊原因</span> <span>{{tabs.Data}}</span></el-col>  -->
            </el-row>
          </div>
        </el-tab-pane>

        <!--聊天室 -->
        <el-tab-pane label="聊天室" name="fourth">
          <div class="chat-box">
            <header>聊天室人数：{{count}}</header>
            <div class="msg-box" ref="msg-box">
              <div
                v-for="(i,index) in list"
                :key="index"
                class="msg"
                :style="i.userId == userId?'flex-direction:row-reverse':''"
              >
                <div class="user-head">
                  <div
                    class="head"
                    :style="` background: hsl(${getUserHead(i.userId,'bck')}, 88%, 62%); clip-path:polygon(${getUserHead(i.userId,'polygon')}% 0,100% 100%,0% 100%); transform: rotate(${getUserHead(i.userId,'rotate')}deg)`"
                  ></div>
                </div>
                <div class="user-msg">
                  <span
                    :style="i.userId == userId?' float: right;':''"
                    :class="i.userId == userId?'right':'left'"
                  >{{i.content}}</span>
                </div>
              </div>
            </div>
            <div class="input-box">
              <input type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" />
              <div class="btn" :class="{['btn-active']:contentText}" @click="sendText()">发送</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MeetMixin from '@/mixins/MeetMixin';
import ArMeet from 'ar-meet';
import getScreenStream from 'ar-share-screen';
import config from '@/config';

export default {
  data() {
    return {
      menuIndex:1,
      userImg:require('./../assets/img/doctor.jpg'),
      endIndex: 0,
      Meet: null,
      broadCastId: '',
      isHoster: 0,
      roomId: '',           //房间ID
      logs: [],             //日志队列
      cameraList: [],       //视频驶入设备列表
      micphoneList: [],     //音频输入设备列表
      screenSharing: false, //屏幕共享中
      cameraDeviceId: '',
      micphoneDeviceId: '',
      videoEnable: true,
      audioEnable: true,
      videoList: [],

      nameage:'李四',
      form: {
        Patient: '张三丰',
        sex: '男',
        age:'99',
        UserName:'李玮峰',
        P003:'2020.05.10',
        P004:'继发性胃溃疡',
        HId:'南京第二看守所',
        reason:'病人持续发热，头疼脑热，神志不清',
      },
      textarea: '生命体特征',
      isShow:true,
      drawer: false,
      direction: 'ltr',
      activeName:'first',

      ws: null,
      count: 0,
      userId: null, //当前用户ID
      list: [], //聊天记录的数组
      contentText: "", //input输入的值
      isCollapse: true,
      tableData: [{
          date: '06：00',
          name: '36',
          name1: '65',
          name2: '23',
        }, {
          date: '10：00',
          name: '36.3',
          name1: '56',
          name2: '18',
        }, {
          date: '18：00',
          name: '36.4',
          name1: '49',
          name2: '20',
        }, {
          date: '22：00',
          name: '36.5',
          name1: '55',
          name2: '21',
        }],
      patients:[],
      times:[],
    }
  },
  
  mixins: [MeetMixin],
  created() {
    this.getUserID();
    this.getPatients();
    this.getTimes();
  },
  
  mounted() {
    this.initWebSocket();
    let that = this;

    let Meet = new ArMeet({
      userId: 'user_' + parseInt(Math.random()*10e4),
      userData: '{}',
      userRole: 1,//0 与会者 1 主持人 2 监看者；默认0;（注：会议模式为0时用户身份仅有与会者和监看者身份生效，当会议模式为1时仅与会者和主持人身份生效
      meetMode: 1,//0 普通 1 主持人模式 2 ZOOM
      logLevel: 'info',
      audioMeet: false,//音频会议： false 视频会议 true 音频会议；默认false（音视频会议）
      autoBitrate: true,//默认true，true为根据网络状况自适应码流，false为强制指定码率
      // videoProfile: 'ARVideoProfile1080P',
      videoProfile: 'ARVideoProfile1080P',
    });

    //Meet.configServer(config.RTC_SERVER_URL);

    // that.addLog('info', '方法：initEngine：初始化');
    Meet.initAppInfo(config.APP_ID, config.APP_TOKEN);

    //加入房间成功
    Meet.on("join-success", () => {
      // that.addLog('info', '回调：join-success: 加入房间成功');
      that.Meet = Meet;
      //刷新页面离开房间
      window.onbeforeunload = function(e) { //窗口关闭事件,要考虑到滚动条的宽度，一般是20px
        var event = e || window.event;
        event.returnValue = "确认是否关闭当前网页";//点击关闭的时候给提示
      }
      // 退出会议
      window.onunload = function (e) {
        Meet.leaveRTC();
      }
    });


    Meet.on()

    //加入房间失败
    Meet.on("join-failed", (code) => {
      // that.addLog('error', `回调：join-failed: 加入房间失败，错误码${code}`);
    });
    
    //远程视频流打开
    Meet.on("stream-subscribed", (peerId, pubId, userId, userData, mediaRender) => {
      // that.addLog('info', `回调：stream-subscribed: 远程人员加入 ${peerId} ${pubId}`);

      mediaRender.className = "ar-video_box";
      mediaRender.style.width= '70px';
      mediaRender.style.height= '50px';
      mediaRender.id = "video-player_" + pubId;
      that.$refs.videoWrap.appendChild(mediaRender);
      
      that.$nextTick(() => {
        that.handleResize();
      });
    });

    //远程视频流断开
    Meet.on("stream-unsubscribed", (peerId, pubId, userId, userData) => {
      // that.addLog('info', `回调：stream-unsubscribed: 远程人员离开 ${pubId}`);
      document.getElementById("video-player_" + pubId) && document.getElementById("video-player_" + pubId).remove();
      
      that.$nextTick(() => {
        that.handleResize();
      });
    });

    //主持人上线--（仅主持人模式可用）
    meet.on('hoster-online', (peerId, userId, userData) => {
      
    });

    //主持人下线--（仅主持人模式可用）
    meet.on('hoster-offline', (peerId) => {});

    //远程屏幕共享流打开
    Meet.on("exstream-subscribed", (peerId, pubId, userId, userData, mediaRender) => {
      // that.addLog('info', `exstream-subscribed: 远程屏幕共享打开`);

      mediaRender.className = "ar-video_box";
      mediaRender.id = "video-player_" + pubId;
      that.$refs.videoWrap.appendChild(mediaRender);

      that.$nextTick(() => {
        that.handleResize();
      });
    });

    //远程屏幕共享流关闭
    Meet.on("exstream-unsubscribed", (peerId, pubId, userData) => {
      // that.addLog('info', `回调：exstream-unsubscribed: 远程屏幕共享关闭 ${pubId}`);
      document.getElementById("video-player_" + pubId) && document.getElementById("video-player_" + pubId).remove();

      that.$nextTick(() => {
        that.handleResize();
      });
    });

    //打开共享通道结果
    Meet.on("share-result", (ok) => {
      // that.addLog('info', `回调：share-result: 共享屏幕结果 ${ok}`);
      if (ok) {
        // that.addLog('info', `获取屏幕共享流`);
        getScreenStream().then(e => {
          if (e === 'no-ready') {
            that.Meet.closeShare(0);
            alert(
            '1. 请检查是否安装"anyRTC-ScreenShare"屏幕共享插件,如果没有请点击https://chrome.google.com/webstore/detail/anyrtc-screenshare/daiabbkkhgegdmhfpocaakcgbajnkgbp?hl=zh-CN下载\n' +
            '2. 安装了屏幕共享插件，但是没有启用该插件。\n' + 
            '说明：\n火狐浏览器或谷歌版本72以上无需安装插件。\n' +
            '360、QQ平台也有对应的插件下载。');
          }
          else if (e === 'no-support') {
            that.Meet.closeShare(0);
            alert(`该浏览器不支持，请选择谷歌、火狐、QQ、360浏览器`);
            // that.addLog('error', `该浏览器不支持，请选择谷歌、火狐、QQ、360浏览器`);
          }
          else if (e === "user-cancel") {
            that.Meet.closeShare(0);
            alert(`共享被取消`);
            // that.addLog('error', `共享被取消`);
          }
          else if (e === "user-Denied") {
            that.Meet.closeShare(0);
            alert(`用户未授权`);
            // that.addLog('error', `用户未授权`);
          }
          else {
            // that.addLog('info', `获取屏幕共享流成功`);
            Meet.startScreenCap(e.stream);

            let screenView = document.createElement('div');
            screenView.id = "myScreen";
            screenView.appendChild(e.video);

            that.screenSharing = true;
            that.$nextTick(() => {
              that.$refs.myScreenView.appendChild(screenView);
            });
          }
        }).catch(err => {
          // that.addLog('error', `获取屏幕共享流失败`);
          that.Meet.closeShare(0);
          throw new Error(err);
        });
      } else {
        alert('共享失败，请检查共享通道是否被占用');
        // that.addLog('error', `共享失败，请检查共享通道是否被占用`);
      }
    });

    //共享被打开
    Meet.on("share-opened", (shareType, shareInfo, sharerUserId, sharerUserData) => {
      // that.addLog('info', `远程打开共享通道`);
    });

    //共享被关闭
    Meet.on("share-closed", () => {
      // that.addLog('info', `共享通道关闭`);
      if (that.screenSharing) {
        that.screenSharing = false;
        document.getElementById('myScreen').remove();
      }
    });
    
    //
    Meet.on("av-status", (isRemote, pubId, audioEnable, videoEnable) => {
      console.log('av-status: ', isRemote, pubId, audioEnable, videoEnable);
    });
    //
    Meet.on("audio-volume", (isRemote, pubId, audioLeval) => {
      // console.log('audio-volume: ', isRemote, pubId, audioLeval);
    });
    //
    Meet.on("network-status", (isRemote, pubId, videoBytes, ARNetQuality) => {
      // console.log('network-status: ', isRemote, pubId, videoBytes, ARNetQuality);
    });

    that.addLog('info', '方法：getDevices，获取设备列表');
    Meet.getDevices().then(deviceInfo => {
      that.cameraList = deviceInfo.videoinput;
      that.micphoneList = deviceInfo.audioinput;

      that.cameraDeviceId = that.cameraList[that.cameraList.length - 1].value;
      that.micphoneDeviceId = that.micphoneList[that.micphoneList.length - 1].value;
      
      that.addLog('info', `方法：setLocalVideoCapturer: 采集本地媒体流`);
      Meet.setLocalVideoCapturer({
        video: {
          enable: true,
          deviceId: that.cameraDeviceId
        },
        audio: {
          enable: true,
          deviceId: that.micphoneDeviceId
        }
      }).then(e => {
        e.mediaRender.id = "myVideo";
        this.$refs.myVideoView.appendChild(e.mediaRender);
        Meet.joinRTC(that.roomId);
      }).catch(err => {
        console.log('打开摄像头失败：', err);
        throw err;
      });
    });
  },
 
  methods: {

    capture() {
        const capture = this.$refs.capture;
        this.captureDom(this.html, canvas => {
            capture.appendChild(canvas);
            this.ctx = document.querySelector("Meeting").getContext("2d");
        });
    },
    clear() {
        const capture = this.$refs.capture;
        capture.removeChild(document.querySelector('Meeting'));
    },
    getCaptureImage() {
        let canvas = document.querySelector("Meeting");
        let dataURL = canvas.toDataURL();
        return this.dataURLtoFile(dataURL, 'capture.png');
    },
    captureDom(dom, callback) {
        let shareContent = dom; // 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
        let width = shareContent.offsetWidth; // 获取(原生）dom 宽度
        let height = shareContent.offsetHeight; // 获取(原生）dom 高
        let offsetTop = shareContent.offsetTop; //元素距离顶部的偏移量
        let canvas = document.createElement("canvas"); //创建canvas 对象
        canvas.id = "capture-canvas";
        let context = canvas.getContext("2d");
        let scaleBy = this.getPixelRatio(context); //获取像素密度的方法 (也可以采用自定义缩放比例)
        // let scaleBy = 2;
        canvas.width = width * scaleBy; //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
        canvas.height = (height + offsetTop) * scaleBy; // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
        context.scale(scaleBy, scaleBy);
        let opts = {
            allowTaint: true, //允许加载跨域的图片
            tainttest: true, //检测每张图片都已经加载完成
            scale: scaleBy, // 添加的scale 参数
            canvas: canvas, //自定义 canvas
            logging: false, //日志开关，发布的时候记得改成false
            width: width, //dom 原始宽度
            height: height //dom 原始高度
        };
        html2canvas(shareContent, opts).then(canvas => {
            callback(canvas);
        });
    },
    getPixelRatio: function(context) {
        let backingStore =
            context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
        return (window.devicePixelRatio || 1) / backingStore;
    },
    onMouseDown(e) {
        let [x, y] = [e.offsetX, e.offsetY];
        this.oldPoint = {
            x: x - 1,
            y: y - 1
        };
        this.drawFlag = true;
        this.drawLlie(x, y);
    },
    onMouseMove(e) {
        if (!this.drawFlag) return;
        let [x, y] = [e.offsetX, e.offsetY];
        this.drawLlie(x, y);
        this.oldPoint = {x, y};
    },
    onMouseUp() {
        this.drawFlag = false;
    },
    drawLlie(x, y) {
        if (!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.strokeStyle = "red";
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(this.oldPoint.x, this.oldPoint.y);
        this.ctx.stroke();
        this.ctx.closePath();
    },
    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    },

    //获取病人基本信息 
    getPatients(){
      var url = '/api/YCHZ_GetPatientInfo.ds'; 
      axios({
        url,
        method:'get', 
      }).then(res =>{
        // console.log(res); 
        if(res.status == 200 && res.data.errcode == 0){
          this.patients = res.data.value;
           console.log(this.patients);
        }
      }).catch(error => {
        console.log(error);
      });
    },

    // 获取时间轴
    getTimes() {
      var url = '/api/YCHZ_GetTimeLine.ds?HId=1&ZyNo=123456&Date=2020-05-09';
      axios({
        url,
        method:'get',
      }).then(res =>{
        console.log(this.times);
        if(res .status == 200 && res.data.errcode == 0){
          this.times = res.data.value;
          console.log(this.times); 
        }
      }).catch(error => {
        console.log(error);
      })
    },
    //
    toggleCollapse(){
        this.isCollapse = !this.isCollapse
    },
    handleClick() {},
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    
    //添加日志
    addLog(type, strLog) {
      // this.logs.push({
      //   type: type,
      //   content: strLog
      // });
      // this.$nextTick(() => {
      //   let logView = this.$refs.logView.getBoundingClientRect();
      //   let logList = this.$refs.logList.getBoundingClientRect();
      //   if (logList.height > logView.height) {
      //     this.$refs.logView.scrollTop = (logList.height - logView.height);
      //   }
      // });
    },
    //切换摄像头
    handleCameraChange() {
      let that = this;
      // that.addLog('info', `切换摄像头`);
      that.Meet.switchDevice({
        video: {
          enable: that.videoEnable,
          deviceId: that.cameraDeviceId
        },
        audio: {
          enable: that.audioEnable,
          deviceId: that.micphoneDeviceId
        }
      }).then(e => {
        document.getElementById("myVideo").remove();
        e.mediaRender.id = "myVideo";
        that.$refs.myVideoView.appendChild(e.mediaRender);
      }).catch(err => {

      });
    },
    //切换麦克风
    handleMicponeChange() {
      let that = this;
      // that.addLog('info', `切换麦克风`);
      that.Meet.switchDevice({
        video: {
          enable: that.videoEnable,
          deviceId: that.cameraDeviceId
        },
        audio: {
          enable: that.audioEnable,
          deviceId: that.micphoneDeviceId
        }
      }).then(e => {
        document.getElementById("myVideo").remove();
        e.mediaRender.id = "myVideo";
        that.$refs.myVideoView.appendChild(e.mediaRender);
      }).catch(err => {

      });
    },
    //屏幕共享
    shareScreen () {
      this.Meet && this.Meet.openShare(0);
      // this.addLog('info', `方法：openShare: 开启屏幕共享`);
    },
    //结束屏幕共享
    stopShareScreen() {
      // this.addLog('info', `方法：openShare: 关闭屏幕共享`);
      this.Meet && this.Meet.stopScreenCap();
    },
    //视频开关
    switchVideo() {
      let that = this;
    
      that.Meet && that.Meet.setLocalVideoEnable(that.videoEnable = !that.videoEnable);
    },
    //音频开关
    switchAudio() {
      this.Meet && this.Meet.setLocalAudioEnable(this.audioEnable = !this.audioEnable);
    },
    copyID(id){
      document.getElementById(id).select();
      document.execCommand("Copy");
    },
    leaveMeet() {
      let that = this;
      
      if (confirm('确定离开房间吗？')) {
        if (that.Meet) {
          that.Meet.leaveRTC();
          that.Meet = null;
        }
        that.$router.push('/');
      }
    },
    //根据时间戳作为当前用户ID
    getUserID() {
      let time = new Date().getTime();
      this.userId = time;
    },
    //根据userID生成一个随机头像
    getUserHead(id, type) {
      let ID = String(id);
      if (type == "bck") {
        return Number(ID.substring(ID.length - 3));
      }
      if (type == "polygon") {
        return Number(ID.substring(ID.length - 2));
      }
      if (type == "rotate") {
        return Number(ID.substring(ID.length - 3));
      }
    },
    //滚动条到底部
    scrollBottm() {
      let el = this.$refs["msg-box"];
      el.scrollTop = el.scrollHeight;
    },
    //发送聊天信息
    sendText() {
      let _this = this;
      _this.$refs["sendMsg"].focus();
      if (!_this.contentText) {
        return;
      }
      let params = {
        userId: _this.userId,
        msg: _this.contentText
      };
      _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
      _this.contentText = "";
      setTimeout(() => {
        _this.scrollBottm();
      }, 500);
    },
    //进入页面创建websocket连接
    initWebSocket() {
      let _this = this;
      //判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // 192.168.0.115 是我本地IP地址 此处的 :8181 端口号 要与后端配置的一致
        let ws = new WebSocket("wss://venway.cn:8002");
        _this.ws = ws;
        ws.onopen = function(e) {
          console.log("服务器连接成功");
        };
        ws.onclose = function(e) {
          console.log("服务器连接关闭");
        };
        ws.onerror = function() {
          console.log("服务器连接出错");
        };
        ws.onmessage = function(e) {
          //接收服务器返回的数据
          let resData = JSON.parse(e.data);
          if (resData.funName == "userCount") {
            _this.count = resData.users;
            _this.list = resData.chat;
            // console.log(resData.chat);
          } else {
            _this.list = [
              ..._this.list,
              { userId: resData.userId, content: resData.msg }
            ];
          }
        };
      }
    }
  },


  destroyed(){
    this.Meet && (this.Meet.leaveRTC(), this.Meet = null);
  }
}
</script>

<style lang="scss" scoped>
  .el-col-8 {
    text-align: center;
    line-height: 44px;
    font-size: 14px;
  }
  .el-col-16 {
    margin-left: 25px;
    line-height: 44px;
    font-size: 14px;
  }
  .el-col-24 {
    padding-left: 25px;
    line-height: 44px;
    font-size: 14px;
  }
  .meeting_main{
    width: calc( 100% - 550px);
    z-index: 233;
  }
  .my_video{
    width: 80%;
    margin: 0 auto;
    height: 400px!important;
  }
  #myVideo{
     min-height:400px!important;
  }
  .time_btn_box{
    display: flex;
    justify-content: center;
  }
  .meeting_side_info img{
    width: 64px;
    height: 64px;
  }
  .meeting_side_info p{
    width: 64px;
    line-height: 20px;
    text-align: center;
  }
  .time_btn{
    width: 88px;
    // height: 48px;
  }
  .time_btn2{
    margin: 0 25px!important;
  }
  .time_result_box{
    margin-top: 15px;
    display: flex;
    padding: 0 20px;

    flex-direction: column;
    .time_result{
      margin-bottom: 30px;
      .el-textarea__inner{
        min-height: 120px!important;
      }
    }
  }
  .forms {
    margin-left: 20px;
  }
  //111
  .ar-meet_side {
    box-shadow: 1px 0 20px 0 rgba(0,0,0,.1);
    z-index: 1;
  }
  .ar-meet_info {
    box-sizing: border-box;
    height: auto;
    padding: 25px 30px;
    padding: 20px 30px 0px;

    // .my_video {
    //   width: 160px;
    //   height: 135px;
    //   overflow: hidden;
    //   background-color: #000;
    // }
    .info_item {
      margin-bottom: 20px;
      height: 34px;
      line-height: 34px;
      &:last-child { margin-bottom: 0; }
      &.isHoster1{
        // margin-bottom: 20px;
        input{
          width: 40px;
          padding-left: 15px;
          font-size: 12px;
          text-align: right;
          color: #333;
          background-color: transparent;
          border: none;
          outline: none;
        }
      }
      .ar-device_select {
        outline: none;
        width: 100px;
        height: 34px;
        background:rgba(236,236,236,1);
        border-radius:4px;
        line-height: 34px;
        vertical-align: middle;
        border: none;
        box-sizing: border-box;
        padding: 0 8px;
      }

      .inof_item_label {
        font-size: 14px;
        color: #333;
      }

      &.flex {
        display: flex;
        justify-content: space-between;
      }
      &.video {
        text-align: center;
        height: auto;
        // span {
        //   display: block;
        //   margin-top: 8px;
        // }
      }
    }
  }
  .ar-meet_box_background{
    height: 30px; 
    background: #E5E7E9;
  }
  .ar-meet_log_title {
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    color: #333;
    border-top: 1px solid #E5E7E9;
    box-sizing: border-box;
  }
  .ar-log_view {
    background-color: #E5E7E9;
    .ar-meet_log {
      padding: 0 30px;
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      box-sizing: border-box;

      .ar-meet_log_item {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 18px;
        color: #666;
        word-break: break-word;

        &.error {
          color: red;
        }
      }
    }
  }
  .video info_item1{
    height: 280px;
  }
  .ar-meet_view {
    height: 200px;
    padding: 0 20px 20px;
    background-color: #F6F6F6;
  }

  .ar-meet_control {
    margin: -10px 0 2px;
    display: flex;
    justify-content: space-between;

    button{
      outline: none;
      width:90px;
      height:34px;
      text-align: center;
      border: none;
      line-height: 34px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      font-size:12px;
      margin-right: 10px;
      color:rgba(102,102,102,1);
      cursor: pointer;
      &.boxShow{
        box-shadow:0px 2px 8px 0px rgba(5,7,37,0.17);
      }
      &.on{
        border:1px solid rgba(51,177,93,1);
        color: rgba(51,177,93,1);
      }
      &.off{
        border:1px solid rgba(227,76,76,1);
        color: rgba(227,76,76,1);
      }
      &.signOut{
        background:rgba(233,74,74,1);
        color: #fff;
      }
    }
  }
  h3{
    color: #333333;
    height: 40px;
    line-height: 40px;
    font-size:16px;
    margin-bottom: 10px !important;
    font-weight:bold;
  }
  .ar-video_view {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: calc( 100% ); 
    height: calc( 100% );

    .ar-video_wrap1 {
      display: flex;
      // flex-wrap: wrap;
      // align-items: center;
      justify-content: flex-start;
      width:calc( 100% ) !important; 
      height: 200px;
      // overflow: hidden;
      // overflow-y: auto;

      .ar-video_box {
        // flex: 0 1 auto;
        z-index: 22;
        width: calc( 33% )!important;
        height: 50px!important;
        margin-right: 15px;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #000;
        border-bottom: 1px solid #FFF;
        position: relative;
        &:nth-child(even) {
          border-left: 1px solid #fff;
        }
        span{
          position: absolute;
          top: 10px;
          display: inline-block;
          width:100px;
          height:32px;
          line-height:32px;
          font-size:12px;
          color:rgba(255,255,255,1);
          text-align: center;
          background:rgba(29,34,40, .6);
          border-radius:4px;
          z-index: 1;
          cursor: pointer;
          &.full-screen{
            left: 20px;
          }
          &.AR-code{
            right: 20px;
          }
        }
      }
    }
  }
  ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  }
  ::-webkit-scrollbar-track {
  background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #DDD;
  }
  
  //liaotianshi
  .chat-box {
  margin: 0 auto;
  background: #fafafa;
  // position: absolute;
  height: 510px;
  width: 100%;
  max-width: 440px;
  header {
    position: fixed;
    width: 100%;
    height: 40px;
    background: #409eff;
    max-width: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    font-size: 12px;
  }
  .msg-box {
    position: absolute;
    height: calc(100% - 6.5rem);
    width: 100%;
    margin-top: 3rem;
    overflow-y: scroll;
    .msg {
      width: 95%;
      min-height: 2.5rem;
      margin: 1rem 0.5rem;
      position: relative;
      display: flex;
      justify-content: flex-start !important;
      .user-head {
        min-width: 2.5rem;
        width: 20%;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        .head {
          width: 1.2rem;
          height: 1.2rem;
        }
        // position: absolute;
      }
      .user-msg {
        width: 80%;
        // position: absolute;
        word-break: break-all;
        position: relative;
        z-index: 5;
        span {
          display: inline-block;
          padding: 0.5rem 0.7rem;
          border-radius: 0.5rem;
          margin-top: 0.2rem;
          font-size: 0.88rem;
        }
        .left {
          background: white;
          animation: toLeft 0.5s ease both 1;
        }
        .right {
          background: #53a8ff;
          color: white;
          animation: toright 0.5s ease both 1;
        }
        @keyframes toLeft {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
        @keyframes toright {
          0% {
            opacity: 0;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
      }
    }
  }
  .input-box {
    // background-color: pink;
    padding: 0 0.5rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fafafa;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      height: 28px;
      display: flex;
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.2rem;
      font-size: 0.88rem;
    }
    .btn {
      height: 2.3rem;
      line-height: 2.3rem;
      min-width: 55px;
      background: #409eff;
      padding: 0.5rem;
      font-size: 0.88rem;
      color: white;
      text-align: center;
      border-radius: 0.2rem;
      margin-left: 0.5rem;
      transition: 0.5s;
    }
    .btn-active {
      background: #409eff;
    }
  }
}
.toggle-button {
    background-color: skyblue;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
<style >
.el-tabs__item {
  width: 130px;
  text-align: center;
}
</style>

3.先设置截图按钮，然后设置需要截图的div标签的ref。
<el-button @click="screenShot()">截图</el-button>
<div ref="screen">
  <p>html2canvas截图</p>
  <p>html2canvas截图</p>
  <p>html2canvas截图</p>
  <p>html2canvas截图</p>
  <p>html2canvas截图</p>
</div>

4.截图并下载图片到本地
截屏
screenShot () {
　html2canvas(this.$refs.screen, {
　　　backgroundColor: '#FFFFFF',
     useCORS: true
　}).then((canvas) => {
    if (navigator.msSaveBlob) { // IE10+ 
      let blob = canvas.msToBlob(); 
      return navigator.msSaveBlob(blob, name); 
    } else {
      let imageurl = canvas.toDataURL('image/png')
      //这里需要自己选择命名规则
      let imagename = ""
      this.fileDownload(imageurl, imagename)
    }
　})
},
下载截屏图片
fileDownload(downloadUrl, downloadName) {
  let aLink = document.createElement("a");
  aLink.style.display = "none";
  aLink.href = downloadUrl;
  aLink.download = `${downloadName}.jpg`;
  // 触发点击-然后移除
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
}