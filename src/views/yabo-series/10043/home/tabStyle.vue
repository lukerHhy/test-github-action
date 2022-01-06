<template>
  <div class="avaswipe">
    <!-- <div class="avaswipe-tit">
      <div v-for="(item,index) in navs02" @click="slideCur(index)">
        <p v-if="activeIdx===index" class="avaswipe-active-tit">
          <span>{{$t(item.title)}}</span>
          <span>{{item.name}}</span>
        </p>
        <p v-else class="avaswipe-norm-tit">{{$t(item.title)}}</p>
      </div>
    </div> -->
    <div :class="['swiper-container',{'iosBig':num === 7 && downAppHidden}]" id="swiper-container1">
      <!-- Add Pagination -->
      <div class="swiper-pagination" id="pagination">
      </div>
      <div class="swiper-wrapper" id="swiper-dom">
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div ref="swiperScroll" class="swiper-wrapper">
              <div class="swiper-slide">
                <Sports />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <Casino />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <Slots :slotsType="slotsType" @changeSlotsType="changeSlotsType" />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <Chess />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <Lottery />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <ESports />
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div :class="['swiper-container','swiper-container2',{'iosBig':num === 7 && downAppHidden}]">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <Fishing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Casino from "../../home/casino";
import Chess from "./chess";
import Slots from "../../home/slots";
import Lottery from "./lottery";
import Fishing from "../../home/fishing";
import Sports from "../../home/sports";
import ESports from "../../home/esports";
import "swiper/dist/css/swiper.css";
import { Swiper } from "vue-awesome-swiper";
import { mapState } from "vuex";
export default {
  name: "tabStyle02",
  components: { Casino, Chess, Slots, Lottery, Fishing, Sports, ESports },
  props: ['appInstallStatus'],
  data() {
    return {
      navs02: [
          {
            title: this.$t('体育'),
            name: 'sports',
            bannerPic: '',
            // that.$bImgs[`home/${that.navs02[i].normalIcon}`]
            // normalIcon:'home_icon_sport_nomal@2x',
            normalIcon:`home_icon_sport_nomal@2x`,
            activeIcon:'home_icon_sport_selected@2x'
          },{
            title: this.$t('真人'),
            name: 'casino',
            bannerPic: '',
            normalIcon:'home_icon_live_nomal@2x',
            activeIcon:'home_icon_live_selected@2x'
          }, {
            title: this.$t('电子'),
            name: 'slots',
            bannerPic: '',
            normalIcon:'home_icon_slot_nomal@2x',
            activeIcon:'home_icon_slot_selected@2x'
          }, {
            title: this.$t('棋牌'),
            name: 'chess',
            bannerPic: '',
            normalIcon:'home_icon_board_nomal@2x',
            activeIcon:'home_icon_board_selected@2x'
          },{
            title: this.$t('彩票'),
            name: 'lottery',
            bannerPic: '',
            normalIcon:'home_icon_lottery_nomal@2x',
            activeIcon:'home_icon_lottery_selected@2x'
          }, {
            title: this.$t('电竞'),
            name: 'esports',
            bannerPic: '',
            normalIcon:'home_icon_esports_nomal@2x',
            activeIcon:'home_icon_esports_selected@2x'
          }, {
            title: this.$t('捕鱼'),
            name: 'fishing',
            bannerPic: '',
            normalIcon:'home_icon_fishing_nomal@2x',
            activeIcon:'home_icon_fishing_selected@2x'
          }
        ],
      mySwiper1: null,
      mySwiper2: null,
      slotsType: "",
      activeIdx: 0,
      num: 5,
      downAppHidden: window.sessionStorage.getItem('downAppHidden')*1,
      distanceY: 0
    };
  },
  watch: {
    active(val) {
      if (val !== 2) {
        this.slotsType = "";
      }
    },
    appInstallStatus(val) {
      if(!val) {
        this.num = screen.height < 812 ? 5 : 6
        this.downAppHidden = 1
        this.activeIdx = 0
        this.initSwiper()
      }
    }
  },
  computed: {
    ...mapState("global", ["gameSearch"], "users", ["isLogin"])
  },
  created() {
    this.navs02.map((item, index) => {
      if (
        item.name === this.$config[this.$projectname].name &&
        item.name !== "featured"
      ) {
        this.navs.splice(index, 1);
      }
    });
  },
  mounted() {

    this.initSwiper()
  },
  beforeDestroy() {
    document.getElementById('app').style.overflow = 'unset'
  },
  methods: {
    slideCur(index) {
      this.activeIdx = index;
      this.mySwiper1.slideTo(index, 300, false);
    },
    changeSlotsType() {
      this.slotsType = "";
    },
    initSwiper() {
      const that = this
      that.num = 7
      let deviceType = navigator.userAgent.toLowerCase();
      this.$nextTick(function() {
        this.mySwiper1 = new Swiper("#swiper-container1", {
          direction: "vertical",
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,
          on: {
            slideChangeTransitionStart: function(e) {
              that.activeIdx = this.activeIndex;
              if(this.activeIndex === 0) {
                // window.scrollTo(0, 0)
              } else {
                window.scrollTo(0,1000)
              }

              const actDom = document.getElementsByClassName('swiper-pagination-bullet')[that.activeIdx]
              const defDomArr = document.getElementsByClassName('swiper-pagination-bullet')
              for(let i=0;i<defDomArr.length;i++) {
                if(process.env.VUE_APP_PROJECT_NAME === '10023') {
                  defDomArr[i].style.backgroundImage = that.$bImgs[`home/${that.navs02[i].normalIcon}`]
                } else {
                  defDomArr[i].children[0].src = that.$imgs[`home/${that.navs02[i].normalIcon}`]
                }
              }
              if(process.env.VUE_APP_PROJECT_NAME === '10023') {
                actDom.style.backgroundImage = that.$bImgs[`home/${that.navs02[that.activeIdx].activeIcon}`]
              } else {
                actDom.children[0].src = that.$imgs[`home/${that.navs02[that.activeIdx].activeIcon}`]
              }
            }
          },
          pagination: {
            el: ".swiper-pagination",
            // dynamicBullets: true,
            // dynamicMainBullets: that.num,
            clickable: true,
            renderBullet:function(index, className) {
              var text = that.navs02[index].title;
              that.downAppHidden =  window.sessionStorage.getItem('downAppHidden')*1
              if(process.env.VUE_APP_PROJECT_NAME==='10023'){
                var icon = 'none'
              }else{
                var icon = that.$imgs[`home/${that.navs02[index].normalIcon}`]
              }
              if(that.activeIdx === index) {
                icon = that.navs02[index].activeIcon
                if(process.env.VUE_APP_PROJECT_NAME==='10023'){
                  icon = that.$bImgs[`home/${that.navs02[index].activeIcon}`]
                }else{
                  icon = that.$imgs[`home/${that.navs02[index].activeIcon}`]
                }
              }
              if(process.env.VUE_APP_PROJECT_NAME==='10023'){
                return `<li class="${className}" style='background-image:${icon};'>
                  ${text}
                </li>`
              }else{
                return `<li class="${className}">
                  <image src="${icon}">
                </li>`
              }

            }
          }
        });
        this.mySwiper2 = new Swiper(".swiper-container2", {
          direction: "vertical",
          nested: true,
          slidesPerView: "auto",
          freeMode: true,
          freeModeMomentumBounce : false,
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,
          scrollbar: {
            el: ".swiper-scrollbar",
            hide: true
          },
          on:{
            transitionEnd: function(){

            }
          }
        });
        this.$refs['swiperScroll'].ontouchend = (e) => {
          const swiperDom = document.getElementById('swiper-dom')
          console.log(444, swiperDom.style.transform.split(',')[1].split('px')[0])
          if(swiperDom.style.transform.split(',')[1].split('px')[0]*1>0 && this.activeIdx === 0) {
            scrollTo(0,0)
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
#swiper-container1{
  display: flex;
  justify-content: flex-start;
  position:relative;
  >.swiper-wrapper {
    width: 88%;
    margin-left: 12%;
  }
  >.swiper-pagination{
    width: 12%;
    height: 100%;
    left:0;
    top:0;
    transform: translateY(10px);
    /deep/.swiper-pagination-bullet{
      width:90px !important;
      margin:0 auto;
      background-color: transparent !important;
      height: 136px;
      background-size: 100%;
      opacity: 1 !important;
      transform: scale(1) !important;
      outline: none !important;
      background-repeat: no-repeat;
      img{
        width: 100%;
      }
    }
  }
  .swiper-container2{
    transform:translate3d(0,0,0);
    overflow:hidden;
    >.swiper-wrapper{
      transform:translate3d(0,0,0)
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  // .swiper-container{
  //   height: 870px !important;
  //   &.iosBig{
  //     height: 950px !important;
  //   }
  // }
  // .swiper-pagination{
  //   top: 620px !important;
  // }
}
</style>
