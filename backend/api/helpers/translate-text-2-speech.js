module.exports = {
  friendlyName: "Translate text 2 speech",

  description: "",

  inputs: {
    text: {
      required: true,
      type: "string",
      description: "The text we want to get the locale output"
    },
    locale: {
      type: "string",
      required: true,
      description: "The desired local from the user"
    }
  },

  exits: {
    success: {
      description: "All done."
    }
  },

  fn: async function({ text, locale }) {
    const textToSpeech = require("@google-cloud/text-to-speech");
    // Import other required libraries
    const fs = require("fs");
    const util = require("util");
    // Creates a client
    const client = new textToSpeech.TextToSpeechClient();
    // The text to synthesize

    // Construct the request
    const request = {
      input: { text: text },
      voice: {
        languageCode: locale,
        ssmlGender: "MALE"
      },
      // Select the type of audio encoding
      audioConfig: {
        speakingRate: 0.8,
        audioEncoding: "MP3"
      }
    };

    // Performs the Text-to-Speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    // sails.log(response.audioContent.toString("base64"));
    // sails.log(typeof response);
    // await writeFile("voice.mp3", response.audioContent, "binary");
    // console.log("Audio content written to file: output.mp3");
    return response.audioContent.toString("base64");
  }
};
