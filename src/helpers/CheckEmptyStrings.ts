const isEmptyStrings = (str : string | string[]): boolean => {
    if (typeof (str) == "object") {
        str.forEach(s => {
            if (s.trim().length == 0) return false
        })
        return true
    }else{
        if (str.trim().length == 0) return false
    }
    return true
}

export { isEmptyStrings }