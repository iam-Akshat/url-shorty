/* eslint-disable no-undef */
const f_tags=[]
const tags = document.getElementById("tags")
const holder = document.getElementById("tag_holder")
const form = document.getElementById("batch")
console.log(tags);
tags.addEventListener("keydown", (event) => {

    if (event.code == "Space" && tags.value.trim().length != 0) { createTag() }
})
const tagBuilder = (content) => {
    return (
        `<div id="tag">${content}</div>`
    )
}
const createTag = () => {

    let text = tags.value.trim()
    if(f_tags.length < 5){
        f_tags.push(text)
        tags.value = ""
        holder.innerHTML+=tagBuilder(text)
    }else{
        tags.disabled = true
    }
}

const commonFetch = async (url,body,isJSON=true) => {
    const res = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'    
        },
        body:body
    })
    if(isJSON){
        return await res.json()
    }else{
        return res
    }
}
batch.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const ff = new FormData(form)
    const tags_str = f_tags.join(",")
    ff.append('tags',tags_str)
    const form_encoded = new URLSearchParams(ff)

    const res = await commonFetch('/batch',form_encoded,false)
    console.log(res);
    
})