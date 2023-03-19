import baseAxios from './clientAPI'

const authApi = {
  userLogin(body){
    const uri = '/auth/login'
    return baseAxios.post(uri, body) 
  },
  userRegister(body){
    const uri = '/auth/register'
    return baseAxios.post(uri, body)
  }
}

export default authApi
