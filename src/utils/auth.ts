import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { useAppSession } from './session';
import z from 'zod';

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {

    const m=process.env.ADMIN_EMAIL
    const p=process.env.ADMIN_PASS
    
    if(data.email!=m || data.password!=p){
      return { error: 'Invalid credentials' }
    }

    // Create session
    const session = await useAppSession()
    await session.update({
      email: data.email,
    })
    return { success: true}
  })

// Logout server function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  throw redirect({ to: '/' })
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const userId = session.data.email

    if (!userId) {
      return false;
    }

    return true;
  },
)