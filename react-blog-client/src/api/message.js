import axios from "axios";
import baseURL from "./baseUrl";
const sentencesInstance = axios.create({
    baseURL: `${baseURL}/message`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});

export function addMessage(content, user, fatherMessage = null) {
    return sentencesInstance.post("/", {
        content,
        user,
        fatherMessage
    });
}

export function queryRootMessage() {
    return sentencesInstance.get("/");
}
export async function queryRootMessageByPage(page, limit) {
    const result = sentencesInstance.get("/queryRootMessageByPage", {
        params: {
            page,
            limit
        }
    });
    return result;
}

export function queryMessageByFatherId(fatherId) {
    return sentencesInstance.get("/queryByFather", {
        params: {
            fatherId
        }
    });
}

export function deleteMessageById(id) {
    return sentencesInstance.delete("/" + id);
}


