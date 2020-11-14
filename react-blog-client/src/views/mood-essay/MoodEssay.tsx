import React from "react";
import HeadCom from "../../components/head-com/HeadCom";
import { connect } from "dva";
import "./index.scss";
import { parseDate } from "../../components/util";

interface IProps {
    sentences: string[]
    history: any
}



function MoodEssay(props: IProps) {
    const renderArr = props.sentences.map((item: any) => {
        let parserTime = item.publish_date;
        parserTime = parseDate(parserTime);
        return <div className={"sentences-item"} key={item._id}>
            <div className={"sentences-main"}>
                <img src={item.img_url} alt="" />
                <p>{item.content}</p>
            </div>
            <span className={"publishDate"}>{parserTime}</span>
        </div>;
    }
    );
    return (
        <>
            <HeadCom title={"心情随笔"} content={"生活，总是需要一些乐趣才有动力！"} />
            <div className="sentences-container">
                {renderArr}
            </div>
        </>
    );
}

const mapStateToProps = (state: any) => ({
    sentences: state.sentences
});
export default connect(mapStateToProps)(MoodEssay);