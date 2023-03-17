import baseAxios from './clientAPI'

const authApi = {
  userSignin(credenticals = {}){
    const url = '/auth/signin'
    return baseAxios.post(url, credenticals)
  },
}

export default authApi
