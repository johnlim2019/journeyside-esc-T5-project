import SearchWrapper from './SearchItem/SearchWrapper';
import SearchBar from './SearchBar/SearchBar';

function App() {
    return (
        <>
            <div style={{  position: 'sticky',top: 0, zIndex:2, width:'100%'}}>
                <SearchBar />
            </div>
            <SearchWrapper />
        </>

    );
} export default App;
