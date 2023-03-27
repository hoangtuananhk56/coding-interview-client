import baseAxios from './clientAPI'

const commentApi = {
  create(body){
    const uri = '/comment'
    return baseAxios.post(uri, body)
  },
  update(id, body){
    const uri = `/comment/comment/${id}`
    return baseAxios.post(uri, body)
  },
  getbyId(id){
    const uri = `/comment/comment/${id}`
    return baseAxios.get(uri)
  },
  getAll(id){
    const uri = `/comment/comments/${id}`
    return baseAxios.get(uri)
  },
  search(email, page, perPage) {
    const uri = `/comment/search/${email}?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  }
}

export default commentApi;
