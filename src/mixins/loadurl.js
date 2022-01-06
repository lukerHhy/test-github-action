
let mixin={
  data(){
    return{};
  },
  methods:{
    loadImg(url,defaultImg='@agent/images/touxiang.png') {
      let newurl=''
      const img = new Image();
      img.src = url;
      img.onload = () => {
        newurl = url;
      };
      img.onerror = () => {
        newurl = defaultImg;
      };
      return newurl
    }
  }
};
export default mixin;