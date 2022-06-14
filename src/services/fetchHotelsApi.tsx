import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelsApi = createApi({
    reducerPath: "hotelsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "./" }),
    endpoints:(builder) => ({
        hotels: builder.query({
            query: (destination_id) => `${destination_id}.json`,
        })
    })
})

export const { useHotelsQuery } = hotelsApi;