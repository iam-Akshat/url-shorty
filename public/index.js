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
    }
}

batch.addEventListener("submit",(e)=>{
    tags.value = f_tags.join(",")
    
    console.log(e);
})