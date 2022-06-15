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

  getResult(convertedLines) {
    return convertedLines.join("<br />");
  }

  convertToHtml() {
    const textContent = this.getTextContent();
    const convertedLines = [];

    // TODO: What can I do with this? It seems a bit messy
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
          // TODO: What about this? There is a duplication
          convertedLines.push(this.getConvertedLine().join(""));
          this.resetConvertedLine();
          break;
        default:
          this.addCharacterToConvertedLine(
            this.getCharacter(textContent, this.textContentIndex)
          );
      }

      this.increaseTextContentIndex();
    }

    convertedLines.push(this.getConvertedLine().join(""));

    return this.getResult(convertedLines);
  }
}

fs.writeFileSync("foo.txt", "This writes well");

module.exports = HtmlTextConverter;
