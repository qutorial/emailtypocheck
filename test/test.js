var assert = require('assert');
var tlds = require('../dist/tldcheck.js');

describe('Basic function invocations', function () {

    it('Simple case', function () {
        assert.equal(true, tlds.checkTldUrl("hello.ru"));
    });

    it('Correct tlds', function () {
        assert.equal(true, tlds.checkTldUrl("hello.ru"));
        assert.equal(true, tlds.checkTldEmail("test@mail.ru"))
        assert.equal(true, tlds.checkTldUrl("mail2.ru "));
        assert.equal(true, tlds.checkTldEmail("test@mail.ru "))
        assert.equal(true, tlds.checkTldUrl(" mail.ru "));
        assert.equal(true, tlds.checkTldEmail(" test@mail.ru "))

        assert.equal(true, tlds.checkTldUrl("mail.ru".toUpperCase()));
        assert.equal(true, tlds.checkTldEmail("test@mail.ru".toUpperCase()));
    });

    it('Corner cases', function () {
        assert.equal(false, tlds.checkTldUrl("rus"));
        assert.equal(false, tlds.checkTldEmail("rus"))

        assert.equal(false, tlds.checkTldUrl(""));
        assert.equal(false, tlds.checkTldUrl(null));

        assert.equal(false, tlds.checkTldEmail(""));
        assert.equal(false, tlds.checkTldEmail(null));

        assert.equal(false, tlds.checkTldEmail("."));
        assert.equal(false, tlds.checkTldUrl("."));
        assert.equal(false, tlds.checkTldEmail("@."));
        assert.equal(false, tlds.checkTldUrl("@"));
    });

    it('Incorrect tlds', function () {
        assert.equal(false, tlds.checkTldUrl("mail.dede"));
        assert.equal(false, tlds.checkTldEmail("test@gmail.dede"));

        assert.equal(false, tlds.checkTldUrl("mail.dea"));
        assert.equal(false, tlds.checkTldEmail("test@gmail.dea"));

        assert.equal(false, tlds.checkTldUrl("freenet"));
        assert.equal(false, tlds.checkTldEmail("test@freenet"));

        assert.equal(false, tlds.checkTldUrl("mail.den"));
        assert.equal(false, tlds.checkTldEmail("test@gmail.den"));

        assert.equal(false, tlds.checkTldUrl("gmx.m"));
        assert.equal(false, tlds.checkTldEmail("test@gmX.m"));

        assert.equal(false, tlds.checkTldUrl("web"));
        assert.equal(false, tlds.checkTldEmail("test@web"));
    });

    it('Typical emails', function(){        
        assert.equal(true, tlds.checkTldEmail("test@mail.ru"));
        assert.equal(true, tlds.checkTldEmail("test@gmx.de"));
        assert.equal(true, tlds.checkTldEmail("test@t-online.de"));
        assert.equal(true, tlds.checkTldEmail("test@gmail.com"));
        assert.equal(true, tlds.checkTldEmail("test@freenet.de"));
        assert.equal(true, tlds.checkTldEmail("test@freenet.com"));
        assert.equal(true, tlds.checkTldEmail("test@web.de"));
        assert.equal(true, tlds.checkTldEmail("test@einsundeins.de"));
    });

});