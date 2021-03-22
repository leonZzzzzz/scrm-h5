<template>
  <div class="statistics">
    <div class="st-title">批量加好友</div>
    <div class="st-module">
      <div class="st-module-box">
        <div class="module-title">今日概况</div>
        <div class="st-group">
          <div class="group-item">
            <div class="item-count">25</div>
            <div class="item-label">分配客户</div>
          </div>
          <div class="group-item">
            <div class="item-count">25</div>
            <div class="item-label">复制数</div>
          </div>
          <div class="group-item">
            <div class="item-count">25</div>
            <div class="item-label">成功添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="st-module">
      <div class="st-module-box">
        <div class="module-title">总概况</div>
        <div class="st-group">
          <div class="group-item">
            <div class="item-count">25</div>
            <div class="item-label">分配客户</div>
          </div>
          <div class="group-item">
            <div class="item-count">25</div>
            <div class="item-label">复制数</div>
          </div>
          <div class="group-item">
            <div class="item-count">25</div>
            <div class="item-label">成功添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="st-module">
      <div class="st-module-box">
        <div class="module-top">
          <div class="top-left">年概况</div>
          <div class="top-right">
            <div class="t-r-picker" @click="selectYear">{{currentYear}}<van-icon name="arrow-down" class="arrow-icon" /></div>
            <div class="t-r-picker" @click="selectMonth">{{currentMonth}}<van-icon name="arrow-down" class="arrow-icon" /></div>
          </div>
        </div>
        <div class="st-charts">
          <ve-line :data="chartData" height="300px" :settings="chartSettings" :legend-visible="false" :extend="chartExtend" :grid="grid"></ve-line>
        </div>
        <div class="st-table">
          <div class="tb-th">
            <div class="th-column">日期</div>
            <div class="th-column">分配客户</div>
            <div class="th-column">复制数</div>
            <div class="th-column">成功添加</div>
          </div>
          <template v-if="tableData.length > 0">
            <div class="tb-tr">
              <div class="tr-column">09-29</div>
              <div class="tr-column">10</div>
              <div class="tr-column">5</div>
              <div class="tr-column">5</div>
            </div>
          </template>
          <template v-else>
            <van-empty
              description="暂无数据"
            >
              <template #image>
                <img src="../../../assets/empty-data.png"/>
              </template>
            </van-empty>
          </template>
        </div>
      </div>
    </div>
    <van-popup v-model="yearPicker.show" position="bottom" round :style="{ height: '30%' }">
      <!-- <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        @confirm="getSelectedYear"
        @cancel="cancelSelectYear"
      /> -->
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="yearPicker.columns"
        @confirm="getSelectedYear"
        @cancel="cancelSelectYear"
      />
    </van-popup>
    <van-popup v-model="monthPicker.show" position="bottom" round :style="{ height: '30%' }">
      <van-picker
        :default-index="defaultIndex"
        title="选择月份"
        show-toolbar
        :columns="monthPicker.columns"
        @confirm="getSelectedMonth"
        @cancel="cancelSelectMonth"
      />
    </van-popup>
  </div>
</template>

<script>
// import VeLine from 'v-charts/lib/line.common'
import { Icon, Popup, DatetimePicker, Picker, Empty } from 'vant'
export default {
  components: {
    VeLine,
    vanIcon: Icon,
    vanPopup: Popup,
    vanDatetimePicker: DatetimePicker,
    vanPicker: Picker,
    vanEmpty: Empty,
  },
  data() {
    this.chartExtend = {
      series: {
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(110, 145, 209, 1)', // 0% 处的颜色
              }, 
              {
                offset: 1, 
                color: 'rgba(110, 145, 209, .2)' // 100% 处的颜色
              },
            ],
            globalCoord: false // 缺省为 false
          }
        },
        itemStyle: {
          normal: {
            color: '#294a7b',
            lineStyle: {
              color: '#294a7b'
            }
          }
        }
      },
      xAxis: {
        // show: false,
        splitLine: {
          show: false
        }
      }
    }
    this.chartSettings = {
      labelMap: {
        date: '日期',
        count: '总数'
      },
      xAxisType: 'time',
      area: true
    }
    this.grid = {
      right: 20,
      top: 20,
      bottom: 20
    }
    return {
      chartData: {
        columns: ['date', 'count'],
        rows: [
          { date: '2020-09-30', count: 49 },
          { date: '2020-10-01', count: 12 },
          { date: '2020-10-02', count: 33 },
          { date: '2020-10-03', count: 21 },
          { date: '2020-10-04', count: 56 },
          { date: '2020-10-05', count: 48 }
        ]
      },
      yearPicker: {
        show: false,
        columns: []
      },
      monthPicker: {
        show: false,
        columns: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      currentYear: '',
      currentMonth: '',
      defaultIndex: 0, // 默认选中的月份
      tableData: [], // 表格数据
    }
  },
  mounted() {
    document.title = '统计'
  },
  created() {
    this.getCurrentDate()
  },
  methods: {
    getCurrentDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      for (let i = 0; i < 20; i++) {
        this.yearPicker.columns.push(year - i)
      }
      this.currentYear = year
      this.currentMonth = month + '月'
      this.defaultIndex = this.monthPicker.columns.indexOf(this.currentMonth)
      // console.log('默认选中的月份' + this.defaultIndex + this.currentMonth)
    },
    selectYear() {
      this.yearPicker.show = true
    },
    selectMonth() {
      this.monthPicker.show = true
    },
    getSelectedYear(value, index) {
      this.currentYear = value
      this.yearPicker.show = false
    },
    cancelSelectYear() {
      this.yearPicker.show = false
    },
    getSelectedMonth(value, index) {
      this.currentMonth = value
      this.defaultIndex = index
      this.monthPicker.show = false
    },
    cancelSelectMonth() {
      this.monthPicker.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.st-title {
  padding: 15px 12px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: #ffffff;
}
.st-module {
  padding: 0 6px;
  box-sizing: border-box;
  margin-bottom: 10px;
  .st-module-box {
    border-radius: 5px;
    background-color: #ffffff;
    padding: 15px 12px;
    box-sizing: border-box;
    .module-title {
      margin-bottom: 12px;
    }
    .module-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .top-right {
        display: flex;
        .t-r-picker {
          display: flex;
          align-items: center;
          font-size: 12px;
          border: 1px solid lightgray;
          border-radius: 3px;
          margin-left: 5px;
          padding: 3px 5px;
          cursor: pointer;
          .arrow-icon {
            margin-left: 3px;
          }
        }
      }
    }
    .st-group {
      display: flex;
      .group-item {
        flex: 1;
        flex-shrink: 0;
        text-align: center;
        padding: 0 5px;
        box-sizing: border-box;
        .item-count {
          font-size: 24px;
          color: #294a7b;
          margin-bottom: 6px;
        }
        .item-label {
          font-size: 12px;
          color: #9f9e9e;
        }
      }
    }
    .st-table {
      font-size: 12px;
      .tb-th {
        display: flex;
        color: #9f9e9e;
        padding: 10px 0;
        .th-column {
          flex: 1;
          text-align: center;
        }
      }
      .tb-tr {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #ebedf0;
        .tr-column {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}
</style>