import {Animal, Tiger, Rabbit, Mouse, Stat} from '../modules/animals.js';

//U.I. constants
const ui = document.getElementsByTagName('interface')[0];
const statDisplay = document.getElementsByTagName('statDisplay')[0];
const refreshSpeed = 50; //milliseconds
const devalueSpeed = 100; //milliseconds
const devalueMax = 5; //percentage
const statGains = 10;  //percentage stat increase
const gradBars = [];

//Functions
const buildAnimalControl = (controlAnimal) => {
    controlAnimal.statistics.forEach(stat => {
       //Add button
        let buttonCtr = document.createElement('button')
        buttonCtr.textContent = stat.label
        buttonCtr.name = stat.name
        buttonCtr.addEventListener('click', ()=>buttonPressEvent(stat.name))
        ui.appendChild(buttonCtr)

        //Add statBar
        let statContainer = document.createElement('statContainer')

        let statLabel = document.createElement('div')
        statLabel.classList.add('label')
        statLabel.textContent = stat.name;

        let statBar = document.createElement('statBar')
        statBar.id = stat.name;

        let gradBar = document.createElement('gradBar')
        gradBar.style.width = `${stat.value}%`
        gradBars.push(gradBar);
        statDisplay.appendChild(statContainer)
        
        statContainer.appendChild(statBar);
        statContainer.appendChild(statLabel)
        
        statBar.appendChild(gradBar)
        
        console.log(stat)

    });
}

const refreshStats = () =>{
    for(let i=0; i<gradBars.length; i++){
        gradBars[i].style.width=`${cyberAnimal.statistics[i].value}%`;
        let e = isEnd();
        console.log(`e=${e}`);
        if(isEnd()===true){
            stopTimers();
            console.log(cyberAnimal.endLabel);
            console.log('game over')
        }
    }
}

//testing Function - replace with MRs
const devalue = () =>{
    const randomStat = Math.floor(Math.random(1)*cyberAnimal.statistics.length);
    const randomAmount =0- Math.floor(Math.random(1)*devalueMax);
    cyberAnimal.changeStat(cyberAnimal.statistics[randomStat].name,randomAmount);
}

const isEnd = () =>{
    
    for(let i=0; i<cyberAnimal.statistics.length; i++){
        if (cyberAnimal.statistics[i].value<=0){
            return true;
        }
    }

    return false;
}

const stopTimers = () =>{
    clearInterval(devalueInterval);
    clearInterval(refreshInterval);
}

//Events
const buttonPressEvent = (args) =>{
    cyberAnimal.changeStat(args,statGains);
  }


//Program Flow

// this should be replaced with a selection method from MRs
let cyberAnimal = new Rabbit("Frank")

buildAnimalControl(cyberAnimal);


//Async timers

let refreshInterval = setInterval(refreshStats, refreshSpeed);

let devalueInterval = setInterval(devalue, devalueSpeed);

