// TODO: Import some external library for encryption and use it here

export class EncryptionService {
  /**
   * Encrypts the given string that has already been base64 encoded.
   * @param encodedString
   * @returns {string}
   */
  static encrypt(encodedString: string): string {
    // TODO: Do encryption here
    return encodedString;
  }

  /**
   * Decrypts the given string into a base64-encoded string.
   * @param encryptedString
   * @returns {string}
   */
  static decrypt(encryptedString: string): string {
    // TODO: Do decryption here
    return encryptedString;
  }

  /**
   * Encodes the given string with base64 encoding.
   * @param str
   * @returns {string}
   */
  static encode(str: string): string {
    // TODO: Do base64 encoding here
    return str;
  }

  /**
   * Decodes a base64-encoded string.
   * @param str
   * @returns {string}
   */
  static decode(str: string): string {
    // TODO: Do base64 decoding here
    return str;
  }
}
