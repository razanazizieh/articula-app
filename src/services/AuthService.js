import { ApiConfig } from "../API/ApiConfig"

export const AuthService = {
    getCurrentUsrProfile: function( params = {}){
        
        const userId = params.userId
        const credentials = params.credentials
        const url = `${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}/${userId}?_format=json`
        console.log(url)
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic ' +  `${credentials}`
            }
        })
        .then((res)=>{
            console.log(res)
            if (!res.ok) {
                return res.json().then((serverError)=>{ throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })
    
    }
}
