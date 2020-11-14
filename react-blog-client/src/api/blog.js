import axios from "axios";
import baseURL from "./baseUrl";
const sentencesInstance = axios.create({
    baseURL: `${baseURL}/blog`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});

export function addBlog({ content, title, tags, cover_picture, intro }) {
    return sentencesInstance.post("/", {
        content,
        title,
        tags,
        cover_picture,
        intro
    }
    );
}

export function queryBlog() {
    return sentencesInstance.get("/");
}

export function queryBlogByPage(page, limit) {
    return sentencesInstance.get("/order/queryBlogByPage", {
        params: {
            page,
            limit
        }
    });
}

export function queryBlogByKey(title, tags) {
    return sentencesInstance.get("/order/queryBlogByKey", {
        params: {
            title,
            tags
        }
    });
}

export function queryBlogById(id) {
    return sentencesInstance.get("/" + id);
}

export function deleteBlog(id) {
    return sentencesInstance.delete("/" + id);
}

export function updateBlog(id, newInfo) {
    return sentencesInstance.patch("/" + id, {
        ...newInfo
    });
}

export function queryBlogByViews() {
    return sentencesInstance.get("/order/queryBlogByViews");
}
