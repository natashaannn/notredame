// 'use strict';

  class EmojiCloud {
    constructor(selector, options) {
      this.selector = selector.replace('#', '');
      this.transformedData = this._transformData(options.data);
      this._applyCustomCss(options.cssOptions);
      this._buildEmojicloud(this.transformedData);
    }

    // returns array of transformed input data so it can be added to divs as metada-data
    _transformData(data) {
      let modifiedData = [];

      data.forEach((k) => {
        // pushes to array necessary data: text: placeholder, weight: will provide the size of emoji,
        // html: emoji unicode representation, name: in case emoji does not render
        modifiedData.push([
          k.unicode, k.count
        ]);
      });
      return modifiedData;
    }

    _applyCustomCss(cssOptions) {
      let element = document.getElementById(this.selector);
      if (cssOptions) {
        this._setCustomCss(element, cssOptions);
      }
      else {
        this._setDefaultCss(element);
      }
    }

    _setCustomCss(element, customCss) {
      return element.style.height = customCss.height + 'px', element.style.width = customCss.width + 'px'
    }

    _setDefaultCss(element) {
      return element.style.height = '600px', element.style.width = '600px'
    }

    // Inserts emojis into spans, prepends unicode identifier &#x
    _insertEmojis(spans) {
      let unicodePrefix = '&#x'
      for (let span of spans) {
        let emojicode = unicodePrefix + span.innerText;
        span.innerHTML = emojicode;
      }
    }

    _emojiBinder() {
      setTimeout(() => {
        let spans = document.getElementById(this.selector).children;
        document.getElementById(this.selector).style.visibility = 'visible';
        this._insertEmojis(spans);
      }, 1200);
    }

    _hideInitialElement() {
      let cssObj = {
        'visibility': 'hidden'
      }
      return cssObj;
    }

    _applyCssSettings() {
      let style = this._hideInitialElement();
      Object.assign(document.getElementById(this.selector).style, style);

      }

    _buildEmojicloud(emojiData) {
      let self = this;

      this._applyCssSettings();
      WordCloud(document.getElementById(this.selector), { list: emojiData });
      document.getElementById(this.selector).addEventListener("wordclouddrawn", self._emojiBinder());
    }
  }

function init(){
  const Factory = (selector, options) => {
    return new EmojiCloud(selector, options);
  }
  window.EmojiCloud = Factory;
};
init();
