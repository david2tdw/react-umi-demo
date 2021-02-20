import request from 'umi-request'


export const fetchTree = async function (payload) {
  return request(`/api/treePage`, {
    ...payload,
  })
}