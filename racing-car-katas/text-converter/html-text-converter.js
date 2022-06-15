var fs = require("fs");

class HtmlTextConverter {
  constructor(fullFilenameWithPath) {
    this._fullFilenameWithPath = fullFilenameWithPath;
    this.textContentIndex = 0;
    this.convertedLine = [];
  }

  resetConvertedLine() {
    this.convertedLine = [];
  }

  addCharacterToConvertedLine(character) {
    this.convertedLine.push(character);
  }

  increaseTextContentIndex() {
    this.textContentIndex++;
  }

  getTextContent() {
    return fs
      .readFileSync(`${__dirname}${this._fullFilenameWithPath}`)
      .toString();
  }

  getConvertedLine() {
    return this.convertedLine;
  }

  getFilename() {
    return this._fullFilenameWithPath;
  }

  getCharacter(textContent, textContentIndex) {
    return textContent.charAt(textContentIndex);
  }

  pushACharacterToTheOutput(characterToConvert) {
    this.addCharacterToConvertedLine(characterToConvert);
  }

  convertToHtml() {
    const textContent = this.getTextContent();
    const result = [];

    while (this.textContentIndex <= textContent.length) {
      switch (this.getCharacter(textContent, this.textContentIndex)) {
        case "<":
          this.addCharacterToConvertedLine("&lt;");
          break;
        case ">":
          this.addCharacterToConvertedLine("&gt;");
          break;
        case "&":
          this.addCharacterToConvertedLine("&amp;");
          break;
        case "\n":
          result.push(this.getConvertedLine().join(""));
          this.resetConvertedLine();
          break;
        default:
          this.pushACharacterToTheOutput(
            this.getCharacter(textContent, this.textContentIndex)
          );
      }

      this.increaseTextContentIndex();
    }

    result.push(this.getConvertedLine().join(""));
    this.resetConvertedLine();

    return result.join("<br />");
  }
}

fs.writeFileSync("foo.txt", "This writes well");

module.exports = HtmlTextConverter;
