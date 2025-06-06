import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './redux/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/saga-blue/theme.css'; // או כל theme אחר
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

reportWebVitals();
