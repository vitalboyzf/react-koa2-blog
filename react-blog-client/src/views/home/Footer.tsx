import React from "react";
import { withRouter } from "dva/router";
function getRunTime() {
    const time = Date.now() - 1594551458630;// 计算时间差
    let d = Math.floor(time / 24 / 1000 / 60 / 60);
    let h = Math.floor(time / 1000 / 60 / 60 % 24);// 获取时
    let m = Math.floor(time / 1000 / 60 % 60);// 获取分
    let s = Math.floor(time / 1000 % 60);// 获取秒

    if (s < 10) {
        s = 0 + s;
    }
    if (m < 10) {
        m = 0 + m;
    }
    if (h < 10) {
        h = 0 + h;
    }// 判断是否是个位数,自动补'0'
    return `本站运行了${d}天 ${h} 小时 ${m} 分 ${s} 秒`;
}
function Footer(props: any) {
    if (props.location.pathname !== "/home") {
        return null;
    }
    return (
        <div className={"footer"} style={{
            width: "100%",
            height: "70px",
            backgroundColor: "#333",
            marginTop: "20px",
            borderTop: "3px solid #f90"
        }}>
            <div className="text" style={{
                color: "#fff",
                textAlign: "center",
                lineHeight: "30px",
                userSelect: "none",
                height: "100%"
            }}>
                © 2020 张斐个人博客
                <span style={{ marginLeft: "20px" }}> 托管于腾讯云</span>
                <div>{getRunTime()}</div>
            </div>
        </div>
    );
}

export default withRouter(Footer);