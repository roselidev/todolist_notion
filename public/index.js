const getDataFromBackend = async () => {
    const rest = await fetch('http://localhost:3000/notion');
    const data = await rest.json();
  
    return data;
};

const carousel = document.querySelector('.carousel');

const addData = async () => {
    const data = await getDataFromBackend();

    for (let i = 0; i < data.length; i++){
        d = data[i]
        const titleText = document.createElement("p");
        titleText.innerText = d.title;
        titleText.classList.add('todo-title');

        const detailText = document.createElement("p");
        detailText.innerText = d.detail;
        detailText.classList.add('todo-detail');

        const card = document.createElement("div");
        card.classList.add("card");
        card.appendChild(titleText);
        card.appendChild(detailText);

        carousel.prepend(card);
    }
};

addData();