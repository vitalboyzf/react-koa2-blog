import React, { useEffect } from 'react'
import './index.css'
import $ from 'jquery'
import wangEditor from 'wangeditor'
export default function Blog() {
    const editor = new wangEditor('#div1', '#div2')  // 两个参数也可以传入 elem 对象，class 选择器
    useEffect(() => {
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.colors = [
            '#000000',
            '#eeece0',
            '#1c487f',
            '#4d80bf',
            '#c24f4a',
            '#8baa4a',
            '#7b5ba1',
            '#46acc8',
            '#f9963b',
            '#f90',
            '#008c8c',
            '#888'
        ]
        editor.customConfig.uploadImgServer = 'http://47.95.14.227:2333/upload'
        editor.customConfig.uploadFileName = 'img'
        editor.customConfig.uploadImgHooks = {
            customInsert(insertImg, result, editor) {
                console.log(result.url)
                insertImg(result.url)
            }
        }
        //清理编辑器
        editor.create()
    }, [editor])

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
            <div id="div1" className="toolbar">
            </div>
            <div style={{ padding: " 5px 0", color: "#ccc" }}></div>
            <div id="div2" className="text">
            </div>
            <div className="btn">
                <button onClick={() => {
                    editor.txt.clear()
                    $("#title")[0].value = "";
                    $("#tags")[0].value = "";
                }} id="clear">清理</button>
                <button onClick={() => {
                    const title = $("#title").val();
                    const tags = $('#tags').val();
                    const content = editor.txt.html()
                    $.ajax({
                        url: 'http://localhost:2000/editBlog?title=' + title + "&tags=" + tags,
                        method: 'post',
                        data: content,
                        success(resp) {
                            alert(JSON.parse(resp).msg);
                            editor.txt.clear();
                            $("#clear").click();
                        },
                        error(err) {
                            console.log(err);
                            alert("添加失败");
                        }
                    })
                }} id="getContent">获取内容</button>
            </div>
        </div>
    )
}
