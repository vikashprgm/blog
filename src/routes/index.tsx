import { createFileRoute, Link, useLoaderData} from '@tanstack/react-router'
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dashboard } from '@/components/dashboard';
import { getCurrentUserFn } from '@/utils/auth';
import { LoginForm } from '@/components/login-form';

export const Route = createFileRoute('/')({ 
  loader : async () => {
    const isloggedin = await getCurrentUserFn()
    return {isloggedin}
  },
  component: App
})

function App() {
  const {isloggedin} = Route.useLoaderData();
  return (
     <div className="flex flex-col min-h-screen w-full items-center pt-10 px-4 md:pt-20">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <Tabs>
          <TabsList defaultValue="home" className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>
          <div>
            <TabsContents>
              <TabsContent value='home'>
                Home
              </TabsContent>
              <TabsContent value='photos'>
                Photos
              </TabsContent>
              <TabsContent value='dashboard'>
                {isloggedin ? (<Dashboard/>) : (<LoginForm/>)}
              </TabsContent>
            </TabsContents>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
