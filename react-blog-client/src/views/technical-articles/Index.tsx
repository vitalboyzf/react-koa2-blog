import React, { useState } from "react";
import "./index.scss";
import { NavLink, RouteComponentProps } from "dva/router";
import { connect } from "dva";
import { parseDate } from "../../components/util";
import PictureLink from "../../components/picture/PictureLink";
import { Button } from "antd";
import { queryBlogByKey } from "../../api/blog";
import HeadCom from "../../components/head-com/HeadCom";
const bigScreen = window.matchMedia("(min-width:900px)");
interface IProps extends RouteComponentProps {
    blog: any[]
}

function Index(props: IProps) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [virtualBlog, setVirtualBlog] = useState([...props.blog]);
    let renderedItem;
    if (bigScreen.matches) {
        renderedItem = virtualBlog.map((item) => {
            return <div className="blog-item" key={item._id}>
                {item.cover_picture ? <PictureLink width={160} height={110} picture={item.cover_picture} /> : null}
                <div className={"show-main"}>
                    <div className={"title"}>{item.title}</div>
                    <div className={"intro"}>{item.intro}</div>
                    <div className={"footer"}>
                        标签：<span style={{ color: "#f90" }}>{item.tags}</span>
                        <span style={{ marginLeft: "30px" }}>
                            <span>热度：</span>
                            <span style={{ color: "#0f0" }}>
                                {item.views}
                            </span>
                        </span>
                        <span style={{ marginLeft: "30px" }}>发布日期：
                        <span style={{ color: "#0f0" }}>
                                {parseDate(item.publish_date)}
                            </span>
                        </span>
                        <NavLink to={"/detail/" + item._id} style={{ marginLeft: "30px" }}>阅读文章
                    </NavLink>
                    </div>
                </div>
            </div>;
        });
    }
    else {
        renderedItem = virtualBlog.map((item) => {
            return <div style={{
                width: "98%",
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
                    <div style={{
                        fontSize: "3vh",
                        fontWeight: "bold",
                        color: "#555",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}>{item.title}</div>
                    <div style={{
                        fontSize: "13px",
                        color: "#888888",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }}>{item.intro}</div>
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        bottom: "3px",
                        fontSize: "1.4vh"
                    }}>
                        标签：<span style={{ color: "#f90" }}>{item.tags}</span>
                        <span style={{ marginLeft: "10px" }}>
                            <span>热度：</span>
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
            <HeadCom title={"博客文章"} content={"最好的年华，做最想做的事吧！"} />
            <div className="search">
                <input type="text" value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }} placeholder={"请输入文章标题"} />
                <input type="text" value={tags} onChange={(e) => {
                    setTags(e.target.value);
                }} placeholder={"请输入文章标签"} />
                <Button type={"primary"} onClick={() => {
                    queryBlogByKey(title, tags).then(res => {
                        setVirtualBlog(res.data);
                    });
                }}>搜索</Button>
            </div>
            <div className="blog-show">
                {renderedItem}
            </div>
            {/* /.blog */}
        </>
    );
}

const mapStateToProps = (state: any) => ({
    blog: state.blog
});
export default connect(mapStateToProps)(Index);