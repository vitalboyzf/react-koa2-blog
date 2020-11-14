import React, { useEffect, useState } from "react";
import "./index.css";
import $ from "jquery";
import WangEditor from "wangeditor";
import { addBlog } from "../../api/blog";
import { message } from "antd";

export default function Blog() {
    const editor = new WangEditor("#div1", "#div2");  // 两个参数也可以传入 elem 对象，class 选择器
    const [imgUrl, setImgUrl] = useState("");
    useEffect(() => {
        editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
        editor.customConfig.colors = [
            "#000000",
            "#eeece0",
            "#1c487f",
            "#4d80bf",
            "#c24f4a",
            "#8baa4a",
            "#7b5ba1",
            "#46acc8",
            "#f9963b",
            "#f90",
            "#008c8c",
            "#888"
        ];
        editor.customConfig.uploadImgServer = "http://49.232.250.47:2000/upload";
        editor.customConfig.uploadFileName = "img";
        editor.customConfig.uploadImgHooks = {
            customInsert(insertImg, result, editor) {
                setImgUrl(result.url);
                insertImg(result.url);
            }
        };
        // 清理编辑器
        editor.create();
    }, [editor]);
    return (
        <div className="editor-container">
            <div className="title">
                <label>
                    标题：<input id="title" type="text" placeholder="请输入标题" />
                </label>
                <label>
                    标签：<input id="tags" type="text" placeholder="请输入标签名" />
                </label>

            </div>
            <div>
                <textarea placeholder={"请介绍一下这篇博客吧!"} name="" id="intro" cols="130" rows="2" />
                {/* /# */}
            </div>
            <div id="div1" className="toolbar">
            </div>
            <div style={{ padding: " 5px 0", color: "#ccc" }} />
            <div id="div2" className="text">
            </div>
            <div className="btn">
                <button onClick={() => {
                    editor.txt.clear();
                    $("#title")[0].value = "";
                    $("#tags")[0].value = "";
                    $("#intro")[0].value = "";
                }} id="clear">清理
                </button>
                <button onClick={() => {
                    const title = $("#title").val();
                    const tags = $("#tags").val();
                    let content = editor.txt.html();
                    content = content.toString()
                        .replace(`contenteditable="true"`, "");
                    const intro = $("#intro").val();
                    if (!title || !tags || !intro || !content) {
                        message.success("缺少重要信息，好好写！", .3);
                        return;
                    }
                    addBlog({ title, tags, content, cover_picture: imgUrl, intro }).then(res => {
                        if (res.content) {
                            message.success("添加成功", .3);
                            editor.txt.clear();
                            $("#clear").click();
                        } else {
                            message.success("添加失败", .3);
                        }
                    });
                }} id="getContent">发布文章
                </button>
            </div>
        </div>
    );
}
