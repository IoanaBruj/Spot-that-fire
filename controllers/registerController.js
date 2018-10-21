'use strict';

// let Member = require('../models/member');
let models = require('../models');
exports = module.exports ={}

exports.register = function (req, res) {
    let Member = models['member'];
    Member
    .findOne({where: {email: req.body.mail}})
        .then(function (user) {
            if (user) {
                req.flash('danger', 'This e-mail is already in use :(');
                return res.redirect('/');
            } else {
                let memberData = {
                    name: req.body.name,
                    email: req.body.mail,
                    phone: req.body.number,
                    location: req.body.location
                };
                
                Member.create(memberData).then(function(newMember, created) {
                    if (!newMember) {
                        req.flash('danger', 'Invalid input :(');
                        return res.redirect('/');
                    }
                    console.log(newMember.dataValues);
                    req.flash('success', 'Thank you for registering :)');
                    return res.redirect('/');
                }).catch(function(err) {
                    console.log(err);
                    req.flash('danger', 'Invalid input :(');
                    return res.redirect('/');
                });
            }
        })
}
