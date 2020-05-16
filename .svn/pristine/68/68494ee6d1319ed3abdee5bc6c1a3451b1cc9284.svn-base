<template>
    <div class="ar-container is-vertical">
          <!--  -->
          <div class="ar-meet_control">
            <div class="ar-meet_control_left">
              <button class="boxShow" v-if="!screenSharing" @click="shareScreen">屏幕共享</button>
              <button class="boxShow" v-else @click="stopShareScreen">结束屏幕共享</button>
            </div>

            <div class="ar-meet_control_right">
              <button
                :class="videoEnable ? 'on': 'off'"
                style="margin-left: 5px;"
                hollow
                @click="switchVideo"
              >视频 ： {{ videoEnable ? '开' : '关' }}</button>
              <button
                :class="audioEnable ? 'on': 'off'"
                style="margin-left: 5px;"
                hollow
                @click="switchAudio"
              >音频 ： {{ audioEnable ? '开' : '关' }}</button>
              <button class="signOut" style="margin-left: 5px;" @click="leaveMeet">退出</button>
            </div>
          </div>
          <!--  -->
          <h3>远程视频窗口</h3>
          <!--  -->
          <div class="ar-main">
            <div class="ar-video_view" ref="videoView">
              <div class="ar-video_wrap" ref="videoWrap">
                <!-- <div class="ar-video_box" v-for="(video, n) in videoList" :key="n" :id="video.id" :style="{'width': video.width, 'height': video.height}"> -->
                <!-- <div>{{video.id}}</div> -->
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
    data() {
        return{
            videoEnable: true,
            audioEnable: true,
            videoList: [],
        }
    },
    mouted() {
        //远程视频流打开
        Meet.on(
        "stream-subscribed",
        (peerId, pubId, userId, userData, mediaRender) => {
            that.addLog(
            "info",
            `回调：stream-subscribed: 远程人员加入 ${peerId} ${pubId}`
            );

            mediaRender.className = "ar-video_box";
            mediaRender.id = "video-player_" + pubId;
            that.$refs.videoWrap.appendChild(mediaRender);

            that.$nextTick(() => {
            that.handleResize();
            });
        }
        );

        //远程视频流断开
        Meet.on("stream-unsubscribed", (peerId, pubId, userId, userData) => {
        that.addLog("info", `回调：stream-unsubscribed: 远程人员离开 ${pubId}`);
        document.getElementById("video-player_" + pubId) &&
            document.getElementById("video-player_" + pubId).remove();

        that.$nextTick(() => {
            that.handleResize();
        });
        });
    },
    methods: {
        //屏幕共享
        shareScreen() {
        this.Meet && this.Meet.openShare(0);
        this.addLog("info", `方法：openShare: 开启屏幕共享`);
        },
        //结束屏幕共享
        stopShareScreen() {
        this.addLog("info", `方法：openShare: 关闭屏幕共享`);
        this.Meet && this.Meet.stopScreenCap();
        },
        //视频开关
        switchVideo() {
        let that = this;

        that.Meet &&
            that.Meet.setLocalVideoEnable((that.videoEnable = !that.videoEnable));
        },
        //音频开关
        switchAudio() {
        this.Meet &&
            this.Meet.setLocalAudioEnable((this.audioEnable = !this.audioEnable));
        },
        copyID(id) {
        document.getElementById(id).select();
        document.execCommand("Copy");
        },
        leaveMeet() {
        let that = this;

        if (confirm("确定离开房间吗？")) {
            if (that.Meet) {
            that.Meet.leaveRTC();
            that.Meet = null;
            }
            that.$router.push("/");
            }
        },
        destroyed() {
        this.Meet && (this.Meet.leaveRTC(), (this.Meet = null));
        }
    },
    
        
}
</script>

<style lang="scss" scoped>
.ar-meet_view {
  padding: 0 20px 20px;
  background-color: #f6f6f6;
}
.ar-meet_control {
  margin: 17px 0 7px;
  display: flex;
  justify-content: space-between;

  button {
    outline: none;
    width: 80px;
    height: 34px;
    text-align: center;
    border: none;
    line-height: 34px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    font-size: 12px;
    margin-right: 10px;
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
    &.boxShow {
      box-shadow: 0px 2px 8px 0px rgba(5, 7, 37, 0.17);
    }
    &.on {
      border: 1px solid rgba(51, 177, 93, 1);
      color: rgba(51, 177, 93, 1);
    }
    &.off {
      border: 1px solid rgba(227, 76, 76, 1);
      color: rgba(227, 76, 76, 1);
    }
    &.signOut {
      background: rgba(233, 74, 74, 1);
      color: #fff;
    }
  }
}
</style>