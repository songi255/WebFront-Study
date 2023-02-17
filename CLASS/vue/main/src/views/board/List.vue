<template>
  <div>
    <router-link to="/board/1">
      라우터 이동하는 법1
    </router-link>
    <br>
    <button @click="moveRouter">
      라우터 이동하는 법2
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    console.log(this.$router); // 전반적인 라우터기능이 들어가있는 객체
    console.log('--------------');
    console.log(this.$route); // 현재 라우트 정보
  },
  methods: {
    moveRouter(){
      this.$router.push("/board/1"); // $router.push 를 이용한 이동
    }
  }
}
</script>

<style>

</style>