/* eslint-disable no-undef */

//  FOR BATCH URLS PAGE
let f_tags, tags, holder, form 
console.log(tags);
const batchtags = () =>{
    tags.addEventListener("keydown", (event) => {
        if (event.code == "Space" && tags.value.trim().length != 0) { createTag() }
    })
}

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
const batchListener = () => {
    batch.addEventListener("submit",async (e)=>{
        e.preventDefault()
        const ff = new FormData(form)
        const tags_str = f_tags.join(",")
        ff.append('tags',tags_str)
        const form_encoded = new URLSearchParams(ff)
    
        const res = await commonFetch('/batch',form_encoded,false)
        console.log(res);
    })
}
//  FOR BATCH URLS PAGE

function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });
    
}
navSlide();
if(document.location.pathname=='/batch_urls.html'){
f_tags = []
tags = document.getElementById("tags")
holder = document.getElementById("tag_holder")
form = document.getElementById("batch")
tags && batchtags()
batch && batchListener()}