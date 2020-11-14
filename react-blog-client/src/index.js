// import React from 'react';
import App from "./RouterConfig";
import dva from "dva";
import studentModel from "./models/student";
import sentencesModel from "./models/sentences";
import blogModel from "./models/blog";
import userModel from "./models/user";
import { createHashHistory } from "history";
const app = dva({
  history: createHashHistory()
});
app.model(studentModel);
app.model(sentencesModel);
app.model(blogModel);
app.model(userModel);
app.router(App);
app.start("#root");
