"use client"

import Link from "next/link"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { signUp } from "@/lib/auth-client"
import { toast } from 'react-toastify'
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
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password confirmation must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
})

type FormData = z.infer<typeof formSchema>

export function SignupForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
     
      const { data, error } = await signUp.email({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          callbackURL: "/sign-in",
        },
      {
        onRequest: ()=> {
          toast.dismiss()
          toast.loading("Creating account...")
        },
        onSuccess: ()=> {
          toast.dismiss()
          toast.success("Account created successfully!")
          router.push("/sign-in")
          values.name = ""
          values.email = ""
          values.password = ""
          values.passwordConfirmation = ""
          values.username = ""
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="John Doe"
                disabled={isPending}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <FieldError id="name-error">{errors.name.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...register("username")}
                id="username"
                type="text"
                placeholder="johndoe"
                disabled={isPending}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <FieldError id="username-error">{errors.username.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="your-email@example.com"
                disabled={isPending}
                aria-describedby={errors.email ? "email-error" : "email-description"}
              />
              <FieldDescription id="email-description">
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
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
                aria-describedby={errors.password ? "password-error" : "password-description"}
              />
              <FieldDescription id="password-description">
                Must be at least 8 characters long.
              </FieldDescription>
              {errors.password && (
                <FieldError id="password-error">{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input
                {...register("passwordConfirmation")}
                id="confirm-password"
                type="password"
                disabled={isPending}
                aria-describedby={
                  errors.passwordConfirmation
                    ? "password-confirmation-error"
                    : "password-confirmation-description"
                }
              />
              <FieldDescription id="password-confirmation-description">
                Please confirm your password.
              </FieldDescription>
              {errors.passwordConfirmation && (
                <FieldError id="password-confirmation-error">
                  {errors.passwordConfirmation.message}
                </FieldError>
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
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
              <FieldDescription className="mt-4 text-center">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
