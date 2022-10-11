import Vue from 'vue'
import Vuex from 'vuex'
import { dataLap } from "../utils/axios";

Vue.use(Vuex)

function makeColor(){
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
}

export default new Vuex.Store({
  state: {
    chartData: ""
  },
  getters: {
  },
  mutations: {
    CHANGE_CHART_DATA(state, data){
      state.chartData = data;
    }
  },
  actions: {
    async generateChartData({commit}){
      console.log("generateData!!!!!!!!!!!!!");
      const result = await dataLap.get();
      console.log(result.data);
      console.log(result.data[0].data);

      const chartData = {
        labels: result.data[0].data.map(li => li.period),
        datasets: result.data.reduce((acc, cur) => {
          console.log(cur);
          let label = cur.title;
          let data = cur.data.map(li => li.ratio);
          acc.push({label:label, data: data, backgroundColor:makeColor(), borderColor:makeColor(), fill: false})
          return acc;
        }, [])
      };
      commit("CHANGE_CHART_DATA", chartData);
    }
  },
  modules: {
  }
})
