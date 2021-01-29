const isEmptyStrings = (str: string | string[]): boolean => {
    if (typeof (str) == "object") {
        let flag = false
        str.forEach(s => {
            if (s.trim().length == 0) {
                flag = true
            }
        })
        if (flag) {
            return false
        } else {
            return true
        }
    } else {
        if (str.trim().length == 0) return false
    }
    return true
}

export { isEmptyStrings }