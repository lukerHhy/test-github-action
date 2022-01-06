<template>
    <div class="digAddress">
        <van-nav-bar
            class="m-header transparent"
            :title="$t('收币地址')"
            left-arrow
            :fixed="true"
            @click-left="onClickLeft"
        />
        <div class="m-body gap">
            <ul>
                <li
                    v-for="(item, index) in walletList"
                    :key="index"
                >
                    <div class="top">
                        <h4 @click="handleChose(item)">{{ item.remark }}</h4>
                        <!-- <p @click="handleChose(item)">{{ (item.address).replace(/(d{6})d{3}(d{6})/, '$1...$2') }}</p> -->
                        <p v-if="item.address.length<15" @click="handleChose(item)">{{ item.address }}</p>
                        <p v-else @click="handleChose(item)">{{ `${item.address.substr(0,6)}...${item.address.substr(item.address.length-7)}` }}</p>
                        <van-icon name="edit" @click="handleAdd(item)"><span>{{$t('编辑')}}</span></van-icon>
                    </div>
                    <div class="bottom">
                    <p>{{ item.updated_at }}</p>
                    </div>
                </li>
            </ul>
            <div class="empty" v-show="!walletList.length">
                <van-image :src="$imgs['memberCenter/empty']" />
                <p>{{$t('暂未添加收币地址')}}</p>
            </div>
            <div class="ui-buttons">
                <van-button type="primary" @click="$router.push('/addDigAddress')">{{$t('添加地址')}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { digwalletlist } from '@/api/memberCenter'
export default {
    data() {
        return{
            walletList: [],
            form: {}
        }
    },
    created() {
        const query = this.$route.query.param?JSON.parse(this.$route.query.param):null
        console.log('query', query)
        if(query) {
            this.form = query
        }
        this.loadData()
    },
    methods: {
        async loadData() {
            const res = await digwalletlist()
            console.log('res', res)
            this.walletList = res.data.data
        },
        onClickLeft() {
            this.$router.push({
                name: "withdraw"
            });
        },
        handleChose(val) {
            console.log('aa', this.form)
            let obj = {
                type: 2,
                address: val.address,
                id: val.id
            }
            obj = Object.assign({},this.form,obj)
            console.log('aa', obj)
            this.$router.push({
                name: 'withdraw',
                query: {param: JSON.stringify(obj)}
            })
        },
        handleAdd(val) {
            this.$router.push({
                name: 'addDigAddress',
                query: {param:JSON.stringify(val)}
            })
        }
    }
}
</script>

<style lang="less">
    .digAddress{
        height:100%;
        .m-body{
            padding-top: @height-nav-bar !important;
        }
        ul{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
                width: 100%;
                padding: 26px 30px 14px 30px;
                border-radius: 8px;
                margin-bottom: 24px;
                background: @bg-card-color;
                &:focus{
                    border: 2px solid @primary-color;
                }
                .top{
                    border-bottom: 2px solid rgba(#fff,.06);
                    position: relative;
                    h4{
                        font-size: 32px;
                        color: #ccc;
                        line-height: 44px;
                        margin-bottom: 6px;
                        margin-top: 0;
                        height: 44px;
                        width:80%;
                        display: inline-block;
                    }
                    p{
                        font-size: 28px;
                        color: #999;
                        margin-bottom: 12px;
                        line-height: 40px;
                        width:80%;
                        display: inline-block;
                    }
                    .van-icon{
                        position: absolute;
                        z-index: 99;
                        right: 0;
                        top: 34px;
                        font-size: 30px;
                        cursor: pointer;
                        color: @primary-color;
                        span{
                            position: relative;
                            top: -4px;
                        }
                    }
                }
                .bottom{
                    p{
                        color: #6A6A6A;
                        font-size: 24px;
                        line-height: 34px;
                        margin-top: 14px;
                    }
                }
            }
        }
        .empty{
            text-align: center;
            margin: 180px 0;
            img{
                width: 116px;
            }
            p{
                font-size: 28px;
                margin-top: 18px;
                color: #525152;
            }
        }
    }
</style>