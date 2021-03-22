let Utils = {
  /**
   * 正则验证手机号
   */
  checkPhone(phone) {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(phone)
  },
  /**
   * 正则验证邮箱
   */
  checkEmail(email) {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(email)
  },
  /**
   * 企业微信版本号比较
   */
  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)
    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },
  /**
   * 判断是否是企业微信环境
   * @return {Boolean} 如果是企业微信则返回 true
   * 参考文章 https://blog.csdn.net/sllailcp/article/details/80349353
   */
  envJudge() {
    let isMobile = window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i); // 是否手机端
    let isWx = /micromessenger/i.test(navigator.userAgent); // 是否微信
    let isComWx = /wxwork/i.test(navigator.userAgent); // 是否企业微信

    return isComWx
          
    // 暂时用不到下面的
    if (isComWx && isMobile) { //手机端企业微信
        return 'com-wx-mobile'
    }
    else if (isComWx && !isMobile) { //PC端企业微信
        return 'com-wx-pc'
    }
    else if (isWx && isMobile) { // 手机端微信
        return 'wx-mobile';
    }
    else if (isWx && !isMobile) { // PC端微信
        return 'wx-pc';
    }
    else {
        return 'other';
    }
  },
  /**
   * 根据传入的日期标识，返回日期（YYYY-MM-DD），
   * @param {number | string} dateVal 日期名，支持传入具体数字或其中一个字符串['昨天', '本周', '上周', '本月', '上月']。
   * @description 如果传入 n 则返回第 n 天后的日期，如果传入 -n 则返回 n 天前的日期。
   * 如果传入 '上周' 则返回上周一的日期
   */
  getNeedDate(dateVal = 0) {
    let d = new Date();
    let c_time = d.getTime() ;//当前时间的毫秒时间
    let c_day = d.getDay() || 7;//当前时间的星期几
    let oneDayLong = 24 * 60 * 60 * 1000 ; //一天的毫秒数
    let m_time, date, month_date;

    if (typeof dateVal == 'number') {
      m_time = dateVal < 0 ? c_time - (Math.abs(dateVal) * oneDayLong) : c_time + (dateVal * oneDayLong); //昨天的毫秒时间
      date = this.formatMSecond(m_time)
      return date
    }

    switch(dateVal) {
      case '昨天': 
        m_time = c_time - (1 * oneDayLong); //昨天的毫秒时间
        date = this.formatMSecond(m_time)
        break;
      case '本周': 
        // 本周一
        m_time = c_time - (c_day - 1) * oneDayLong; //当前周一的毫秒时间
        date = this.formatMSecond(m_time)
        break;
      case '上周': 
        // 上个周一
        m_time = c_time - ((c_day - 1) * oneDayLong) - (7 * oneDayLong); //上周一的毫秒时间
        date = this.formatMSecond(m_time)
        break;
      case '本月': 
        // 本月一号
        month_date = new Date(d.getFullYear(), d.getMonth(), 1)
        date = this.formatMSecond(month_date.getTime())
        break;
      case '上月': 
        // 上月一号
        month_date = new Date(d.getFullYear(), d.getMonth()-1, 1)
        date = this.formatMSecond(month_date.getTime())
        break;
    }
    return date
  },
  //将毫秒转换成日期（YYYY-MM-DD）
  formatMSecond(millisecond){
    // let d = new Date(time).toLocaleString().replace(/\//g,'-').split(" ")[0].toString();
    let d = new Date(millisecond)
    let m = d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1;
    let day = d.getDate() < 10 ? '0'+d.getDate() : d.getDate();
    let date = `${d.getFullYear()}-${m}-${day}`;
    return date;
  }

}

export default Utils