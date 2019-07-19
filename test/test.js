mocha = require('mocha');
chai = require('chai');
var assert = require('assert');
const expect = chai.expect;

var etc = require('../dist/emailtypocheck.js');

describe('Basic function invocations', function () {

    // eql is deep array comparison

    it('Simple happy cases', function () {
        expect([]).to.eql(etc.checkEmailTypos("test@hello.ru"));
        expect([]).to.eql(etc.checkEmailTypos("test@gmail.com"));
        expect([]).to.eql(etc.checkEmailTypos("test@Googlemail.com"));
        expect([]).to.eql(etc.checkEmailTypos("test@gmx.de"));
    });

    it('Correction cases', function () {
        expect(etc.checkEmailTypos("test@gmsil.com")).to.eql(["test@gmail.com", "test@googlemail.com"]);
        expect(etc.checkEmailTypos("test@gmail")).to.eql(["test@gmail.com", "test@googlemail.com"]);
        expect(etc.checkEmailTypos("test@Googlmail.com")).to.eql(["test@googlemail.com"]);
        expect(etc.checkEmailTypos("test@gmx")).to.eql(["test@gmx.de", "test@gmx.at", "test@gmx.net", "test@gmx.com"]);
        expect(etc.checkEmailTypos("thomas@gxm.net")).to.eql(["thomas@gmx.net"]);
    });

});