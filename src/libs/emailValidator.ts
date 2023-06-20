const emailRegExp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

export function isEmail(email: string) {
    return emailRegExp.test(email);
}
