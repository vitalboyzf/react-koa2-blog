import React from 'react';
import { NavLink, Redirect, Route, Switch, withRouter } from 'dva/router'
import SentencesManage from './Sentences'
import BlogManage from './BlogManage'
import EditBlog from '../../components/editor/Blog'
import EditSentences from '../../components/editor/ShortSentences'
import './index.scss'
import Message from "./Message";
import Comment from "./Comment";
import User from './User'
import { connect } from 'dva'

function Index(props: any) {
    if (props.user.identity !== "超级管理员") {
        props.history.replace('/home')
    }
    return (
        <div className={"back"}>
            <nav>
                <NavLink to={'/back/sentences'}>心情随笔</NavLink>
                <NavLink to={'/back/editSentences'}>写随笔</NavLink>
                <NavLink to={'/back/message'}>留言</NavLink>
                <NavLink to={'/back/comment'}>评论</NavLink>
                <NavLink to={'/back/user'}>用户</NavLink>
                <NavLink to={'/back/BlogManage'}>博文管理</NavLink>
                <NavLink to={'/back/EditBlog'}>写博文</NavLink>
            </nav>
            <Switch>
                <Route path={"/back/sentences"} component={SentencesManage} />
                <Route path={"/back/blogManage"} component={BlogManage} />
                <Route path={"/back/EditBlog"} component={EditBlog} />
                <Route path={"/back/editSentences"} component={EditSentences} />
                <Route path={"/back/message"} component={Message} />
                <Route path={"/back/comment"} component={Comment} />
                <Route path={"/back/user"} component={User} />
                <Redirect from={"/back"} to={"/back/sentences"} />
            </Switch>
        </div>
    );
}

export default withRouter(connect((state: any) => {
    return {
        user: state.user
    }
})(Index))