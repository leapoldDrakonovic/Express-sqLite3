import {Post} from "../components/Post.js"

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




