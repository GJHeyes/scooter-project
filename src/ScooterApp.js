const User = require("./User")

class ScooterApp{
    static scooterSessions = []

    constructor(){
        this.stations = {
            london:[],
            manchester:[],
            birmingham:[],
            liverpool:[],
            leeds:[]
        }
        this.registeredUsers = {}
        ScooterApp.scooterSessions.push(ScooterApp)
    }

    register(user){
        if(user.age > 17){
            if(this.registeredUsers[user.username]){
                /*console.log*/return ('already registered!')
            }
            else{ 
                this.registeredUsers[user.username] = {
                    password: user.password,
                    age: user.age,
                    loggedIn: false,
                    accountChange: 0
                }
                /*console.log*/return ("user has been registered")
            }
        }
        else{
            /*console.log*/return ('too young to register!')
        }
    }

    logIn(username, password){
        if(this.registeredUsers[username] && this.registeredUsers[username].password === password){
            this.registeredUsers[username].loggedIn = true
            /*console.log*/return ("User has logged in successfully")
        }
        else{
            throw "Username or password is incorrect."
        }
    }

    addScooter(station, scooter){

        if(this.stations.hasOwnProperty(station)){
            scooter.station = station
            this.stations[station].push(scooter)
        }else{
            throw "Station does not exist"
        }
    }

    removeScooter(scooterToRemove){
        for(let station in this.stations){
            let scooterArray = this.stations[station]
            for(let scooter of scooterArray){
                if(scooter.serial === scooterToRemove.serial){
                    scooterArray.splice(scooterArray.indexOf(scooterToRemove),1)  
                    //this.stations[station] = scooterArray - why is this line not needed? How do i test console
                    /*console.log*/return ("Scooter has successfully been removed")
                }
            }
        } 
        throw "Scooter is not located"
    }


    scooterBroken(scooter,scooterApp){
        if(scooter.isBroken === false){
            scooter.isBroken = true
            scooterApp.removeScooter(scooter)
            scooter.requestRepair()
            scooter.isBroken = false
            scooterApp.addScooter(scooter.station,scooter)
            /*console.log*/ return "scooter is back online"
        }
    }
}

module.exports = ScooterApp