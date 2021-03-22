<template>
  <div class="container">
    <div class="top-tips">
      <div>1、在企业微信的【通讯录】-【新的客户】-【添加】中，将添加客户的页面弹出，将添加客户页面与手机号页面左右放置，就可以一键复制手机号添加客户，快速批量添加客户了。</div>
      <div>2、在添加时我们需要注意添加客户的频率，如果频率过快，很有可能会被限制使用客户添加功能。</div>
    </div>
    <div class="sample">
      <img class="sample-img" src="../../../assets/add-way.png" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = '添加方法'
    document.querySelector('body').setAttribute('style', 'background-color:#ffffff')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px 10px;
  box-sizing: border-box;
  .sample {
    margin-top: 20px;
    .sample-img {
      width: 100%;
    }
  }
}
</style>