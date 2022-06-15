const fs = require("fs");
var HtmlTextConverter = require("../text-converter/html-text-converter.js");

describe("Html Converter", function () {
  describe("HtmlTextConverter", function () {
    it("file name works well", function () {
      var converter = new HtmlTextConverter("/foo.txt");
      expect(converter.getFilename()).toBe("/foo.txt");
      converter.convertToHtml();
    });

    it("converts '&' to '&amp;'", function () {
      var converter = new HtmlTextConverter("/ampersand.txt");
      expect(converter.convertToHtml()).toBe(
        "Tom &amp; Jerry was one of my favorite tv show when I was young."
      );
    });

    it("converts '<' to '&lt;'", function () {
      var converter = new HtmlTextConverter("/lessThan.txt");

      expect(converter.convertToHtml()).toBe(
        "What does this will yield in javascript? '0 &lt; 3'"
      );
    });

    it("converts '>' to '&gt;'", function () {
      var converter = new HtmlTextConverter("/greaterThan.txt");

      expect(converter.convertToHtml()).toBe(
        "What does this will yield in javascript? '5 &gt; 7'"
      );
    });

    it("converts the new line well", function () {
      var converter = new HtmlTextConverter("/newLine.txt");

      expect(converter.convertToHtml()).toBe("Ahoi!<br />I am Daegudude.");
    });

    it("Normal text isn't converted to anything", function () {
      var converter = new HtmlTextConverter("/normal.txt");

      expect(converter.convertToHtml()).toBe("We are refactoring book club.");
    });
  });

  describe("HtmlTextConverter works well", function () {
    it("Works for every case", function () {
      var converter = new HtmlTextConverter("/foo.txt");
      expect(converter.convertToHtml()).toBe(
        "Hello there, Let's do some javascript exercise.<br /><br />What will these yield in javascript? '5 &gt; 7', '0 &lt; 3<br /><br />Have you heard of bitwise AND('&amp;')?"
      );
    });
  });
});
