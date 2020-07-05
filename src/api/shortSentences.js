import axios from 'axios'
const sentencesInstance = axios.create({
    baseURL: "http://127.0.0.1:2000/api/sentences",
    timeout: 2000,
})
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data
    } else {
        return "error"
    }
})
export function addShortSentences(imgUrl, content) {
    return sentencesInstance.post('http://127.0.0.1:2000/api/sentences/publish/sentences', {
        imgUrl,
        content
    })
}
export function getSentences() {
    return sentencesInstance.get('http://127.0.0.1:2000/api/sentences')
}

