import axios from "axios";
import baseURL from "./baseUrl";
const sentencesInstance = axios.create({
    baseURL: `${baseURL}/comment`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});

export function addComment(content, user, blogId, fatherComment = null) {
    return sentencesInstance.post("/", {
        content,
        user,
        fatherComment,
        blogId
    });
}

export function queryRootComment(blogId) {
    return sentencesInstance.get("/queryRootComment", {
        params: {
            blogId
        }
    });
}
export function queryAllComment() {
    return sentencesInstance.get("/");
}

export function queryCommentByFatherId(fatherId) {
    return sentencesInstance.get("/queryByFather", {
        params: {
            fatherId
        }
    });
}
export function deleteCommentById(id) {
    return sentencesInstance.delete("/" + id);
}

