class Post {

    constructor (theme, dsc, date) {
        this._theme = theme
        this._dsc = dsc
        this._date = date
    }

    renderPost = () => {
        const div = document.createElement('div')
        div.className = 'post'
        div.innerHTML = `
            <div class="post-title">${this._theme}</div>
            <div class="post-dsc">${this._dsc}</div>
            <div class="post-count">Date: ${this._date}</div>
        `
        return div
    }
    

    getCards = async () => {
        try {
            const data = await fetch (`http://localhost:5000/api/cards`, {method: 'GET'})
                    .then(row=>row.json())
                    .then(data => data.data)    
            return data                                   
        } catch (error) {
            console.log(error);
        }
    }

    showAddModal = () => {
        const body = document.getElementsByTagName('body')[0];
        const modalWindow = document.createElement('div');
        modalWindow.classList = 'modal';
        modalWindow.innerHTML = `
        <div class="modal-add-wrapper">
            <div class="modal-content">
                <button class="modal-x-btn" id="auth-x-btn">X</button>
                <form class="modal-form" id="modalForm">
                    <label for="title-input">Theme</label>
                    <input type="text" class="modal-input" id="theme-input" name="themeInput">
                    <br>
                    <label for="text-input">Text</label>
                    <textarea name="textInput" id="text" cols="30" rows="10"></textarea>
                    <button id="add" type='submit'>Добавить</button>
                </form>
            </div>
        </div>
        `


        body.style.overflow = 'hidden';
        body.style.pointerEvents = 'none';
        modalWindow.style.pointerEvents = 'all';
        body.append(modalWindow)    

        // Кнопка закрытия модалки
        const closeBtn = document.querySelector('#auth-x-btn');
        closeBtn.addEventListener('click', ()=> {
            body.style.overflow = 'auto';
            body.style.pointerEvents = 'all';
            modalWindow.remove()
        }) 


        const form = document.querySelector('#modalForm');


        form.addEventListener ('submit', async (e)=> {
            let themeInpVal = form.themeInput.value
            let textInpVal = form.textInput.value
            let currentData = new Date()
            currentData = currentData.getHours() + ':' +currentData.getMinutes() + ', ' + currentData.getFullYear()+'.'+currentData.getMonth()
            try {
                await fetch ('http://localhost:5000/api/cards/add', {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    theme: themeInpVal,
                    text: textInpVal,
                    date: currentData
                }),
            })
            document.location = 'http://localhost:5000'
            } catch (error) {
                console.log(error);
            }    
        })
    }

    deletePosts = async () => {
        try {
            window.location.reload()
            await fetch ('http://localhost:5000/api/cards', {method: 'DELETE'})        
        } catch (error) {
            console.log(error);
        }
    }

    
}

export {Post}

