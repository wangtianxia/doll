import { baseUrl } from './env.js';
import md5 from './md5'
require('es6-promise').polyfill();
import Axios from 'axios'
import Vue from 'vue'
export default async(url='',data ,type='GET')=>{
    type = type.toUpperCase();
    url = baseUrl+url
    if (type == 'GET') {
      let dataStr = ''; //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      });
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    }
    try {
      const response = await Axios({
        url: url,
        method: type,
        data: data
      });
      const responseJson = await response.data;
      return responseJson
    } catch (error) {
      const err = await error;
      return '0';
    }

    // console.log("data",data);
    // type = type.toUpperCase();
    // url = baseUrl+url;
    // if(type == 'GET'){
    //     let datastr='';
    //     Object.keys(data).forEach((key)=>{
    //         datastr += key + '=' + data[key] + '&'
    //     });
    //     if (datastr != '') {
    //         datastr = datastr.substr(0, datastr.lastIndexOf('&'))
    //         url = url + '?' + datastr
    //       }
    // }
    // if(window.fetch &&　method=='fetch'){
    //     let requestConfig ={
    //         credentials: 'include',
    //         method: type,
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         mode: 'cors',
    //         cache: 'force-cache',
    //     }
    //     if(type == 'POST'){
    //         Object.defineProperty(requestConfig, 'body', {
    //           value: JSON.stringify(data)
    //         })
    //         if(data instanceof FormData){
    //             requestConfig.body = data
    //         }else{
    //             console.log('post');
    //             Object.defineProperty(requestConfig, 'body', {
    //                 value: JSON.stringify(data)
    //             })
    //         }
    //     }
    //     // let sign =  md5.makeSign(data);
    //     // data['sign'] = sign;
    //     try{
    //         let response = await window.fetch(url,requestConfig);
    //         let responseData = response.json();
    //         return responseData;
    //     }catch(err){
    //         console.error(err);
    //     }
    // }else{
    //     return new Promise((resolve,reject)=>{
    //         var requestObj;
    //         if(window.XMLHttpRequest||XMLHttpRequest){
    //             requestObj = new XMLHttpRequest();
    //         }else{
    //             requestObj = new ActiveXObject();
    //         }
    //         let sendData = '';

    //         // let sign =  md5.makeSign(data);
    //         // data['sign'] = sign;

    //         if(type =="POST"){
    //             if(data instanceof FormData){
    //                 sendData = data
    //             }else{
    //                 sendData = JSON.stringify(data);
    //             }
    //         }
    //         requestObj.opent(type,url,true);
    //         requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //         requestObj.send(sendData);
    //         requestObj.onreadystatechange = ()=>{
    //             if(requestObj.readyState == 4 && requestObj.status == 200){
    //                 let obj = requestObj.response;
    //                 if(typeof obj!=object){
    //                     obj = JSON.parse(obj);
    //                 }
    //                 resolve(obj);
    //             }else{
    //                 reject(requestObj);
    //             }
    //         }
    //     });
    // }
}
