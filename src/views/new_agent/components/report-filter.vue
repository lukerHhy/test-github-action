<style scoped lang="less">
.province-city {
  display: flex;
  .input {
    background: none;
    flex: 1;
    padding: 0;
    border: none;
    color: #cccccc;
    font-size: 32px;
  }
  .placeholder {
    font-size: 32px;
    font-weight: 400;
    color: rgba(82, 81, 82, 1);
  }
  .right {
    padding-right: @margin-10;
  }
}
.custom {
  display: flex;
  flex-direction: column;
  .list {
    padding: 0.1333rem 0 1.0667rem;
    // overflow: hidden;
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 0 0.2rem;
  }
}
.select {
  padding: 20px 0;
  font-size: 24px;
  .title {
    height: 44px;
    font-size: 32px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    margin: 40px 20px 20px;
  }
  .van-row {
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: space-between;
    .van-col {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(34, 34, 34, 1);
    }
    .commission {
      width: 202px;
      height: 92px;
      border-radius: 6px;
      border: 1px solid rgba(235, 235, 235, 0.08);
    }
    .col-s,
    .col-e {
      color: #fff;
      height: 92px;
      border-radius: 6px;
      border: 1px solid rgba(235, 235, 235, 0.08);
    }
    i {
      display: inline-block;
      margin-left: 0.24rem;
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 16px solid rgba(102, 102, 102, 1);
    }
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    ._day {
      flex: 0 0 33.3%;
      padding: 15px;
      box-sizing: border-box;
    }
    .day {
      text-align: center;
      line-height: 80px;
      height: 80px;
      border-radius: 8px;
      border: 2px solid rgba(255, 255, 255, 0.08);
      font-size: 32px;
      font-weight: 400;
      color: @text-color-light;
    }
    .active {
      border: 2px solid @primary-color;
      background-color: @primary-color;
      font-weight: 600;
      color: @button-color-active;
    }
  }
}
</style>
<template>
  <div class="province-city">
    <!--<div type="text" @click="openPopup" class="input" :class="{placeholder:!province && !city}">-->
    <!--</div>-->
    <template v-if="yaboBoxMiddle || esportBoxMiddle">
      <van-popup
          v-model="isShow"
          class="custom close-top"
          closeable
          @closed="onCancel"
          round
          get-container="#app"
          close-icon-position="top-right"
      >
        <div class="pop-head">
          <h2>{{$t('记录筛选')}}</h2>
        </div>
        <div class="select">
          <p class="title">{{$t('选择时间')}}</p>

          <van-row style="margin: 0">
            <van-col
                style="margin-right: 12px"
                class="col-s"
                span="12"
                @click.native="showStartDate = true"
            >
              {{ discountData.start_text }}
              <i></i>
            </van-col>
            <van-col class="col-e" span="12" @click.native="showEndDate = true">
              {{ discountData.end_text }}
              <i></i>
            </van-col>
          </van-row>
          <div class="days" v-if="type === 'date'">
            <div class="_day" v-for="(i, index) in days" :key="index">
              <div
                  class="day"
                  :class="{ active: i.value == dayValue }"
                  @click="onDay(i.value)"
              >
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="aagames-button-box">
          <button class="aagames-button" type="button" @click="onConfirm">
{{$t('确定')}}
          </button>
        </div>
      </van-popup>
      <!-- 开始时间 -->
      <van-popup v-model="showStartDate" position="bottom" get-container="#app">
        <van-datetime-picker
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmStartDate"
            @cancel="onCancelStartDate"
            :type="type"
        />
      </van-popup>

      <!-- 结束时间 -->
      <van-popup v-model="showEndDate" position="bottom" get-container="#app">
        <van-datetime-picker
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmEndDate"
            @cancel="onCancelEndDate"
            :type="type"
        />
      </van-popup>
    </template>
    <template v-else>
      <van-popup
          v-model="isShow"
          position="bottom"
          class="custom"
          closeable
          @closed="onCancel"
          round
          get-container="#app"
          close-icon-position="top-left"
      >
        <div class="pop-head">
          <h2>{{$t('记录筛选')}}</h2>
        </div>
        <div class="list">
          <div class="select">
            <p class="title">{{$t('选择时间')}}</p>
            <van-row style="margin: 0">
              <van-col
                  style="margin-right: 12px"
                  class="col-s"
                  span="12"
                  @click.native="showStartDate = true"
              >
                {{ discountData.start_text }}
                <i></i>
              </van-col>
              <van-col
                  class="col-e"
                  span="12"
                  @click.native="showEndDate = true"
              >
                {{ discountData.end_text }}
                <i></i>
              </van-col>
            </van-row>
            <div class="days" v-if="type === 'date'">
              <div class="_day" v-for="(i, index) in days" :key="index">
                <div
                    class="day"
                    :class="{ active: i.value == dayValue }"
                    @click="onDay(i.value)"
                >
                  {{ i.name }}
                </div>
              </div>
            </div>
          </div>
          <slot name="input" />
        </div>
        <div class="aagames-button-box">
          <button class="aagames-button" type="button" @click="onConfirm">
{{$t('确定')}}
          </button>
        </div>
      </van-popup>
      <!-- 开始时间 -->
      <van-popup v-model="showStartDate" position="bottom">
        <van-datetime-picker
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmStartDate"
            @cancel="onCancelStartDate"
            :type="type"
        />
      </van-popup>

      <!-- 结束时间 -->
      <van-popup v-model="showEndDate" position="bottom">
        <van-datetime-picker
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirmEndDate"
            @cancel="onCancelEndDate"
            :type="type"
        />
      </van-popup>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import Lheader from "@/components/l-header";

export default {
  components: {
    Lheader,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "year-month",
    },
  },
  watch: {
    value(value) {
      this.isShow = value;
    },
  },
  data() {
    var self = this;
    return {
      dayValue: "",
      province: "",
      city: "",
      isShow: false,
      days: [
        {
          name: this.$t('全部'),
          value: "",
        },
        {
          name: this.$t('一天'),
          value: "1",
        },
        {
          name: this.$t('三天'),
          value: "3",
        },
        {
          name: this.$t('十五天'),
          value: "15",
        },
        {
          name: this.$t('三十天'),
          value: "30",
        },
      ],
      areaData: {},

      showStartDate: false,
      showEndDate: false,
      currentDate: new Date(),
      minDate: new Date(2017, 0),
      maxDate: new Date(),
      discountData: {
        start_text: this.$t('开始时间'),
        end_text: this.$t('结束时间'),
        page: 1,
        access_token: window.localStorage.agToken,
        size: 200,
        start_date: "",
        end_date: "",
      },
      yaboBoxMiddle: ["10024", "10042", "10043"].includes(
          process.env.VUE_APP_PROJECT_NAME
      ),
      esportBoxMiddle: ["10050"].includes(process.env.VUE_APP_PROJECT_NAME),
    };
  },
  methods: {
    getDateStr(value) {
      return moment(value).format(
          this.type === "date" ? "YYYY-MM-DD" : "YYYY-MM"
      );
    },
    gettime() {
      return this.getDateStr(new Date());
    },
    onConfirmStartDate(value) {
      let date = this.getDateStr(value);

      this.discountData.start_date = date;
      this.discountData.start_text = date;
      this.showStartDate = false;
    },
    onConfirmEndDate(value) {
      let date = this.getDateStr(value);
      this.discountData.end_date = date;
      this.discountData.end_text = date; //this.discountData.end_date
      this.showEndDate = false;
    },
    onDay(value) {
      this.dayValue = value;
      if (value) {
        this.onConfirmStartDate(moment().subtract(value - 1, "days"));
        this.onConfirmEndDate(new Date());
      } else {
        this.discountData = {
          start_text: this.$t('开始时间'),
          end_text: this.$t('结束时间'),
          start_date: "",
          end_date: "",
        };
      }
    },
    onCancelStartDate(value) {
      this.showStartDate = false;
    },
    onCancelEndDate(value) {
      this.showEndDate = false;
    },
    openPopup() {
      this.isShow = true;
    },
    onChange(picker, values) {
      picker.setColumnValues(1, this.areaData[values[0]]);
    },
    onConfirm() {
      this.$emit("onConfirm", this.discountData);
      this.onCancel();
    },
    onCancel() {
      this.$emit("input", false);
    },
  },
  mounted() {
    // this.getColumns()
  },
};
</script>
<style scoped lang="less" >
.van-popup {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #282828;
  &.custom {
    max-height: 80%;
    background-color: #282828;
    .van-popup__close-icon {
      font-size: 40px;
      color: #fff;
      top: @space-gap;
      //left: @space-gap;
    }
    h4 {
      text-align: center;
      font-size: 28px;
      color: #ccc;
      line-height: 40px;
    }
    .footer-tips {
      width: 100%;
      height: 40px;
      font-size: 28px;
      font-weight: 400;
      color: rgba(82, 81, 82, 1);
      line-height: 40px;
      text-align: center;
      margin-bottom: 30px;
      span {
        color: #ccc;
        text-decoration: underline;
      }
    }
    .pop-head {
      color: #fff;
      position: relative;
      // border-bottom: 2px solid #4a4a4a;
      h2 {
        margin: 0;
        text-align: center;
        line-height: 100px;
        font-size: 32px;
        border-bottom: 1px solid #343434;
      }
      .van-icon-arrow-left {
        position: absolute;
        font-size: 40px;
        margin-top: -20px;
        left: 10px;
        top:50%;
      }
    }
    .pop-body {
      padding: @space-gap;
      font-size: 28px;
      color: #999;
      &.payStatus{
        text-align: center;
      }
      .pay-title{
        font-size: 32px;
        color:#fff;
        text-align: center;
        line-height: 80px;
      }
    }
    .input-field {
      margin-bottom: @space-gap;
      > label {
        display: block;
        line-height: 60px;
      }
      .input-box {
        width: 100%;
        background-color: #191919;
        height: 96px;
        line-height: 96px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        .placeholderColor(#525152);
        > * {
          margin: 0 15px;
          background-color: transparent;
          border: none;
          align-self: stretch;
        }
        input,
        select {
          width: 100%;
        }
        .areaNum {
          font-size: 28px;
          font-weight: 500;
          color: #CCCCCC;
          border-right:2px solid #282828;
          min-width:140px;
          display: block;
          line-height: 1;
        }
        .xiala {
          width: 30px;
          height: 20px;
          margin: 0 10px;
          float: right;
        }
        .iconfont {
          color: #999;
          margin-right: 15px;
        }
        .areaNum {
          // flex: 1.5;
          font-size: 24px;
          padding: 0 10px 0 10px;
        }
        .select{
          background-color: @bg-color-2;
          border-radius: 8px;
        }
        .van-dropdown-menu {
          height: auto;
          .van-dropdown-menu__title {
            font-size: 28px;
            color: #fff;
            padding: 0 20px;
            line-height: 40px;
            &:after {
              border-width: 6px;
            }
          }
          .van-dropdown-item {
            // position: absolute;
            .van-popup,
            .van-cell {
              background-color: #282828;
            }
            .van-cell {
              color: #ccc;
            }
            .van-cell__title {
              padding-left: 60px;
              line-height: 40px;
              font-size: 28px;
            }
            .van-cell__value {
              padding-right: 60px;
            }
            .van-icon {
              font-size: 30px;
            }
          }
        }
      }
      .submit {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: @primary-color;
        color: #1e1e1e;
        font-size: 32px;
        font-weight: 500;
        border-radius: 8px;
        border: none;
      }
    }
  }
}
</style>
