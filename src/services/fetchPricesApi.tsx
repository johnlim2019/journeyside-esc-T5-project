import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelPricesApi = createApi({
    reducerPath: "hotelPricesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ascendahotels.mocklab.io/api/destinations/" }),
    endpoints:(builder) => ({
        hotelPrices: builder.query({
            query: (destination_id) => `/${destination_id}/prices`,
        })
    })
})

export const { useHotelPricesQuery } = hotelPricesApi;