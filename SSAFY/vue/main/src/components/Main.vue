<!-- .vue 파일 작성시, vue만 치면 템플릿 자동완성 가능하다. -->

<template>
  <!-- 컴포넌트 생성시 주의사항! : 단 하나의 root element만 있어야 한다!! 아래에서 div가 동일 레벨에 하나 더 있으면 에러가 발생한다. -->
  <div>
    <h1>Main</h1>
    <EachResult></EachResult>
  </div>
</template>

<script>
import EachResult from "./EachResult.vue";
export default {
  components: {
    EachResult
  }
}
</script>

<style>

</style>