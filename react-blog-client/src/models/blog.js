import {deleteBlog, queryBlog, queryBlogByKey, queryBlogByPage} from '../api/blog'

export default {
    namespace: 'blog',
    state: [],
    reducers: {
        blog(state, {payload}) {
            return payload;
        },
    },
    effects: {
        * queryAllBlog({payload}, {put, call}) {
            const result = yield call(queryBlog)
            if (result.status === 200) {
                yield put({type: "blog", payload: result.data})
            }
        },
        * queryBlogByPage({payload = {page:1,limit:5}}, {put, call}) {
            const result = yield call(queryBlogByPage, payload.page, payload.limit)
            if (result.status === 200) {
                yield put({type: "blog", payload: result.data})
            }
        },
        * queryBlogByKey({payload}, {put, call}) {
            const result = yield call(queryBlogByKey, payload.title, payload.tags)
            if (result.status === 200) {
                yield put({type: "blog", payload: result.data})
            }
        },
        * deleteBlog({payload: id}, {put, call}) {
            const result = yield call(deleteBlog, id)
            if (result.status === 200) {
                yield put({type: "queryAllBlog"})
                return result.message
            }
        },
    },
    subscriptions: {
        init({history, dispatch}) {
            dispatch({type: "queryAllBlog"})
        },
    },
};