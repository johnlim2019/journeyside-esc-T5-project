import { createSlice } from "@reduxjs/toolkit";
import { RootState} from "./store";

interface selectedHotel {
    isLoading:boolean,
    sortBy:string,
    roomsList:any[]
}
interface selectedRoom {
    type:string,
    description:string,
    images: string[],
    key: string,
    free_cancellation: boolean,
    price: number,
    points: number,
    breakfastInfo: string
}
const initialState:selectedHotel = {
    isLoading:false,
    sortBy:"price",
    roomsList:[]
}

export const selectedHotelSlice = createSlice({
    name: 'selectedHotel',
    initialState: initialState,
    reducers: {
        compileRoomData: (state,action) => {
            let compiled:any = {};
            action.payload.data.rooms.forEach((room:any) => {
                if(compiled.hasOwnProperty(room.type)){
                    compiled[room.type].subtypes.push({
                        key: room.key,
                        free_cancellation: room.free_cancellation,
                        price: room.price,
                        points: room.points,
                        breakfastInfo: room.roomAdditionalInfo?.breakfastInfo
                    })
                } else {
                    compiled[room.type] = {
                        description: room.roomNormalizedDescription,
                        images: room.images,
                        subtypes: [
                            {
                                key: room.key,
                                free_cancellation: room.free_cancellation,
                                price: room.price,
                                points: room.points,
                                breakfastInfo: room.roomAdditionalInfo?.breakfastInfo
                            }
                        ]
                    }
                }
            })

            state.roomsList = compiled;
        },
        setLoading: (state,action) => {
            // console.log("loading "+action.payload.loading);
            state.isLoading = action.payload.loading;
        },
        selectRoom: (state,action) => {
            
        }
    }
});

export const { compileRoomData, setLoading } = selectedHotelSlice.actions;
export default selectedHotelSlice.reducer;