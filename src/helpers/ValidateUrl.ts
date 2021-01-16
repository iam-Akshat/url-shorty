const URLRegexPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

const URLregex = new RegExp(URLRegexPattern)

const isValidUrl = (url:string) =>{
    if (typeof(url) != "string") return false;
    if (url.match(URLregex)) {
        return true
    }

    return false
}
export { isValidUrl }