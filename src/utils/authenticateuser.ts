import { createServerFn } from "@tanstack/react-start";
import {z} from 'zod'

//in-case direct req is sent to backend
const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const authenticate = createServerFn({method: 'POST'})
    .inputValidator(loginSchema)
    .handler(async({data})=>{
        const m=process.env.ADMIN_EMAIL
        const p=process.env.ADMIN_PASS
        if(data.email===m && data.password===p){
            return { success : true }
        }
        else return {success : false}
})