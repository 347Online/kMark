class ElementType {
  static Types = [];

  constructor(type) {
    this.type = type;
    ElementType.Types.push(this);
  }
}

class Element {
  constructor(type, contents = []) {
    this.type = type;
    this.value = value;
  }

  push(...args) {
    this.contents.push(...args);
  }

  static Paragraph = new ElementType('PARAGRAPH');
  static Emphasis  = new ElementType('EMPHASIS');
  static Strong    = new ElementType('STRONG');
  static Heading   = new ElementType('HEADING');
  static Rule      = new ElementType('RULE');
  static Break     = new ElementType('BREAK');
}

module.exports = {Element, ElementType}