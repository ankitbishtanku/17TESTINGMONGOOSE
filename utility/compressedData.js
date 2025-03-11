const zlib = require('zlib')

module.exports = {
	compressData: (data) =>{
	    return new Promise((resolve, reject) => {
	        zlib.brotliCompress(data, (err, compressedData) => {
	            if (err) reject(err);
	            else resolve(compressedData);
	        });
	    });
	},
	decompressData: (compressedData) =>{
	    return new Promise((resolve, reject) => {
	        zlib.brotliDecompress(compressedData, (err, decompressedData) => {
	            if (err) reject(err);
	            else resolve(decompressedData.toString());  // Convert buffer to string
	        });
	    });
	},
	getStringSizeInKB:(str)=>{
		const sizeInBytes = getStringSizeInBytes(str);
		return sizeInBytes / 1024;  // Convert bytes to KB
	}
}

function getStringSizeInBytes (str){
	// Create a Blob from the string
	const encoder = new TextEncoder();  // This uses UTF-8 encoding
	const encoded = encoder.encode(str);
	return encoded.length;  // Return the byte length
}