/*
  bootstrap Vue
    - virtual DOM을 사용하기 때문에 bootstrap을 바로 적용하면 DOM 랜더링과정에서 성능이슈가 날 수 있다.
    - 일반적인 Bootstrap + Component 방식을 더했다.
      - vue에 맞게 data binding 이 최적화되어있다.
    - 설치 : npm i bootstrap-vue bootstrap@4.6.1
      - 현재 bootstrap-vue는 Bootstrap5를 지원하지 않는다... 그래서 버전을 명시해줘야 한다.

  이번 프로젝트에서, veux를 활용해서 로딩화면을 구현해보자! 우선
    - npm i axios 로 axios를 추가로 설치해준다.
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 아래에 Bootstrap을 추가해줬다. main.js는 전역 설정파일이다. 각각 컴포넌트에서 import 할 필요 없이 Bootstrap이 사용가능하다.
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
