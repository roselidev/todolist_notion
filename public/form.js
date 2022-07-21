const form = document.querySelector('.js-form'),
showBtn = document.querySelector('.js-button');

const addDataToBackend = async (req) => {
    const status = await fetch('http://localhost:3000/', {method:"POST", body: JSON.stringify({title, detail})});
    if (status === 200){
        location.reload(true);
    } else{
        alert('Not Submitted! Try again.');
    }
};

function showForm(){
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
}

function init(){
    showBtn.onclick = showForm;
    form.onsubmit = addDataToBackend;
}

init();