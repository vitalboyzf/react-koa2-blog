import React from "react";
import "./index.scss";
import HeadCom from "../../components/head-com/HeadCom";
const bookArr = [
    {
        title: "ECMAScript 6入门",
        url: "http://49.232.250.47/books-link/ECMAScript 6入门.pdf",
        img: "./img/es6入门.png"
    },
    {
        title: "你不知道的JavaScript（上）",
        url: "http://49.232.250.47/books-link/你不知道的JavaScript（上卷）.pdf",
        img: "./img/你不知道的js1.png"
    },
    {
        title: "你不知道的JavaScript（中）",
        url: "http://49.232.250.47/books-link/你不知道的JavaScript（中卷）.pdf",
        img: "./img/你不知道的js2.png"
    },
    {
        title: "你不知道的JavaScript (下)",
        url: "http://49.232.250.47/books-link/你不知道的JavaScript3.pdf",
        img: "./img/你不知道的js3.png"
    },
    {
        title: "JavaScript设计模式",
        url: "http://49.232.250.47/books-link/JavaScript设计模式.pdf",
        img: "./img/设计模式.png"
    },
    {
        title: "JavaScript数据结构与算法",
        url: "http://49.232.250.47/books-link/JavaScript数据结构与算法.pdf",
        img: "./img/js数据结构与算法.png"
    },
    {
        title: "图解HTTP+彩色版",
        url: "http://49.232.250.47/books-link/图解HTTP+彩色版.pdf",
        img: "./img/图解http.png"
    },
    {
        title: "React设计模式与最佳实践",
        url: "http://49.232.250.47/books-link/React设计模式与最佳实践.pdf",
        img: "./img/react.png"
    },
    {
        title: "JavaScript语言精粹",
        url: "http://49.232.250.47/books-link/JavaScript语言精粹.pdf",
        img: "./img/js语言精粹.png"
    },
    {
        title: "HTML5权威指南",
        url: "http://49.232.250.47/books-link/HTML5权威指南.pdf",
        img: "./img/HTML5权威指南.png"
    },
    {
        title: "javascript权威指南第六版",
        url: "http://49.232.250.47/books-link/javascript权威指南第六版.pdf",
        img: "./img/javascript权威指南第六版.png"
    },
    {
        title: "高性能JavaScript-中英对照版",
        url: "http://49.232.250.47/books-link/高性能JavaScript-中英对照版.pdf",
        img: "./img/高性能JavaScript-中英对照版.png"
    }
];

function Book() {
    const renderArr = bookArr.map((book) => {
        return <div className={"book-item"} key={book.title} onClick={() => {
            window.location.href = book.url;
        }}>
            <img src={require(book.img + "")} alt="" />
            <div className={"title"}>{book.title}</div>
        </div>;
    });
    return (
        <>
            <HeadCom title={"读书"} content={"前人走过的路，便是捷径"} />
            <div className={"book-container"}>
                {renderArr}
            </div>
        </>
    );
}

export default Book;