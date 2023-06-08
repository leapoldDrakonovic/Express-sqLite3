class BlogCard {

    const renderCard = (i) => {
        return `
        <div class="post">
            <div class="post-title">${i.theme}</div>
            <div class="post-dsc">${i.dsc}</div>
            <div class="post-count">Date: ${i.date}</div>
        </div>
        `
    }
    
    
    const renderCards = (list) => {
        const cardList = list.reduce((acc, elem) => acc + renderCard(elem), '');
        content.innerHTML = cardList;
    }
}