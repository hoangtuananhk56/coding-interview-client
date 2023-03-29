import baseAxios from './clientAPI'

const examAPI = {
  create(body){
    const uri = '/exam'
    return baseAxios.post(uri, body)
  },
  update(id, body){
    const uri = `/exam/exam/${id}`
    return baseAxios.post(uri, body)
  },
  getbyId(id){
    const uri = `/exam/exam/${id}`
    return baseAxios.get(uri)
  },
  getAll(page, perPage){
    const uri = `/exam/exams?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  },
  search(title, page, perPage) {
    const uri = `/exam/search/${title}?page=${page}&perPage=${perPage}`
    return baseAxios.get(uri)
  }
}

export default examAPI
