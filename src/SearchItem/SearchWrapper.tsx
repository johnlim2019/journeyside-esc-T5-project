import { lazy, Suspense } from 'react';
import {Loader, Center} from '@mantine/core';
const OtherComponent = lazy(() => import('./SearchItem'));


function SearchWrapper() {
  return (
    <>
    <Suspense fallback={
      <Center><Loader/></Center>
    }>
        <OtherComponent />
    </Suspense>
    </>
  )
} export default SearchWrapper;