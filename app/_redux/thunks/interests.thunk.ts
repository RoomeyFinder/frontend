import STORAGE_KEYS from "@/app/STORAGE_KEYS"
import Interest from "@/app/_types/Interest"
import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import localforage from "localforage"

export const fetchUsersInterests = createAsyncThunk(
  "interests/fetchUsersInterests",
  async () => {
    const response = await axiosFetcher({
      url: "/interests/me",
      method: "get",
    })
    const storedListings = await localforage.getItem(
      STORAGE_KEYS.RF_USER_LISTINGS
    )
    return {
      interests:
        response.statusCode === 200 ? response.interests : storedListings || [],
      statusCode: response.statusCode,
    }
  }
)

export const acceptInterest = createAsyncThunk(
  "interests/acceptInterest",
  async (interest: Interest, { rejectWithValue }) => {
    try {
      const response = await axiosFetcher({
        url: `/interests/${interest._id}`,
        method: "put",
        body: { accepted: true },
      })
      if (response.statusCode === 200 && response.interest) {
        return {
          interest: response.interest,
          statusCode: response.statusCode,
        }
      } else return rejectWithValue("Unexpected response format")
    } catch (error) {
      console.error("Error accepting interest:", error)
      if ((error as any)?.response)
        return rejectWithValue(
          (error as any)?.response?.data?.message || "Server Error"
        )
      else if ((error as any)?.request)
        return rejectWithValue("No response received from server")
      else
        return rejectWithValue(
          (error as any).message || "Error in request setup"
        )
    }
  }
)
export const declineInterest = createAsyncThunk(
  "interests/declineInterest",
  async (interest: Interest, { rejectWithValue }) => {
    try {
      const response = await axiosFetcher({
        url: `/interests/${interest._id}`,
        method: "put",
        body: { declined: true },
      })
      if (response.statusCode === 200 && response.interest) {
        return {
          interest: response.interest,
          statusCode: response.statusCode,
        }
      } else return rejectWithValue("Unexpected response format")
    } catch (error) {
      console.error("Error accepting interest:", error)
      if ((error as any)?.response)
        return rejectWithValue(
          (error as any)?.response?.data?.message || "Server Error"
        )
      else if ((error as any)?.request)
        return rejectWithValue("No response received from server")
      else
        return rejectWithValue(
          (error as any).message || "Error in request setup"
        )
    }
  }
)
export const unsendInterest = createAsyncThunk(
  "interests/unsendInterest",
  async (interest: Interest, { rejectWithValue }) => {
    try {
      const response = await axiosFetcher({
        url: `/interests/${interest._id}`,
        method: "delete",
      })
      if (response.statusCode === 200 && response.interest) {
        return {
          interest: response.interest,
          statusCode: response.statusCode,
        }
      } else return rejectWithValue("Unexpected response format")
    } catch (error) {
      console.error("Error accepting interest:", error)
      if ((error as any)?.response)
        return rejectWithValue(
          (error as any)?.response?.data?.message || "Server Error"
        )
      else if ((error as any)?.request)
        return rejectWithValue("No response received from server")
      else
        return rejectWithValue(
          (error as any).message || "Error in request setup"
        )
    }
  }
)
