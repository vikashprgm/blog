import { createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Link to='/dashboard'>Take me to dashboard</Link>
      </div>
    </div>
  )
}
