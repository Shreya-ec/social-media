const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,  // imagekit privatekey
});

async function uploadFile(buffer) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"), // convert buffer to base64 string
    fileName: "image.jpg",
  });

  return result;
}

module.exports = uploadFile;