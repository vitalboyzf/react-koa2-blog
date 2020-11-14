import React, { useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const bigScreen = window.matchMedia("(min-width:960px)");
function ReviewMessage(props: any) {
    const [content, setContent] = useState("");
    if (bigScreen.matches) {
        return (
            <div style={{
                position: "fixed",
                width: "520px",
                height: "260px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "rgba(0,0,0,.3)",
                zIndex: 100,
                padding: "40px 20px"
            }}>
                <CloseOutlined spin style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: "bold"
                }}
                    onClick={() => {
                        props.onCancel();
                    }}
                />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} cols={50} rows={5} />
                <Button onClick={() => {
                    props.onSendMessage(content);
                }}>发送留言</Button>
            </div>
        );
    } else {
        return (
            <div style={{
                position: "fixed",
                width: "90vw",
                height: "30vh",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "rgba(0,0,0,.3)",
                zIndex: 100,
                padding: "40px 20px"
            }}>
                <CloseOutlined spin style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    color: "#fff",
                    fontSize: "24px",
                    fontWeight: "bold"
                }}
                    onClick={() => {
                        props.onCancel();
                    }}
                />
                <textarea value={content}
                    style={{
                        fontSize: "3vw",
                        width: "100%"
                    }}
                    onChange={(e) => setContent(e.target.value)} cols={50} rows={5} />
                <Button onClick={() => {
                    props.onSendMessage(content);
                }}>发送留言</Button>
            </div>
        );
    }

}

export default ReviewMessage;