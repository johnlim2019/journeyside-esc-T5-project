import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export async function refreshAccessToken() {
    await axios.get("https://ascendas-userdata-server.herokuapp.com/api/users/token-refresh", {withCredentials: true}
    ).then((response) => {
        const data = response.data as object[];
        console.log(data);
    }).catch(errors => {
        console.error(errors);
        alert("failed to refresh token");
    });
}