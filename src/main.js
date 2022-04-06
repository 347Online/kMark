const fs = require('fs');
const path = require('path');

const {Token, TokenType} = require('./Token');

const lex = string => {
  const tokens = [];
  let text = '';

  const flush = (tkn = null) => {
    if (text)
    tokens.push(new Token(Token.TextBlock, text));
    if (tkn !== null) tokens.push(tkn);
    text = '';
  };

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    switch (char) {
      case '*': tokens.push(new Token(Token.Asterisk));   break;
      case '_': tokens.push(new Token(Token.Underscore)); break;
      case '#': tokens.push(new Token(Token.Octothorpe)); break;

      case '\n': flush(new Token(Token.NewLine)); break;

      default: text += char; break;
    }
  }
  flush(new Token(Token.EOF));

  return tokens;
};

const build = tokens => {
  
};

const parseFile = (fname, verbose = false) => {
  fname = path.resolve(fname);
  console.log(fname);
  const pth = path.parse(fname);
  const savename = path.join(pth.dir, pth.name+'.html');

  const md = fs.readFileSync(fname, {encoding: 'utf8'});
  const tokens = lex(md);
  //const html = compileHTML(tokens);

  if (verbose) {
    console.log(md);
    console.log(tokens);
    //console.log(html);
  }

  //fs.writeFileSync(savename,html);
};

parseFile('./Samples/sample.md', true);