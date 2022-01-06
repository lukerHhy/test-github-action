import Toast from '../components/toast'
export default {
  install(Vue) {
    // const ToastTpl = Vue.extend(Toast)
    // const tpl = new ToastTpl().$mount()

    Vue.prototype.$tips = (msg, config = {}) => {
      const { title = Vue.prototype.i18n.t('温馨提示'), btnTxt = '', onSure = () => { }, onClose = () => { } } = config
      Vue.prototype.$dialog
        .confirm({
          title,
          message: msg,
          showCancelButton: false,
          messageAlign: 'left'
        })
        .then(() => {
          // on confirm
          onSure()
        })
        .catch(() => {
        });
      // tpl.content = msg
      // tpl.title = title
      // tpl.btnTxt = btnTxt
      // tpl.onSure = onSure
      // tpl.onClose = onClose
      // tpl.show = true
      // document.body.appendChild(tpl.$el)
    }
  }
}
