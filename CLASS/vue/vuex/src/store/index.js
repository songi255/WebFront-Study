/* store -> vuex 관련.
  현재 이 index.js파일에 vuex 설정파일이 있다.
  

*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 상태(데이터) 저장소
    myName: "싸피",
    myAge: 25
  },
  getters: {
  },
  mutations: { // state 변경을 위해 mutations를 거친다. 주로 대문자로 선언.
    SET_MY_NAME(state, data){
      state.myName = data;
    },
    SET_MY_AGE(state, data){
      state.myAge = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
