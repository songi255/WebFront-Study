<template>
  <div>
    <div 
      @click="moveDetail(list.id)"
      v-for="list in lists" :key="list.id"
      class="list-wrapper"
    >
      <div>
        {{ list.title }}
      </div>
    </div>
  </div>
</template>

<script>

import { api } from "../../utils/axios.js";
export default {
  data(){
    return {
      lists: []
    }
  },
  async created(){
    this.$store.commit("SET_LOADING", true);
    const result = await api.jsonplaceholder.findAll();
    console.log(result);
    this.lists = result.data;
    this.$store.commit("SET_LOADING", false);
  },
  methods: {
    moveDetail(id){
      this.$router.push(`/todos/${ id }`);
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
</style>