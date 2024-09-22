"use strict";
// import testModules from './test-module';
// import '../css/app.css';
// import '../scss/index.scss';
Object.defineProperty(exports, "__esModule", { value: true });
var mock_1 = require("./mock/mock");
var serializeUserArray_1 = require("./serializeUserArray");
var users = (0, serializeUserArray_1.connect)((0, serializeUserArray_1.serializeUserArray)(mock_1.randomUserMock), (0, serializeUserArray_1.serializeUserArray)(mock_1.additionalUsers));
console.log(users);
// users.map((user) => validateUser(user)).forEach(console.log);
// console.log("Filtered users:");
// console.log(filterUsersBy(users,
//     [
//         {
//             value: "male",
//             key: "gender"
//         },
//         {
//             value: 65,
//             key: "age"
//         },
//         {
//             value: "esat.koyluoglu@example.com",
//             key: "email"
//         }
//     ]
// ))
// console.log("Sorted users:");
// console.log(sortUsersBy(users,
//     {
//         key: "age",
//         order: "asc"
//     }
// ))
// console.log("Search user:");
// console.log(searchOneBy(users, [
//     {
//         key: "age",
//         greaterThanEquals: 65
//     }
// ]))
// console.log(searchManyBy(users, [
//     {
//         key: "age",
//         greaterThanEquals: 65,
//         lessThanEquals: 70
//     },
//     {
//         key: "gender",
//         equals: "male"
//     }
// ]))
// console.log("Get interest:");
// console.log(getInterest(users, [
//     {
//         key: "age",
//         greaterThan: 30
//     },
//     {
//         key: "gender",
//         equals: "other"
//     }
// ]) + "%");
