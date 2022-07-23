import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './services/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <head>
      <meta property='og:title' content='Journeyside' />
      <meta property='og:description' content='SUTD ESC Project by Lawrence, Yongjie, John, Shaun, Jon-Taylor' />
      <meta property='og:image' content='./logoLarge.png' />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_GB' />
      <meta property="og:url" content="https://journeyside.web.app/" />
    </head>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
