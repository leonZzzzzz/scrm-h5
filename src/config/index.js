export const IS_DEV = process.env.NODE_ENV == "development";

// 接口地址
export const BASEURL = IS_DEV
  ? "wghjy"
  : location.origin + location.pathname.match(/\/\w+/g)[0];

// 图片前缀
// export const IMGHOST = "https://athena-1255600302.cos.ap-guangzhou.myqcloud.com";
// export const IMGURL = "http://athena-1255600302.cosgz.myqcloud.com"; // 默认域名（不能使用腾讯云的图片处理功能）
export const IMGURL = "https://athena-1255600302.image.myqcloud.com"; // 此域名可以使用腾讯云图片处理功能（裁剪、缩放等）
export const IMGHOST = IMGURL;

// 可信域名地址
// export const DOMAINADDRESS = 'http://221354i74m.iask.in/'
// export const DOMAINADDRESS = 'http://x.wego168.com/hyzs/scrm/'
export const DOMAINADDRESS = IS_DEV
  ? location.origin + "/wghjy" + "/scrm/"
  : location.origin + location.pathname.match(/\/\w+/g)[0] + "/scrm/" + location.search;
export const BASEAPI = IS_DEV
  ? location.origin + "/wghjy"
  : location.origin + location.pathname.match(/\/\w+/g)[0];

// 应用id
export const AGENTID = "1000005";

// 判断当前设备是移动端或是pc端
export const ISMOBILE =
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ) || false;
export const ISIPHONE =
  navigator.userAgent.match(/(pad|pod|iPhone|iPod|ios|iPad)/i) || false;

