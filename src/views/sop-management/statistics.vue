<template>
  <div class="sop-statistics">
    <div class="stat-digest">
      <div class="digest-left">
        <span>2021年3月</span>
        <van-icon class="icon" name="arrow-down" />
      </div>
      <div class="digest-right">
        <span>总任务 · 125</span>
        <span>已完成 · 25</span>
        <span>未完成 · 100</span>
      </div>
    </div>
    <div class="stat-list">
      <div class="list-group">
        <div class="group-item">
          <div class="item-top">
            <div class="top-left">
              <van-icon class="left-icon" name="star-o" />
              <span class="left-title">群发SOP</span>
            </div>
          </div>
          <div class="item-content">
            <div class="item-box item-divider">
              <div class="count">20</div>
              <div class="name">已完成</div>
            </div>
            <div class="item-box item-divider">
              <div class="count">30</div>
              <div class="name">未完成</div>
            </div>
            <div class="item-box">
              <div class="count">10</div>
              <div class="name">已忽略</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-group">
        <div class="group-item">
          <div class="item-top">
            <div class="top-left">
              <van-icon class="left-icon" name="star-o" />
              <span class="left-title">朋友圈SOP</span>
            </div>
          </div>
          <div class="item-content">
            <div class="item-box item-divider">
              <div class="count">20</div>
              <div class="name">已完成</div>
            </div>
            <div class="item-box item-divider">
              <div class="count">30</div>
              <div class="name">未完成</div>
            </div>
            <div class="item-box">
              <div class="count">10</div>
              <div class="name">已忽略</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-group">
        <div class="group-item">
          <div class="item-top">
            <div class="top-left">
              <van-icon class="left-icon" name="star-o" />
              <span class="left-title">添加好友</span>
            </div>
          </div>
          <div class="item-content">
            <div class="item-box item-divider">
              <div class="count">20</div>
              <div class="name">已完成</div>
            </div>
            <div class="item-box item-divider">
              <div class="count">30</div>
              <div class="name">未完成</div>
            </div>
            <div class="item-box">
              <div class="count">10</div>
              <div class="name">已忽略</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-group">
        <div class="group-item">
          <div class="item-top">
            <div class="top-left">
              <van-icon class="left-icon" name="star-o" />
              <span class="left-title">公海池</span>
            </div>
          </div>
          <div class="item-content">
            <div class="item-box item-divider">
              <div class="count">20</div>
              <div class="name">已完成</div>
            </div>
            <div class="item-box item-divider">
              <div class="count">30</div>
              <div class="name">未完成</div>
            </div>
            <div class="item-box">
              <div class="count">10</div>
              <div class="name">已忽略</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-group">
        <div class="group-item">
          <div class="item-top">
            <div class="top-left">
              <van-icon class="left-icon" name="star-o" />
              <span class="left-title">生命周期阶段</span>
            </div>
          </div>
          <div class="item-content">
            <div class="item-box item-divider">
              <div class="count">20</div>
              <div class="name">已完成</div>
            </div>
            <div class="item-box item-divider">
              <div class="count">30</div>
              <div class="name">未完成</div>
            </div>
            <div class="item-box">
              <div class="count">10</div>
              <div class="name">已忽略</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style lang="less" scoped>

.sop-statistics {
  padding: 10px 15px;
  .stat-digest {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .digest-left {
      display: flex;
      align-items: center;
      font-size: 13px;
      width: 100px;
      flex-shrink: 0;
      color: #838488;
      .icon {
        margin-left: 5px;
        font-size: 10px;
      }
    }
    .digest-right {
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 17px;
      background: #EBEDF5;
      flex: 1;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #838488;
    }
  }
  .stat-list {
    .list-group {
      width: 100%;
      border-radius: 5px;
      padding: 13px 15px;
      background: #ffffff;
      margin-bottom: 13px;
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 1px 1px 3px rgba(224, 224, 224, 0.8);
      .group-item {
        .item-top {
          padding-bottom: 16px;
          border-bottom: 1px solid #ECEDEF;
          .top-left {
            display: flex;
            align-items: center;
            .left-icon {
              margin-right: 8px;
              font-size: 15px;
              color: #3875C6;
            }
            .left-title {
              color: #222222;
              font-weight: bold;
            }
          }
        }
        .item-content {
          display: flex;
          .item-box {
            flex: 1;
            position: relative;
            text-align: center;
            .count {
              font-size: 25px;
              color: #222222;
              padding: 20px 0 16px 0;
              font-family: 'Bebas';
            }
            .name {
              color: #A9A9A9;
              font-size: 13px;
            }
          }
          .item-divider {
            &::after {
              content: '';
              width: 1px;
              height: 27px;
              background: #ECEDEF;
              position: absolute;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              right: 0;
            }
          }
        }
      }
    }
  }
}
</style>