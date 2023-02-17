<template>
  <div id="app">
    <!-- 기존 Bootstrap은 class를 이용했지만, bootstrap-vue는 component 방식을 채택했다! -->
    <b-button variant="danger">Button</b-button>
    <!-- vue문법 사용할 수 있다. (아래 input은 v-model로 바인딩되었다.) -->
    <b-form-input v-model="myName" placeholder="이름을 입력하세요"></b-form-input>
    
    <router-view />
    <div class="spinning" v-if="$store.state.loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
      <!-- 이 스피너는 빠를땐 순식간에 지나간다.. 크롬 개발자도구-Network에서 스로틀링을 주면 느리게 볼 수 있다. -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      myName: ""
    }
  }
}
</script>

<style>
.spinning{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>