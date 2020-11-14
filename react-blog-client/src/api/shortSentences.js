import axios from "axios";
import baseURL from "./baseUrl";
const sentencesInstance = axios.create({
    baseURL: `${baseURL}/sentences`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});
export function addShortSentences(imgUrl, content) {
    return sentencesInstance.post("/", {
        img_url: imgUrl,
        content
    });
}
export function getSentences() {
    return sentencesInstance.get("/");
}
export function deleteSentences(id) {
    return sentencesInstance.delete("/" + id);
}

