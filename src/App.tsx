import SplashPage from './features/1_DestinationSearch/SplashPage';
import SearchResults from './features/2_SearchResults/SearchResults';
import RoomWrapper from './features/3_RoomDetails/RoomWrapper';
import BookingDataWrapper from './features/4_BookingData/BookingDataWrapper';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './services/store';
import { debounce } from 'debounce';
import { saveSession, saveState } from './Browser-Storage';
import UserProfileWrapper from './features/5_UserProfile/UserProfileWrapper';
import { Helmet } from 'react-helmet'
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
        <Helmet>
            <title>Journeyside</title>
            <meta name='description' content='Term 5  SUTD ESC Project'></meta>
            <meta name='author' content='Lawrence, Yongjie, John, Shaun, Jon-Taylor'></meta>
            <meta name='viewport' content='width=device-width, intial-scale=1.0'></meta>
            <meta property='og:title' content='Journeyside'/>
            <meta property='og:description' content='SUTD ESC Project by Lawrence, Yongjie, John, Shaun, Jon-Taylor'/>
            <meta property='og:image' content='./logoLarge.png'/>
            <meta property='og:type' content='website'/>
            <meta property='og:locale' content='en_GB'/>
            <link rel='icon' type='image/icon-x' href='./favicon.ico'></link>
        </Helmet>
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
