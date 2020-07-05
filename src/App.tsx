import React from 'react';
import './App.css'
import Student from './views/student'
import Teacher from './views/Teacher'
import ShortSentences from './components/editor/ShortSentences'
import { Route, routerRedux } from 'dva/router';
// import Test from './Test'
import './api/shortSentences'
interface IAppProps {
  history: any
}
const App: React.FC<IAppProps> = ({ history }) => {
  return (
    <routerRedux.ConnectedRouter history={history}>
      <div>
        <ShortSentences></ShortSentences>
        <Route path={"/student"} component={Student} />
        <Route path={"/teacher"} component={Teacher} />
      </div>
    </routerRedux.ConnectedRouter>
  );
}

export default App;
