import React, { useEffect, useState } from "react";
import { queryBlogById, updateBlog } from "../../api/blog";
import "./index.scss";
import { parseDate } from "../../components/util";
import { connect } from "dva";
import HeadCom from "../../components/head-com/HeadCom";
import BlogComment from "./BlogComment";
import { withRouter } from "dva/router";
const bigScreen = window.matchMedia("(min-width:960px)");
function Detail(props: any) {
    const [blog, setBlog] = useState({
        content: "",
        title: "",
        tags: "",
        publish_date: "",
        intro: "",
        views: ""
    });
    useEffect(() => {
        queryBlogById(props.match.params.id).then(res => {
            setBlog((prevBlog) => {
                return res.data;
            });
            setBlog((prevBlog: any) => {
                updateBlog(props.match.params.id, { views: prevBlog.views + 1 }).then(res => {
                    props.dispatch({ type: "blog/queryAllBlog" });
                });
                return prevBlog;
            });
        });
        // eslint-disable-next-line
    }, [props.match.params.id])
    return (
        <div className={"detail"} style={{ backgroundColor: "#fff", padding: "0px 15px" }}>
            <HeadCom title={"博文阅读"} content={"读万卷书，行万里路"} />
            <div className="title">
                {blog.title}
            </div>
            <div className="intro">
                {blog.intro}
            </div>
            <div className="content" dangerouslySetInnerHTML={{
                __html: blog.content
            }} />
            <div className={"footer"}>
                <span>
                    标签：<span style={{ color: "blue" }}>{blog.tags}</span>
                </span>
                <span style={{ marginLeft: "5vw" }}>热度：
                        <span style={{ color: "#f40" }}>
                        {blog.views}
                    </span>
                </span>
                {bigScreen.matches ? <span
                    style={{ marginLeft: "5vw", paddingRight: "5vw", boxSizing: "border-box" }}>
                    发布日期：
                    <span style={{ color: "#0f0" }}>
                        {parseDate(blog.publish_date)}
                    </span>
                </span> : null}
            </div>
            <BlogComment blogId={props.match.params.id} />
        </div>
    );
}

export default withRouter(connect()(Detail));