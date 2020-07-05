// import React from 'react';
import App from './App';
import dva from 'dva'
import studentModel from './models/student'
import { createBrowserHistory } from 'history';
const app = dva({
  history: createBrowserHistory()
});
app.model(studentModel)
app.router(App);
app.start('#root')
