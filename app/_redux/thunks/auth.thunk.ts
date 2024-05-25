import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const response = await axiosFetcher({
      url: "/users/me",
      method: "get",
    })
    console.log(response)
    return {
      user: response.user || null,
      statusCode: response.statusCode,
    }
  }
)
