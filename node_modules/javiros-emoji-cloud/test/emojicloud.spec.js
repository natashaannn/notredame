// Tell chai we will be using the "should" style assertions.
chai.should();


describe('EmojiCloud', () => {
  describe('#_transformData', () => {

    let inputData = { data: [{ 'unicode': '26F5', 'name': 'boat', 'count': 43 }, { 'unicode': '1F60D', 'name': 'heart_eyes', 'count': 39 }] };
    let expectedData = [{ 'text': 'xx', 'weight': 43, 'html': { 'title': '26F5' } }, { 'text': 'xx', 'weight': 39, 'html': { 'title': '1F60D' } }];

    beforeEach(() => {
      selector = '#emoji-cloud';
      emojicloud = new EmojiCloud(selector, inputData);
      let node = document.createElement('DIV');
      node.setAttribute('id', 'emoji-cloud');
    });

    it('exists', function () {
        emojicloud._transformData.should.be.a('function');

    });

    it('returns transformed data', () => {
      emojicloud._transformData(inputData.data).should.deep.equal(expectedData);
    });
  });

  describe('#_insertEmojis', () => {
    it('exists', function () {
        emojicloud._insertEmojis.should.be.a('function');
    });
  });

  describe('#_emojiBinder', () => {
    it('exists', function () {
        emojicloud._emojiBinder.should.be.a('function');
    });
  });

  describe('#_cssOption', () => {
    let defaultCss = { 'visibility': 'hidden', 'height': '600', 'width': '600' };
    let customCss = { 'visibility': 'hidden', 'height': '900', 'width': '750' };

    it('exists', function () {
        emojicloud._cssOption.should.be.a('function');
    });

    it('returns default css property object', () => {
      emojicloud._cssOption().should.deep.equal(defaultCss)
    });

    it('returns custom css property object', () => {
      emojicloud.cssOptions = { height: '900', width: '750' };
      emojicloud._cssOption().should.deep.equal(customCss)
    });
  });

  describe('#_cssSettings', () => {
    let css = { 'visibility': 'hidden', 'height': '600', 'width': '600' };

    it('exists', function () {
        emojicloud._cssSettings.should.be.a('function');
    });
  });

  describe('#_buildEmojicloud', () => {
    it('exists', function () {
        emojicloud._buildEmojicloud.should.be.a('function');
    });
  });
});
