<!-- 
  컴포넌트 기반 개발에서는, 부모노드 -> 자식노드로 데이터가 전달되어야 한다.
    - v-bind로 구현한다.
    - 두개이상의 props전달가능하다.
    - props/emit은 반드시 부모자식관계여야만 가능하다.
-->
<template>
  <div>
    <h1>할아버지</h1>
    <button @click="changeAge(15)"><!-- 이렇게 상위태그에서 데이터를 변경하면 하위태그에도 즉각반영된다. 바인딩되어있기 때문. -->
      나이변경
    </button>
    
    <!-- v-bind로 자식으로 데이터 전달 -->
    <Child
      v-bind:mySchoolProp="mySchool"
      v-bind:myAgeProp="myAge"
      v-on:emitTest="changeAge"
    />
  </div>
</template>

<script>
import Child from "./components/Child.vue";
export default {
  components: {
    Child
  },
  data() {
    return {
      mySchool: "ssafy",
      myAge: 25
    }
  },
  methods: {
    changeAge(age){
      this.myAge = age;
    }
  }
}
</script>

<style>

</style>