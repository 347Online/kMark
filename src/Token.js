class TokenType {
  static Types = [];

  constructor(type) {
    this.type = type;
    TokenType.Types.push(this);
  }
}

class Token {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }

  static Heading  = new TokenType("HEADING");
  static Emphasis = new TokenType("EMPHASIS");
  static Strong   = new TokenType("STRONG");
  static Text     = new TokenType("TEXT");
  static Newline  = new TokenType("NEWLINE");
}

module.exports = {Token, TokenType};