// import testModules from './test-module';
// import '../css/app.css';
// import '../scss/index.scss';

import {additionalUsers, randomUserMock} from "./mock/mock";
import {connect, serializeUserArray} from "./serializeUserArray";
import UnserializedUser from "./types/UnserializedUser";
import validateUser from "./validateUser";
import filterUsersBy from "./filterUsersBy";
import sortUsersBy from "./sortUsersBy";
import {searchOneBy, searchManyBy} from "./searchBy";
import getInterest from "./getInterest";

const users = connect(
    serializeUserArray(randomUserMock as any as UnserializedUser[]),
    serializeUserArray(additionalUsers as any as UnserializedUser[])
);

// console.log(users);

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
