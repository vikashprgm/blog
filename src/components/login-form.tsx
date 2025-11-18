import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import {useForm} from "@tanstack/react-form"
import { loginFn } from "@/utils/auth"
import { useRouter } from "@tanstack/react-router"

const formSchema = z.object({
  email : z
  .email(),
  password : z
  .string()
  .min(5,"Password must of at least 5 characters")  
})

export function LoginForm({className,...props}: React.ComponentProps<"div">){
  const route = useRouter()
  const form = useForm({
    defaultValues : {
      email: "",
      password: ""
    },
    validators : {
      onChange:formSchema,
      onSubmit:formSchema
    },
    onSubmit : async({value}) => {
      const res = await loginFn({data:value})
      if(res.success){
        route.navigate( {to : '/dashboard'})
      }
      else console.log(res.error)
    }
  })

    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            id="login-form"
            onSubmit={(e)=>{
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>

              <form.Field
                name="email"
                children={(field)=>{
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e)=>field.handleChange(e.target.value)}
                        type="email"
                        placeholder="m@example.com"
                        required
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (<FieldError errors={field.state.meta.errors} /> )}
                    </Field>
                  )
                }}
              />

              <form.Field
                name="password"
                children={(field)=>{
                  const isInvalid=field.state.meta.isTouched && !field.state.meta.isValid
                return(
                  <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input 
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e)=>field.handleChange(e.target.value)}
                      type="password"
                      placeholder="abcd"
                      required
                      aria-invalid={isInvalid}
                    />
                     {isInvalid && (<FieldError errors={field.state.meta.errors} /> )}
                  </Field>
                )
                }}
              />

              <Field>
                <Button type="submit" form="login-form">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
