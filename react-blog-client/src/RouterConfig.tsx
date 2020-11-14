import React, { lazy, Suspense } from "react";
import "./Layout.scss";
import ShortSentences from "./components/editor/ShortSentences";
import { Redirect, Route, routerRedux, Switch } from "dva/router";
import Home from "./views/home/Home";
import Footer from "./views/home/Footer";
import NavHead from "./views/nav-head/NavHead";
import Loading from "./views/Loading/index";
import Loader from "./views/Loading/index";
// import TechnicalArticles from "./views/technical-articles/Index";
// import About from "./views/About";
// import MessageBoard from "./views/message/MessageBoard";
// import MoodEssay from "./views/mood-essay/MoodEssay";
// import Back from "./views/background/BackLoader";
// import Detail from "./views/detail/Detail";
// import Register from "./views/login/Register";
// import Book from "./views/book/BookLoader";
// import Login from "./views/login/Login";
// import Person from "./views/nav-head/Person";
const TechnicalArticles = lazy(() => import("./views/technical-articles/Index"));
const Detail = lazy(() => import("./views/detail/Detail"));
const Register = lazy(() => import("./views/login/Register"));
const MessageBoard = lazy(() => import("./views/message/MessageBoard"));
const Back = lazy(() => import("./views/background/Index"));
const About = lazy(() => import("./views/About"));
const MoodEssay = lazy(() => import("./views/mood-essay/MoodEssay"));
const Login = lazy(() => import("./views/login/Login"));
const Book = lazy(() => import("./views/book/Book"));
const Person = lazy(() => import("./views/nav-head/Person"));

interface IAppProps {
    history: any
}

const App: React.FC<IAppProps> = ({ history }) => {
    return (
        <routerRedux.ConnectedRouter history={history}>
            <>
                <NavHead />
                <div className="layout-container">
                    <div className="main">
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route path={"/home"} component={Home} />
                                <Route path={"/technical-articles"} component={() => <TechnicalArticles />} />
                                <Route path={"/about"} component={() => <About />} />
                                <Route path={"/message-board"} component={() => <MessageBoard />} />
                                <Route path={"/short-sentences"} component={() => <ShortSentences />} />
                                <Route path={"/mode-essay"} component={() => <MoodEssay />} />
                                <Route path={"/back"} component={() => <Back />} />
                                <Route path={"/detail/:id"} component={() => <Detail />} />
                                <Route path={"/book"} component={() => <Book />} />
                                <Route path={"/login"} component={() => <Login />} />
                                <Route path={"/register"} component={() => <Register />} />
                                <Route path={"/person"} component={() => <Person />} />
                                <Route path={"/loader"} component={() => <Loader />} />
                                <Redirect to={"/home"} />
                            </Switch>
                        </Suspense>
                    </div>
                    <Footer></Footer>
                </div>
                {/* /.container */}
                {/* /.main */}
            </>
        </routerRedux.ConnectedRouter>
    );
};

export default App;
