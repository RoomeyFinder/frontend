
"use client"
import LoginForm from "./_Form"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import { useCallback } from "react"


export default function Login() {
  const handleSubmit = useCallback(() => {
    console.log("submit login")
  }, [])
  return (
    <>
      <AuthFormLayout handleSubmit={handleSubmit} heading="Sign In" mode="signin" submitButtonText="continue">
        <LoginForm />
      </AuthFormLayout>
    </>
  )
}