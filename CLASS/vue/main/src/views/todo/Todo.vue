<template>
  <div>
    <div v-for="(num, index) in arr" :key="index">
      <button @click="move(num)"><!-- 왜 되지? ㅋㅋ -->
        라우터 {{ num }} 로 이동
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      arr: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    move(n) {
      this.$router.push(`/todo/${n}`);
    }
  }
}
</script>

<style>

</style>