class Stat  {
    constructor(name, value, label) {
        this.name = name;
        this.value = value,
        this.label = label
    }
}

class Animal{
    constructor(name){
        this.statistics = [];
        this.name = name;  
    }

    changeStat(stat, value) {
        let toAdjust = this.statistics.find((s) => s.name === stat);
        toAdjust.value += value;
        if (toAdjust.value>100) toAdjust.value = 100;
        if (toAdjust.value<0) toAdjust.value = 0;
        return [toAdjust.name, toAdjust.value];
    }

     getStat(value) { return (this.statistics.find((s) => s.name === value))}

}

class Tiger extends Animal {
    constructor(name,statistics){
        super(name, statistics)
          this.statistics =  [
            new Stat('Hunger', 100, 'Feed some meat'),
            new Stat('Thirst', 100, 'Give a drink of water'),
            new Stat('tiredness', 100, 'put in a straw bed'),
            new Stat('Happiness', 100, 'take on a hunt')
        ];
        this.endLabel = `${name} ate you and roamed free`
    }
}

class Rabbit extends Animal {
    constructor(name,statistics){
        super(name, statistics)
        this.statistics =  [
            new Stat('Hunger', 100, 'Feed some grass'),
            new Stat('Thirst', 100, 'Give a drink of water'),
            new Stat('tiredness', 100, 'put in a hutch to sleep'),
            new Stat('Happiness', 100, `bounce around with ${name}`)
        ];
        this.endLabel = `${name} dug a burrow and vanished`
    }


}

class Mouse extends Animal {
    constructor(name,statistics){
        super(name, statistics)
        this.statistics =  [
            new Stat('Hunger', 100, 'Feed some nuts'),
            new Stat('Thirst', 100, 'Give a drink of water'),
            new Stat('tiredness', 100, 'put in a cage to sleep'),
            new Stat('Happiness', 100, `throw a toy for ${name}`)
        ];
        this.endLabel = `${name} escaped and was eaten by a cat`   
    }
}

export {Animal, Tiger, Rabbit, Mouse, Stat};