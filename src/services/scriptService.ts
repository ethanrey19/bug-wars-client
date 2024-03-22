import axios from 'axios';

export default {
  async createNewScript(script: any) {
    return axios.post('/api/scripts', script);
  },

    async getAllScripts(){
        return axios.get('/api/scripts')
        .catch(error => {
            return Promise.reject(error);
        })},

    async updateScript(script: any, scriptId: string){
        return axios.put(`/api/scripts/${scriptId}`, script);},
    
    async deleteScriptById(scriptId: number) {
        return axios.delete(`/api/scripts/${scriptId}`);
    }

}