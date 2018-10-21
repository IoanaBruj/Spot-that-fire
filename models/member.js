'use strict';

module.exports = function(sequelize, Sequelize) {
    let Member = sequelize.define('member', {
        
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        phone: {
            type: Sequelize.STRING,
            isNumeric: true, 
            len: [10]
        },

        location: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Member;
};