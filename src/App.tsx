import SplashPage from './SplashPage/SplashPage';
import SearchResults from './SearchResults';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SplashPage/>}/>
                    <Route path='/SearchResults' element={<SearchResults />} />
                </Routes>
            </Router>

        </>

    );
} export default App;
