export  const validateShortUrl = (str:string) =>{
    if (str.length !== 6) return false
    return true
}