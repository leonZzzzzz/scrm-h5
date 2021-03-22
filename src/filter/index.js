export function allTableTimefilters(option) {
    if (option) {
      return option.slice(0, option.length - 3)
    } else {
      return ""
    }
  }

/**
 * 格式化数量
 * 描述：大于1千将显示 1K+，大于1万显示1W+
 * @param {number} num 
 * @return {string} string
 */
export function formatQuantity(num) {
    if (typeof num != 'number') return num
    
    let str = num.toString()
    // 5位数以上显示万
    if (str.length >= 5) {
      return parseInt(num / 10000)+'w+'
    } else if (str.length === 4) {
      // 千位
      return parseInt(num / 1000)+'k+'
    } else {
      // 1千一下直接返回
      return str
    }
  }

/**
 * 格式化日期
 * @param {string} dateTime 要转换的日期时间
 * @param {string} type date 返回yyyy-MM-dd, dateTime 返回yyyy-MM-dd HH:mm
 */
export function formatDateTime(dateTime, type) {
    if (!dateTime || typeof dateTime != 'string') return dateTime
    if (type == 'date') {
      return dateTime.slice(0, 10)
    } else {
      return dateTime.slice(0, 16)
    }
  }