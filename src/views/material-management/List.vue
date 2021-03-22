<template>
  <div>
    <div class="search">
      <div class="search-input">
        <van-search v-model="value" placeholder="搜索" @input="onSearch(value)">
        </van-search>
      </div>
      <div class="all">
        <div class="btn" style="display: flex" @click="getMaterialList()">
          <div style="margin-right: 10px">{{ searchText }}</div>
          <!-- <div @click="onSearch('all')" style="margin-right:10px;">{{searchText}}</div> -->
          <i class="iconfont icon-shaixuan"></i>
        </div>
      </div>
    </div>
    <div class="list" v-if="pageData.total != 0">
      <!-- 当前类型:{{ type }} -->
      <Page :config="pageConfig" @onLoad="onLoad" @onRefresh="onRefresh">
        <div class="list-content" v-if="type == 'text'">
          <TextListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></TextListItem>
        </div>
        <div class="list-content image" v-if="type == 'image'">
          <ImageListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></ImageListItem>
        </div>
        <div class="list-content image" v-if="type == 'video'">
          <VideoListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></VideoListItem>
        </div>
        <div class="list-content" v-if="type == 'image_text'">
          <ImageTextListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></ImageTextListItem>
        </div>
        <div class="list-content" v-if="type == 'numerous_image_text'">
          <ImageTextsListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></ImageTextsListItem>
        </div>
        <div class="list-content" v-if="type == 'file'">
          <FileListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></FileListItem>
        </div>
        <div class="list-content" v-if="type == 'program'">
          <ProgramListItem
            style="margin-bottom: 10px"
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          ></ProgramListItem>
        </div>
      </Page>
    </div>
    <div style="padding-top: 177px" v-else>
      <NotData></NotData>
    </div>
    <!-- 筛选窗口 -->
    <van-popup
      v-model="showLifeCycleTree"
      round
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-tree-select
        :style="{ width:'100%',height: '100%'}"
        :items="lifeCycleTree"
        :active-id.sync="id"
        :main-active-index.sync="activeIndex"
        @click-item="checkTree"
        @click-nav="clickNav"
      />
      <!-- <van-picker
        show-toolbar
        title="请选择分类"
        :columns="lifeCycleTree"
        value-key="name"
        @confirm="onLifeCycleConfirm"
        @cancel="showLifeCycleTree = false"
      >
      </van-picker> -->
    </van-popup>
  </div>
</template>

<script>
import {Picker,Popup,TreeSelect} from "vant";
import TextListItem from "./components/TextListItem";
import ImageListItem from "./components/ImageListItem";
import VideoListItem from "./components/VideoListItem";
import ImageTextListItem from "./components/ImageTextListItem";
import ImageTextsListItem from "./components/ImageTextsListItem";
import FileListItem from "./components/FileListItem";
import ProgramListItem from "./components/ProgramListItem";
import NotData from "./components/NotData";
import Page from "../../components/common/Page";
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    activeIndex: {
      type: String,
      default: "0",
    },
  },
  components: {
    TextListItem,
    ImageListItem,
    VideoListItem,
    ImageTextListItem,
    ImageTextsListItem,
    FileListItem,
    ProgramListItem,
    Page,
    NotData,
    vanPicker: Picker,
    vanPopup: Popup,
    vanTreeSelect:TreeSelect
  },
  watch: {
    type: {
      handler: function () {
        this.groupId = "";
        this.searchText = "全部";
        this.getMaterialPage({});
        this.value = "";
      },
      immediate: true,
    },
  },
  data() {
    return {
      id:'',
      searchText:'全部',
      groupId:'',
      lifeCycleTree:[],
      showLifeCycleTree:false,
      value: "",
      dataList: [],
      pageConfig: {
        loading: false,
        finished: false,
      },
      pageData: {
        pageSize: 20,
        pageNum: 1,
        total: 0,
      },
      valueIndex: [],
    };
  },
  methods: {
    /* 页面渲染 */
    onSearch(value) {
      if (value == "all") {
        this.value = "";
        this.groupId = "";
      }
      this.getMaterialPage({ name: this.value });
    },
    // 获取一二级分组数据
    getMaterialList(){
      this.$http.getMaterialGroupList({type:this.type}).then(res=>{
        this.lifeCycleTree=res.data.data
        this.lifeCycleTree.forEach(item => {
          item.text=item.name
          if(item.childs.length>0){
            item.children=item.childs
            item.children.forEach(val=>{
              val.text=val.name
            })
          }else{
            item.children=[{text:'',id:'',children:[{text:' ',id:' '}]}]
          }
        });
        this.lifeCycleTree.unshift({text:'全部',id:' ',children:[{text:' ',id:' ',name:' '}]})
        console.log('筛选',this.lifeCycleTree)
        this.showLifeCycleTree=true
      })
    },
    // 选择生命周期
    checkTree(e) {
      this.groupId = e.id;
      this.searchText = e.text;
      this.showLifeCycleTree=false
      this.getMaterialPage({}, () => {
        this.pageConfig.loading = false;
        this.pageConfig.finished = true;
      });
    },
    clickNav(index) {
      if (index == 0) {
        this.groupId = "";
        this.searchText = '全部'
        this.showLifeCycleTree=false
      }
      if(this.lifeCycleTree[index].children.length==1&&!this.lifeCycleTree[index].children[0].id){
        this.groupId = this.lifeCycleTree[index].id;
        this.searchText = this.lifeCycleTree[index].text;
        this.showLifeCycleTree=false
      }
      this.getMaterialPage({}, () => {
        this.pageConfig.loading = false;
        this.pageConfig.finished = true;
      });
    },
    // 选择生命周期
    onLifeCycleConfirm(val){
      this.searchText=val[0]
      this.lifeCycleTree.forEach(item=>{
        if(val[0]=='全部'){
          this.groupId=''
        }else{
          if(item.text==val[0]){
            if(val[1]!=''){
              item.children.forEach(ele=>{
                if(ele.text==val[1]){
                  this.groupId=ele.id
                }
              });
            } else {
              this.groupId = item.id;
            }
          }
        }
      });
      this.showLifeCycleTree = false;
      this.getMaterialPage({}, () => {
        this.pageConfig.loading = false;
        this.pageConfig.finished = true;
      });
    },
    // 下拉刷新
    onRefresh() {
      this.getMaterialPage({}, () => {
        this.pageConfig.loading = false;
        this.pageConfig.finished = true;
      });
    },
    // 滚动加载
    onLoad() {
      if (this.pageData.pageSize >= this.pageData.total) {
        this.pageConfig.loading = false;
        this.pageConfig.finished = true;
        return;
      }
      this.pageData.pageSize = this.pageData.pageSize + 20;
      this.getMaterialPage({}, () => {
        this.pageConfig.loading = false;
        this.pageConfig.finished = true;
      });
    },
    /* 获取数据 */
    // 获取列表数据
    getMaterialPage(options, callback) {
      options.type = this.type;
      options.pageSize = this.pageData.pageSize;
      options.pageNum = this.pageData.pageNum;
      options.groupId = this.groupId;
      this.$http.getMaterialPage(options).then((res) => {
        this.dataList = res.data.data.list;
        this.pageData.total = res.data.data.total;
        if (callback) {
          callback(res);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  position: fixed;
  width: 100%;
  background-color: #fff;
  z-index: 1999;
  padding-top: 2px;
  .van-search__content {
    border-radius: 20px;
    background-color: #f6f6f6;
  }
  .search-input {
    flex: 1;
  }
  .all {
    padding: 10px 12px 10px 0;
    .btn {
      background-color: #f6f6f6;
      height: 34px;
      line-height: 34px;
      padding: 0 14px;
      border-radius: 20px;
      color: #6b6b6b;
      i {
        font-size: 12px;
      }
    }
  }
}
.list {
  padding: 60px 10px 0;
  background-color: #fff;
  .image {
    columns: 2;
    column-gap: 10px;
  }
}
.van-sidebar-item--select {
  &::before {
    background-color: rgb(79, 115, 173);
  }
}
.van-tree-select__item--active {
  color: rgb(79, 115, 173);
}
</style>