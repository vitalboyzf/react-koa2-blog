import React from "react";
import HeadCom from "../components/head-com/HeadCom";
import BookMain from "../views/book/Book";
function Live() {
    return (
        <>
            <HeadCom title={"读书"} content={"前人走过的路，便是捷径"} />
            <BookMain />
        </>
    );
}

export default Live;