import { getCurrentUserFn } from '@/utils/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad : async ({location}) =>{
    const user = await getCurrentUserFn()
    if(!user){
      throw redirect({
        to : '/login',
        search : {redirect : location.href},
      })
    }
    else console.log(user)
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
