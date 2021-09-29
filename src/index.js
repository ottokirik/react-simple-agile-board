import { CssBaseline } from '@material-ui/core';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { RootStore } from 'store';
import App from './App';

const store = RootStore.create({});

export const StoreContext = createContext(store);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <CssBaseline />
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
