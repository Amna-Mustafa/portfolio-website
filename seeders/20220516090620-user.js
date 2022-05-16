const bcrypt = require("bcrypt");

const password = "password";
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      password: hash,
      image: 'abc.jpg',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie risus enim, ut lacinia nibh porttitor a.',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};