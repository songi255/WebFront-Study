<template>
  <div class="main-container">
    <Form></Form>
    <reactive-bar-chart
      v-if="chartData"
      :chart-data="chartData"
    ></reactive-bar-chart>
  </div>
</template>

<script>
import ReactiveBarChart from "../components/ReactiveBarChart.js";
import Form from "../components/Form.vue";
import {mapActions, mapState} from "vuex"
export default {
  name: "App",
  components: {
    ReactiveBarChart,
    Form
  },
  data(){
    return {
      // chartData: null,
    }
  },
  computed: {
    ...mapState(['chartData'])
  },
  methods: {
    ...mapActions(["generateChartData"])
  },
  async mounted() {
    this.generateChartData();
  }
}
</script>

<style>

</style>