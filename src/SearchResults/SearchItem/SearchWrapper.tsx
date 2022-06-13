import { lazy, Suspense } from 'react';
import {Loader, Center} from '@mantine/core';
const OtherComponent = lazy(() => import('./SearchItem'));


function SearchWrapper() {
  return (
    <>
    <Suspense fallback={
      <Center style={{
        position:'absolute',
        height:'100%',
        width:"100%",
        top:0,
        left:0
      }}><Loader/>
      </Center>
    }>
        <OtherComponent />
    </Suspense>
    </>
  )
} export default SearchWrapper;