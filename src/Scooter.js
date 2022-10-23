const ScooterApp = require("./ScooterApp")

class Scooter{
    constructor(station,user){
        this.station = station
        this.user = user
        this.serial = Math.ceil(Math.random()*1000)
        this.charge = Math.ceil(Math.random()*100)
        this.isBroken = false
        this.docked = true
        this.range = (32 * (this.charge/100)).toFixed(2)
    }

    rent(){
        if(this.isBroken === false && this.charge > 20){
            this.docked = false
            /*console.log*/ return ("Enjoy the Ride!")
        }else if(this.isBroken  === false && this.charge <=20){
            throw "Scooter low on battery, please charge."
        }
        else{
            throw "Scooter is broken, please send a repair request."
        }
    }

    dock(station){
        if(station !== undefined){
            this.station = station
            this.docked = true
            this.user = ""
        }else{
            throw "Docking station required"
        }
    }

    async recharge(){
       
        console.log("Starting Charge")
        await new Promise(resolve => setTimeout(resolve,2000))
        this.charge = 100
        console.log('Charge complete')
        
    }


    async requestRepair(){
        // function repair(){
        //     console.log("Repair has been completed!")
        //     clearInterval(repair)
        // }
        // setInterval(repair, 10000)

        await new Promise(resolve => setTimeout(resolve,2000))
        /*console.log*/ return ("Repair has been completed!")
    }
}

module.exports = Scooter