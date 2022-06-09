import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
//import { Provider } from 'react-redux';
//import store from './store';
import { SnackbarProvider } from 'notistack';
// dashboard chart style
import { BaseOptionChartStyle } from './components/Home/Dashboard/chart/BaseOptionChart';
// theme
import ThemeProvider from './theme';
import axios from 'axios';
//20220512롤백 이후로 깃헙에 sever/hufs 업로드안되어 있어 코드 공유가 안되어 있고 개인컴에서 api 확인 못함
// axios.defaults.baseURL = 'http://localhost:3000'; // 내꺼 개인컴 서버
axios.defaults.baseURL = 'http://15.165.215.193';
//axios.defaults.baseURL = 'http://112.169.87.213:3000';
// 리소스 접근 허용
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// 서로 다른 도메인간 쿠키 전달 허용
// axios.defaults.withCredentials = true;
ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <HelmetProvider>
        <Router>
          <ThemeProvider>
            <BaseOptionChartStyle />
            <App />
          </ThemeProvider>
        </Router>
      </HelmetProvider>
    </SnackbarProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
