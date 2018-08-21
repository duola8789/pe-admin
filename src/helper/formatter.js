export const formatters = {

  money: _ => isNaN(+_) ? 0 : (+_).toFixed(2),

  moneyInteger: _ => isNaN(+_) ? 0 : (+_).toFixed(0),

  holdBill: _ => {
    if (_ === null || _ === undefined || _ === '') {
      return '--'
    } else {
      return (+_).toFixed(2)
    }
  },

  percentage: _ => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return (+_ * 100).toFixed(2) + '%'
    }
  },

  percentage100: _ => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return (+_).toFixed(2) + '%'
    }
  },

  percentageInteger: _ => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return (+_ * 100).toFixed(0) + '%'
    }
  },

  percentageOrigin: _ => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return (+_).toFixed(0) + '%'
    }
  },

  desire: _ => {
    return ({
      1: '无',
      5: '一般',
      10: '有'
    })[_] || '--'
  },

  trimsec: _ => _ ? _.split(':').slice(0, -1).join(':') : '--',

  graytime: _ => _ ? _.replace(/([^\s]+) ([^\s]+)/, '$1 <span style="color:#9e9e9e;">$2</span>') : '--',

  concatId: (_, row) => `${_}（ ${row.userId} ）`,

  userTag: (_, row) => {
    if (!row.listTag || !row.listTag.length) return _;
    const stylish = tag => `&nbsp;<span
      class="table-tag"
      data-container="body"
      data-toggle="popover"
      data-placement="auto top"
      data-trigger="hover"
      data-content="${tag.tagName}"
      style="display:inline-block;padding:0 2px;color:#fff;font-size:12px;background-color:${tag.color};border-radius:3px;"
      >${tag.name}</span>`;
    const tags = row.listTag.map(stylish).join(' ');
    return `${_}${tags}`
  },

  comment: (_, row) => {
    if (!row.lastLiveRoomMsg) {
      return '--'
    }
    const msg = row.lastLiveRoomMsg.length < 11 ?
      row.lastLiveRoomMsg
      : row.lastLiveRoomMsg.slice(0, 10) + '...';
    return `${_}  <span title="${row.lastLiveRoomMsg}">${msg}</span>`
  },

  birthPlace: (_, row) => {
    if (!_) {
      return '未知'
    }
    const place = (_.indexOf('未知') + 1) ? '未知' : _;
    return place.split(/[,|，]/).join(' ')
  },

  avePositionOfWeek: (_, row) => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return `${row.avePositionOfWeekDesc}(${(row.avePositionOfWeek * 100).toFixed(2)}%)`
    }
  },

  transactionFrequency: (_, row) => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return `${row.transactionFrequencyDesc}(${row.transactionFrequency.toFixed(2)}分)`
    }
  },

  investmentHabit: (_, row) => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return `${row.investmentHabitDesc}(${row.investmentHabit.toFixed(2)}天)`
    }
  },

  myriad: _ => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      return ((+_) / 10000).toFixed(2) + '万'
    }
  },

  maintain6: _ => (_ || '').substr(0, 6),

  maintain7: _ => (_ || '').substr(0, 7),

  hoursDH: _ => {
    if (_ === null || _ === undefined) {
      return '--'
    } else {
      const hours = +_;
      return `${Math.floor(hours / 24)}天${hours % 24}小时`
    }
  },

  unknownNumber: (_, row) => row.userId ? row.userName : `<span class="strange">陌生号码</span>`,

  category: _ => ({
    '0': '未分类',
    '1': '合格',
    '2': '小白用户',
    '3': '自主入金',
    '4': '高危用户',
    '5': '刷单嫌疑'
  })[_ + ''],

  checkStatus: (_, row) => row.checkStatus === 1 ? '--' : {
    '1': '违规-普通',
    '5': '违规-严重一类',
    '6': '违规-严重二类',
    '7': '违规-禁止',
    '2': '提醒',
    '3': '合格',
    '4': '优秀'
  }[_ + ''],

  callSource: _ => ({
    'Gz': '广州',
    'Qn': '青牛',
    'Aspect': '兆维',
    'APP': '手机'
  })[_] || _,

  myriadMoney: _ => {
    return (Math.floor(_ / 100) / 100).toFixed(2) + '万'
  },

  empInfo: (_, row) => {
    if (!row.iaName) {
      return `${row.empId || '--'}`
    } else if (!row.empId) {
      return `${row.iaName || '--'}`
    } else {
      return `${row.iaName} | ${row.empId}`
    }
  },

  makeImage: _ => {
    if (!_ || _.indexOf('http') !== 0) {
      return '--'
    } else {
      return `<img src="${_}" class="thumbnail">`
    }
  },

  makeText: _ => {
    if (!_) {
      return '--'
    } else {
      return `<p class="table-text text-overflow-ellipsis">${_}</p>`
    }
  }
};
