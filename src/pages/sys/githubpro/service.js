// import { request } from "@http";
import request from 'umi-request';
import getStarHistory from './components/getStarHistory';
//获取账户信息api
export async function getAccountInfo({ account }) {
  console.log('123');
  return request(`https://api.github.com/users/${account}`);
}

// export const getAccountInfo = request.get('https://api.github.com/users/mpw0311').then(function (response) {
//     console.log(response)
//     return response
// })
export const getData = function({ url }) {
  return request(url);
};
// 获取历史stars趋势图数据
export const getReposStargazers = async function(payload) {
  const { gitname } = payload;
  if (!gitname) {
    throw new Error('getReposStargazers：gitname参数为空');
  }
  return await getStarHistory(gitname).catch(err => {
    console.log(err);
  });
};
