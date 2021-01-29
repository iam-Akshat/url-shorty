export const validateShortUrl = (str: string): boolean => {
    if ((str.length === 6) || (str.length == 7)) return true
    return false
}