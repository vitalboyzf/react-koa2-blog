import React, { useRef, useState } from 'react'
import './shortSentences.scss'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addShortSentences, getSentences } from '../../api/shortSentences'
export default function ShortSentences() {
    const [img, setImg] = useState("")
    const [content, setContent] = useState("")
    const [, forceUpdate] = useState({})
    let textareaRef: HTMLTextAreaElement | undefined = useRef().current;
    const props = {
        name: 'img',
        action: 'http://47.95.14.227:2333/upload',
        onChange(info: any) {
            if (info.file.response) {
                setImg(info.file.response.url)
                message.success(`${info.file.name} 上传成功`);
                return
            }
        },
    };
    return (
        <div className="short-sentences">
            <div>
                <Upload {...props}>
                    <Button>
                        <UploadOutlined />上传logo图片
                    </Button>
                </Upload>
            </div>
            <div>
                <textarea value={content}
                    ref={(data) => textareaRef = data!}
                    name="悄悄话" id="" cols={50} rows={10}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}

                ></textarea>
            </div>
            <Button shape={"round"} onClick={() => {
                if (textareaRef) {
                    setContent("")
                }
            }}>清空文本框</Button>
            <Button size={"middle"} shape={"round"} onClick={() => {
                // if (!img) {
                //     message.info('为了漂亮的展示，请插入一张图片吧！', 1);
                //     return
                // }
                // if (content.length < 5) {
                //     message.info("不要太吝啬你的文笔，多写些文字！", 1);
                //     return
                // }
                if (textareaRef) {
                    setContent("")
                }
                forceUpdate({})
                addShortSentences(img, content).then(res => {
                    console.log(res)
                })
            }}>发布悄悄话</Button>
            <Button onClick={() => {
                getSentences().then(res => {
                    console.log(res)
                })
            }}>查询短句</Button>
        </div>
    )
}


