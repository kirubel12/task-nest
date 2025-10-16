"use client"

import Link from "next/link"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from 'react-toastify'

import { signIn } from "@/lib/auth-client"
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
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

type FormData = z.infer<typeof formSchema>

export function SignInForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      
        const { data, error } = await signIn.email({
          email: values.email,
          password: values.password,
          callbackURL: redirectTo,
        },
        {
          onRequest: ()=> {
            toast.dismiss()
            toast.loading("Signing in...",{theme: "colored"})
          },
          onSuccess: ()=> {
            toast.dismiss()
            toast.success("Welcome back! You have been signed in successfully.")
            router.push(redirectTo)
          },
          onError: ({error})=> {
            toast.dismiss()
            toast.error(error.message)
          }
        })


    })
  })


  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="your-email@example.com"
              disabled={isPending}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <FieldError id="email-error">{errors.email.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              {...register("password")}
              id="password"
              type="password"
              disabled={isPending}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <FieldError id="password-error">{errors.password.message}</FieldError>
            )}
          </Field>

          {errors.root && (
            <FieldError className="text-center">{errors.root.message}</FieldError>
          )}

          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
            <FieldDescription className="mt-4 text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
    </Card>
  )
}