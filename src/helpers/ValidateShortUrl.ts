export const validateShortUrl = (str: string): boolean => {
    if (str.length !== 6) return false
    return true
}