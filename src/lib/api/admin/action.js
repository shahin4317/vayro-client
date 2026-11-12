'use server'

import { serverMutation } from "../server"

export const addNevigation = async(data) =>{
    const resdata = await serverMutation ('/api/categories', 'POST', data)
    return resdata
  
}