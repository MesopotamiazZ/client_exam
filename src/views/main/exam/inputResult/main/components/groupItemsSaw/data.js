export default function getData (x, y, guidType, testPos) {
  // let items = ['500', '1000', '2000', '3000', '4000', '6000']
  // let newitems = [...items]
  let lineStyle = ''
  let lineSymbol = ''
  if (guidType === '气导') {
    lineStyle = 'solid'
    lineSymbol = testPos === 'right' ? 'emptyCircle' : 'emptyTriangle'
  } else if (guidType === '骨导') {
    lineStyle = 'dotted'
    lineSymbol = testPos === 'right' ? 'emptyRectangle' : 'emptyDiamond'
  }

  console.log(x, y, lineStyle, lineSymbol)

  return {
    title: {
      text: '异步数据加载示例',
    },
    tooltip: {},
    // legend: {
    //   data: ['销量'],
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      interval: 200,
      max: 10000,
      min: 0,
      data: [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000],
    },
    yAxis: {
      axisLabel: {show: true},
    },
    series: [{
      type: 'line',
      name: '测定值',
      symbol: lineSymbol,
      symbolSize: 10,
      data: ['', '', 16, 21, 11, 26, 11, 12],
      clickable: true,
      // 线型样式 直线或虚线
      itemStyle: {
        normal: {
          lineStyle: {
            width: 2,
            type: lineStyle,  // 'dotted'虚线 'solid'实线
          },
        },
      },
    }],
  }
}
