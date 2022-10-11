/*  Vue의 진입점이 되는 파일. 기초세팅을 진행한다.
      - public/index.html 의 id app 을 읽어서 Vue 적용
      - router, store 설정
      - vue-boostrap 및 외부 라이브러리도 여기서 진행

*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
