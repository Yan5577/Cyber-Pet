import { Animal, Tiger, Rabbit, Mouse, Stat } from "./animals.js";

let cyberAnimal = null;
document.getElementById("playAgain").style.display = "none";

const gamestart = () => {
  //U.I. constants
  const ui = document.getElementsByTagName("interface")[0];
  const statDisplay = document.getElementsByTagName("statDisplay")[0];
  const refreshSpeed = 50; //milliseconds
  const devalueSpeed = 100; //milliseconds
  const devalueMax = 5; //percentage
  const statGains = 10; //percentage stat increase
  const buttonLockout = 1000; //milliseconds
  const gradBars = [];

  //Game Variables
  let clickTime = 0;

  document.getElementById(
    "petDisplay"
  ).innerHTML = `Pet's Name: ${cyberAnimal.name}`;


  //Functions
  const buildAnimalControl = (controlAnimal) => {
    ui.innerHTML = ""
    statDisplay.innerHTML = ""
    controlAnimal.statistics.forEach((stat) => {
      //Add button
      let buttonCtr = document.createElement("button");
      buttonCtr.textContent = stat.label;
      buttonCtr.name = stat.name;
      buttonCtr.addEventListener("click", () => buttonPressEvent(stat.name));
      ui.appendChild(buttonCtr);

      //Add statBar
      let statContainer = document.createElement("statContainer");

      let statLabel = document.createElement("div");
      statLabel.classList.add("label");
      statLabel.textContent = stat.name;

      let statBar = document.createElement("statBar");
      statBar.id = stat.name;

      let gradBar = document.createElement("gradBar");
      gradBar.style.width = `${stat.value}%`;
      gradBars.push(gradBar);
      statDisplay.appendChild(statContainer);

      statContainer.appendChild(statBar);
      statContainer.appendChild(statLabel);

      statBar.appendChild(gradBar);

      console.log(stat);
    });
  };

  const refreshStats = () => {
    for (let i = 0; i < gradBars.length; i++) {
      gradBars[i].style.width = `${cyberAnimal.statistics[i].value}%`;
      let e = isEnd();
      console.log(`e=${e}`);

      const now = new Date().getTime();
      if ((clickTime + buttonLockout) < now) {
        unlockButtons();
      }

      if (isEnd() === true) {
        stopTimers();
        console.log(cyberAnimal.endLabel);
        console.log("game over");
        document.getElementById("playAgain").style.display = "flex";
      }
    }
  };

  //testing Function - replace with MRs
  const devalue = () => {
    const randomStat = Math.floor(
      Math.random(1) * cyberAnimal.statistics.length
    );
    const randomAmount = 0 - Math.floor(Math.random(1) * devalueMax);
    cyberAnimal.changeStat(
      cyberAnimal.statistics[randomStat].name,
      randomAmount
    );

    const name = document.getElementById("petName").value;

    const alive = cyberAnimal.isAlive();
    if (!alive) {
      document.getElementById(
        "petDisplay"
      ).innerHTML = cyberAnimal.endLabel
    };
  }


  const isEnd = () => {
    for (let i = 0; i < cyberAnimal.statistics.length; i++) {
      if (cyberAnimal.statistics[i].value <= 0) {
        return true;
      }
    }

    return false;
  };

  const stopTimers = () => {
    clearInterval(devalueInterval);
    clearInterval(refreshInterval);
  };

  //Events
  const buttonPressEvent = (args) => {
    const now = new Date().getTime();
    if ((clickTime + buttonLockout) < now) {
      cyberAnimal.changeStat(args, statGains);
      clickTime = now;
      lockButtons();
    }
  };

  const lockButtons = () => {
    const buttons = ui.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add('locked')
    }
  }

  const unlockButtons = () => {
    const buttons = ui.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('locked')
    }
  }


  //Program Flow

  // this should be replaced with a selection method from MRs

  buildAnimalControl(cyberAnimal);

  //Async timers

  let refreshInterval = setInterval(refreshStats, refreshSpeed);

  let devalueInterval = setInterval(devalue, devalueSpeed);
};

const animals = document.querySelectorAll('.animals')
let selectedAnimal = "tiger";

const clearAnimalSelection = () => {
  for (let i = 0; i < animals.length; i++) {
    animals[i].classList.remove('selected');
  }
}

const selectAnimal = (args) => {
  clearAnimalSelection();
  args.currentTarget.classList.add('selected')
  selectedAnimal = args.currentTarget.id;
  console.log(selectedAnimal)
}

for (let i = 0; i < animals.length; i++) {
  animals[i].addEventListener('click', (event) => selectAnimal(event));
}

const fnx = () => {

  const name = document.getElementById("petName").value;
  //added alert if no pet name
  if (!name) {
    window.alert("Error!!! Please provide pet name");
    return;
  }

  if (selectedAnimal == 'tiger') {
    cyberAnimal = new Tiger(name);
    document.getElementById("tiger").style.display = "flex";
    document.getElementById("mouse").style.display = "none";
    document.getElementById("rabbit").style.display = "none";

  } else if (selectedAnimal == 'mouse') {
    cyberAnimal = new Mouse(name);
    document.getElementById("mouse").style.display = "flex";
    document.getElementById("tiger").style.display = "none";
    document.getElementById("rabbit").style.display = "none";

  } else {
    cyberAnimal = new Rabbit(name);
    document.getElementById("tiger").style.display = "none";
    document.getElementById("mouse").style.display = "none";
    document.getElementById("rabbit").style.display = "flex";
  }

  document.getElementById("petSelection").style.display = "none";
  document.getElementById("enquiry").style.display = "none";

  const ui = document.getElementById("main-ui");

  ui.style.display = "flex";
  document.getElementById("playAgain").style.display = "none";

  gamestart();
};

document.getElementById('playAgain').addEventListener("click", () => {
  document.getElementById('petName').value=""
  console.log(cyberAnimal)
  document.getElementById("tiger").style.display = "flex";
  document.getElementById("mouse").style.display = "flex";
  document.getElementById("rabbit").style.display = "flex";
  document.getElementById("enquiry").style.display = "flex";
  document.getElementById("petSelection").style.display = "flex";
  document.getElementById("playAgain").style.display = "none";

  const ui = document.getElementById("main-ui");
  ui.style.display = "none";

})

document.getElementById("submit").addEventListener("click", () => {
  fnx();
});

// const overlay = document.querySelector(".overlay");
// document.addEventListener("click", (e) => {
//   overlay.classList.add("hide");
// });

// //Testing

// const Test1 = new Tiger("bob");
// console.log(Test1.statistics[0].label)

// const Test2 = new Mouse("fred");
// console.log(Test2.statistics[0].label)

// const Test3 = new Rabbit("mark");
// console.log(Test3.statistics[0].label)

// console.log(Test3.changeStat('Hunger', -50));
// console.log(Test3.changeStat('Hunger', 20));

// console.log(Test3.statistics[0].value)

// console.log(Test3.getStat('Thirst'))
// clear
