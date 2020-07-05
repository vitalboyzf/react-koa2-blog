export default {
    namespace: 'student',
    state: 1,
    reducers: {
        add(state, { payload }) {
            // 保存数据到 state
            return state + payload;
        },
    },
    effects: {
        *save({ payload: todo }, { put, call }) {

        },
    },
    subscriptions: {
        setup({ history, dispatch }) {
            // 监听 history 变化，当进入 `/` 时触发 `load` action
            return history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({ type: 'load' });
                }
            });
        },
    },
};