let currentUser = {
    user: 'peter',
    roles: [
        {
            role: 'user'
        },
        // {
        //     role:'admin'
        // },
    ]
}

function Role(role:string) {
    return function (constructor:Function) {
        if(!IsInRole(role)){
            throw new Error(`The user not authorized`)
        }
    }
}

@Role('user')
class RestrictedClass{
    constructor() {
        console.log(`Inside the constructor`)
    }
}

function IsInRole(role: string): boolean {
    return currentUser.roles.some(r => r.role === role)
}

const restrictedClass = new RestrictedClass()

console.log(restrictedClass)
