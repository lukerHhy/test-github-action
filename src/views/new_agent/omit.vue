<template>
  <div id="omit">
    <van-nav-bar
      left-arrow
      fixed
      @click-left="$router.go(-1)"
      @click-right=""
    >
      <template #title>
        <span style="color:#FFFFFF">{{ $t('遗漏申请') }}</span>
      </template>
    </van-nav-bar>
    <van-cell-group style="margin-top: 1rem;display: flex;
    ">
      <van-field
        style="width:2rem;width: 5rem;
              border: 1px solid #C8A77F;
              border-radius: 7px;
              height: 1rem;"
        :input-align="'right'"
        border
        v-model="userNumber"
        :placeholder="$t('请输入会员账号')"
      />
      <van-button
        style="width:3rem;height: 1rem;
    margin-left: .6rem;
    line-height:1rem"
        color="#d0b393"
        @click="addmember"
      >{{ $t('提交申请') }}
      </van-button>
    </van-cell-group>
    <Cell
      @click="selecttype = true"
      :title="$t('申请状态')"
    >
      <span>{{ typestatetext !== '' ? typestatetext : $t('请选择申请状态') }}</span>
      <span
        class="iconfont icon-dayuhao"
        style="margin-right: 0"
      ></span>
    </Cell>
    <Cell
      @click="selectdate = true"
      :title="$t('新增时间')"
    >
      <span>{{ currentDate !== '' ? currentDate : $t('请选择新增时间') }}</span>
      <span
        class="iconfont icon-dayuhao"
        style="margin-right: 0"
      ></span>
    </Cell>
    <Cell
      @click="selectcheckdate = true"
      :title="$t('审核时间')"
    >
      <span>{{ checkDate !== '' ? checkDate : $t('请选择审核时间') }}</span>
      <span
        class="iconfont icon-dayuhao"
        style="margin-right: 0"
      ></span>
    </Cell>
    <van-button
      @click="getomitlist"
      style="width:8rem;height: 1rem;
    margin-left: .6rem;
    margin-top:.3rem;
    line-height:1rem;
    "
      color="#d0b393"
    >{{ $t('查询') }}
    </van-button>
    <div class="tableList-box">
      <ul class="tableList">
        <li style="color: #d0b393;font-size:.4rem">
          <div>{{ $t('会员帐号') }}</div>
          <div>{{ $t('审核状态') }}</div>
          <div>{{ $t('备注') }}</div>
          <div>{{ $t('新增时间') }}</div>
          <div>{{ $t('审核时间') }}</div>
          <div>{{ $t('操作') }}</div>
        </li>
        <li
          v-if="dataList.length !== 0"
          v-for="(item, i) in dataList"
          :key="i"
        >
          <div>{{ item.username }}</div>
          <div>{{ columns[item.audit_status - 1] }}</div>
          <div>{{ item.remark }}</div>
          <div>{{ item.created_at ? item.created_at.substring(0, 10) : "" }}</div>
          <div>{{ item.audit_time ? item.audit_time.substring(0, 10) : "" }}</div>
          <div v-if="item.audit_status === 2">
            <van-button
              @click="openApply(item)"
              style="min-width:2rem;height: .7rem;
             "
            >{{ $t('申请') }}
            </van-button>
          </div>
          <div v-if="item.audit_status !== 2">
            <van-button
              @click="detailEvent(item)"
              style="min-width:2rem;height: .7rem;
             "
              color="#d0b393"
            >{{ $t('查看') }}
            </van-button>
          </div>
        </li>
        <li
          v-if="dataList.length === 0"
          class="nodata"
        >{{ $t('暂无数据') }}</li>
      </ul>
    </div>

    <van-popup
      v-model="selecttype"
      position="bottom"
      :style="{ height: '30%', overflow: 'hidden' }"
    >
      <van-picker
        :title="$t('申请状态')"
        show-toolbar
        :cancel-button-text="$t('取消')"
        :columns="columns"
        @cancel="selecttype = false"
        @confirm="onConfirm"
      />
    </van-popup>

    <van-popup
      v-model="selectdate"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="v1"
        type="date"
        :title="$t('选择新增时间')"
        @cancel="selectdate = false"
        @confirm="currentDateEvent"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <van-popup
      v-model="selectcheckdate"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="v"
        type="date"
        :title="$t('选择审核时间')"
        @cancel="selectcheckdate = false"
        @confirm="checkdateEvent"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <popup v-model="applyShow">
      <div class="ap-box">
        <van-nav-bar
          left-arrow
          fixed
          @click-left="close"
          @click-right=""
        >
          <template #title>
            <span style="color:#FFFFFF">{{ title }}</span>
          </template>
        </van-nav-bar>
        <p
          class="titleText"
          style="color: #C8A77F;
    background: #383738;margin-top: 1.4rem"
        >
          <span class="iconfont icon-gantanhao"></span>
          {{$t('只能找回通过自身代理链接注册的下级会员，且注册三天时间内有效。')}}
        </p>
        <div class="content">
          <p class="user label">
            {{$t('会员账号')}}：
            <span style="color:#F5F5F5">{{
                detailFlag ? this.detailData.username : this.userName
              }}</span>
          </p>
          <div class="col">
            <p class="label">{{ $t('推广链接') }}</p>
            <van-field
              :disabled="detailFlag"
              style="height: 1rem;
    line-height: .8rem;
    margin: .3rem 0;"
              v-model="url"
              :placeholder="$t('输入推广链接')"
            />
          </div>
          <div
            class="col"
            @click="select"
          >
            <p class="label">
              {{$t('推广设备')}}
              <span
                style="color:#F84545"
                class="iconfont icon-start"
              ></span>
            </p>

            <van-field
              :disabled="detailFlag"
              readonly
              :placeholder="$t('选择设备')"
              :value="
                detailFlag
                  ? checkedData[selectValue.toString()]
                  : selectValue.toString()
              "
              @click="clickShowPicker"
            />
            <van-popup
              v-model="showPicker"
              closeable
              close-icon-position="top-left"
              position="bottom"
              :style="{ height: '40%' }"
            >
              <van-picker
                :title="$t('推广设备')"
                show-toolbar
                :cancel-button-text="' '"
                :columns="checked"
                @confirm="selectClose"
                @cancel="showPicker = false"
              />
            </van-popup>
          </div>
          <div class="col">
            <p class="label">{{ $t('申请理由') }}</p>
            <van-field
              :disabled="detailFlag"
              v-model="message"
              style="height: 3rem;
            margin: .3rem 0;
            border-radius: 7px;"
              class="textInput"
              rows="1"
              autosize
              type="textarea"
              maxlength="100"
              :placeholder="detailFlag ? '' : $t('填写申请理由 100字以内')"
              show-word-limit
            />
          </div>
          <p
            class="label"
            style="
    line-height: 0.5rem;
"
          >
            {{$t('申请附图：请上传jpg，png，jpeg格式，且大小不超过5M 的图片。')}}
            <!--            <spanstyle="color:#F5F5F5">{{$t('查看示例图')}}</span>-->
          </p>
          <div style="position: relative;margin-bottom: 0.5rem">
            <van-uploader
              v-if="!detailFlag"
              style="margin: .3rem;"
              v-model="fileList"
              multiple
              :max-count="6"
              :after-read="afterRead"
            >
              <div class="upload-tips">
                <span>{{$t('最多6张')}}</span>
              </div>
            </van-uploader>
          </div>

          <ul
            v-if="detailFlag"
            class="img-box"
          >
            <li
              v-for="(item, i) in imgList"
              :key="i"
            >
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="item"
                @click="checkUploaderImg(i)"
              />
            </li>
          </ul>
          <van-button
            v-if="!detailFlag"
            style="    width: 96.5%;
    height: 1rem;
    text-align: center;
   margin: 0.3rem auto;
   display: block;
"
            color="#C8A77F"
            @click="pushdata"
          >{{ $t('确认提交') }}
          </van-button>
          <van-button
            @click="close"
            style=" width: 96.5%;
    height: 1rem;
    text-align: center;
   margin:0 auto;
   display: block;
"
          >
            {{ detailFlag ? $t('关闭') : $t('取消申请') }}
          </van-button>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import Cell from './components/cell'
import {
  formateDate
} from '../../utils'
import {
  upload
} from '@/api/personalData'
import {
  ask_omit,
  devtypeist,
  omit_detail,
  omitadduser,
  omitlist
} from '@/api/agent'
import Lheader from '@/components/l-header'
import popup from '../activity/wheelSurf/popup'
import {
  ImagePreview
} from 'vant';

export default {
  components: {
    Cell,
    popup,
    Lheader
  },
  data() {
    return {
      title: this.$t('发起申请'),
      v: '',
      v1: '',
      userNumber: '',
      showPicker: false,
      selectValue: '',
      applyShow: false,
      selecttype: false,
      selectdate: false,
      selectcheckdate: false,
      columns: [
        this.$t('无法申请'),
        this.$t('可以申请'),
        this.$t('待审核'),
        this.$t('审核通过'),
        this.$t('审核拒绝'),
        this.$t('系统驳回'),
      ],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      typestatetext: '',
      typestate: '',
      currentDate: '',
      checkDate: '',
      dataList: [],
      url: '',
      checked: [],
      message: '',
      fileList: [],
      userid: '',
      detailFlag: true,
      detailData: {},
      imgList: [],
      checkedData: '',
      checkedValue: '',
      userName: '',
      index: 0
    }
  },
  created() {
    this.getomitlist()
    this.typeList()
  },
  methods: {
    async afterRead(file) {
      var formData = new FormData()
      formData.append('file', file.file)
      let res = await upload(formData)
      this.imgList.push(res.data.data.path)
    },
    selectClose(value) {
      this.selectValue = value
      this.showPicker = false
    },
    checkUploaderImg(i) {
      ImagePreview({
        images: this.imgList,
        startPosition: i,
      })
    },
    clickShowPicker() {
      if (this.detailFlag) {
        this.showPicker = false
      } else {
        this.showPicker = true
      }
    },
    select() {
      this.selectshow = true
    },
    async detailEvent(item) {
      this.detailFlag = true
      this.title = this.$t('查看申请')
      const {
        data: {
          data
        },
      } = await omit_detail({
        id: item.id
      })
      this.url = data.agent_domain
      this.selectValue = data.ask_dev_type === null ? [] : data.ask_dev_type
      this.message = data.ask_reason
      this.detailData = data
      if (this.detailData.ask_pics === '') {
        this.imgList = []
      }
      this.imgList = JSON.parse(this.detailData.ask_pics)
      this.applyShow = true
    },
    close() {
      this.checked = []
      this.selectValue = []
      this.fileList = []
      this.message = ''
      this.url = ''
      this.applyShow = false
    },
    async pushdata() {
      let ask_pics = []
      for (const [key, value] of Object.entries(this.checkedData)) {
        if (this.selectValue === value) {
          this.checkedValue = key
        }
      }
      if (this.selectValue.toString() === '') {
        this.$toast(this.$t('推广设备不能为空'))
        return false
      }

      this.fileList.map((item) => {
        ask_pics.push(item.content)
      })

      const {
        data
      } = await ask_omit({
        id: this.userid,
        ask_dev_type: this.checkedValue,
        ask_pics: JSON.stringify(this.imgList),
        agent_domain: this.url,
        ask_reason: this.message,
      })
      if (data.code === 0) {
        this.$toast(this.$t('提交成功'))
        this.getomitlist()
      }
      this.applyShow = false
    },
    async typeList() {
      const {
        data: {
          data
        },
      } = await devtypeist()
      for (let i in data) {
        this.checked.push(data[i])
      }
      this.checkedData = data
    },
    async openApply(item) {
      this.detailFlag = false
      this.checked = []
      this.selectValue = []
      this.fileList = []
      this.message = ''
      this.url = ''
      this.userid = item.id
      this.userName = item.username
      this.imgList = [];

      const {
        data: {
          data
        },
      } = await devtypeist()
      for (let i in data) {
        this.checked.push(data[i])
      }
      this.checkedData = data
      this.applyShow = true
    },
    async addmember() {
      const {
        data
      } = await omitadduser({
        username: this.userNumber
      })
      if (data.code === 0) {
        this.$toast(this.$t('添加成功'))
        this.getomitlist()
      }
    },
    async getomitlist() {
      // const {
      //   data: {
      //     data: { data },
      //   },
      // } = await omitlist({
      //   audit_status: this.typestate,
      //   ask_time: this.currentDate,
      //   audit_time: this.checkDate,
      // })
      let data = null;
      omitlist({
        audit_status: this.typestate,
        ask_time: this.currentDate,
        audit_time: this.checkDate,
      }).then(res => {
        data = res.data.data.data;
        this.dataList = data;
      })
    },
    currentDateEvent(time) {
      this.currentDate = formateDate(time)
      this.selectdomitlistate = false
    },
    checkdateEvent(time) {
      this.checkDate = formateDate(time)
      this.selectcheckdate = false
    },
    onConfirm(name, i) {
      this.typestatetext = name
      this.typestate = Number(i) + 1
      this.selecttype = false
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .van-image .van-image__loading {
  background-image: url(~@assets/img3_0/common/loading.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  z-index: 10;
}

/deep/ .van-picker .van-picker__toolbar {
  /* background-color: #D6BDA3; */
  // color: #FFFFFF;
  border-bottom: 2px solid #313133;
}

/deep/ .van-popup {
  overflow: hidden;
}

.nodata {
  width: 2rem;
  margin-left: 4rem;
  color: #999;
}

.img-box {
  width: 100%;
  overflow: hidden;
  margin: 0.4rem 0;

  li {
    float: left;
    //margin-left: 0.2rem;
    margin-left: 1vw;
    width: 30.8vw;
    height: 30vw;
    // height: 1.5rem;
    margin-bottom: 0.3rem;
  }
}

/deep/ .van-picker__toolbar {
  border-bottom: 1px solid #343434;
}

/deep/ .van-uploader__upload {
  width: 2rem;
  height: 1.5rem;
}

/deep/ .van-uploader__upload-icon {
  font-size: 0.6rem;
}

.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

/deep/ .van-checkbox__label {
  color: #999;
}

/deep/ .van-field__control {
  color: #ccc;
  border: 1px solid #525152;
  padding-left: 0.2rem;
  width: 99.7% !important;
}

.textInput {
  /deep/ .van-field__control {
    height: 2.2rem !important;
  }

  /deep/ .van-field__word-limit {
    margin-top: 0.3rem;
  }
}

/deep/ .van-field__control::placeholder {
  color: #515151;
}

.col {
  margin-top: 0.4rem;
}

.user {
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.4rem;
}

.ap-box {
  width: 100%;
  height: 100%;
  background: #191919;
  color: #999;
  overflow-y: scroll;
  font-size: 0.37333rem;

  .content {
    padding: 0.2rem;

    .label {
      padding-left: 0.22rem;
    }

    .imgLoad {
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 50%;
      }
    }
  }

  .iconfont {
    vertical-align: middle;
    margin-right: 0.1rem;
  }

  .titleText {
    line-height: 0.6rem;
    padding: 0.2rem 0.7rem;
  }
}

.aptitle {
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
  line-height: 1rem;
  align-items: center;
  color: #fff;
}

/deep/ .van-button__content {
  width: 100% !important;
  span{
    font-size: 27px !important;
  }
}

.nodate {
  width: 1.6rem;
  margin-left: 4rem;
}

.tableList-box {
  width: 100%;
  overflow-x: scroll;
  margin-top: 0.3rem;
}

.tableList {
  width: 100%;
  color: #eeeeee;
  font-size: 0.35rem;
  // overflow-x: scroll;
  width: 14rem;

  li {
    display: flex;
    height: 1rem;
    width: 14rem;
    line-height: 1rem;

    div {
      width: 4rem;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/deep/ .van-cell {
  background: #191919;
  font-size: 30px;
  color: #999999;
  height: 1.4rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
}

/deep/ .van-cell-group .van-cell .van-cell__value input {
  text-align: left;
  padding-left: 0.3rem;
}

/deep/ .van-icon-arrow-left {
  color: #ffffff;
  font-size: 0.5rem;
}

/deep/ .van-nav-bar {
  background: #191919 !important;
}

#omit {
  width: 100%;
  height: 100%;
  background: @bg-color;
  padding: 0.6rem 0.4rem;
  overflow-y: auto;
  padding-bottom: 1.6rem;
  // padding-right: 0;
}

.upload-tips {
  position: relative;
  background: url(./images/pic_photo.png) no-repeat;
  background-size: contain;
  width: 160px;
  height: 160px;
  > span {
    position: absolute;
    bottom: 15px;
    width: 100%;
    text-align: center;
    font-size: 15px;
  }
}

/deep/ .van-uploader__wrapper {
  justify-content: space-between;
}

/deep/ .van-uploader__preview-image {
  width: 2rem !important;
  height: 1.97rem !important;
}

/*<div class="van-uploader__preview-delete"><i class="van-icon van-icon-cross van-uploader__preview-delete-icon"><!----></i></div>*/

/deep/ .van-uploader__preview-delete {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  /*width: 0.18667rem;*/
  /*height: 0.18667rem;*/
  width: 30px;
  height: 30px;
  /*background-color: rgba(0,0,0,.7);*/
  /*border-radius: 0 0 0 0.16rem;*/
  background: url("../../assets/common/img/home/reduce.png");
  background-size: 30px;
}

/deep/ .van-uploader__preview-delete-icon {
  transform: scale(0);
}
</style>
