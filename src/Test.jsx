import React from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'img',
    action: 'http://47.95.14.227:2333/upload',
    headers: {
    },
    onChange(info) {
        if (info.file.response) {
            message.success(`${info.file.name} 上传成功`);
        }
        else {
            message.success(`${info.file.name} 上传失败`);
        }
    },
};
export default function () {
    return <Upload {...props}>
        <Button>
            <UploadOutlined />上传
        </Button>
    </Upload>
}