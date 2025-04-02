const crypto = require("crypto");

// Use a fixed key (Must be 32 bytes for AES-256)
const SECRET_KEY = Buffer.from("12345678901234567890123456789012", "utf-8"); // Replace with a secure key

// Use a fixed IV (Must be 16 bytes)
const IV = Buffer.from("1234567890123456", "utf-8"); // Replace with a secure IV

const ALGORITHM = "aes-256-cbc";

function encrypt(text) {
    let cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

// Decrypt function (Base64 instead of hex)
function decrypt(text) {
    let decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, IV);
    let decrypted = decipher.update(text, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { encrypt, decrypt };
