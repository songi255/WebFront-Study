<template>
  <div>
    <div>title: {{ prod.title }}</div>
    <div>price: {{ prod.price }}</div>
    <div>description: {{ prod.description }}</div>
    <div>category: {{ prod.category }}</div>
    <div class="img">
      <div v-if="!this.loaded"><b-spinner variant="primary" label="Spinning"></b-spinner></div>
      <div v-else><img ref="prodImg" :src="this.prod.image" alt="제품이미지" /></div>
    </div>
  </div>
</template>

<script>
import { api } from '../utils/axios.js';
export default {
  data(){
    return {
      prod: {},
      loaded: false
    }
  },
  async created(){
    this.loaded = false;
    const result = await api.shoppingMall.findOne(this.$route.params.id);
    this.loaded = true;
    this.prod = result.data;
  },
}
</script>

<style scoped>
div > div{
  padding: 5px;
  border: 1px solid grey;
}
.img > div{
  width: 100px;
  height: 100px;
  border: none;
}
img{
  width: 100%;
  height: 100%;
}
</style>