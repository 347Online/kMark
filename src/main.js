class AST {

}



const fs = require('fs');
const path = require('path');

const {Token, TokenType} = require('./Token');
const {Element, ElementType} = require('./Element');

const lex = string => {
  const tokens = [];
  let text = '';

  const flush = (tkn = null) => {
    if (text) {
      tokens.push(new Token(Token.TextBlock, text));
      text = '';
    }
    if (tkn !== null) tokens.push(tkn);
  };

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    switch (char) {
      case '*': flush(new Token(Token.Asterisk));   break;
      case '_': flush(new Token(Token.Underscore)); break;
      case '#': flush(new Token(Token.Octothorpe)); break;

      case '\n': flush(new Token(Token.NewLine)); break;

      default: text += char; break;
    }
  }
  flush(new Token(Token.EOF));

  return tokens;
};

const parse = tokens => {
  const elements = [];
  let element = null;
  let emphasis = false;
  let strong = false;
  let heading = 0;

  for (let i = 0, l = tokens.length; i < l; i++) {
    const token = tokens[i];

    switch (token.type) {
      case Token.Octothorpe: {
        if (heading) break;

        let count = 1;
        while (tokens[++i] === token) count++;
        heading = count;
      }
      break;

      case Token.Asterisk:
      case Token.Underscore: {
        let count = 1;
        while (peek(i + count).type === token.type) count++;


      }
      break;

      case Token.NewLine: break;

      case Token.TextBlock:
        elements.push(new Element(Element.Paragraph,token.value));
      break;
      
      case Token.EOF: if (i !== l - 1) return ('Error: Unexpected end of file'); break;

      default: console.log('Error: Could not parse unknown token ',token); break;
    }
  }

  return elements;
};

const compile = elements => {

};



const parseFile = (fname, verbose = false) => {
  fname = path.resolve(fname);
  console.log(fname);
  const pth = path.parse(fname);
  const savename = path.join(pth.dir, pth.name+'.html');

  const md = fs.readFileSync(fname, {encoding: 'utf8'});
  const tokens = lex(md);
  const elements = parse(tokens);
  //const html = compileHTML(tokens);

  if (verbose) {
    console.log(md);
    console.log(tokens);
    console.log(elements);
    //console.log(html);
  }

  //fs.writeFileSync(savename,html);
};

parseFile('./Samples/sample.md', true);