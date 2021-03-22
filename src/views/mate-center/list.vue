<template>
  <div
    class="container"
    :style="{ height: height + 'px' }"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="0"
  >
    <div class="left" id="left">
      <div
        v-for="(item, index) in oneList"
        :key="index"
        :class="oneindex == item.id ? 'box back' : 'box'"
        @click="checkTabs(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right">
      <div class="top" v-if="twoList.length > 0">
        <div
          class="twobox"
          v-for="(item, index) in twoList"
          :key="index"
          @click="checktwoTabs(item, index)"
        >
          {{ item.name }}
          <div v-if="twoindex == item.id" class="twobox_bot"></div>
        </div>
      </div>
      <!-- :style="twoList.length > 0 ? 'margin-top:60px' : 'margin-top:10px' " -->
      <div
        class="bottom"
        :style="{
          height: leftheight + 'px',
          marginTop: twoList.length > 0 ? '50px' : '10px'
        }"
      >
        <div class="piclist" v-if="posterList.length > 0">
          <div
            class="picbox"
            v-for="(pic, i) in posterList"
            :key="i"
            @click="make(pic.groupId, pic.id)"
            v-if="pic.isDisplay"
          >
            <van-image width="100%" height="195" :src="imageurl + pic.link" />
            <div>
              <span>{{ pic.name }}{{ posterList.length }}</span>
            </div>
          </div>
        </div>
        <div v-else style="text-align:center;padding-top:100px;">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
export default {
  data () {
    return {
      imageurl:'http://athena-1255600302.cosgz.myqcloud.com',
      height:'',
      width:'',
      oneList:[],
      twoList:[],
      oneindex:'',
      twoindex:'',
      posterList:[],
      isLoading: false,
      pageNum:0,
      busy:false,
      leftheight:'100%'
    }
  },
  mounted() {
     
  },
  created(){
    this.pageNum=0
    // 分类
    this.getPosterClassify()
  },
  directives: { infiniteScroll },
  methods: {
    loadMore(){ 
      this.basy=true
      this.pageNum++
      // 海报列表
      this.gainPosterList(this.twoindex?this.twoindex:this.oneindex,this.pageNum)
    },
    // 分类
    getPosterClassify(){
      this.$http.posterClassify().then(res=>{
        var list={name:'全部',id:'',childs:[]}
        this.oneList=res.data.data
        this.oneList.unshift(list)
      })
    },
    // 海报列表
    gainPosterList(id,pageNum){
      this.$http.posterMatterList({type:'poster',groupId:id,pageNum}).then(res=>{
        var data=res.data.data.list
        data.forEach(item=>{
          this.posterList.push(item)
        })
      })
    },
    // 切换一级分类
    checkTabs(index){
      this.twoList=this.oneList[index].childs
      this.oneindex=this.oneList[index].id
      this.twoindex=''
      this.pageNum=1
      this.posterList=[]
      this.gainPosterList(this.oneindex,1)
    this.leftheight=document.getElementById('left').clientHeight-50
    },
    // 切换二级分类
    checktwoTabs(item,i){
      this.twoindex=this.twoList[i].id
      this.pageNum=1
      this.posterList=[]
      this.gainPosterList(this.twoindex,1)
    this.leftheight=document.getElementById('left').clientHeight-50
    },
    make(groupId,id){
      this.$router.push(`/mate-center/makePoster?groupId=`+groupId+`&id=`+id)
    },
    isInteger(obj) {
      return typeof obj === 'number' && obj%1 === 0
    }
    
  }
}
</script>

<style lang="less" scoped>
.piclist {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .picbox {
    border: 1px solid #eee;
    margin-left: 15px;
    margin-bottom: 10px;
    width: 125px;
    div {
      margin-bottom: 5px;
      // padding-left: 5%;
      width: 90%;
      display: flex;
      justify-content: space-between;
      span {
        padding: 5px;
        //   padding: 2px 7px;
        //   border: 1px solid #eee;
        //   border-radius: 15px;
      }
    }
  }
}
.bottom {
  width: 100%;
  margin-top: 10px;
}
.top {
  position: fixed;
  width: 75%;
  display: flex;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  padding: 10px;
  z-index: 5;
  background: #fff;
}
.twobox {
  padding: 0 5px;
  text-align: center;
}
.twobox_bot {
  display: block;
  width: 100%;
  height: 2px;
  background: #4f73ad;
  margin-top: 2px;
}
.container {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
}
.left {
  width: 20%;
  border-right: 1px solid #eee;
  position: fixed;
  height: 100%;
  background: #fff;
}
.box {
  text-align: center;
  overflow-y: auto;
  padding: 10px 0;
}
.back {
  color: #4f73ad;
  background: #eee;
}
.right {
  margin-left: 20%;
  width: 80%;
}
</style>