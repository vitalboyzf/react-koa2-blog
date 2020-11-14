import React from 'react';
import './new-blog.scss'
import {connect} from 'dva'

function NewBlog(props: any) {
    const renderArr = props.blog.map((item: any, index: number) => {
        return <div onClick={() => {
            props.push(`/detail/${item._id}`)
        }} className={"item"} key={item._id}>
            <span>{index + 1}.</span> {item.title}
        </div>
    })
    return (
        <div className={"home-new-blog"}>
            <div className="title">最新文章</div>
            <div className={"item-container"}>
                {renderArr}
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    blog: state.blog.slice(0, 8)
})
export default connect(mapStateToProps)(NewBlog);