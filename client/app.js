
window.onload = getCards()

async function getCards() {
    const content = document.querySelector('.post-content')
        try {
            await fetch ('http://localhost:5000/api/cards', {method: 'GET'})
                    .then(row=>row.json())
                    .then(data => {
                        content.innerHTML = data.data.map(i=> 
                            
                            `<div class="post">
                                <div class="post-title">${i.theme}</div>
                                <div class="post-dsc">${i.dsc}</div>
                                <div class="post-count">Date: ${i.date}</div>
                            </div>
                            `
                        )

                    })                                          
        } catch (error) {
            console.log(error);
        }
}



// Кнопка для открытия модалки с формой
const addBtn = document.querySelector ('#post-add')
addBtn.onclick = showAddModal ;




// Модалка с формой
function showAddModal () {
        
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
                    <input type="text" class="modal-input" id="text-input" name="textInput">
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
            let d = new Date()
            d = d.getHours() + ':' +d.getMinutes() + ', ' + d.getFullYear()+'.'+d.getMonth()
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
                    date: d
                }),
            })
            } catch (error) {
                console.log(error);
            }            
        })





}







const deleteBtn = document.querySelector ("#post-delete")
deleteBtn.onclick = deletePosts;

async function deletePosts () {
    try {
        window.location.reload()
        await fetch ('http://localhost:5000/api/cards', {method: 'DELETE'})
        .then(()=> content.innerHTML = 'Succsess')
        
    } catch (error) {
        console.log(error);
    }

    
}

