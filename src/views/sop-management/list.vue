<template>
  <div class="sop-list">
    <div class="top-tips">
      管理员设置了SOP任务，请按规则完成任务，<span>如何快速操作？</span>
    </div>
    <div class="list-menu">
      <div class="menu-item"
        v-for="(item, index) in menu"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="list-content">
      <div class="cont-select">
        <div class="select-left">任务详情(5)</div>
        <!-- <div class="select-right">
          <span class="label">未完成</span>
          <van-icon class="icon" name="arrow-down" />
        </div> -->
        <div class="select-right">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" />
          </van-dropdown-menu>
        </div>
      </div>
      <div class="cont-item">
        <div class="item-top">
          <van-icon class="icon" name="star-o" />
          <div class="top-message">
            <div class="title">群发SOP</div>
            <div class="tips">2021-03-16 给客户发送以下信息</div>
          </div>
        </div>
        <div class="item-content">
          <div class="message">
            首席福利官LUCKY:
            周末拼手气
            今天给自己安排一杯香醇的咖啡，和幸福满满的2月
            道声别把！
            拼手气大额券到账，下单快来试试手气鸭！
          </div>
          <div class="cont-bottom">
            <div class="btn-group">
              <div class="btn-rect">复制</div>
            </div>
          </div>
        </div>
        <div class="item-external">
          <div class="external-cont">
            <van-image class="ext-img" fit="cover" src="#" />
            <div class="ext-tips">(点击图片长按下载)</div>
            <!-- <van-progress :percentage="50" stroke-width="11" :show-pivot="false" /> -->
          </div>
        </div>
        <div class="item-bottom">
          <div class="btn-group">
            <div class="btn-c">完成</div>
            <div class="btn-c">忽略</div>
          </div>
        </div>
      </div>
      <div class="cont-item">
        <div class="item-top">
          <van-icon class="icon" name="star-o" />
          <div class="top-message">
            <div class="title">添加好友SOP</div>
            <div class="tips">2021-03-01 11:30 添加20个好友</div>
          </div>
        </div>
        <div class="item-content">
          
        </div>
        <div class="item-external">
          <div class="external-cont">
            <van-image class="ext-img" fit="cover" src="#" />
            <div class="ext-tips">(点击图片长按下载)</div>
            <!-- <van-progress :percentage="50" stroke-width="11" :show-pivot="false" /> -->
          </div>
        </div>
        <div class="item-bottom">
          <div class="btn-group">
            <div class="btn-c">完成</div>
            <div class="btn-c">忽略</div>
          </div>
        </div>
      </div>
    </div>
    <confirm-dialog :config="confirmDialog"></confirm-dialog>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Progress } from 'vant'
import ConfirmDialog from './components/ConfirmDialog'
export default {
  components: {
    vanDropdownMenu: DropdownMenu,
    vanDropdownItem: DropdownItem,
    vanProgress: Progress,
    ConfirmDialog
  },
  data() {
    return {
      menu: [
        { name: '全部', label: '' },
        { name: '群发SOP', label: '' },
        { name: '朋友圈SOP', label: '' },
        { name: '添加好友SOP', label: '' },
        { name: '公海池SOP', label: '' },
        { name: '生命周期阶段SOP', label: '' },
      ],
      menuActive: '',
      confirmDialog: {
        show: false,
        message: '是否忽略此任务'
      },
      value: 0,
      option: [
        { text: '未完成', value: 0 },
        { text: '已忽略', value: 1 },
        { text: '已完成', value: 2 },
      ],
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#ffffff')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
.sop-list {
  background: #ffffff;
  .top-tips {
    padding: 10px 0;
    color: #FF8A4A;
    background: #FFF3ED;
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
    span {
      border-bottom: 1px solid;
    }
  }
  .list-menu {
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .menu-item {
      height: 28px;
      line-height: 28px;
      color: #8794A6;
      background-color: #EBEDF5;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 14px;
      border-radius: 14px;
      margin: 10px 10px 0 0;
      font-size: 12px;
    }
  }
  .list-content {
    padding: 0 15px;
    .cont-select {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 15px;
      .select-left {
        font-size: 16px;
        color: #070707;
        font-weight: bold;
      }
      .select-right {
        display: flex;
        align-items: center;
        .label {
          font-size: 12px;
          color: #959595;
          margin-right: 5px;
        }
        .icon {
          font-size: 8px;
        }
      }
    }
    .cont-item {
      margin-bottom: 10px;
      background: #ffffff;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 1px 1px 3px rgba(224, 224, 224, 0.8);
      .item-top {
        display: flex;
        align-items: flex-start;
        padding: 15px;
        background: #EFF6FF;
        margin-bottom: 26px;
        .icon {
          font-size: 15px;
          color: #3875C6;
          margin-right: 8px;
        }
        .top-message {
          .title {
            font-size: 15px;
            color: #222222;
            font-weight: bold;
            margin-bottom: 7px;
          }
          .tips {
            font-size: 12px;
            color: rgba(34, 34, 34, .6);
          }
        }
      }
      .item-content {
        margin: 0 15px;
        border-bottom: 1px solid #ECEDEF;
        .message {
          color: #58585A;
          font-size: 14px;
          line-height: 24px;
        }
        .cont-bottom {
          display: flex;
          flex-flow: row-reverse;
          margin-bottom: 13px;
          .btn-group {
            .btn-rect {
              border: 1px solid #B4C6E5;
              font-size: 13px;
              color: #3875C6;
              border-radius: 2px;
              background: #ffffff;
              height: 27px;
              line-height: 27px;
              padding: 0 13px;
            }
          }
        }
      }
      .item-external {
        padding: 15px;
        border-bottom: 1px solid #ECEDEF;
        color: rgba(34, 34, 34, .6);
        .external-cont {
          display: flex;
          flex-flow: wrap;
          align-items: flex-end;
          .ext-img {
            width: 100px;
            height: 100px;
            margin-right: 6px;
            margin-bottom: 6px;
          }
          .ext-tips {
            font-size: 12px;
            color: rgba(34, 34, 34, .6);
            margin-bottom: 6px;
          }
        }
      }
      .item-bottom {
        padding: 11px 15px;
        display: flex;
        flex-flow: row-reverse;
        .btn-group {
          display: flex;
          .btn-c {
            height: 30px;
            line-height: 30px;
            padding: 0 17px;
            font-size: 13px;
            color: #3875C6;
            border: 1px solid rgba(180, 198, 229, .5);
            margin-left: 11px;
            border-radius: 15px;
            box-sizing: border-box;
          }
        } 
      }
    }
  }
}
/deep/.van-dropdown-menu__bar {
  height: unset;
  box-shadow: unset;
}
/deep/ .van-dropdown-menu__title {
  font-size: 12px;
  color: #959595;
}
</style>