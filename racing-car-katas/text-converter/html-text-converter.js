var fs = require("fs");

class HtmlTextConverter {
  constructor(fullFilenameWithPath) {
    this._fullFilenameWithPath = fullFilenameWithPath;
    this.textContentIndex = 0;
  }

  increaseTextContentIndex() {
    this.textContentIndex++;
  }

  getTextContent() {
    return fs
      .readFileSync(`${__dirname}${this._fullFilenameWithPath}`)
      .toString();
  }

  getFilename() {
    return this._fullFilenameWithPath;
  }

  getCharacter(textContent, textContentIndex) {
    return textContent.charAt(textContentIndex);
  }

  convertToHtml() {
    const textContent = this.getTextContent();

    var addANewLine = function () {
      var line = convertedLine.join("");
      html.push(line);
      convertedLine = [];
    };

    var pushACharacterToTheOutput = function (characterToConvert) {
      convertedLine.push(characterToConvert);
    };

    var html = [];
    var convertedLine = [];

    while (this.textContentIndex <= textContent.length) {
      switch (this.getCharacter(textContent, this.textContentIndex)) {
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
          pushACharacterToTheOutput(
            this.getCharacter(textContent, this.textContentIndex)
          );
      }

      this.increaseTextContentIndex();
    }

    addANewLine();

    return html.join("<br />");
  }
}

fs.writeFileSync("foo.txt", "This writes well");

module.exports = HtmlTextConverter;
