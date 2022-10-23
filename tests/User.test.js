const User = require("../src/User")
describe('Tesing our User class instance', ()=>{
    test('create a user - username',()=>{
        const bob = new User('bob',1234,19)
        expect(bob.username).toBe("bob") 
    })
    test('create a user - password',()=>{
        const bob = new User('bob',1234,19)
        expect(bob.password).toBe(1234) 
    })
    test('create a user - age',()=>{
        const bob = new User('bob',1234,19)
        expect(bob.age).toBe(19) 
    })
})