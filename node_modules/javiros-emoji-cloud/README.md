
# Emojicloud

## Info
A npm module for generating beautiful emojiclouds 😀

## Project health

[![Travis](https://img.shields.io/travis/javiros/emoji-cloud.svg)](https://travis-ci.org/javiros/emoji-cloud)
[![npm](https://img.shields.io/npm/dt/javiros-emoji-cloud.svg)](https://www.npmjs.com/package/javiros-emoji-cloud)
[![GitHub tag](https://img.shields.io/github/tag/javiros/emoji-cloud.svg)]()
[![GitHub tag](https://img.shields.io/github/last-commit/javiros/emoji-cloud/master.svg?label=last%20deployed)]()
![Code Coverage-shield-badge-1](https://img.shields.io/badge/Code%20Coverage-100%25-brightgreen.svg)
[![License](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![emoji-cloud](https://github.com/javiros/emoji-cloud/blob/master/emoji-cloud.png?raw=true)

## Requirements
* node > 8.7

## Instalation

`npm install javiros-emoji-cloud`

## Usage

* Add the following scripts to your html:

```
  <script src="[path-to-your-files]wordcloud.js"></script>
  <script src="[path-to-your-files]emojicloud.js"></script>
```

Place a div with an `id = emoji-cloud` like so:

```
<div id="emoji-cloud"></div>
```

Then in your js file call EmojiCloud() with the following:

 Parameters:

- selector, where you want your emojicloud to be rendered i.e.: `'#emoji-cloud'`

- data and cssOptions

```
  {
    data: [
      {'count': 123, 'unicode': '1F448'},
      {'count': 153, 'unicode': '1F44C'},
      ...
      ]
    cssOptions: { height: '700', width: '700' } // optional
  }
```

Where `data` is an array of objects.
  - count: represents the size of the emoji
  - unicode: emoji unicode representation (currently there are some known issues supporting flag unicodes)


cssOptions allows you to adjust the height and width of the canvas where EmojiCloud is rendered. It defaults to: `height: 600`, `width: 600` pixels.

## Contributing

* If you'd like to contribute to this project get in contact with the author to discuss the change.
* Create a pull request off `master`
* Submit your pull request provided you:
- have agreed the new feature with the author
- have fully tested your new feature and most importantly...
- are proud of your work

## Aknowledgements

Infinite thanks to [Sasha Marrocco](https://github.com/SashaMarrocco) for all the help!

