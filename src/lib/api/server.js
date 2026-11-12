
import { baseUrl } from "./baseUrl";


export const serverMutation = async (path, method, data ) =>{
    const res = await fetch(`${baseUrl}${path}`,{
        method : method,
        headers : {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)

    })
    return res.json()
}