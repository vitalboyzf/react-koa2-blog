import { whoami } from "../api/user";
export default {
    namespace: "user",
    state: {},
    reducers: {
        getUser(state, { payload }) {
            const userInfo = payload;
            return userInfo || {};
        },
        delUser(state) {
            localStorage.removeItem("token");
            document.cookie = "token=; max-age=-1"
            return {};
        }
    },
    effects: {
        * asyncGetUser(rest, { call, put }) {
            try {
                const res = yield whoami();
                yield put({ type: "getUser", payload: res });
            } catch (error) {
                yield put({ type: "getUser", payload: null });
            }
        }
    },
    subscriptions: {
        async init({ dispatch, history }) {
            dispatch({ type: "asyncGetUser" });
        }
    }
};