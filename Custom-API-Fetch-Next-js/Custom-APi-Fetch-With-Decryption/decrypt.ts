// utils/decrypt.ts
import CryptoJS from "crypto-js";


const deriveKey = (secret: string) => {
    if (!secret) throw new Error("AES_SECRET_KEY is required");
    return CryptoJS.SHA256(secret);
};


const deriveIV = (ivString: string) => {
    if (!ivString) throw new Error("AES_IV is required");
    return CryptoJS.MD5(ivString);
};


export const decryptResponse = (
    encryptedResponse: any,
    secretKey: string,
    iv: string
) => {
    try {
        if (!encryptedResponse?.ciphertext) {
            throw new Error("Invalid encrypted response format");
        }


        const key = deriveKey(secretKey);
        const derivedIV = deriveIV(iv);


        const decrypted = CryptoJS.AES.decrypt(
            encryptedResponse.ciphertext,
            key,
            {
                iv: derivedIV,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );


        const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);


        if (!decryptedStr) {
            throw new Error("Empty decrypt result (wrong key/iv)");
        }


        return JSON.parse(decryptedStr);
    } catch (error: any) {
        console.error("Decrypt error:", error);
        throw error;
    }
};
