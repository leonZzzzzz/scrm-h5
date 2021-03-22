<template>
  <div>
    <div class="detail" v-for="(item,i) in data.materialQuoteList" :key="i" @click="godetail(item)">
      <img style="width:60px;height:60px;" :src="imageurl+item.quoteMaterial.imageUrl"/>
      <div  class="content">
        <div class="title">{{item.quoteMaterial.name}}</div>
        <div class='desc'>{{item.quoteMaterial.createTime | getupdateTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageurl:'http://athena-1255600302.cosgz.myqcloud.com',
      data: {},
    }
  },
  mounted () {
    this.newsGet()
  },
  methods: {
    async newsGet () {
      try {
        let res = await this.$http.numerGrapic(this.$route.query)
        this.data = res.data.data
        this.$nextTick(() => {
          document.title = res.data.data.name
        })
      } catch (err) {
        // alert('singleContent')
        // alert(JSON.stringify(err.data))
      }
    },
    godetail(item){
      console.log(item.quoteMaterial.link)
      window.open(item.quoteMaterial.link)
    }
  },
  filters: {
    getupdateTime(time) {
      var newtime = time.substring(0, time.length - 3);
      return newtime;
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  background: #fff;
  margin: 18px 18px 0 18px;
  padding: 15px;
  overflow: hidden;
  border-radius: 5px;
  .content {
    margin-left: 10px;
    width: calc(100%-95px);
    // margin-top: 7px;
    .title {
      height: 40px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .desc {
      font-size: 12px;
      color: rgb(136, 136, 136);
      margin-top: 8px;
    }
  }
}
</style>