import React, { useState } from "react";
import "./register.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { register } from "../../api/user";
import { withRouter } from "dva/router";
function Register(props: any) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [gender, setGender] = useState("男");
    return (
        <div className={"register"}>
            <ArrowLeftOutlined style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                fontSize: "30px",
                fontWeight: "bold",
                color: "#f90"
            }} onClick={() => {
                props.history.push("/login");
            }} />
            <div className="title">注册</div>
            <div className="form">
                <div className={"item"}>
                    <label>
                        <span>请输入用户名：</span>
                        <input placeholder={"请输入您的昵称"} value={userName}
                            onChange={event => setUserName(event.target.value)} type="text" />
                    </label>
                </div>
                <div className={"item"}>
                    <label>
                        <span>请输入密码：</span>
                        <input placeholder={"请输入您的密码"} value={password}
                            onChange={(event => setPassword(event.target.value))} type="password" />
                    </label>
                </div>
                <div className={"item"}>
                    <label>
                        <span>请确认密码：</span>
                        <input placeholder={"请确认您的密码"} value={confirm}
                            onChange={(event => setConfirm(event.target.value))} type="password" />
                    </label>
                </div>
                <div className={"item"}>
                    <label style={{ marginRight: "30px" }}>
                        <span>男：</span>
                        <input value={gender} onChange={() => {
                            setGender("男");
                        }} name={"sex"} type="radio" />
                    </label>
                    <label style={{ marginRight: "30px" }}>
                        <span>女：</span>
                        <input value={gender} onChange={() => {
                            setGender("女");
                        }} name={"sex"} type="radio" />
                    </label>
                </div>
                <div className={"btn"} style={{ textAlign: "center" }}>
                    <Button onClick={() => {
                        if (password !== confirm) {
                            message.error("两次密码输入不一致", .6);
                            return;
                        }
                        const params = { name: userName, password, gender, avatar_url: undefined };
                        register(params).then((res: any) => {
                            message.success("注册成功，去登录吧！", .3);
                            props.history.push("/login");
                        }).catch(error => {
                            message.error("注册失败，可能用户名已经存在！", 1);
                        });
                    }}>注册</Button>
                </div>
            </div>
            {/* /.form */}
            {/* /.title */}
        </div>
    );
}

export default withRouter(Register);