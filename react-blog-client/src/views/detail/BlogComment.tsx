import React, { useEffect, useState } from "react";
import { addComment, queryCommentByFatherId, queryRootComment } from "../../api/comment";
import { Avatar, Button, Comment, message } from "antd";
import { connect } from "dva";
import { carefulParseDate } from "../../components/util";
import ReviewComment from "./ReviewComment";
const bigScreen = window.matchMedia("(min-width:960px)");
function BlogComment(props: any) {
    const [comment, setComment] = useState([]);
    const [show, setShow] = useState(false);
    const [fatherComment, setFatherComment] = useState("");
    const [content, setContent] = useState("");
    const [upload, setUpload] = useState(true);
    useEffect(() => {
        queryRootComment(props.blogId).then((res: any) => {
            if (res.status === 200) {
                const renderPromise = res.data.map((item: any) => {
                    return queryCommentByFatherId(item._id).then((itemChild: any) => {
                        item.child = itemChild;
                        return item;
                    });
                });
                Promise.all(renderPromise).then((resultComment: any) => {
                    setComment(resultComment);
                });
            }
        });
    }, [props.blogId, upload]);
    const renderExample = comment.map((item: any) => {
        const itemChild = item.child.map((child: any) => {
            return <Comment
                key={child._id}
                author={<span>{child.user ? child.user.name : "被删除的用户"}</span>}
                avatar={
                    <Avatar
                        src={(child.user && child.user.avatar_url) || require("./user.png")}
                        alt="默认头像"
                    />
                }
                datetime={carefulParseDate(child.publish_date)}
                content={
                    <p>
                        {child.content}
                    </p>
                }
            />;
        });
        return <div key={item._id}>
            <Comment
                actions={[<span onClick={() => {
                    setFatherComment(item._id);
                    setShow(true);
                }} key="comment-nested-reply-to">回复</span>]}
                author={<span>{item.user ? item.user.name : "被删除的用户"}</span>}
                avatar={
                    <Avatar
                        src={(item.user && item.user.avatar_url) || require("./user.png")}
                        alt="默认头像"
                    />
                }
                datetime={carefulParseDate(item.publish_date)}
                content={
                    <p>
                        {item.content}
                    </p>
                }
            >
                {itemChild}
            </Comment>
            {show ? <ReviewComment onSendComment={(content: any) => {
                if (!props.user._id) {
                    message.warn("请先登录", .5);
                    return;
                }
                addComment(content, props.user._id, props.blogId, fatherComment).then(res => {
                    message.success("评论成功", .3);
                    setUpload(!upload);
                    setShow(false);
                });
            }} onCancel={() => {
                setShow(false);
            }} /> : null}
        </div>;
    });
    if (bigScreen.matches) {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <div style={{
                    fontSize: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #f90"
                }}>最新评论
                </div>
                {/* /.title */}
                {renderExample}
                <div className="post">
                    <textarea placeholder={"说说你的看法吧~~~"} style={{
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
                            addComment(content, props.user._id, props.blogId).then((res: any) => {
                                if (res.content) {
                                    setUpload(!upload);
                                    setContent("");
                                    message.success("留言成功", .3);
                                } else {
                                    message.error("留言失败", .3);
                                }
                            });
                        }} type={"primary"}>我也说说</Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <div style={{
                    fontSize: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #f90"
                }}>最新评论
                </div>
                {/* /.title */}
                {renderExample}
                <div className="post">
                    <textarea placeholder={"说说你的看法吧~~~"} style={{
                        padding: "10px",
                        boxShadow: "2px 3px 1px #888",
                        border: "1px solid #f90"
                    }} value={content} onChange={(e) => {
                        setContent(e.target.value);
                    }} name="" id="" cols={28} rows={5} />
                    <div style={{ width: "100%", textAlign: "right" }}>
                        <Button onClick={() => {
                            if (!props.user._id) {
                                message.warn("请先登录", .5);
                                return;
                            }
                            addComment(content, props.user._id, props.blogId).then((res: any) => {
                                if (res.content) {
                                    setUpload(!upload);
                                    setContent("");
                                    message.success("留言成功", .3);
                                } else {
                                    message.error("留言失败", .3);
                                }
                            });
                        }} type={"primary"}>我也说说</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect((state: any) => ({ user: state.user }))(BlogComment);

