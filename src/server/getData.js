import Axios from '../config/axios.js'
/**
 * 登陆
 * @param {*} data
 * username
    password
 */
export const login = (data) =>   Axios('/login',data,'POST');
/**
 * 添加娃娃
 * @param {*} data
 * name:分类名
 添加，修改，登陆  post       修改 删除 只需要一个id   上下线只需要一个id
 */
export const addDoll = (data) => Axios('/addDoll', data, 'POST');
/**
 * 修改娃娃
 * @param {*} data
 * id:娃娃id
 *name  desc price refund_price:回购价 random:(0:无,1:随机发货)
 */
export const updateDoll = (data) => Axios('/updateDoll', data, 'POST');
/**
 * 获取娃娃信息
 * @param {*} data
 * id:娃娃id
 *name  desc price refund_price:回购价 random:(0:无,1:随机发货)
 */
export const getDoll = (data) => Axios('/getDoll', data, 'GET');

/**
 * 娃娃列表
 * @param {*} data
 * page_num: 页码(从1开始)
 page_size:  每页个数
 */
export const dollList = (data) => Axios('/dollList', data, 'GET');
/**
 * 删除当前娃娃
 * @param {*} data
 *id:娃娃的id
 */
export const deleteDoll = (data) => Axios('/deleteDoll', data, 'GET');
/**
 * 添加娃娃机
 * @param {*} data
 * id name status:(-2:下线(娃娃机不在列表中显示), -1:维护中, 1: 上线)
   doll_id:娃娃id
   discount:折扣(可以用下拉选)
   doll_status:(0:无,1:新品,2:限时特价)
   order: 排序
 */
export const addMachine = (data) => Axios('/addMachine', data, 'POST');
/**
 * 修改娃娃机信息
 * @param {*} data
 * 与修改娃娃机一样
 */
export const updateMachine = (data) => Axios('/updateMachine', data, 'POST');
/**
 * 获取娃娃机信息
 * @param {*} data
 * id:娃娃机id
 */
export const getMachine = (data) => Axios('/getMachine', data, 'GET');
/**
 * 获得娃娃机列表信息
 * @param {*} data
 * id:娃娃机id
 */
export const machineList = (data) => Axios('/machineList', data, 'GET');
/**
 * 删除娃娃机
 * @param {*} data
 * id:娃娃机id
 */
export const deleteMachine = (data) => Axios('/deleteMachine', data, 'GET');


// /**;
//  *
//  * @param {排序} data
//  */
 export const machineOrder = (data) => Axios('/machineOrder', data, 'GET');
// /**
//  *

// /**;
//  *领取管理列表
//  * @param
//  */
export const mailList = (data) => Axios('/mailList', data, 'GET');
// /**
//  *
// send 点击发货

export const send = (data) => Axios('/send', data, 'GET');

/*
抓取记录表
*/
export const userDollLog  = (data) => Axios('/userDollLog', data, 'GET');

/*
*支付订单查询
 *  */
export const orderRecord  = (data) => Axios('/orderRecord', data, 'GET');

/*
*统计
* */
export const statisticsList   = (data) => Axios('/statisticsList', data, 'GET');

/*
* 用户抓到记录
* */
export const catchList   = (data) => Axios('/catchList', data, 'GET');

/*
添加渠道
 参数:channel:渠道号,   desc:渠道
 返回值: {st:1, msg:''}
*/
export const addChannel   = (data) => Axios('/addChannel', data, 'POST');
/*
* 渠道列表
* 返回值:
 {st:1, data:{list:[{id, channel, desc}]}}
* */
export const channelList   = (data) => Axios('/channelList', data, 'GET');

/*
获取渠道信息
*参数: id
* {st:1, data:{info:{id:  , channel:  , desc:  }}}

 * */
export const getChannel   = (data) => Axios('/getChannel', data, 'GET');

/*
*修改渠道信息
* 参数: id
* 返回值: {st:1, msg:''}
* */
export const updateCahnnel   = (data) => Axios('/updateCahnnel', data, 'POST');
