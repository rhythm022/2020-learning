// interface IDecoratorExample {
//     AnyoneCanRun(args: string): void;
//
//     AdminOnly(args: string): void;
// }
//
// function IsInRole(role: string): boolean {
//     return currentUser.roles.some(r => r.role === role)
// }
//
// class NoRoleCheck implements IDecoratorExample {
//     @Role('user')
//     AnyoneCanRun(args: string): void {
//         // if (!IsInRole('user')) return
//         console.log(args);
//     }
//
//     @Admin
//     AdminOnly(args: string): void {
//         // if(!IsInRole('admin'))return
//
//         console.log(args);
//
//     }
// }
//
//
// let currentUser = {
//     user: 'peter',
//     roles: [
//         {
//             role: 'user'
//         },
//         // {
//         //     role:'admin'
//         // },
//     ]
// }
//
//
// function TestDecorator(decorator: IDecoratorExample) {
//     console.log(`Current user ${currentUser.user}`)
//
//     decorator.AnyoneCanRun(`Running as user`)
//     decorator.AdminOnly(`Running as admin`)
// }
//
// TestDecorator(
//     new NoRoleCheck()
// )
//
// function Admin(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//     let originalMethod = descriptor.value
//     descriptor.value = function () {
//         if (!IsInRole('admin')) return
//         originalMethod.apply(this, arguments)
//     }
//
//
//     return descriptor
// }
//
//
// function Role(role: string) {
//     return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//         let originalMethod = descriptor.value
//         descriptor.value = function () {
//             if (!IsInRole(role)) return
//             originalMethod.apply(this, arguments)
//         }
//
//
//         return descriptor
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
