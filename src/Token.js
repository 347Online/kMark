const util = require('util');

class TokenType {
  static Types = [];

  constructor(type) {
    this.type = type;
    TokenType.Types.push(this);
  }

  [util.inspect.custom]() {
    return `@${this.type}`
  }
}

class Token {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }

  [util.inspect.custom]() {
    return `Token: @${this.type.type}${this.value ? ` (${this.value})` : ''}`
  }

  static Asterisk   = new TokenType('ASTERISK');
  static Underscore = new TokenType('UNDERSCORE');
  static Octothorpe = new TokenType('OCTOTHORPE');
  static TextBlock  = new TokenType('TEXTBLOCK');
  static NewLine    = new TokenType('NEWLINE');
  static EOF        = new TokenType('EOF');
}

// class Token {

//   constructor(type, value = null) {
//     this.type = type;
//     this.value = value;
//   }

//   static Heading   = new TokenType("HEADING");
//   static Emphasis  = new TokenType("EMPHASIS");
//   static Strong    = new TokenType("STRONG");
//   static TextBlock = new TokenType("TEXT");
//   static NewLine   = new TokenType("NEWLINE");
//   static Rule      = new TokenType('HORIZONTALRULE');
//   static EOF       = new TokenType('EOF');

//   // static Escape   = new TokenType('ESCAPE'); //? Potentially unnecessary
// }

module.exports = {Token, TokenType};