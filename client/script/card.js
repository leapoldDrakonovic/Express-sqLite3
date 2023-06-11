class BlogCard {

    renderCard = (i) => {
        return `
        <div class="post">
            <div class="post-title">${i.theme}</div>
            <div class="post-dsc">${i.dsc}</div>
            <div class="post-count">Date: ${i.date}</div>
        </div>
        `
    }
    
    
    renderCards = (list) => {
        const cardList = list.reduce((acc, elem) => acc + renderCard(elem), '');
        content.innerHTML = cardList;
    }
}


