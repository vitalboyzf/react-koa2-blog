import React, { useState } from "react";
import { Button, message } from "antd";
import { login } from "../../api/user";
import { connect } from "dva";
import "./login.scss";
import { withRouter } from "dva/router";
function Login(props: any) {
    const [userName, setUserName] = useState("");
    const [pwd, setPwd] = useState("");
    return (

        <div className="login">
            <div className="title">
                登录
            </div>
            <div className="form">
                <div className="item">
                    <label>
                        <span>请输入用户名：</span>
                        <input placeholder={"请输入您的昵称"} type="text" value={userName} onChange={(e) => {
                            setUserName(e.target.value);
                        }} />
                    </label>
                </div>
                <div className="item">
                    <label>
                        <span>请输入密码：</span>
                        <input placeholder={"请输入您的密码"} type="password" value={pwd} onChange={(e) => {
                            setPwd(e.target.value);
                        }} />
                    </label>
                </div>
            </div>
            {/* /.form */}

            <div className="btn">
                <Button style={{
                    backgroundColor: "#f90",
                    color: "#fff",
                    width: "80%"
                }} onClick={() => {
                    login(userName, pwd).then((res: any) => {
                        if (res.status === 200) {
                            props.history.push("/home");
                            props.getUser();
                        }
                        message.success(res.message, .3);
                    });
                }}>登录</Button>
                <Button style={{
                    backgroundColor: "#0f0",
                    color: "#fff",
                    width: "80%",
                    marginTop: "20px"
                }}
                    onClick={() => {
                        props.history.push("/register");
                    }}
                >注册</Button>
            </div>
        </div>
    );
}

export default withRouter(connect(undefined, (dispatch: any) => {
    return {
        getUser() {
            return dispatch({ type: "user/asyncGetUser" });
        }
    };
})(Login));
