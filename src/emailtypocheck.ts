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
	"gmx.at", "gmx.net", "gmx.com",]

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

	// Adjacency check here
	const options: Fuse.FuseOptions<Domain> = {
		keys: ['domain'],
		threshold: 0.17,
	};
	const fuse = new Fuse(indexed, options);
	const results = fuse.search(domain);

	return results.map(obj => { return name + "@" + obj.domain });
}

