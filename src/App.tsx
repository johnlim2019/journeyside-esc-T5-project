import SplashPage from './features/1_DestinationSearch/SplashPage';
import SearchResults from './features/2_SearchResults/SearchResults';
import RoomDetails from './features/3_RoomDetails/RoomDetails';
import BookingData from './features/4_BookingData/BookingData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './services/store';
import { debounce } from 'debounce';
import { saveState } from './Browser-Storage';
function App() {
    store.subscribe(
        debounce(() => {
            saveState(store.getState());
        }, 5000)
    );
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path='/SearchResults' element={<SearchResults />} />
                    <Route path="/RoomDetails" element={<RoomDetails/>}/>
                    <Route path='/BookingData' element={<BookingData/>}/>
                </Routes>
            </Router>
        </>

            );
} export default App;
