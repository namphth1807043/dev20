var Record = require("../models/record.model");
var mongoose = require('mongoose');
var myid = mongoose.Types.ObjectId;

exports.createRecord = function (req, res) {
    var record = new Record({
        userId: req.user.id,
        typeOfDisease: req.body.typeOfDisease,
        drug: req.body.drug,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') ,
        updateAt:  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        deleteAt:  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        status: '1',
    });
    record.save();
    // res.redirect(req.get('referer'));
    res.send(req.body.typeOfDisease + "-" + req.body.drug);
};

exports.listRecordAdmin = function (req, res) {
    Record.find({}, function (err, list) {
        res.render("admin/record.ejs", {
            "listRecord": list
        });
    });

};

exports.listRecord = function (req, res) {

    Record.find({userId: req.user.id}, function (err, list) {
        res.render("client/record.ejs", {
            user: req.user,
            "listRecord": list
        });

    });

};


exports.deleteRegister = function (req, res) {
    Booking.findByIdAndRemove(  myid(req.params.id), function(err) {
        if (err)
            res.send(err);
        else
            res.redirect(req.get('referer'));

    });

};

exports.updateRegister = function (req, res) {
    Booking.findByIdAndUpdate(req.params.id,req.body, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.redirect(req.get('referer'));
        }
    });
};

