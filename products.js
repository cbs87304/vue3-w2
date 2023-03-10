import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "cbs33",//每個人設定不一樣
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    //先檢查是否已登入
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData(); //已登入就執行下方getData的函式
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'index.html'; //未登入或登入錯誤,顯示錯誤資訊,並跳回登入畫面
        })
    },
    //渲染產品資料庫至畫面
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios
      .get(url)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },

    //點擊產品,執行以下函式,顯示至右方
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'
        );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount('#app');