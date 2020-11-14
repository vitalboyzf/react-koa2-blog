import React from "react";
import Swiper from "../../components/swiper/Swiper";
import PictureLink from "../../components/picture/PictureLink";
import { RouteComponentProps } from "dva/router";
import BlogItem from "./BlogItem";
import NewBlog from "./NewBlog";
import Link from "./Link";
let bigScreen = window.matchMedia("(min-width:960px)");
function Home(props: RouteComponentProps) {
    if (bigScreen.matches) {
        return (
            <>
                <Swiper />
                <div className={"picture"}>
                    <PictureLink
                        content={"玩游戏"}
                        picture={require("./logo/game.jpg")}
                        onClickHandle={() => {
                            window.location.href = "http://49.232.250.47/tetris/";
                        }}
                    />
                    <PictureLink
                        content={"读书"}
                        picture={require("./logo/book.jpg")}
                        onClickHandle={() => {
                            props.history.push("/book");
                        }}
                    />
                </div>
                <div>
                    <div style={{
                        width: "170px",
                        height: "220px",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "10px",
                        border: "1px solid #f90",
                        userSelect: "none"
                    }}>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}> 关于博主</p>
                        <p>男，九零后，狮子座</p>
                        <p style={{ fontSize: "15px", fontWeight: "bold" }}>爱好</p>
                        打游戏，看电影,喜欢做开发，做有意义的事，做
                        爱思考的狍子~~~
                    </div>
                </div>
                <div style={{
                    width: "100%",
                    borderBottom: "3px solid #333",
                    paddingBottom: "5px",
                    fontWeight: "bold"
                }}>最热文章
                </div>
                <BlogItem />
                <NewBlog push={props.history.push} />
                <Link />
            </>
        );
    } else {
        return <>
            <Swiper />
            <div style={{
                width: "100%",
                borderBottom: "3px solid #333",
                paddingBottom: "5px",
                fontWeight: "bold",
                fontSize: "19px"
            }}>最热文章
                </div>
            <BlogItem />
        </>;
    }
}

export default Home;