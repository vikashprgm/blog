import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { authenticate } from './authenticateuser';
import { useAppSession } from './session';

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    // Verify credentials
    const res = await authenticate({data})

    if (!res.success) {
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
      return null
    }

    return 1;
  },
)