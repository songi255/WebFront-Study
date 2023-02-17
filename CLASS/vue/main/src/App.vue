<!-- App.vue
  모든 요청은 App.vue를 거쳐간다. 모든 컴포넌트의 최상위 컴포넌트가 된다.
  template
    - html 부분
  style
    - css 부분
  script
    - App.vue에는 정의되어있지 않지만, 관련 script를 적는다.
    - template와 style 사이에 정의한다.

 -->

<template>
  <div>
    <h1>Hello Vue.js</h1>
    <Header></Header><!-- 아래에서 가져온 컴포넌트들은 이렇게 태그사용과 동일하게 붙이면 된다. -->
    <!-- eslint에서는 기존 html태그와 혼동을 방지하고자 2단어조합으로만 쓰게 한다. -->
    <Main></Main><!-- 이후, 자동으로 컴포넌트간 부모자식관계가 적용된다. -->
    <nav>
        <!-- router-link는 a태그와 동일하게 보인다. a와 다르게 플리커가 일어나지 않는다. 클릭시 라우트가 이동한다. -->
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/board1">Board Temp</router-link> | <!-- router-link는 router/index.js에 등록되있어야만 작동한다. -->
        <router-link to="/board">Board</router-link> |
        <router-link to="/todo">Todo</router-link>
    </nav>
    <router-view /><!-- route에 해당하는 화면이 실제 렌더링된다. -->
    <!-- vue-router
      vue.js 공식 라이브러리. 라우트와 컴포넌트를 매핑한다.
     -->

  </div>
</template>

<script>
  import Header from "./components/Header"; // 사용할 컴포넌트들은 이렇게 import로 불러온다.
  import Main from "./components/Main";
  export default {
    components: { // 불러온 컴포넌트들을 사용하겠다고 등록한다. import를 제외한 모든 객체는 export default 안에 작성한다.
      Header,
      Main
    },
    data() {
      return {

      }
    }
  }
</script>

<style>

</style>
