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

  static Asterisk   = new TokenType('ASTERISK');
  static Underscore = new TokenType('UNDERSCORE');
  static Octothorpe = new TokenType('OCTOTHORPE');
  static TextBlock  = new TokenType('TEXTBLOCK');
  static NewLine    = new TokenType('NEWLINE');
  static EOF        = new TokenType('EOF');
}

module.exports = {Token, TokenType};