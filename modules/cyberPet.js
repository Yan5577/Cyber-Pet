const {Animal, Tiger, Rabbit, Mouse, Stat} = require('./animals.js')

//Testing

const Test1 = new Tiger("bob");
console.log(Test1.statistics[0].label)

const Test2 = new Mouse("fred");
console.log(Test2.statistics[0].label)

const Test3 = new Rabbit("mark");
console.log(Test3.statistics[0].label)

console.log(Test3.changeStat('Hunger', -50));
console.log(Test3.changeStat('Hunger', 20));

console.log(Test3.statistics[0].value)

console.log(Test3.getStat('Thirst'))
clear
