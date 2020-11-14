import React, { useEffect, useState } from "react";
import HeadCom from "../../components/head-com/HeadCom";
import "./Message.scss";
import { Button, Calendar, message } from "antd";
import { addMessage, queryRootMessageByPage, queryMessageByFatherId } from "../../api/message";
import { connect } from "dva";
import { carefulParseDate } from "../../components/util";
import ReviewMessage from "./ReviewMessage";
import Pager from "../../components/pager/Pager";
import { Spin } from "antd";
const bigScreen = window.matchMedia("(min-width:900px)");
function MessageBoard(props: any) {
    const [content, setContent] = useState("");
    const [rootMessage, setRootMessage] = useState([]);
    const [show, setShow] = useState(false);
    const [fatherMessage, setFatherMessage] = useState("");
    const [forceUpload, setForceUpload] = useState({});
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        queryRootMessageByPage(current, 5).then((res: any) => {
            if (res.status === 200) {
                setTotal(res.cont);
                const newArrPromise = res.data.map(async (item: any) => {
                    return await queryMessageByFatherId(item._id).then((res: any) => {
                        item.child = res;
                        return item;
                    });
                });
                Promise.all(newArrPromise).then((res: any) => {
                    setRootMessage(res);
                });
            }
        });
        // eslint-disable-next-line
    }, [show, forceUpload, current])
    const RootMessage = rootMessage.map((msg: any) => {
        if (msg.user === null) {
            msg.user = {
                name: "已经删除的用户",
                identity: "游侠"
            };
        }
        const msgChild = msg.child.map((item: any) => {
            if (item.user === null) {
                item.user = {
                    name: "已经删除的用户",
                    identity: "游侠"
                };
            }
            return <div key={item._id} style={{
                width: "95%", backgroundColor: "#eee",
                padding: "5px 20px",
                marginLeft: "30px",
                border: "1px solid #f90",
                borderRadius: "5px"
            }}>
                <div className="title">
                    <img src={item.user.avatar_url ? item.user.avatar_url : require("../detail/user.png")} alt="" />
                    <span>{item.user.name}
                        {item.user.identity === "超级管理员" ?
                            <b style={{ color: "#f40", marginLeft: "10px" }}>[{item.user.identity}]</b> :
                            <b style={{ color: "#f90", marginLeft: "10px" }}>[{item.user.identity}]</b>}
                        <span className={"date"}>{carefulParseDate(item.publish_date)}</span>
                    </span>
                </div>
                <div className="content">
                    <p>{item.content}</p>
                </div>
            </div>;
        });
       return <div className={"message-item"} key={msg._id}>
            <div className="title">
                <img src={msg.user.avatar_url ? msg.user.avatar_url : require("../detail/user.png")} alt="" />
                <span>{msg.user.name }
                    {msg.user.identity === "超级管理员" ?
                        <b style={{ color: "#f40", marginLeft: "10px" }}>[{msg.user.identity}]</b> :
                        <b style={{ color: "#f90", marginLeft: "10px" }}>[{msg.user.identity}]</b>}
                    <span style={{ marginLeft: "10px" }}
                        onClick={() => {
                            if (!props.user._id) {
                                message.warn("请先登录", .5);
                                return;
                            }
                            setShow(true);
                            setFatherMessage(msg._id);
                        }}
                    >回复</span>
                    <span className={"date"}>{carefulParseDate(msg.publish_date)}</span>
                </span>
            </div>
            <div className="content">
                <p>{msg.content}</p>
            </div>
            {msgChild}
        </div>;
    });
    if (bigScreen.matches) {
        return (
            <>
                <HeadCom title={"留言板"} content={"存在即合理"} />
                <div className="post">
                    <textarea placeholder={"嘿！留个言吧~~~"} style={{
                        padding: "10px",
                        boxShadow: "2px 3px 1px #888",
                        border: "1px solid #f90"
                    }} value={content} onChange={(e) => {
                        setContent(e.target.value);
                    }} name="" id="" cols={100} rows={5} />
                    <div style={{ width: "100%", textAlign: "right" }}>
                        <Button onClick={() => {
                            if (!props.user._id) {
                                message.warn("请先登录", .5);
                                return;
                            }
                            addMessage(content, props.user._id).then((res: any) => {
                                if (res.content) {
                                    setContent("");
                                    setForceUpload({});
                                    message.success("留言成功", .3);
                                } else {
                                    message.error("留言失败", .3);
                                }
                            });
                        }} type={"primary"}>发表留言</Button>
                    </div>
                    <div className="show-message">
                        <Spin tip="加载留言中~~~" spinning={total === 0}>
                            {RootMessage}
                        </Spin>
                        <Pager current={current} total={total} onChangePage={(index) => {
                            setCurrent(index);
                        }} />
                        <div className="site-calendar-demo-card">
                            <Calendar
                                fullscreen={false}
                                style={{
                                    width: " 270px",
                                    border: " 1px solid #f0f0f0",
                                    borderRadius: "2px",
                                    position: "absolute",
                                    top: "280px",
                                    right: "0"
                                }}
                                onPanelChange={(value, mode) => {
                                    // todo
                                }}
                            />
                        </div>
                        <div style={{
                            position: "absolute",
                            right: 0,
                            top: "650px",
                            width: "270px"
                        }}>
                            <img style={{ width: "100%" }} src={require("./1.jpg")} alt="" />
                        </div>
                        {show ? <ReviewMessage onCancel={() => {
                            setShow(false);
                        }}
                            onSendMessage={(content: string) => {
                                addMessage(content, props.user._id, fatherMessage).then((res: any) => {
                                    if (res.content) {
                                        message.success("发送成功", .3);
                                    } else {
                                        message.error("发送失败", .3);
                                    }
                                });
                                setShow(false);
                            }}
                        /> : null}
                    </div>
                    {/* /.show */}
                    {/* /# */}
                </div>
            </>
        );
    } else {
        return (
            <>
                <HeadCom title={"留言板"} content={"存在即合理"} />
                <div className="post">
                    <textarea placeholder={"嘿！留个言吧~~~"} style={{
                        padding: "1px",
                        boxShadow: "1px 2px 1px #888",
                        border: "1px solid #f90",
                        fontSize: "3.5vh"
                    }} value={content} onChange={(e) => {
                        setContent(e.target.value);
                    }} name="" id="" cols={30} rows={4} />
                    <div style={{ width: "100%", textAlign: "right" }}>
                        <Button size={"small"} onClick={() => {
                            if (!props.user._id) {
                                message.warn("请先登录", .5);
                                return;
                            }
                            addMessage(content, props.user._id).then((res: any) => {
                                if (res.content) {
                                    setContent("");
                                    setForceUpload({});
                                    message.success("留言成功", .3);
                                } else {
                                    message.error("留言失败", .3);
                                }
                            });
                        }} type={"primary"}>发表留言</Button>
                    </div>
                    <div className="show-message">
                        {RootMessage}
                        <Pager current={current} total={total} onChangePage={(index) => {
                            setCurrent(index);
                        }} />
                        <div style={{
                            right: 0,
                            top: "50vh",
                            width: "30vh"
                        }}>
                        </div>
                        {show ? <ReviewMessage onCancel={() => {
                            setShow(false);
                        }}
                            onSendMessage={(content: string) => {
                                addMessage(content, props.user._id, fatherMessage).then((res: any) => {
                                    if (res.content) {
                                        message.success("发送成功", .3);
                                    } else {
                                        message.error("发送失败", .3);
                                    }
                                });
                                setShow(false);
                            }}
                        /> : null}
                    </div>
                    {/* /.show */}
                    {/* /# */}
                </div>
            </>
        );
    }
}

export default connect((state: any) => {
    return {
        user: state.user
    };
})(MessageBoard);