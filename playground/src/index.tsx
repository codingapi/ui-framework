import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CSSUtils, ThemeConfig, ThemeProvider} from "@codingapi/ui-framework";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = {
    token:{
        colorPrimary:CSSUtils.getRootVariable('--primary-color'),
        contentFontSize:CSSUtils.getRootVariable('--content-font-size'),
    }
} as ThemeConfig;

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
