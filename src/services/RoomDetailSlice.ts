import { createSlice } from "@reduxjs/toolkit";

interface selectedHotel {
    isLoading:boolean,
    roomsList:any[],
    roomsListRaw:any[],
    selectRoom:selectedRoom
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
    roomsList:[],
    roomsListRaw:[],
    selectRoom:{
        type:"",
        description:"",
        images:[],
        key:"",
        free_cancellation:false,
        price:0,
        points:0,
        breakfastInfo:""
    }
}

export const selectedHotelSlice = createSlice({
    name: 'selectedHotel',
    initialState: initialState,
    reducers: {
        compileRoomData: (state,action) => {
            let compiled:any = {};

            // Raw list of rooms before compilation
            state.roomsListRaw = action.payload.data.rooms;

            action.payload.data.rooms.forEach((room:any) => {
                if(compiled.hasOwnProperty(room.type)){
                    compiled[room.type].subtypes.push({
                        key: room.key,
                        free_cancellation: room.free_cancellation,
                        price: room.lowest_converted_price,
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
                                price: room.lowest_converted_price,
                                points: room.points,
                                breakfastInfo: room.roomAdditionalInfo?.breakfastInfo
                            }
                        ]
                    }
                }
            })

            // Room list compiled to be displayed
            state.roomsList = compiled;
        },
        setLoading: (state,action) => {
            state.isLoading = action.payload.loading;
        },
        selectRoom: (state,action) => {
            let selectedKey = action.payload.key;

            // Find the room in the raw data with the selected key
            for(let i = 0; i < state.roomsListRaw.length; i++){
                if(state.roomsListRaw[i]["key"] === selectedKey){
                    state.selectRoom = {
                        type: state.roomsListRaw[i].type,
                        key: selectedKey,
                        description: state.roomsListRaw[i].description,
                        images: state.roomsListRaw[i].images,
                        free_cancellation: state.roomsListRaw[i].free_cancellation,
                        price: state.roomsListRaw[i].lowest_converted_price,
                        points: state.roomsListRaw[i].points,
                        breakfastInfo: state.roomsListRaw[i].roomAdditionalInfo?.breakfastInfo
                    }
                    break;
                }
            }
        }
    }
});

export const { compileRoomData, setLoading, selectRoom } = selectedHotelSlice.actions;
export default selectedHotelSlice.reducer;