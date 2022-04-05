const kMarkdown = (string='') => {
  class Token {
    constructor(name) {
      this.name = name;
    }

    static emphasis = new Token('emphasis');
    static strong = new Token('strong');
  }

  const tokenize = (str) => {
    for (let i = 0, l = str.length; i < l; i++) {
      const char = str[i];
    }
  };
};

kMarkdown();

module.exports = kMarkdown;