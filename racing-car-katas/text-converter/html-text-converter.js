var fs = require("fs");

class HtmlTextConverter {
  constructor(fullFilenameWithPath) {
    this._fullFilenameWithPath = fullFilenameWithPath;
    this.textContentIndex = 0;
    this.convertedLine = [];
    this.html = [];
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

  getHtml() {
    return this.html;
  }

  pushACharacterToTheOutput(characterToConvert) {
    this.addCharacterToConvertedLine(characterToConvert);
  }

  addANewLine(html) {
    var line = this.getConvertedLine().join("");
    html.push(line);
    this.resetConvertedLine();
  }

  convertToHtml() {
    const textContent = this.getTextContent();

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
          this.addANewLine(this.getHtml());
          break;
        default:
          this.pushACharacterToTheOutput(
            this.getCharacter(textContent, this.textContentIndex)
          );
      }

      this.increaseTextContentIndex();
    }

    this.addANewLine(this.getHtml());

    return this.getHtml().join("<br />");
  }
}

fs.writeFileSync("foo.txt", "This writes well");

module.exports = HtmlTextConverter;
