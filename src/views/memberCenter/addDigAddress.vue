<template>
    <div class="addDigAddress">
        <van-nav-bar
            class="m-header transparent"
            :title="form.id?$t('编辑收币地址'):$t('添加收币地址')"
            left-arrow
            :fixed="true"
            @click-left="onClickLeft"
        />
        <div class="m-body gap">
            <ul class="withdraw-form">
                <li class="dig-wrap">
                    <label>{{$t('提款币种')}}</label>
                    <div class="input" @click="showDig = true">
                        <input style="text-transform:uppercase;" disabled type="text" v-model="form.type">
                        <van-icon name="arrow-down" />
                    </div>
                </li>
                <li class="dig-wrap">
                    <label>{{$t('协议')}}</label>
                    <div class="protocol" v-if="protocol.length">
                        <span 
                            :class="{'active':form.protocol === item.value}"
                            @click="form.protocol = item.value"
                            v-for="(item,index) in protocol.filter(m => m.type === form.type)[0].protocol" :key="index"
                        >{{item.name}}</span>
                    </div>
                </li>
                <li class="dig-wrap">
                    <label>{{$t('收币地址')}}</label>
                    <div class="input">
                        <input type="text" v-model="form.address" :placeholder="$t(`${$t('请输入或粘贴')}${form.protocol}${$t('地址')}`)">
                    </div>
                </li>
                <li class="dig-wrap">
                    <label>{{$t('备注')}}</label>
                    <div class="input">
                        <input type="text" v-model="form.remark">
                    </div>
                </li>
            </ul>
            <div class="ui-buttons">
                <van-button :loading="loading" type="primary" @click="handleSave">{{$t('保存')}}</van-button>
            </div>
        </div>
        <!-- 数字货币类型 -->
        <van-popup
        class="custom"
        v-model="showDig"
        closeable
        round
        close-icon-position="top-left"
        position="bottom"
        get-container="#app"
        >
        <div class="pop-head">
            <h2>{{$t('提款币种类型')}}</h2>
        </div>
        <div class="pop-body">
            <p 
            style="text-align:center;" 
            @click="handleChose"
            v-for="(item,index) in protocol" :key="index"
            >{{item.type_name}}</p>
        </div>
        </van-popup>
    </div>
</template>

<script>
import { staticprotocol, adddigwallet } from "@/api/memberCenter";
import {parseTime} from '@/filters'
export default {
    data() {
        return{
            showDig: false,
            form:{
                type: '',
                protocol: '',
                address: '',
                remark: '',
                id: ''
            },
            protocol: [],
            loading: false,
            time: ''
        }
    },
    created() {
        this.time = parseTime((new Date()).getTime(), '{h}:{i}')
        const query = this.$route.query.param ? JSON.parse(this.$route.query.param) : null
        if(query) this.form = query
        this.getProcotol()
    },
    watch: {
        'form.protocol'(val) {
            this.form.remark = `${val} ${this.time}`
        }
    },
    methods: {
        async getProcotol () {
            const res = await staticprotocol()
            this.protocol = res.data.data
            if(!this.form.id) {
                this.form.type = this.protocol[0].type
                this.form.protocol = this.protocol[0].protocol[0].value 
                this.form.remark = `${this.protocol[0].protocol[0].value} ${this.time}`
            }
        },
        onClickLeft() {
            this.$router.push({
                name: "digAddress"
            });
        },
        initForm () {
            this.form = {
                type: '',
                protocol: '',
                address: '',
                remark: '',
                id: ''
            }
        },
        async handleSave () {
            this.loading = true
            try{
                await adddigwallet(this.form)
                this.getProcotol()
                this.loading = false
                this.initForm()
                this.$router.push({name: 'digAddress'})
            }catch(e) {
                this.loading = false
            }
        },
        handleChose(val) {
            this.form.protocol = val.type
            this.showDig = false
        }
    }
}
</script>

<style lang="less">
    .addDigAddress{
        height:100%;
        .m-body{
            padding-top: @height-nav-bar !important;
        }
        .withdraw-form{
            display: flex;
            flex-wrap: wrap;
            > li {
                width: 100%;
                color: #999;
                padding: 10px 0;
                &.dig-wrap{
                    border:0;
                    margin-bottom: 40px;
                    .input{
                        height: 88px;
                        line-height: 88px;
                        border:2px solid @border-color;
                        border-radius: 8px;
                        margin-top: 30px;
                        input{
                        width: 90%;
                        padding-left: 40px;
                        font-size: 28px;
                        }
                        i{
                        margin-right: 36px;
                        }
                        span{
                        position: relative;
                        }
                        img{
                        position: absolute;
                        top: 50%;
                        right: 36px;
                        margin-top: -18px;
                        width: 36px;
                        }
                    }
                    .protocol{
                        margin-top: 10px;
                        span{
                        display: inline-block;
                        width: 200px;
                        height: 80px;
                        border-radius: 12px;
                        border: 2px solid @border-color;
                        line-height: 80px;
                        text-align: center;
                        font-size: 28px;
                        margin-right: 20px;
                        &.active{
                            border: 4px solid @primary-color;
                            color: @primary-color;
                            opacity: 1;
                        }
                        }
                    }
                }
            }
        }
    }
</style>
