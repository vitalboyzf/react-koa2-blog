export function parseDate(timestamp) {
    const date = new Date(+timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + "-" + month + "-" + day
}

export function carefulParseDate(timestamp) {
    const date = new Date(+timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return year + "年" + month + "月" + day + "日    " + hour + ":" + minute + ":" + second
}

export function getCookie(name) {
    var arr = document.cookie.split(";")
    for (let i = 0; i < arr.length; i++) {
        const result = arr[i].split("=")
        if (result[0].trim() === name) {
            return result[1]
        }
    }
    return ""
}