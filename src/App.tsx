import SplashPage from './SplashPage/SplashPage';
import SearchResults from './SearchResults/SearchResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
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
                </Routes>
            </Router>
        </>

            );
} export default App;
