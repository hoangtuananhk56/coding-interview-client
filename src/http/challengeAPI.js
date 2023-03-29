import baseAxios from './clientAPI'

const challengeAPI = {
  create(body){
    const uri = '/challenge'
    return baseAxios.post(uri, body)
  },
  update(id, body){
    const uri = `/challenge/challenge/${id}`
    return baseAxios.put(uri, body)
  },
  getbyId(id){
    const uri = `/challenge/challenge/${id}`
    return baseAxios.get(uri)
  },
  getAll(page, perPage){
    const uri = `/challenge/challenges?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  },
  search(title, page, perPage) {
    const uri = `/challenge/search/${title}?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  },
  deletebyId(id){
    const uri = `/challenge/challenge/${id}`
    return baseAxios.delete(uri)
  },
}

export default challengeAPI
