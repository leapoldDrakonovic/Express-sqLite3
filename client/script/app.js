import {Post} from "../components/Post.js"

const postContentContainer = document.querySelector('.post-content')
if (!!postContentContainer) {
    const postsData = new Post().getCards()
    postsData.then(array=>array.reverse().forEach(post => {
        post = new Post(post.theme, post.dsc, post.date)
        postContentContainer.appendChild(post.renderPost())
    }))
}

const addBtn = document.querySelector ('#post-add')
if (addBtn) {
    addBtn.onclick = new Post().showAddModal ;
}

const deleteBtn = document.querySelector ("#post-delete")
if (deleteBtn) {
    deleteBtn.onclick = new Post().deletePosts;
}




