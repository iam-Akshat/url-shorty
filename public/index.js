/* eslint-disable no-undef */

//  FOR BATCH URLS PAGE
let f_tags, tags, holder, form
const batchtags = () => {
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
    if (f_tags.length < 5) {
        f_tags.push(text)
        tags.value = ""
        holder.innerHTML += tagBuilder(text)
    } else {
        tags.disabled = true
    }
}

const commonFetch = async (url, body, isJSON = true) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
    if (isJSON) {
        return await res.json()
    } else {
        return res
    }
}
const batchListener = () => {
    batch.addEventListener("submit", async (e) => {
        e.preventDefault()
        const ff = new FormData(form)
        const tags_str = f_tags.join(",")
        ff.append('tags', tags_str)
        const form_encoded = new URLSearchParams(ff)

        const res = await commonFetch('/batch', form_encoded, false)
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


const addBtnListeners = () => {
    btns = document.getElementsByClassName('copy-btn')
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', (e) => {
            e.target.style.backgroundColor = "rgb(50, 112, 50)"
            e.target.innerText = "Copied! "
            setTimeout(() => { reverseCopyEffect(e) }, 1000)
            const short = document.getElementsByClassName('l-' + e.target.id[e.target.id.length - 1])[0].innerText;
            console.log(short);
            navigator.clipboard.writeText(short)
        })
    }
}
addBtnListeners()
const reverseCopyEffect = (e) => {
    e.target.style.backgroundColor = "transparent"
    e.target.innerText = "Copy"
}
navSlide();
if (document.location.pathname == '/batch_urls.html') {
    f_tags = []
    tags = document.getElementById("tags")
    holder = document.getElementById("tag_holder")
    form = document.getElementById("batch")
    tags && batchtags()
    batch && batchListener()
}
const addReportTag = (short) => {
    const container = document.getElementsByClassName('report-urls-container')[0]
    container.insertAdjacentHTML('afterbegin',createReportTagHelper(short))
}
const addShortLink = (short, long, index) => {
    const container = document.getElementsByClassName('made-links-container')[0]
    container.insertAdjacentHTML('afterbegin', createShortLinkHelper(short, long, index))
    addBtnListeners()
}
const createReportTagHelper = (short) => {
    return `<div class="full-url"><a href="https://${document.location.hostname}/r/${short}">${short}</a> </div>`
}
const createShortLinkHelper = (short, long, index) => {
    return `<div class="made-link">
        <div class="short-url l-${index}">
            <a target="_blank" href="https://${document.location.hostname}/${short}">
            https://${document.location.hostname}/${short}
            </a>
        </div>
        <div class="long-url">${long}</div>
        <button class="copy-btn" id="cpy-${index}">Copy</button>
    </div>`
}

const mainForm = () => {
    const form = document.getElementById('main-form')
    form.addEventListener('submit', async (e) => {
        const button = document.getElementById('main-sub')
        button.innerText = "Loading"
        e.preventDefault()
        const formData = new FormData(form)
        const formBody = new URLSearchParams(formData)
        try {
            const res = await commonFetch('/',formBody,true)
            addShortLink(res.short_url,...formData.values(),window.localStorage.getItem('len')||0)
            addReportTag(res.short_url)
            console.log(res.short_url);
            saveToLocal(res.short_url,...formData.values())
            button.innerText = "Shorten"
        } catch (error) {
            button.innerText = "Error"
            console.log(error);
        }
    })
}
mainForm()

const localData = () => {
    const totalCreated = window.localStorage.getItem('len') || 0
    if (totalCreated > 0) {
        let prevCreated = window.localStorage.getItem('prevItems')
        prevCreated = JSON.parse(prevCreated)
        return prevCreated
    }
    return []
}

const prePopulate = (data) => {
    for(let t=0;t<data.length;t++){
        addShortLink(data[t][0],data[t][1],t)
        addReportTag(data[t][0])
    }
}
localData() && prePopulate(localData())
const saveToLocal = (short,long) =>{
    const totalCreated = window.localStorage.getItem('len') || 0
    if(totalCreated > 0){
        let prevCreated = window.localStorage.getItem('prevItems')
        prevCreated = JSON.parse(prevCreated)
        prevCreated.push([short,long])
        prevCreated = JSON.stringify(prevCreated)
        window.localStorage.setItem('prevItems',prevCreated)
    }else{
        let prevCreated = []
        prevCreated.push([short,long])
        prevCreated = JSON.stringify(prevCreated)
        window.localStorage.setItem('prevItems',prevCreated)
    }
    window.localStorage.setItem('len',totalCreated+1)
}