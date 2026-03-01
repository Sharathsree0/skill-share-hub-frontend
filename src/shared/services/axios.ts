import axios from 'axios'

const api = axios.create({
  baseURL : import.meta.env.VITE_BACKEND_URL,
  withCredentials : true
});

api.interceptors.response.use(
  (res)=>res,
  async(error)=>{
    const originalRequest = error.config ;

    // if(originalRequest.url === "/auth/refresh"){
    //   return Promise.reject(error);
    // }
    if(
      error.response?.status === 401 && !originalRequest._retry
    ){
      originalRequest._retry = true ;
      try{
        await api.post("/auth/refresh");
        return api(originalRequest);
      }catch(refreshError){
        console.log("Session expired");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  })

export default api