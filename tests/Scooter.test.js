const User = require("../src/User")
const ScooterApp = require("../src/ScooterApp")
const Scooter = require("../src/Scooter")
describe('Tesing our scooter class instance', ()=>{
    test('Rent a Scooter',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        scooter.charge = 100
        app.register(bob)
        expect(scooter.rent()).toBe("Enjoy the Ride!") 
    })

    test('Rent a Scooter - Scooter low on charge',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        scooter.charge = 20
        app.register(bob)
        expect(function(){scooter.rent()}).toThrow("Scooter low on battery, please charge.") 
    })

    test('Rent a Scooter - Scooter broken',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        scooter.charge = 100
        scooter.isBroken = true
        app.register(bob)
        expect(function(){scooter.rent()}).toThrow("Scooter is broken, please send a repair request.") 
    })

    test('Dock a scooter',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("",bob)
        app.register(bob)
        scooter.dock("manchester")

        expect(scooter.station).toBe("manchester") 
    })

    test('Unable to dock a scooter',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        app.register(bob)
        
        expect(function(){scooter.dock()}).toThrow("Docking station required") 
    })

    test('Charge a scooter',async()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        app.register(bob)

        await scooter.recharge()
        
        expect(scooter.charge).toBe(100) 
    })



    test('Request a repair',async()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        app.register(bob)
        
        expect(await scooter.requestRepair()).toBe("Repair has been completed!") 
    })
})