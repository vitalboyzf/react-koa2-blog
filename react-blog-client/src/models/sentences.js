import {deleteSentences, getSentences} from '../api/shortSentences'

export default {
    namespace: 'sentences',
    state: [],
    reducers: {
        sentences(state, {payload}) {
            // 保存数据到 state
            return payload;
        },
    },
    effects: {
        * querySentences({payload}, {put, call}) {
            const result = yield call(getSentences)
            if (result.status === 200) {
                yield put({type: "sentences", payload: result.data})
            }
        },
        * deleteSentences({payload: id}, {put, call}) {
            const result = yield call(deleteSentences, id)
            if (result.status === 200) {
                yield put({type: "querySentences"})
                return result.message
            }
        },
    },
    subscriptions: {
        init({history, dispatch}) {
            dispatch({type: "querySentences"})
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            // return history.listen(({ pathname }) => {
            //     if (pathname === '/') {
            //         dispatch({ type: 'load' });
            //     }
            // });
        },
    },
};