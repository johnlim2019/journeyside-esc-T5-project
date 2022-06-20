import SplashPage from './SplashPage/SplashPage';
import SearchResults from './SearchResults/SearchResults';
import RoomDetails from './HotelsPage/pages/RoomDetails';
import BookingData from './HotelsPage/pages/BookingData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './services/store';
import { debounce } from 'debounce';
import { saveState } from './Browser-Storage';
function App() {
    store.subscribe(
        debounce(() => {
            saveState(store.getState());
        }, 800)
    );
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path='/SearchResults' element={<SearchResults />} />
                    <Route path="/RoomDetails" element={<RoomDetails/>}/>
                    <Route path='/booking' element={<BookingData/>}/>
                </Routes>
            </Router>
        </>

            );
} export default App;
