import axiosFetcher from "@/app/_utils/axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserMessages = createAsyncThunk(
  "messages/fetchUserMessages",
  async (conversationId: string) => {
    const response = await axiosFetcher({
      url: `/messages/${conversationId}`,
      method: "get",
    })
    return {
      messages: response.statusCode === 200 ? response.messages : [],
      statusCode: response.statusCode,
      conversationId,
    }
  }
)
