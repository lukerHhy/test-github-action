# aagames web 3.0
### 前端架构
```
主从分离：当前项目仓库拆分为两个：aagames_h52.0(主)、aagames_h5_common(从)
路由自治：在current_project的router文件夹下，各个商户管理自己项目的路由
资源自治：将当前项目的图片和样式文件都放到 current_project文件夹下
组件自治：在current_project的components文件夹下，各个商户管理自己项目的组件
```
### 开发指南
```$xslt
1.初始化项目
.env 文件按商户号大小增加 VUE_APP_PROJECT_NAME = 商户号 及商户拼音
git clone git@github.com:j33app2/aagames_web2.0.git
npm install
npm run init // 初始化子仓库

2.切换商户模版
npm run tpl 商户号 //切换当前开发环境为该商户

3.快速迁移已有模版
    3.1 在子仓库(src/current_project)下面新建一个以商户号命名的分支 例如新建 商户:10023
    cd src/current_porject
    git checkout 10029 // 从10029新建10023分支，减少工作量
    git checkout -b 10023
    3.2 在 src/current_project新建 components、router两个文件夹 以及 index.js文件 。具体意义参考下面的“子仓库目录结构”
    3.3 修改current_project路由，这步也是工作量最大的一步。将所有路由中与当前商户有关的页面全部指定到 current_project/components中的对应页面
    3.4 迁移注意
        3.4.2 如果APP.vue中有商户的定制代码，需要针对性修改 index.js。具体参考下面的“入口APP.vue”
        3.4.3 运行 gulp tinypng 命令进行图片压缩
    3.5 完成以上步骤，在current_project(子仓库)目录下提交分支代码，完成迁移(注意一定要保证代码能运行)
```

### 开发注意事项

#### 入口APP.vue
```$xslt
1.将Header、Footer、Body组件从App.vue中拆分，由商户仓库提供
2.禁止在APP.Vue中写商户定制逻辑，有定制逻辑的可以通过mixin导出，有定制的逻辑可以从商户目录的index.js中的mixin导出，App.vue提供通用mixin
3.在首页有自定义挂件的，可以通过Customiztions组件导出
```

#### 子仓库目录结构
```$xslt
1.components目录存放商户的定制页面及组件
2.router目录为商户的定制路由
3.index.js作为商户的向外输出文件。例如：Header组件、body组件、footer组件、自定义组件等，mixin，配置文件，需要挂在在Vue上的全局组件等
4.Customization组件输出主页的定制挂件
```

#### 代码层面
```$xslt
1.图片使用懒加载，示例：
<img v-lazy="xxxxxx" />
<div v-lazy:background-image="xxxx"></div>
2.完成开发前运行，gulp tinypng:current 可以自动压缩商户图片，压缩率40%~100%
3.v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
    3.1 在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff 
    3.2 v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成computed 属性。
4.路由扩展，若需要定制之前路由的页面，可使用routerCombine方法扩展，将定制页面写在cp的views文件夹下，示例：
  export default routerCombine(公共路由,[
    // 覆盖公共路由中的品牌页面
    {
      path: '/brand',
      name: 'brand'
      component: ()=> {
        return import('@current/brand') // 自定义品牌页面
      }
    }
  ])
```

####
 // tips for running project success
1. git clone xxx --depth=1
 //xxx must be ssh,for the first time have to add ssh key 
2. git fetch --unshallow
 //total project size is about 3GB

 
 
