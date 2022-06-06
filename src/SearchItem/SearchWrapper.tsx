import { lazy } from 'react';
const OtherComponent = lazy(() => import('./SearchItem'));


function SearchWrapper() {
  return (
    <>
        <OtherComponent />
    </>
  )
} export default SearchWrapper;