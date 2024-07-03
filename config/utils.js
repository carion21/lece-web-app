const moment = require('moment');
const { APP_NAME, APP_MENU } = require('./consts');
moment.locale("fr");

require('dotenv').config()


class Utils {

    constructor() {

    }

    static getEnvnow(req) {
        return req.app.settings.env
    }

    static getCoreUrl() {
        return process.env.CORE_URL
    }

    static getAppName() {
        return APP_NAME
    }

    static getAppMenu() {
        return APP_MENU
    }

    static getMoment() {
        return moment
    }


    static isInteger(value) {
        return typeof value === 'number' && Number.isInteger(value);
    }

    static isNumber(value) {
        return typeof value === 'number';
    }

    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    static isString(value) {
        return typeof value === 'string';
    }

    static isObject(value) {
        return value !== null && typeof value === 'object';
    }

    static isArray(value) {
        return value !== null && typeof value === 'object' && value.constructor === Array;
    }

    static isArrayOfString(value) {
        return Utils.isArray(value) && value.every(Utils.isString) && value.length > 0;
    }

    static isArrayOfObject(value) {
        return Utils.isArray(value) && value.every(Utils.isObject) && value.length > 0;
    }

    static isArrayOfInteger(value) {
        return Utils.isArray(value) && value.every(Utils.isInteger) && value.length > 0;
    }

    static isArrayOfNumber(value) {
        return Utils.isArray(value) && value.every(Utils.isNumber) && value.length > 0;
    }

    static isArrayOfBoolean(value) {
        return Utils.isArray(value) && value.every(Utils.isBoolean) && value.length > 0;
    }

    static isValidUrl(value) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
    }

    static validateServiceRoute(value) {
        const regex = /^(?!_)(?!.*_$)[a-zA-Z0-9_]+$/g;
        return regex.test(value)
    }

    /**
     * 
     * @param {*} str 
     * @returns 
     */
    static removeExtraSpace(str) {
        //str = str.replace(/[\s]{1,}/g, ""); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]{1,}/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]{1,}$/, ""); // Enlève les espaces à la fin
        return str;
    }

    static cleanBlank(str) {
        return String(str).split(' ').join('') || "NA"
    }

    /* static formatDate(str) {
        console.log(str);
        let ndate = new Date(str)
        return moment(ndate).format('YYYY-MM-DD')
    } */

    static formatDate(str) {
        return moment(str, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }

}

module.exports = Utils