<template>
  <div>
    {{ $route.params.id }} 라우터 입니다.
    <div>제목: {{ data.title }}</div>
    <div>완료 여부: {{ data.completed }}</div>
  </div>
</template>

<script>
import { api } from '../../utils/axios.js';
export default {
  data(){
    return {
      data: {}
    }
  },
  async created(){
    this.$store.commit("SET_LOADING", true);
    const result = await api.jsonplaceholder.findOne(this.$route.params.id);
    this.data = result.data;
    this.$store.commit("SET_LOADING", false);
  }
}
</script>

<style>

</style>