import React from "react";
import { RouteComponentProps, withRouter } from "dva/router";
import "./index.scss";
interface IProps extends RouteComponentProps {
    content?: string
    title: string
    history: any
    children?: React.ReactNode
}

function HeadCom(props: IProps) {
    return (
        <>
            <div className={"mood-essay-header"}>
                <span className={"to-home"} onClick={() => {
                    props.history.push("/home");
                }}>首页</span>
                <span>{props.title}</span>
                <i>{props.content}</i>
            </div>
        </>
    );
}

export default withRouter(HeadCom);