import {Post} from "../components/Post.js"
import authController from './auth.controller.js'

const postContentContainer = document.querySelector('.post-content')
if (postContentContainer) {
    const postsData = new Post().getCards()
    postsData.then(array=>array.reverse().forEach(post => {
        post = new Post(post.theme, post.dsc, post.date)
        postContentContainer.appendChild(post.renderPost())
    }))
}

const addPostBtn = document.querySelector('#post-add')
if (addPostBtn) {
    addPostBtn.onclick = new Post().showAddPostModal ;
}

const deletePostBtn = document.querySelector("#post-delete")
if (deletePostBtn) {
    deletePostBtn.onclick = new Post().deletePosts;
}


const loginInp = document.querySelector('#login-inp')
const passInp = document.querySelector('#pass-inp')
const authBtn = document.querySelector('#authorization-btn')
if (authBtn) {
    authBtn.addEventListener('click', ()=>{
        authController.sendLogin({
            username: loginInp.value,
            password: passInp.value
        })
        loginInp.value = ''
        passInp.value = ''
    })
}
const registrationBtn = document.querySelector('#registration-btn')
if (registrationBtn) {
    registrationBtn.addEventListener('click', () => {
        authController.sendRegistation({
            username: loginInp.value,
            password: passInp.value
        })
        loginInp.value = ''
        passInp.value = ''
    })
}




