import { lazy, Suspense } from 'react';
import { Loader } from '@mantine/core';
const OtherComponent = lazy(() => import('./SearchItem'));


function SearchWrapper() {
  return (
    <>
      <Suspense fallback={<div style={{ margin: "auto", width: "5em" }}><Loader /></div>}>
        <OtherComponent />
      </Suspense>
    </>
  )
} export default SearchWrapper;