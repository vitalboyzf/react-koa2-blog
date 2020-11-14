import { message, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import { connect } from "dva";
import "./sentences.scss";
import { parseDate } from "../../components/util";

interface IProps {
    onQuerySentences(): void

    sentences: any[]
    text: string

    onDeleteSentences(id: string): any
}

const BackSentences: React.FC<IProps> = (props) => {
    const [show, setShow] = useState(false);
    const [delId, setDelId] = useState("");
    const data = props.sentences.map((item: any) => {
        return {
            key: item._id,
            name: item.content,
            content: item.content,
            publishDate: item.publish_date,
            imgUrl: item.img_url
        };
    });
    return (
        <div>
            <Table dataSource={data} bordered>
                <Table.Column ellipsis={true} align={"center"} key="name" title="内容" dataIndex="name" />
                <Table.Column ellipsis={true} align={"center"} key="imgUrl" title="图片" dataIndex="imgUrl" />
                <Table.Column ellipsis={true} render={(text: string, record: any) => {
                    return parseDate(text);
                }} align={"center"} key="publishDate" title="发布日期" dataIndex="publishDate" />
                <Table.Column ellipsis={true} render={(text: string, record: any) => {
                    return < Space size="large">
                        <span onClick={() => {
                            setDelId(record.key);
                            setShow(true);
                        }}>删除</span>
                        <Modal
                            title="删除优秀小短句！"
                            visible={show}
                            cancelText="取消"
                            okText="确定删除"
                            okType="danger"
                            onOk={() => {
                                props.onDeleteSentences(delId).then((res: string) => {
                                    message.success(res);
                                    setShow(false);
                                });
                            }}
                            onCancel={() => {
                                setShow(false);
                            }}
                        >
                            <p>删除操作不可逆转，是否确定删除？</p>
                        </Modal>
                    </ Space>;
                }} align={"center"} key="publishDate" title="Action" dataIndex="publishDate" />
            </Table>
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        sentences: state.sentences
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        onQuerySentences() {
            dispatch({ type: "sentences/querySentences" });
        },
        async onDeleteSentences(id: number) {
            return dispatch({ type: "sentences/deleteSentences", payload: id });
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BackSentences);