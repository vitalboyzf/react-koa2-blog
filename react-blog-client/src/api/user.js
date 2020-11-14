import axios from "axios";
import baseURL from "./baseUrl";
const sentencesInstance = axios.create({
    baseURL: `${baseURL}/user`
});
sentencesInstance.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    } else {
        return "error";
    }
});
export function whoami() {
    return sentencesInstance.get("/whoami");
}
export function queryAllUser() {
    return sentencesInstance.get("/");
}
export function queryUserById(id) {
    return sentencesInstance.get("/" + id);
}
export function login(name, password) {
    return sentencesInstance.post("/login", {
        name,
        password
    });
}

export function register({ name, password, gender, avatar_url }) {
    return sentencesInstance.post("/", {
        name,
        password,
        gender,
        avatar_url
    });
}

export function deleteUser(id) {
    return sentencesInstance.delete("/" + id);
}

export function updateUser({ id, name, password, avatar_url, gender }) {
    return sentencesInstance.patch("/" + id, {
        name,
        avatar_url,
        gender,
        password
    });
}


