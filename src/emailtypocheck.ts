// Requires --esModuleInterop compiler flag!
// import * as Fuse with '--allowSyntheticDefaultImport'
// or import Fuse = require('fuse.js') with neither
import Fuse from 'fuse.js';

type Domain = {
	domain: string,
	index: number
}

export enum ErrorCode {
	WrongEmailFormat = 1,
	WrongDomainFormat
}

export class EmailValidationError extends Error {
	constructor(errorCode: ErrorCode) {
		super("Invalid email in check typos: " + errorCode); // 'Error' breaks prototype chain here
	}
}

let well_known_domains = ["gmx.de", "gmail.com", "t-online.de", "freenet.de", "yahoo.de",
	"yahoo.com", "googlemail.com", "icloud.com", "apple.com", "1und1.de", "outlook.com", "web.de",
	"gmx.at", "gmx.net", "gmx.com"]
	

const common_typos = new Map(Object.entries({"gxm.de": "gmx.de", "gmsil.com":"gmail.com", "g-mail.com": "gmail.com", "tonline.de": "t-online.de", "t.online.de": "t-online.de", "frenet.de": "freenet.de", "yaho.de": "yahoo.de",
	"g.mail.com": "gmail.com", "gemail.com": "gmail.com", "gmaol.com": "gmail.com", "gmil.com" : "gmail.com", "wbe.de": "web.de", "gmial.com": "gmail.com", 
	"yshoo.com": "yahoo.com", "goglemail.com" : "googlemail.com", "iclaud.com": "icloud.com", "aple.com": "apple.com", "1-und-1.de": "1und1.de", "outlok.com": "outlook.com", 
	"wen.de": "web.de",	"gmx.ta": "gmx.at", "gxm.net": "gmx.net", "gxm.com": "gmx.com", "web.de.de": "web.de"}));


let indexed = well_known_domains.map((value, index) => { return { index: index, domain: value } as Domain });

export function checkEmailTypos(email: string): string[] {

	if (!email || !email.length) {
		throw new EmailValidationError(ErrorCode.WrongEmailFormat)
	}

	let name = email.replace(/@.*/, "");
	let domain = email.replace(/.*@/, "");

	if (!domain || !domain.length) {
		throw new EmailValidationError(ErrorCode.WrongDomainFormat);
	}

	domain = domain.replace(/^\s+/g, '').replace(/\s+$/g, '');

	if (!domain || !domain.length) {
		throw new EmailValidationError(ErrorCode.WrongDomainFormat);
	}

	domain = domain.toLowerCase();

	if (well_known_domains.indexOf(domain) >= 0) {
		// All is well;
		return [];
	}

	if (common_typos.has(domain)){
		return [name +  "@" + (common_typos.get(domain) || "")];
	}
	// Adjacency check here
	const options: Fuse.FuseOptions<Domain> = {
		keys: ['domain'],
		threshold: 0.38,
	};
	const fuse = new Fuse(indexed, options);
	const results = fuse.search(domain);

	return results.map(obj => { return name + "@" + obj.domain });
}

