<template>
  <div
    class="game"
  >
    <iframe
      ref="iframe"
      :src="bdUrl"
      id="myiframe"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import { backtrans, open, onlinecheck } from "@/api/entertainment";
import { mapGetters } from 'vuex'
import xhr from "@/utils/xhr";
import { createSocket, oncloseWS } from '@/utils/socket'
import { loadPTGame } from '@/utils/game'

// import $ from "jquery";

var timer = null;

export default {
  name: "game",
  data() {
    return {
      bdUrl: "",
      initTime: 0,
      allPlatforms: ''
    };
  },
  computed: {
    ...mapGetters('user', ['token'])
  },
  async created() {
    this.allPlatforms = await this.$store.dispatch('games/getAllPlatforms')
    console.log(111, this.allPlatforms)
    this.$nextTick(() => {
      this.openGame();
    });
  },
  mounted() {
    function handleSetVar(){
      // We execute the same script as before
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    handleSetVar()
    // We listen to the resize event
    window.addEventListener('resize', handleSetVar)
    this.$once('destroy', () => {
      window.removeEventListener('resize', handleSetVar)
    })
    // this.$nextTick(() => {
    //   const iframe = document.getElementById('myiframe')
    //   console.log(iframe)
    //   debugger
    // 	if (iframe.attachEvent) {    
    // 		iframe.attachEvent("onload", function() {    
    //       console.log('axiba1')	
    // 		})
    // 	} else {    
    // 		iframe.onload = function() {  
    //       console.log('axiba2')
    // 		}  
    // 	}
    // })

    // 处理vr游戏
    if ([121].indexOf(this.$route.query.platform_id*1) !== -1 || ([2].indexOf(this.$route.query.cate_id*1) != -1 && [3].indexOf(this.$route.query.platform_id*1) != -1)) {
      return false
    }
    this.$notify({
      message: this.$t('请开启自动旋转屏幕能够横屏玩游戏'),
      duration: 5000
    });
    if (window != top) {
      top.location.href = location.href;
    }
    const self = this;

    window.onbeforeunload = function (event) {
      if (
        (self.bdUrl.split(":")[0] == "http" &&
          document.domain !== process.env.VUE_APP_GAME_DOMAIN) ||
        (self.bdUrl.split(":")[0] == "https" &&
          document.domain != process.env.VUE_APP_GAME_DOMAIN) ||
        (document.domain == process.env.VUE_APP_GAME_DOMAIN && self.allPlatforms[self.$route.query.platform_id] == 'PT')
      ) {
        if (navigator.sendBeacon) {
          const data = {
            game_id: self.$route.query.game_id,
            access_token: self.token,
            merchant_no: process.env.VUE_APP_MERCHANT_NO
          }
          self.result = navigator.sendBeacon(
            process.env.VUE_APP_H5_API_URL + '/backtrans',
            data
          )
          window.localStorage.setItem('backtrans-result', self.result)
        } else {
          xhr({
            type: 'POST',
            url: process.env.VUE_APP_H5_API_URL + '/backtrans',
            data: {
              game_id: self.$route.query.game_id,
              access_token: self.token,
              merchant_no: process.env.VUE_APP_MERCHANT_NO
            },
            async: false,
            success: res => {
              // clearInterval(self.timer)
              oncloseWS()
            }
          })
        }
      }
    };
    // setTimeout(() => {
    //   self.gameCheck();
    // }, 3000);
  },
  methods: {
    setIframe() {
      let iframe = document.createElement("iframe")
      let game = document.getElementsByClassName('game')[0]
      iframe.src = this.bdUrl
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", function () {
          // const iframeNode = window.frames["ifra"].document
          // self.getDom(iframeNode)			
        });
      } else {
        iframe.onload = function () {
          console.log('axiba')
          // const iframeNode = window.frames["ifra"].document
          // self.getDom(iframeNode)
        };
      }
      game.appendChild(iframe);
    },
    openGame() {
      this.$loading({
        mask: false
      })
      open({
        game_id: this.$route.query.game_id
      }).then(res => {
        const self = this;
        const platform_id = self.$route.query.platform_id*1
        // self.$toast.clear()
        if (res.data.code === 0) {
          if (platform_id === 142) {
            loadPTGame(res);
            return
          }
          if (res.data.data.open_mode && res.data.data.open_mode === 2) {
            window.location.href = res.data.data.url
            return false
          }
          if (
            (res.data.data.url.split(":")[0] == "http" &&
              window.location.host !== process.env.VUE_APP_GAME_DOMAIN) ||
            (self.allPlatforms[platform_id] == 'PT' &&
              window.location.host != process.env.VUE_APP_GAME_DOMAIN)
          ) {
            window.location.href = `http://${process.env.VUE_APP_GAME_DOMAIN}/game${window.location.search}`
            // window.location.href = "http://m.aag88.me/game" + window.location.search;
          } else {
            // 处理vr pt 电子游戏
            if ([121].indexOf(platform_id) != -1 ||
              ([2].indexOf(self.$route.query.cate_id*1) !== -1 && [3].indexOf(platform_id) !== -1) ||
              self.allPlatforms[platform_id] == 'PT') {
              window.location.href = res.data.data.url
              self.gameCheck()
            } else {
              self.bdUrl = res.data.data.url;
              self.gameCheck()
              // this.setIframe()
            }
            // window.location.href = res.data.data.url
          }
          // self.gameCheck()
        } else {
          self.$toast({
            message: res.data.msg,
            onClose() {
              self.$router.push({
                path: "home"
              });
            }
          });
        }
      });
    },
    gameCheck() {
      // const self = this;
      // if (self.timer) {
      //   clearInterval(self.timer)
      // }
      // timer = setInterval(() => {
      //   onlinecheck({
      //     game_id: self.$route.query.game_id
      //   });
      // }, 5000);
      const access_token = this.token || this.$route.query.at
      createSocket(`${process.env.VUE_APP_WS_URL}/connect?token=${access_token}&ctype=user`)
    }
  },
  destroyed() {
    // clearInterval(timer);
    oncloseWS()
  }
};
</script>

<style scoped lang="less">
.game {
  background-image: url("~@assets/img3_0/home/game-bg@2x.png");
  background-size: cover;
  background-position: center;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  position:relative;
  display: flex;
  flex-direction: column;
  iframe{
    flex: 1;
  }
}
</style>
