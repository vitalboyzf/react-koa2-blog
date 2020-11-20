import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "dva/router";
import "./index.scss";
import { connect } from "dva";
import { Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { login, updateUser } from "../../api/user";
interface IProps extends RouteComponentProps {
    user: any,
    asyncGetUser: () => void
    delUser: () => void
}

function Person(props: IProps) {
    const [avatar_url, setAvatar_url] = useState(props.user.avatar_url || "");
    const [gender, setGender] = useState(props.user.gender || "");
    const [pwd, setPwd] = useState(props.user.password || "");
    const [identity, setIdentity] = useState(props.user.identity || "");
    const [name, setName] = useState(props.user.name || "");
    // 如果用户未登录，跳转到登录页面
    if (!props.user._id) {
        props.history.push("/login");
    }
    const uploadButton = (
        <div>
            {props.user.avatar_url ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ backgroundColor: "#fff" }}>上传头像</div>
        </div>
    );
    return (
        <div style={{
            width: "100%",
            height: "400px",
            padding: "5vw 10vw"
        }}>
            <div
                style={{
                    fontSize: "20px",
                    marginTop: "20px",
                    textAlign: "center"
                }}
            >个人信息
                    </div>
            <Upload
                name="img"
                method={"POST"}
                action="http://49.232.250.47:2000/upload"
                onChange={(e) => {
                    if (e.file.response) {
                        setAvatar_url(e.file.response.url);
                    }
                }}
            >
                <span>头像：</span>
                {avatar_url ?
                    <img style={{
                        width: "40px",
                        textAlign: "center",
                        marginLeft: "1vw"
                    }} src={avatar_url} alt="avatar" /> : uploadButton}
            </Upload>
            <div style={{ marginTop: "20px" }}>
                <label>
                    <span>姓名：</span>
                    <input type="text" value={name} onChange={event => setName(event.target.value)} />
                </label>
            </div>
            <div style={{ marginTop: "20px" }}>
                <label>
                    <span>密码：</span>
                    <input type="password" value={pwd} onChange={event => setPwd(event.target.value)} />
                </label>
            </div>
            <div style={{ marginTop: "20px" }}>
                <label style={{ margin: "0 20px" }}>
                    <span style={{ margin: "0 10px" }}>男:</span>
                    <input type="radio" name={"gender"} value={gender} checked={gender === "男"}
                        onChange={event => setGender("男")} />
                </label>
                <label style={{ margin: "0 20px" }}>
                    <span style={{ margin: "0 10px" }}>女:</span>
                    <input type="radio" name={"gender"} value={gender} checked={gender === "女"}
                        onChange={event => {
                            setGender("女");
                        }} />
                </label>
            </div>
            <div style={{ marginTop: "20px" }}>
                <label>
                    <span>身份：</span>
                    <input type="text" disabled value={identity}
                        onChange={event => setIdentity(event.target.value)} />
                </label>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Button onClick={() => {
                    updateUser({ id: props.user._id, name, password: pwd, avatar_url, gender }).then(res => {
                        login(name, pwd).then((res: any) => {
                            if (res.status === 200) {
                                props.asyncGetUser();
                            }
                        });
                        message.success("修改成功", .3);
                    });
                }} type={"primary"}>提交修改</Button>
                <Button onClick={() => {
                    message.success("注销成功", .5);
                    props.delUser();
                    props.history.push("/login");
                }} danger style={{ marginLeft: "50px" }}>退出登录</Button>
            </div>
            <div>
            </div>

        </div>
    );
}
const mapStatesToProps = (state: any) => {
    return {
        user: state.user
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        asyncGetUser() {
            dispatch({ type: "user/asyncGetUser" });
        },
        delUser() {
            dispatch({ type: "user/delUser" });
        }
    };
};
export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(Person));