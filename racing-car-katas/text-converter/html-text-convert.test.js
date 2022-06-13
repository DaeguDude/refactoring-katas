var HtmlTextConverter = require('../text-converter/html-text-converter.js');

describe('Html Converter', function() {
	describe('HtmlTextConverter', function() {
		it('file name works well', function() {
			var converter = new HtmlTextConverter('foo');
      expect(converter.getFilename()).toBe('foo')
		});
	});

});
