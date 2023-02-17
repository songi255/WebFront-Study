<!-- 모바일을 생각하고 개발했는데 어떻게 확인할까? chrome 개발자도구 왼족 상단에서 기기를 바꿀 수 있다... (ㄹㅇ 대박.. ㅋ) -->

<template>
  <div id="app">
    <header>
      <h2>{{$store.state.title}}</h2>
    </header>
    
    <router-view />

    <footer>
      <div>All right reserved</div>
      <router-link to="/admin/home">관리자 페이지(메뉴)</router-link>
      <br />
      <router-link to="/">메인페이지(주문)</router-link>
    </footer>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    this.$store.commit("SET_TITLE", "SSAFY-CAFE")
  }
}
</script>

<style>
  header, footer {
    border-top: 2px solid grey;
    border-bottom: 2px solid grey;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100wh;
  }

  #app > header {
    text-align: center;
  }

  #app > div {
    flex: 1;
  }

  #app > footer {
    text-align: center;
  }
</style>