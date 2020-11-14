import React, { useEffect, useState } from "react";
import { NavLink } from "dva/router";
import PictureLink from "../../components/picture/PictureLink";
import { parseDate } from "../../components/util";
import { queryBlogByViews } from "../../api/blog";
import { Spin } from "antd";
import "./blog.scss";
let bigScreen = window.matchMedia("(min-width:960px)");
function BlogItem(props: any) {
    const [blog, setBlog] = useState([{
        views: "",
        _id: "",
        cover_picture: "",
        title: "",
        tags: "",
        intro: "",
        publish_date: ""
    }]);
    useEffect(() => {
        queryBlogByViews().then(res => {
            if (res.status === 200) {
                setBlog(res.data);
            }
        });
    }, []);
    let renderedItem;
    if (bigScreen.matches) {
        renderedItem = blog.map((item) => {
            return <div className="blog-item" key={item._id}>
                {item.cover_picture ? <PictureLink width={160} height={110} picture={item.cover_picture} /> : null}
                <div className={"show-main"}>
                    <div className={"title"}>{item.title}</div>
                    <div className={"intro"}>{item.intro}</div>
                    <div className={"footer"}>
                        <span>
                            标签：<span style={{ color: "#f90" }}>{item.tags}</span>
                        </span>
                        <span style={{ marginLeft: "15px" }}>热度：
                            <span style={{ color: "#0f0" }}>
                                {item.views}
                            </span>
                        </span>
                        <span style={{ marginLeft: "15px" }}>发布日期：
                            <span style={{ color: "#0f0" }}>
                                {parseDate(item.publish_date)}
                            </span>
                        </span>
                        <NavLink to={"/detail/" + item._id} style={{ marginLeft: "15px" }}>阅读文章
                        </NavLink>
                    </div>
                </div>
            </div>;
        });
    } else {
        renderedItem = blog.map((item) => {
            return <div style={{
                width: "97%",
                height: "88px",
                userSelect: "none",
                marginTop: "20px",
                backgroundColor: "#fff",
                display: "flex",
                border: "1px solid #888888",
                padding: "3px 8px",
                boxShadow: "1px 2px 2px #888888",
                borderRadius: "20px"
            }} key={item._id}>
                {item.cover_picture ? <PictureLink width={140} height={80} picture={item.cover_picture} /> : null}
                {/* 主区域 */}
                <div style={{
                    display: " inline-block",
                    marginLeft: "5px",
                    position: "relative",
                    minHeight: "30px",
                    width: "100%",
                    padding: "2px",
                    minWidth: 0,
                    boxSizing: "border-box"
                }}>
                    {/* 标题 */}
                    <div style={{
                        fontSize: "3vh",
                        fontWeight: "bold",
                        color: "#555",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}>{item.title}</div>
                    {/* 文章介绍区域 */}
                    <div style={{
                        fontSize: "13px",
                        color: "#888888",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                        // display: "-webkitBox",
                        // WebkitBoxOrient: "vertical",
                        // WebkitLineClamp:2,
                        // overflowX:"hidden"
                    }}>{item.intro}</div>
                    {/* 底部 */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        bottom: "3px",
                        fontSize: "1.4vh"
                    }}>
                        <span>
                            标签：<span style={{ color: "#f90" }}>{item.tags}</span>
                        </span>
                        <span style={{ marginLeft: "1vh" }}>热度：
                            <span style={{ color: "#0f0" }}>
                                {item.views}
                            </span>
                        </span>
                        <NavLink to={"/detail/" + item._id} style={{ marginLeft: "10px" }}>阅读文章
                        </NavLink>
                    </div>
                </div>
            </div>;
        });
    }
    return (
        <>
            <div className="home-blog-show">
                {/* 如果spinning为true 显示loading效果 */}
                <Spin tip="加载中请稍后。。。" spinning={blog[1] === undefined}>
                    {renderedItem}
                </Spin>
            </div>
            {/* /.blog */}
        </>
    );

}


export default BlogItem;