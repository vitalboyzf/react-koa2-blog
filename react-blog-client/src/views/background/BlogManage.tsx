import React, { useState } from "react";
import { connect } from "dva";
import "./blogManage.scss";
import { message, Modal, Table, Tooltip } from "antd";
import { parseDate } from "../../components/util";

interface IProps {
    onQueryBlogByPage(): void

    onDeleteBlog(id: string): any

    blog: any
}

const columns = [
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
        ellipsis: {
            showTitle: false
        },
        render: (content: any) => (
            <Tooltip placement="topLeft" title={content}>
                {content}
            </Tooltip>
        )
    },
    {
        title: "标签",
        dataIndex: "tags",
        key: "tags"
    },
    {
        title: "热度",
        dataIndex: "views",
        key: "views",
        width: 80
    },
    {
        title: "内容",
        dataIndex: "content",
        key: "content",
        ellipsis: {
            showTitle: false
        },
        render: (content: any) => (
            <Tooltip placement="topLeft" title={content}>
                {content}
            </Tooltip>
        )
    },
    {
        title: "发布时间",
        dataIndex: "publish_date",
        key: "publish_date",
        render: (text: any) => <span>{parseDate(text)}</span>
    }
];

const BackSentences: React.FC<IProps> = (props) => {
    const [show, setShow] = useState(false);
    const [delId, setDelId] = useState("");
    const data = props.blog.length !== 0 && props.blog.map((item: any) => {
        return {
            key: item._id,
            content: item.content,
            publish_date: item.publish_date,
            views: item.views,
            tags: item.tags,
            title: item.title
        };
    });
    return (
        <div>
            <Modal
                title="删除博客！"
                visible={show}
                cancelText="取消"
                okText="确定删除"
                okType="danger"
                onOk={() => {
                    props.onDeleteBlog(delId).then((res: string) => {
                        message.success(res, .3);
                        setShow(false);
                    });
                }}
                onCancel={() => {
                    setShow(false);
                }}
            >
                <p>删除操作不可逆转，是否确定删除？</p>
            </Modal>
            <Table tableLayout={"fixed"} onRow={record => {
                return {
                    onClick: event => {
                        setDelId(record.key);
                        setShow(true);
                    } // 点击行
                };
            }}
                dataSource={data} columns={columns} bordered />
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        blog: state.blog
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        onQueryBlogByPage(page: string, limit: string) {
            dispatch({ type: "blog/queryAllBlog" });
        },
        onDeleteBlog(id: string) {
            return dispatch({ type: "blog/deleteBlog", payload: id });
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BackSentences);