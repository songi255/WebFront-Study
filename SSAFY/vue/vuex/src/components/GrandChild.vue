<template>
  <div>
    <h1>손자</h1>
    <div>나이: {{ myAgeProp }}</div>
    <button @click="changeAge">
        나이변경
    </button>
  </div>
</template>

<script>
export default {
    props: ["myAgeProp"],
    methods: {
        changeAge(){
            // this.myAgeProp = 13; 자식컴포넌트에서 부모데이터를 직접 수정하는게 가능할까? 되긴 하는데 오류가 뜬다!
            // 부모컴포넌트 렌더링과정에서 무한루프가 걸릴수도 있자나? 그리고 전체 데이터 흐름도 망가진다. 이럴 때 emit을 쓴다!
            //this.$emit("emitTest", 13); // 부모컴포넌트에 메서드를 정의해놓고, 요청하는것이다! 매개변수를 전달하고 싶으면 , 로 구분해서 준다. 여기선 13를 줬다.
            
            // 근데.. 이렇게 단계적으로 계속 $emit으로 상위요청하면.. 컴포넌트가 개수가 많아지면 겁나 복잡해지겠지? 그래서 등장한게 Vuex이다.
            // Vuex는 상태관리패턴 + 라이브러리이다. (front framework에서 데이터를 state라고 한다.)
            //  - 모든 컴포넌트의 중앙집중식저장소 역할
            //  - 데이터 위치 파악 및 예측 가능
            //  - Vue router처럼 패키지 설치가 필요함.

            //vuex 의 state를 사용해서 한번만에 변경해볼까?
            this.$store.commit("SET_MY_AGE", 13);
        }
    }
};
</script>

<style>

</style>