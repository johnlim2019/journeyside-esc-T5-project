import SplashPage from './features/1_DestinationSearch/SplashPage';
import SearchResults from './features/2_SearchResults/SearchResults';
import RoomWrapper from './features/3_RoomDetails/RoomWrapper';
import BookingDataWrapper from './features/4_BookingData/BookingDataWrapper';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './services/store';
import { debounce } from 'debounce';
import { saveSession, saveState } from './Browser-Storage';
import UserProfileWrapper from './features/5_UserProfile/UserProfileWrapper';
const SEARCHBARKEY = "SearchBarSlice";
const USERDETAILSKEY = "UserDetailsReducer";
const ROOMKEY = "RoomDetailsSlice";

function App() {
    store.subscribe(
        debounce(() => {
            saveState(store.getState().SearchBarReducer,SEARCHBARKEY);
            saveState(store.getState().RoomDetailReducer,ROOMKEY)
            saveSession(store.getState().UserDetailsReducer,USERDETAILSKEY);
        }, 1000)
    );
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path='/SearchResults' element={<SearchResults />} />
                    <Route path="/RoomDetails" element={<RoomWrapper/>}/>
                    <Route path='/BookingData' element={<BookingDataWrapper/>}/>
                    <Route path='/UserProfile' element={<UserProfileWrapper/>}/>

                </Routes>
            </Router>
        </>

            );
} export default App;
