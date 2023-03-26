import baseAxios from './clientAPI'

const candidateApi = {
  create(body){
    const uri = '/candidate'
    return baseAxios.post(uri, body)
  },
  update(id, body){
    const uri = `/candidate/candidate/${id}`
    return baseAxios.post(uri, body)
  },
  getbyId(id){
    const uri = `/candidate/candidate/${id}`
    return baseAxios.get(uri)
  },
  getAll(page, perPage){
    const uri = `/candidate/candidates?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  },
  search(email, page, perPage) {
    const uri = `/candidate/search/${email}?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  }
}

export default candidateApi
