
"use client"
import LoginForm from "./_Form"
import AuthFormLayout from "../_components/Auth/AuthFormLayout"
import { ChangeEventHandler, useCallback, useContext, useState } from "react"
import useAxios, { RequestBody } from "../_hooks/useAxios"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import localforage from "localforage"
import { UserContext } from "../_providers/UserProvider"
import { AuthContext } from "../_providers/AuthContext"


export default function Login() {
  const router = useRouter()
  const toast = useToast({ containerStyle: { fontSize: "1.6rem", color: "white" }, position: "top" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string[]>([])
  const [loginData, setLoginData] = useState<{email: string, password: string, keepSignedIn: boolean}>({
    email: "",
    password: "",
    keepSignedIn: false
  })
  const { fetchData } = useAxios()

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setLoginData((prev) => ({...prev, [e.target.name]: value}))
  }, [])

  const { updateUser } = useContext(UserContext)
  const { updateToken } = useContext(AuthContext)

  const handleSubmit = useCallback(async () => {
    const invalids = ["email", "password"].filter(it => Boolean(loginData[it as keyof typeof loginData]) === false) 
    if(invalids.length > 0){
      setError(invalids)
      return
    }
    setLoading(true)
    const res = await fetchData({ 
      url: "/users/login", 
      body: { ...loginData, emailOrUserName: loginData.email } as RequestBody, 
      method: "post" 
    })
    if(res.statusCode === 302){
      sessionStorage.setItem("unverifiedEmail", loginData.email)
      router.push("/signup")
    }else if(res.statusCode === 200){
      if(loginData.keepSignedIn){
        updateToken(res.token, false)
        updateUser(res.user, false)
        // localforage.setItem("RF_TOKEN", res.token)
        // localforage.setItem("RF_USER", res.user)
      }else{
                updateToken(res.token, true)
                updateUser(res.user, true)
        // sessionStorage.setItem("RF_TOKEN", JSON.stringify(res.token))
        // sessionStorage.setItem("RF_USER", JSON.stringify(res.user))
      }
      toast({ status: "success", description: "You are signed in" })
      router.push("/")
    }else toast({ status: "error", description: res.message || "Something went wrong" })
    setLoading(false)
  }, [fetchData, loginData, router, toast])

  return (
    <>
      <AuthFormLayout loading={loading} handleSubmit={handleSubmit} heading="Sign In" mode="signin" submitButtonText="continue">
        <LoginForm error={error} handleChange={handleChange} loginData={loginData} />
      </AuthFormLayout>
    </>
  )
}