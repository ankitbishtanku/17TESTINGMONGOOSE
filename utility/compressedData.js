const zlib = require('zlib')

module.exports = {
	/**
	 * Compresses the given data using Brotli algorithm.
	 * @param {Buffer|string} data - Data to be compressed.
	 * @returns {Promise<Buffer>} - Promise that resolves with the compressed data.
	 */
	compressData: (data) => {
		return new Promise((resolve, reject) => {
			zlib.brotliCompress(data, (err, compressedData) => {
				if (err) reject(err);
				else resolve(compressedData);
			});
		});
	},
	/**
	 * Decompresses the given data using Brotli algorithm.
	 * @param {Buffer} compressedData - The compressed data to be decompressed.
	 * @returns {Promise<string>} - Promise that resolves with the decompressed data as a string.
	 */
	decompressData: (compressedData) => {
		return new Promise((resolve, reject) => {
			zlib.brotliDecompress(compressedData, (err, decompressedData) => {
				if (err) reject(err);
				else resolve(decompressedData.toString());  // Convert buffer to string
			});
		});
	},
	/**
	 * Returns the size of a string in Kilobytes.
	 * @param {string} str - The string to measure the size of.
	 * @returns {number} - The size of the string in Kilobytes.
	 */
	getStringSizeInKB: (str) => {
		const sizeInBytes = getStringSizeInBytes(str);
		return sizeInBytes / 1024;  // Convert bytes to KB
	}
}

/**
 * Calculates the size of a given string in bytes using UTF-8 encoding.
 * @param {string} str - The string whose size is to be calculated.
 * @returns {number} - The size of the string in bytes.
 */

function getStringSizeInBytes(str) {
	// Create a Blob from the string
	const encoder = new TextEncoder();  // This uses UTF-8 encoding
	const encoded = encoder.encode(str);
	return encoded.length;  // Return the byte length
}