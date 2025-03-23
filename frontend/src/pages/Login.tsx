"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"

import { useNavigate } from "react-router";
import { authActions } from "../lib/actions";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
  password: z.string()
})



export default function LoginPage() {

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await authActions.login(data)
    console.log("response", response)
    if (response.error) {
      setError(response.error)
    } else {
      navigate('/')
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-normal mb-6 text-center">Welcome to ShareMeal</h2>
        <Form {...form}>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className={`text-red-500 text-sm py-0 ${error ? "block" : "hidden"}`}>{error}</p>
            <Button type="submit" className="w-full bg-[#FE724C] hover:bg-[#fe724c]/90">
              Login
            </Button>
          </form>
        </Form>
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="px-4 ">or</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <Button onClick={() => navigate('/signup')} variant="outline" className="w-full">
          Signup
        </Button>
      </div>
    </div>
  );
}
