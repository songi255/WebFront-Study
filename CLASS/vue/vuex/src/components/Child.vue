<template>
  <div>
    <h1>아버지</h1>
    <div>학교: {{ $store.state.myName }}</div><!-- 혹은 vuex의 state를 사용할 수 있다. 추가적인 조치 없이 그냥 $store.state로 접근할 수 있다. -->
    <div>나이: {{ myAgeProp }}</div>
    <GrandChild
        v-bind:myAgeProp="myAgeProp"
        v-on:emitTest="changeAge"    
    /><!-- 받은 props는 그대로 넘겨줄 수도 있다. -->
    <!-- emit은 emit 메서드를 직접 정의하는것이 아니라, emit 이벤트에 대응되는 메서드를 바인딩해서 사용한다. -->
  </div>
</template>

<script>
import GrandChild from "./GrandChild.vue"
export default {
    components: {
        GrandChild
    },
    props: ["mySchoolProp", "myAgeProp"], // 이렇게 props 로 상위 컴포넌트에서 건네준 props를 받는다.
    methods: {
        changeAge(age){
            //console.log(age);
            this.$emit("emitTest", age); // 한번 더 올렸다.
        }
    },
    created(){
        console.log(this.$store.state); // state에 접근 -> this.$store
        // 값 변경 시 nmutations를 거쳐야 한다.
    }
}
</script>

<style>

</style>