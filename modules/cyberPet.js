import { Animal, Tiger, Rabbit, Mouse, Stat } from "./animals.js";

let cyberAnimal = null;

// const overlay = document.querySelector(".overlay");
// document.addEventListener("click", (e) => {
//   overlay.classList.add("hide");
// });

const gamestart = () => {
  //U.I. constants
  const ui = document.getElementsByTagName("interface")[0];
  const statDisplay = document.getElementsByTagName("statDisplay")[0];
  const refreshSpeed = 50; //milliseconds
  const devalueSpeed = 100; //milliseconds
  const devalueMax = 5; //percentage
  const statGains = 10; //percentage stat increase
  const gradBars = [];

  document.getElementById(
    "petDisplay"
  ).innerHTML = `Pet's Name: ${cyberAnimal.name}`;

  //Functions
  const buildAnimalControl = (controlAnimal) => {
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
      if (isEnd() === true) {
        stopTimers();
        console.log(cyberAnimal.endLabel);
        console.log("game over");
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

    const alive = cyberAnimal.isAlive();
    if (!alive) {
      document.getElementById(
        "petDisplay"
      ).innerHTML = cyberAnimal.endLabel;
    }
  };

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
    cyberAnimal.changeStat(args, statGains);
  };

  //Program Flow

  // this should be replaced with a selection method from MRs

  buildAnimalControl(cyberAnimal);

  //Async timers

  let refreshInterval = setInterval(refreshStats, refreshSpeed);

  let devalueInterval = setInterval(devalue, devalueSpeed);
};

const fnx = () => {
  const tiger = document.getElementById("tiger");
  const mouse = document.getElementById("mouse");
  const rabbit = document.getElementById("rabbit");

  const name = document.getElementById("petName");
  console.log(name.value);
  if (!name.value) {
    alert("Please provide name");
    return;
  }

  const petName = name.value;

  if (tiger.checked) {
    cyberAnimal = new Tiger(petName);
  } else if (mouse.checked) {
    cyberAnimal = new Mouse(petName);
  } else if (rabbit.checked) {
    cyberAnimal = new Rabbit(petName);
  } else {
    alert("PLease select pet type");
    return;
  }

  document.getElementById("petSelection").style.display = "none";
  document.getElementById("pet").style.display = "none";
  document.getElementById("name_section").style.display = "none";

  const ui = document.getElementById("main-ui");

  ui.style.display = "flex";

  gamestart();
};

document.getElementById("submit").addEventListener("click", () => {
  fnx();
});

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
