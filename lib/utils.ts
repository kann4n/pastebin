export function generateBase62(n: number): string {
    const charset =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    const randomBytes = new Uint8Array(n);

    crypto.getRandomValues(randomBytes);

    for (let i = 0; i < n; i++) {
        result += charset[randomBytes[i] % 62];
    }

    return result;
}
