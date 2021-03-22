<template>
  <div class="statistics">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 头部统计 -->
      <section class="nav-data">
        <div class="nav-data-item">
          <p>{{ navDataTotal.visitQuantity | formatQuantity }}</p>
          <p>累计浏览</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navDataTotal.shareQuantity | formatQuantity }}</p>
          <p>累计转发</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navDataTotal.customerClueQuantity | formatQuantity }}</p>
          <p>累计线索</p>
        </div>
        <div class="nav-data-item">
          <p>{{ navDataTotal.customerQuantity | formatQuantity }}</p>
          <p>累计客户</p>
        </div>
      </section>

      <!-- 图表 -->
      <section class="charts-wrap">
        <div class="filter-box">
          <div class="tabs" @click="onSelectOrderBy">
            <div class="tabs-item" 
              data-id="visit"
              :class="{'tabs-item-active': showChartsType == 'visit'}" 
              >浏览数</div>
            <div class="tabs-item" 
              data-id="clue"
              :class="{'tabs-item-active': showChartsType == 'clue'}" 
              >线索数</div>
          </div>
        </div>
        <div class="charts-box">
          <ve-line 
            v-if="showChartsType == 'visit'"
            :data="{columns: ['day', 'visitQuantity'], rows: chartData.rows}" 
            :data-empty="chartData.rows.length === 0"
            height="230px" 
            :settings="chartSettings" 
            :legend-visible="false" 
            :extend="chartExtend" 
            :grid="grid"></ve-line>
          <ve-line 
            v-if="showChartsType == 'clue'" 
            :data="{columns: ['day', 'customerClueQuantity'], rows: chartData.rows}" 
            :data-empty="chartData.rows.length === 0"
            height="230px" 
            :settings="chartSettings" 
            :legend-visible="false" 
            :extend="chartExtend" 
            :grid="grid" ></ve-line>
        </div>
      </section>
      <!-- 分级数据 -->
      <section class="action-data">
        <div class="action-data-label">访问与转发</div>
        <div class="table-wrap">
          <table class="table" cellpadding="15px">
            <tr>
              <th></th>
              <th>访问人次</th>
              <th>转发人次</th>
            </tr>
            <tr v-for="(item, key, index) in actionDataFilter" :key="key">
              <td>{{ item.label }}</td>
              <td @click="toClueList(index+1, 'mostVisit')">{{ item.visitQuantity || 0 }}</td>
              <td @click="toClueList(index+1, 'mostShare')">{{ item.shareQuantity || 0 }}</td>
            </tr>
        </table>
        </div>
      </section>
    </van-pull-refresh>
  </div>
</template>

<script>
// import VeLine from 'v-charts/lib/line.common'; // 已从CDN引入
import ApiScrmClue from '@/api/scrm-clue';
import Utils from '@/utils/utils';
export default {
  components: {
    VeLine
  },
  inject: {
    authorizeUserId: {
      from: 'authorizeUserId',
      default: ''
    },
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
                color: 'rgba(57,115,202, .3)', // 0% 处的颜色
              }, 
              {
                offset: 1, 
                color: 'rgba(57,115,202, 0)' // 100% 处的颜色
              },
            ],
            globalCoord: false // 缺省为 false
          }
        },
        itemStyle: {
          normal: {
            color: '#3973CA',
            lineStyle: {
              color: '#3973CA'
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
        day: '日期',
        visitQuantity: '人次',
        customerClueQuantity: '线索'
      },
      xAxisType: 'category',
      area: true
    }
    this.grid = {
      right: 20,
      top: 20,
      bottom: 20
    }
    return {
      refreshing: false,
      listLoading: false,
      navDataTotal: {
        // 浏览
        visitQuantity: 0,
        // 转发
        shareQuantity: 0,
        // 线索
        customerClueQuantity: 0,
        // 客户
        customerQuantity:0,
      },
      search: {
        startDay: Utils.getNeedDate(-7), // 7天前
        endDay: Utils.getNeedDate(-1), // 昨天
      },
      // 显示哪个图表：visit | clue
      showChartsType: 'visit',
      // 图表数据
      chartData: {
        columns: ['day', 'visitQuantity'],
        rows: [
          // { day: '2020-10-01', visitQuantity: 12, customerClueQuantity: 12 },
          // { day: '2020-10-02', visitQuantity: 33, customerClueQuantity: 20 },
          // { day: '2020-10-03', visitQuantity: 21, customerClueQuantity: 12 },
          // { day: '2020-10-04', visitQuantity: 56, customerClueQuantity: 30 },
          // { day: '2020-10-05', visitQuantity: 56, customerClueQuantity: 12 },
          // { day: '2020-10-06', visitQuantity: 30, customerClueQuantity: 26 },
          // { day: '2020-10-07', visitQuantity: 20, customerClueQuantity: 30 },
        ]
      },
      // 分级数据
      actionData: {
        // "visitQuantity1": 13, 
        // "shareQuantity1": 0, 
        // "visitQuantity2": 2, 
        // "shareQuantity2": 0, 
        // "visitQuantity3": 1, 
        // "shareQuantity3": 0, 
        // "visitQuantity4": 0, 
        // "shareQuantity4": 0, 
      }
    }
  },
  computed: {
    actionDataFilter() {
      let data = {
        // 1: {
        //   label: '一级',
        //   visitQuantity: 0,
        //   shareQuantity: 0,
        // }
      }
      for (const key in this.actionData) {
        let val = key.slice(-1);
        switch (val) {
          case '1': 
            data[val] = {
              label: '一级',
              visitQuantity: this.actionData['visitQuantity'+1],
              shareQuantity: this.actionData['shareQuantity'+1]
            }
            break
          case '2': 
            data[val] = {
              label: '二级',
              visitQuantity: this.actionData['visitQuantity'+2],
              shareQuantity: this.actionData['shareQuantity'+2]
            }
            break
          case '3': 
            data[val] = {
              label: '三级',
              visitQuantity: this.actionData['visitQuantity'+3],
              shareQuantity: this.actionData['shareQuantity'+3]
            }
            break
          case '4': 
            data[val] = {
              label: '四级',
              visitQuantity: this.actionData['visitQuantity'+4],
              shareQuantity: this.actionData['shareQuantity'+4]
            }
            break
        }
      }
      console.log(data)
      return data
    }
  },
  mounted() {
    // this.getTongji()
    // this.onLoad()
    // this.getTongjiAction()
  },
  activated() {
    this.getTongji()
    this.onLoad()
    this.getTongjiAction()
  },
  methods: {
    onSelectOrderBy(e) {
      this.showChartsType =  e.target.dataset.id || 'visit'
    },
    // 跳转到分级线索列表
    toClueList(level = 1, orderBy = 'mostVisit', ) {
      this.$router.push(`/scrmClue/customerClue/actionClueList?level=${level}&orderBy=${orderBy}`)
    },
    // 刷新
    onRefresh() {
      if (this.listLoading) return
      console.log('onRefresh')
      // 将search对象恢复初始值
      // this.search = this.$options.data().search
      this.getTongji()
      this.onLoad()
      this.getTongjiAction()
    },
    // 加载图表数据
    async onLoad() {
      try {
        let res = await ApiScrmClue.getScrmClueSourceDataList(this.search)
        // 加载状态结束
        this.listLoading = false
        this.refreshing = false
        this.chartData.rows = res.data.data
      } catch (error) {
        // 加载状态结束
        this.listLoading = false
        this.refreshing = false
      }
    },
    // 获取累计数据
    getTongji() {
      ApiScrmClue.getScrmClueSourceDataTotal().then(res => {
        this.refreshing = false
        this.navDataTotal = res.data.data
      })
      .catch(() => this.refreshing = false)
    },
    // 获取分级数据
    getTongjiAction() {
      ApiScrmClue.getScrmClueSourceDataAction().then(res => {
        this.actionData = res.data.data
      })
    },
  }
}
</script>

<style lang="less" scoped>

p {
  margin: 0;
  padding: 0;
}
ul, li {
  list-style: none;
}

.statistics {
  padding-top: 15px;
  background: #fff;
  min-height: calc(100vh - 50px);
  // -webkit-overflow-scrolling: touch;
}

.nav-data {
  display: flex;
  align-items: center;
  margin: 10px 15px;
  margin-top: 0;
  border-radius: 5px;
  box-shadow: 0 2px 3px 0 #65A3FE;
  // background: linear-gradient(90deg, #6D7EF9 0%, #65A3FE 100%);
  background: linear-gradient(90deg, #447FD6 0%, #3671C9 100%);
  &-item {
    position: relative;
    flex: 1;
    color: #fff;
    &:not(:last-child)::after {
      content: ' ';
      position: absolute;
      top: 15%;
      right: 0;
      height: calc(100% - 30%);
      pointer-events: none;
      border-left: 1px solid #fff;
      opacity: 0.3;
      transform: scaleY(.5);
    }
    p {
      margin: 0;
      padding: 0;
      margin-top: 15px;
      text-align: center;
    }
    p:first-child {
      font-family: 'Bebas';
      font-weight: bold;
      font-size: 25px;
    }
    p:last-child {
      opacity: .6;
      font-size: var(--font-sm-s);
      margin-bottom: 15px;
    }
  }
}

.charts-wrap {
  margin: 0 15px;
  margin-top: 15px;
  padding-bottom: 10px;
}

.filter-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  .tabs {
    height: 45px;
    line-height: 45px;
    .tabs-item {
      margin-right: 30px;
      display: inline-block;
      font-weight: bold;
      font-size: var(--font-md);
      color: var(--gray-color);
      &-active {
        position: relative;
        color: var(--blank-color);
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 30px;
          height: 3px;
          border-radius: 3px;
          background: #FAC05B;
          transform: translateX(-50%);
        }
      }
    }
  }
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: 0 0 0 0 #fff;
  }
}

.charts-box {
  margin-top: 5px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.8);
}

.action-data {
  margin: 20px 15px 0;
  overflow: hidden;
  .action-data-label {
    line-height: 40px;
    font-weight: bold;
    font-size: var(--font-md);
    color: var(--blank-clor);
  }
  .table-wrap {
    margin-bottom: 30px;
    padding: 0 15px;
    border-radius: 4px;
    background: linear-gradient(-30deg, #F5F9FF 0%, #ECF4FF 17%, #F5F9FF 100%);
  }
  .table {
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;
    tr {
      position: relative;
      font-size: var(--font-sm);
      &:not(:last-child) {
        border-bottom: 1px solid #DEE6F1;
      }
      &:first-child {
        border-bottom-color: transparent;
      }
      th {
        font-weight: normal;
        color: var(--blank-color);
      }
      td:not(:first-child) {
        text-align: center;
        color: var(--theme-color);
      }
      td:first-child {
        color: var(--gray-color);
      }
    }
  }
}
</style>