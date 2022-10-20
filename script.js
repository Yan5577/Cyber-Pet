
//HTML elements
const overlay = document.querySelector('.overlay');
const animals = document.querySelectorAll('.animals')






//Functions

const clearAnimalSelection = ()=>{
    for (let i=0; i<animals.length; i++){
       animals[i].classList.remove('selected');
    }
}

const selectAnimal =(args)=>{
    clearAnimalSelection();
    args.currentTarget.classList.add('selected')
}


//Events
document.addEventListener('click', (e) =>{
    overlay.classList.add('hide')
});

for (let i=0; i<animals.length; i++){
    animals[i].addEventListener('click', (event)=> selectAnimal(event));
}