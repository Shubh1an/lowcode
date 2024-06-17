import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import userstore from './redux/userstore';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={userstore}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
