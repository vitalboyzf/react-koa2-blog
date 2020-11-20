import React, { useState } from "react";
import { NavLink, RouteComponentProps, withRouter } from "dva/router";
import "./index.scss";
import { connect } from "dva";
import { Button, message, Upload, Drawer } from "antd";
import { LoadingOutlined, PlusOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { login, updateUser } from "../../api/user";
let bigScreen = window.matchMedia("(min-width:960px)");
interface IProps extends RouteComponentProps {
    user: any,
    getUser: () => void
    delUser: () => void
}


function NavHead(props: IProps) {
    const [show, setShow] = useState(false);
    const [avatar_url, setAvatar_url] = useState(props.user.avatar_url);
    const [gender, setGender] = useState(props.user.gender);
    const [pwd, setPwd] = useState(props.user.password);
    const [identity, setIdentity] = useState(props.user.identity);
    const [name, setName] = useState(props.user.name);
    const [minHeadShow, setMinHeadShow] = useState(false);
    if (props.user.name !== name) {
        setName(props.user.name);
        setGender(props.user.gender);
        setPwd(props.user.password);
        setIdentity(props.user.identity);
        setAvatar_url(props.user.avatar_url);
    }
    const uploadButton = (
        <div>
            {props.user.avatar_url ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ backgroundColor: "#fff" }}>上传头像</div>
        </div>
    );
    if (bigScreen.matches) {
        return (
            <div className={"container"}>
                <div className={"nav-head"}>
                    <div className={"logo"}>
                        <img src={require("./nav-head.svg")} alt="" />
                        <span onClick={() => {
                            if (props.user.identity === "超级管理员") {
                                props.history.push("/back");
                            } else {
                                props.history.push("/home");
                            }
                        }}>张斐的个人博客</span>
                    </div>
                    <div className={"nav"}>
                        <NavLink to="/home">首页 </NavLink>
                        <NavLink to="/technical-articles">技术文章</NavLink>
                        <NavLink to="/book">读书</NavLink>
                        <NavLink to="/mode-essay">心情随笔</NavLink>
                        <NavLink to="/about">关于我</NavLink>
                        <NavLink to="/message-board">留言板</NavLink>
                    </div>

                    <div className="user">
                        <img style={{ backgroundColor: "#fff" }} onClick={() => {
                            // updateUser()
                        }} src={props.user.avatar_url ? props.user.avatar_url : require("../detail/user.png")} alt="" />
                        <span onClick={() => {
                            if (!props.user.name) {
                                props.history.push("/login");
                                return;
                            }
                            setShow(!show);
                        }}>{props.user.name ? "修改信息" : "点击登录"}</span>
                    </div>
                    {show ? <div style={{
                        backgroundColor: "rgba(0,0,0,.8)",
                        width: "400px",
                        height: "400px",
                        position: "absolute",
                        top: "60px",
                        left: "1010px"
                    }}>
                        <div
                            style={{
                                fontSize: "20px",
                                marginTop: "20px"
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
                            {avatar_url ?
                                <img style={{
                                    width: "40px"
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
                                    onChange={event => setGender("女")} />
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
                                            // props.getUser();
                                        }
                                    });
                                    message.success("修改成功", .3);
                                    setShow(false);
                                });
                            }} type={"primary"}>提交修改</Button>
                            <Button onClick={() => {
                                // token设置过期
                                // document.cookie = `token=;"max-age"=-1}`;
                                message.success("注销成功", .5);
                                setShow(false);
                                props.delUser();
                                props.history.push("/login");
                            }} danger style={{ marginLeft: "50px" }}>退出登录</Button>
                        </div>
                        <div>
                        </div>

                        {/* /.title */}
                    </div> : null}
                </div>
            </div>
        );
    } else {
        return <>
            <div style={{ width: "100%", height: "10vh", backgroundColor: "#222" }}>
                <Button type="dashed" style={{ height: "100%", fontSize: "3vh" }} onClick={() => {
                    setMinHeadShow(true);
                }}><MenuFoldOutlined /></Button>
                <span style={{ fontSize: "3vh", color: "#fff", marginLeft: "50px" }}>张斐的个人博客</span>
            </div>
            <Drawer
                title="导航栏"
                style={{ fontSize: "6vh" }}
                placement={"left"}
                closable={false}
                width={200}
                onClose={() => {
                    setMinHeadShow(false);
                }}
                visible={minHeadShow}
                key={"left"}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <NavLink style={{
                        fontSize: "20px",
                        fontWeight: "bold"
                    }} to="/home">首页 </NavLink>
                    <NavLink style={{
                        fontSize: "20px",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }} to="/technical-articles">技术文章</NavLink>
                    <NavLink style={{
                        fontSize: "20px",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }} to="/book">读书</NavLink>
                    <NavLink style={{
                        fontSize: "20px",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }} to="/mode-essay">心情随笔</NavLink>
                    <NavLink style={{
                        fontSize: "20px",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }} to="/about">关于我</NavLink>
                    <NavLink style={{
                        fontSize: "20px",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }} to="/message-board">留言板</NavLink>
                    <NavLink style={{
                        fontSize: "20px",
                        marginTop: "15px",
                        fontWeight: "bold"
                    }} to="/person">个人中心</NavLink>
                </div>
            </Drawer>
        </>;
    }
}

const mapStatesToProps = (state: any) => {
    return {
        user: state.user
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        getUser() {
            dispatch({ type: "user/getUser" });
        },
        delUser() {
            dispatch({ type: "user/delUser" });
        }
    };
};
export default withRouter(connect(mapStatesToProps, mapDispatchToProps)(NavHead));