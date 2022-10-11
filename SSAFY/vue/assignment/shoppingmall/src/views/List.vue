<template>
  <div>
    <div 
      @click="moveDetail(list.id)"
      v-for="list in lists" :key="list.id"
      class="list-wrapper"
    >
      <div>
        <img :src="list.image" alt="#" />
        <strong>{{ list.title }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../utils/axios.js';
export default {
  data(){
    return {
        lists: []
    };
  },
  async created(){
    console.log(api);
    const result = await api.shoppingMall.findAll();
    console.log(result);
    this.lists = result.data;
  },
  methods: {
    moveDetail(id){
      this.$router.push(`/${ id }`);
    }
  }
}
</script>

<style>
.list-wrapper{
  border: 1px solid black;
  padding: 20px;
  cursor: pointer;
}
img {
  width: 30px;
  height: 30px;
  padding-right: 10px;
}
</style>