import axios from "axios";


export default{

    async login(user: any) {
        try {
      return await axios.post('api/auth/login', user);
    } catch (error) {
      return await Promise.reject(error);
    }
      },

}