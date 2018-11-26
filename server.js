const mocker = require('mocker-data-generator').default
const util = require('util');

const csvHandler = require('./Components/CSVHandler')

var user = {
    firstName: {
        faker: 'name.firstName'
    },
    lastName: {
        faker: 'name.lastName'
    },
    country: {
        faker: 'address.country'
    },
    createdAt: {
        faker: 'date.past'
    },
    username: {
        function: function() {
            return (
                this.object.lastName.substring(0, 5) +
                this.object.firstName.substring(0, 3) +
                Math.floor(Math.random() * 10)
            )
        }
    }
}
// var group = {
//     description: {
//         faker: 'lorem.paragraph'
//     },
//     users: [
//         {
//             function: function() {
//                 return this.faker.random.arrayElement(this.db.user).username
//             },
//             length: 10,
//             fixedLength: false
//         }
//     ]
// }
// var conditionalField = {
//     type: {
//         values: ['HOUSE', 'CAR', 'MOTORBIKE']
//     },
//     'object.type=="HOUSE",location': {
//         faker: 'address.city'
//     },
//     'object.type=="CAR"||object.type=="MOTORBIKE",speed': {
//         faker: 'random.number'
//     }
// }

mocker()
    .schema('user', user, 5)
    // .schema('group', group, 5)
    // .schema('conditionalField', conditionalField, 5)
    .build()
    .then(
        data => {
            // console.log(util.inspect(data, { depth: 10 }));
            const userList = data['user'];
            console.log(userList.length);
            csvHandler.writeData(userList)
        },
        err => console.error(err)
    )