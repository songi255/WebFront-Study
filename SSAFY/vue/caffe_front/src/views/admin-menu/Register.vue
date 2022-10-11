<template>
  <div>  
    <div class="form-wrapper">
      <div>메뉴 이름: <input type="text" v-model="name"/></div>
      <div>메뉴 설명: <input type="text" v-model="description"/></div>
      <input type="file" @change="fileChange"/>
      
      <div v-if="$route.params.id">
        <button @click="update">메뉴 수정하기</button>
        <button @click="updateImage">이미지 수정하기</button>
      </div>

      <button @click="create">메뉴 추가하기</button>
    </div>

    <div class="image-wrapper" v-if="file">
      <img :src="setURL(file)" width="100%" />
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/axios';
export default {
  data(){
    return {
      name:null,
      description: null,
      file: null
    }
  },
  async created(){
    // router에서 id가 있으면 메뉴 수정이고, 아니면 추가하기이다.
    if(this.$route.params.id){
      this.$store.commit("SET_TITLE", "메뉴 수정하기");
      const result = await api.menus.findOne(this.$route.params.id);
      this.name = result.data.name;
      this.description = result.data.description;
    }else{
      this.$store.commit("SET_TITLE", "메뉴 추가하기");
    }
  },
  methods: {
    fileChange(e){
      console.log(e.target.files);
      this.file = e.target.files[0];
    },
    async create(){
      if(!this.name || !this.description || !this.file){
        alert("빈 값이 있습니다. 내용을 전부 작성해주세요");
      }
      const result = await api.menus.create(
        this.name,
        this.description,
        this.file
      );
      console.log(result);
      //요청 성공
      if(result.data.success){
        alert(result.data.message);
        this.$router.push("/admin/menus");
      }
      else{ // 실패
        alert(result.data.message);
      }
    },
    setURL(file){
      console.log(file);
      const imageURL = URL.createObjectURL(file);
      console.log(imageURL);
      return imageURL;
    },
    async update(){
      const result = await api.menus.update(this.$route.params.id, this.name, this.description);
      alert(result.data.message);
      this.$router.push(`/admin/menus/${this.$route.params.id}`);
    },
    async updateImage(){
      const result = await api.menus.updateImage(this.$route.params.id, this.file);
      alert(result.data.message);
    }
  }
}
</script>

<style scoped>
.form-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 1px solid black;
  padding: 20px;
}

.form-wrapper > *{
  margin: 10px;
}

.image-wrapper{
  margin-top: 30px;
}
</style>