<template>
<div>
  <div id="chart1" :style="{width: '100%', height: '500px'}"></div>
    <div id="chart2" :style="{width: '100%', height: '500px'}"></div>
    <div id="main" :style="{width: '100%', height: '500px'}"></div>
</div>
</template>
<script>
export default {
    data(){
        return {
            option1: {
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  x: 'left',
                  data:['市内','省内','省外','长途','短途','及时配送','客户1','客户2','客户3','其他']
              },
              series: [
                  {
                      name:'运输类型',
                      type:'pie',
                      selectedMode: 'single',
                      radius: [0, '30%'],

                      label: {
                          normal: {
                              position: 'inner'
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:[
                          {value:335, name:'市内', selected:true},
                          {value:679, name:'省内'},
                          {value:1548, name:'省外'}
                      ]
                  },
                  {
                      name:'运输里程',
                      type:'pie',
                      radius: ['40%', '55%'],
                      label: {
                          normal: {
                              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                              backgroundColor: '#eee',
                              borderColor: '#aaa',
                              borderWidth: 1,
                              borderRadius: 4,
                              // shadowBlur:3,
                              // shadowOffsetX: 2,
                              // shadowOffsetY: 2,
                              // shadowColor: '#999',
                              // padding: [0, 7],
                              rich: {
                                  a: {
                                      color: '#999',
                                      lineHeight: 22,
                                      align: 'center'
                                  },
                                  // abg: {
                                  //     backgroundColor: '#333',
                                  //     width: '100%',
                                  //     align: 'right',
                                  //     height: 22,
                                  //     borderRadius: [4, 4, 0, 0]
                                  // },
                                  hr: {
                                      borderColor: '#aaa',
                                      width: '100%',
                                      borderWidth: 0.5,
                                      height: 0
                                  },
                                  b: {
                                      fontSize: 16,
                                      lineHeight: 33
                                  },
                                  per: {
                                      color: '#eee',
                                      backgroundColor: '#334455',
                                      padding: [2, 4],
                                      borderRadius: 2
                                  }
                              }
                          }
                      },
                      data:[
                          {value:335, name:'市内'},
                          {value:310, name:'省内'},
                          {value:234, name:'省外'},
                          {value:135, name:'长途'},
                          {value:1048, name:'短途'},
                          {value:251, name:'客户1'},
                          {value:147, name:'客户2'},
                          {value:102, name:'客户3'}
                      ]
                  }
              ]
          }
        }
    },
    mounted:function(){
        this.draw1();
        this.drawMain();
        this.d2();
    },
    methods:{
      d2:function(){

        let myChart = this.$echarts.init(document.getElementById('chart2'));

        let option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: [
                    ['运输类型', '2012', '2013', '2014', '2015', '2016', '2017'],
                    ['长途', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                    ['短途', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                    ['市内', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                    ['市外', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            grid: {top: '55%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '30%',
                    center: ['50%', '25%'],
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };

        myChart.on('updateAxisPointer', function (event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });

        myChart.setOption(option);

      },
      draw1:function(){
        let myChart = this.$echarts.init(document.getElementById('chart1'));
        // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.option1);
      },
      drawMain: function(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('main'));
          // var myChart = echarts.init(document.getElementById('main'));

          // 指定图表的配置项和数据
          var option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['运输类型', '2012', '2013', '2014', '2015', '2016', '2017'],
                    ['长途', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                    ['短途', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                    ['市内', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                    ['市外', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                ]
            },
            series: [{
                type: 'pie',
                radius: 60,
                center: ['25%', '30%']
                // No encode specified, by default, it is '2012'.
            }, {
                type: 'pie',
                radius: 60,
                center: ['75%', '30%'],
                encode: {
                    itemName: '运输类型',
                    value: '2013'
                }
            }, {
                type: 'pie',
                radius: 60,
                center: ['25%', '75%'],
                encode: {
                    itemName: '运输类型',
                    value: '2014'
                }
            }, {
                type: 'pie',
                radius: 60,
                center: ['75%', '75%'],
                encode: {
                    itemName: '运输类型',
                    value: '2015'
                }
            }]
        };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
    }
}
</script>