import { tlds } from './tlds';

export function checkTldUrl(url: string): boolean {
	if (!url || !url.length) {
		return false;
	}

	// strip
	url = url.replace(/^\s+/g,'').replace(/\s+$/g, '');

	if (!url || !url.length) {
		return false;
	}

	url = url.toLowerCase();

	let isOk = false;

	tlds.forEach(tld => {
		if (url.endsWith("." + tld)) {
			isOk = true;
		}
	});
	return isOk;
}

export function checkTldEmail(email : string) : boolean {
	if (!email || !email.length) {
		return false;
	}
	let domain = email.replace(/.*@/, "");
	return checkTldUrl(domain);
}

