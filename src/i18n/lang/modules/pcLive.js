const pcLiveZh = {
  header: {
    logoTxt: '演唱会购买票据'
  },
  intro: {
    title: '简介',
    options: [
      { list: ['首次上线演唱会【无线梦想音乐演唱会 2021】由唐僧直播独家播出'] },
      {
        list: [
          '这是一场梦想的音乐',
          '这是一场激动人心的演出',
          '这是一次跨越思维的碰撞',
          '所有的可能，这就是“无限音乐，无限梦想”！'
        ]
      },
      { list: ['只要带上耳机就能一秒步入这场“无限梦想”的音乐世界，快来观赏这场绝无仅有的线上演唱会吧！'] },
      { list: ['*【无限梦想音乐演唱会2021】线上演唱会时间：2021年05月01日(周六) 18:30(北京时间)'] }
    ]
  },
  tickets: {
    title: '无限梦想音乐演唱会 2021',
    desc: '200分钟 / 群星线上演唱会 / 2021-05-01 18:30 全网线上首映',
    labelTxt: '票据',
    btnTxt: '立即购买'
  },
  artistTitle: '拟邀艺人',
  notice: {
    title: '购票须知',
    list: [
      '1.须打开【唐僧直播APP-演唱会直播间-输入入场票据码】入场观看',
      '2.入场票据码即将通过邮件的形式发送,请各位注意验收入场票据吗仅为入场观看演唱会的权力，未收到入场票据码请联系我们官方客服(微信号:TangSengKF001)',
      '3.入场票据为一次性，一码一票，请妥善保管自己入场票据码，不要泄露给他人，若因个人保管、转让、倒卖等原因导致入场票据码无法进入观看演唱会，此带来的不良后果以及票务风险由购票者自行承担。同时请警惕入场票据码转让、倒卖行为、谨防上当受骗'
    ]
  },
  dialog: {
    title: '确认订单',
    item1: {
      label: '票据查收',
      placeholder: '请输入邮箱接收票据码'
    },
    item2: {
      label: '购买数量',
      tips: '最多购买5张票',
      priceLabel: '应付金额'
    },
    remark: '备注：支付成功后请您前往邮箱进行票据查看',
    wxTipsTxt: '微信扫码付款',
    btnTxt: '点击获取付款码',
    kf: '支付遇到问题联系我们官方客服(微信号：TangSengKF001)',
    toast: {
      mail: '邮箱不能为空',
      mailValid: '输入邮箱格式不正确'
    }
  }
}

const pcLiveEn = {
  header: {
    logoTxt: 'Concert purchase ticket'
  },
  intro: {
    title: 'Introduction',
    options: [
      {
        list: [
          'The first online live concert [X Infinity World Music Showcase 2021] will be broadcast exclusively by Tang Seng Live'
        ]
      },
      {
        list: [
          'This is a dream music',
          'This is an exciting performance',
          'This is a collision across thinking',
          'All the possibilities, this is "infinite music, infinite dreams"!'
        ]
      },
      {
        list: [
          'As long as you put on your headphones, you can step into this "infinite dream" music world in one second. Come and watch this unique online concert!'
        ]
      },
      {
        list: [
          '*[X Infinity World Music Showcase 2021] Online concert time: May 1, 2021 (Saturday) 18:30 (Beijing time)'
        ]
      }
    ]
  },
  tickets: {
    title: ' X Infinity World Music Showcase 2021',
    desc: '200 minutes / Various Artists Online Concert / 2021-05-01 18:30 Full network premiere',
    labelTxt: 'Bill RM ',
    btnTxt: 'Buy now'
  },
  artistTitle: 'Artists to be invited',
  notice: {
    title: 'Ticket purchase notice',
    list: [
      '1. Download and watch in [Tang Seng Live App-Concert Live Room-Enter the admission ticket code].',
      '2. The admission ticket code will be sent by email. The admission ticket code is only for the right to enter the concert to watch the concert. If you have not received the admission ticket code, please contact our official customer service (WeChat ID: TangSengKF001) .',
      '3. The admission ticket code is a one-time, one code per ticket. Please keep your own admission ticket code properly and do not disclose it to others. If the admission ticket code cannot be entered to watch the concert due to personal storage, transfer, reselling, etc., the ticket purchaser will be reponsible. At the same time, please be alert to the transfer and reselling of admission ticket codes, and beware of being deceived.'
    ]
  },
  dialog: {
    title: 'Confirm Order',
    item1: {
      label: 'Bill check',
      placeholder: 'Please enter the email receipt code'
    },
    item2: {
      label: 'Purchase quantity',
      tips: 'Buy up to 5 tickets',
      priceLabel: 'Amounts payable'
    },
    remark: 'Remarks: After the payment is successful, please go to the mailbox to check the bill',
    wxTipsTxt: 'WeChat scan code payment',
    btnTxt: 'Click to get payment code',
    kf: 'Contact our official customer service if you encounter problems with payment (WeChat ID: TangSengKF001)',
    toast: {
      mail: 'E-mail can not be empty',
      mailValid: 'The input email format is incorrect'
    }
  }
}

export { pcLiveZh, pcLiveEn }
