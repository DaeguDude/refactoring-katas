var fs = require("fs");

// HtmlTextConverter = function (fullFilenameWithPath) {
//   this._fullFilenameWithPath = fullFilenameWithPath;
// };

// First, I need to know how program does work....
// Write a good name so I can abstract?

// I want to first tackle good names..

// HtmlTextConverter.prototype = {

//   convertToHtml: function () {
//     const textContent = fs
//       .readFileSync(`${__dirname}${this._fullFilenameWithPath}`)
//       .toString();

//     const stashNextCharacterAndAdvanceThePointer = function () {
//       const character = textContent.charAt(textContentIndex);
//       textContentIndex += 1;
//       return character;
//     };

//     var addANewLine = function () {
//       var line = convertedLine.join("");
//       html.push(line);
//       convertedLine = [];
//     };

//     var pushACharacterToTheOutput = function () {
//       convertedLine.push(characterToConvert);
//     };

//     var textContentIndex = 0;
//     var html = [];
//     var convertedLine = [];
//     var characterToConvert = stashNextCharacterAndAdvanceThePointer();

//     while (textContentIndex <= textContent.length) {
//       switch (characterToConvert) {
//         case "<":
//           convertedLine.push("&lt;");
//           break;
//         case ">":
//           convertedLine.push("&gt;");
//           break;
//         case "&":
//           convertedLine.push("&amp;");
//           break;
//         case "\n":
//           addANewLine();
//           break;
//         default:
//           pushACharacterToTheOutput();
//       }

//       characterToConvert = stashNextCharacterAndAdvanceThePointer();
//     }

//     addANewLine();

//     console.log({ textContentIndex, html, convertedLine, characterToConvert });

//     console.log("joined html: ", html.join("<br />"));
//     return html.join("<br />");
//   },

//   getFilename: function () {
//     return this._fullFilenameWithPath;
//   },
// };

class HtmlTextConverter {
  constructor(fullFilenameWithPath) {
    this._fullFilenameWithPath = fullFilenameWithPath;
    this.textContentIndex = 0;
  }

  increaseTextContentIndex() {
    this.textContentIndex++;
  }

  convertToHtml() {
    const textContent = fs
      .readFileSync(`${__dirname}${this._fullFilenameWithPath}`)
      .toString();

    const stashNextCharacterAndAdvanceThePointer = () => {
      const character = textContent.charAt(this.textContentIndex);
      this.increaseTextContentIndex();
      return character;
    };

    var addANewLine = function () {
      var line = convertedLine.join("");
      html.push(line);
      convertedLine = [];
    };

    var pushACharacterToTheOutput = function () {
      convertedLine.push(characterToConvert);
    };

    var html = [];
    var convertedLine = [];
    var characterToConvert = stashNextCharacterAndAdvanceThePointer();

    while (this.textContentIndex <= textContent.length) {
      switch (characterToConvert) {
        case "<":
          convertedLine.push("&lt;");
          break;
        case ">":
          convertedLine.push("&gt;");
          break;
        case "&":
          convertedLine.push("&amp;");
          break;
        case "\n":
          addANewLine();
          break;
        default:
          pushACharacterToTheOutput();
      }

      characterToConvert = stashNextCharacterAndAdvanceThePointer();
    }

    addANewLine();

    console.log({ html, convertedLine, characterToConvert });
    console.log("this.textContentIndex", this.textContentIndex);

    console.log("joined html: ", html.join("<br />"));
    return html.join("<br />");
  }

  getFilename() {
    return this._fullFilenameWithPath;
  }
}

fs.writeFileSync("foo.txt", "This writes well");

module.exports = HtmlTextConverter;
