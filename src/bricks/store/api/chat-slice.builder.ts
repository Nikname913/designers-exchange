import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getMessages: builder.query<any, any>({
      query: () => 'message-get'
    })
  })
})

export const { useGetMessagesQuery } = chatApi