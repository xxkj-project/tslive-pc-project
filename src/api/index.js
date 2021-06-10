/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:46:43
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-13 01:20:45
 * @Desc: 请求 - api
 */

import request from '@/utils/request'

/**
 * 分享接口 - 获取用户基本信息
 * @param {number|string} id 用户id
 */
export function getShareData({ id }) {
  return request({
    url: `/api/share/baseInfo/${id}`,
    method: 'get',
    data: {}
  })
}

/**
 * 微信支付 - 微信扫码购买演唱会门票
 * @param {object} data 例如：{mail: '123123@qq.com', num: 1}
 */
export function getQrCode(data) {
  return request({
    url: `/api/wechat/pay/concert/qr`,
    method: 'post',
    data
  })
}

/**
 * 验证票据是否有效
 * @param {string} code 门票票据
 */
export function checkTicketAging({ code }) {
  return request({
    url: `/concert/ticket/${code}`,
    method: 'get',
    data: {}
  })
}
