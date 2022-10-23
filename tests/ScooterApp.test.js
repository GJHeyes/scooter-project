const User = require("../src/User")
const ScooterApp = require("../src/ScooterApp")
const Scooter = require("../src/Scooter")
describe('Tesing our ScooterApp class instance', ()=>{

    test('App sessions is added',()=>{
        const app = new ScooterApp()
        expect(ScooterApp.scooterSessions.length).toBe(1)
    })

    test('Creating the app works',()=>{
        const app = new ScooterApp()
        
        expect(app.stations).toStrictEqual({
            london:[],
            manchester:[],
            birmingham:[],
            liverpool:[],
            leeds:[]
        })

        expect(app.registeredUsers).toStrictEqual({})
    })
    test('Register a User',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)

        expect(app.registeredUsers.bob).toBeFalsy()
        expect(app.register(bob)).toBe("user has been registered")
        expect(app.registeredUsers.bob).toBeTruthy()
    })

    test("Register a User that's underage",()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,17)

        expect(app.register(bob)).toBe("too young to register!")
    })

    test("User already registered",()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,18)
        app.register(bob)

        expect(app.register(bob)).toBe("already registered!")
    })

 

    test("User logged in",()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)

        app.register(bob)

        expect(app.logIn("bob",1234)).toBe("User has logged in successfully")
    })

    test("User not logged in",()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)

        app.register(bob)

        expect(function (){app.logIn("bob",123)}).toThrow("Username or password is incorrect.")
    })

    test("Scooter can be added",()=>{
        const app = new ScooterApp()
        const scooter = new Scooter()

        app.addScooter("manchester", scooter)

        expect(scooter.station).toBe("manchester")
        expect(app.stations[scooter.station].length).toBe(1)
    })

    test("Scooter location does not exist",()=>{
        const app = new ScooterApp()
        const scooter = new Scooter()

        expect(function(){app.addScooter("newcastle", scooter)}).toThrow("Station does not exist")
    })

    test("Scooter can be removed",()=>{
        const app = new ScooterApp()
        const scooter = new Scooter()
        const scooter2 = new Scooter()

        app.addScooter("manchester", scooter)
        app.addScooter("manchester", scooter2)
        expect(app.removeScooter(scooter)).toBe('Scooter has successfully been removed')
        app.removeScooter(scooter2)

        expect(app.stations["manchester"].length).toBe(0)
    })

    test("Scooter can not be located",()=>{
        const app = new ScooterApp()
        const scooter = new Scooter()
        

        expect(function(){app.removeScooter(scooter)}).toThrow("Scooter is not located")
    })

    test('User can report scooter broken',()=>{
        const app = new ScooterApp()
        const bob = new User('bob',1234,19)
        const scooter = new Scooter("manchester",bob)
        app.addScooter("manchester",scooter)
        app.register(bob)

        app.scooterBroken(scooter, app)
        
        expect(app.stations[scooter.station].length).toBe(1) 
        expect(app.scooterBroken(scooter, app)).toBe('scooter is back online')
    })
})
