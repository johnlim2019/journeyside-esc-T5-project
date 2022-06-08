import SplashPage from './SplashPage/SplashPage';
import SearchResults from './SearchResults';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/SplashPage" element={<SplashPage/>}/>
                    <Route path='/SearchResults' element={<SearchResults />} />
                </Routes>
            </Router>

        </>

    );
} export default App;
