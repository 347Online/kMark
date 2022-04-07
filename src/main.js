const fs = require('fs');
const path = require('path');

const {Token, TokenType} = require('./Token');

const lex = (string) => {
  const tokens = [];
  let textblock = '';
  const flush = () => {
    if (textblock) {
      tokens.push(new Token(Token.Text, textblock));
      textblock = '';
    }
  };

  // Iterate over all characters of string
  for (let i = 0, l = string.length; i < l; i++) {
    const char = string[i];

    switch (char) {
      case '_':
      case '*':
        flush()
        if (string[i + 1] === char) {
          i++;
          tokens.push(new Token(Token.Strong));
        } else {
          tokens.push(new Token(Token.Emphasis));
        }
      break;
      
      case '#': {
        let count = 1;
        while (string[++i] === char) count++;
        //i--;
        count = Math.min(count,6);
        tokens.push(new Token(Token.Heading,count));
        }
      break;

      case '\n':
        flush();
        tokens.push(new Token(Token.Newline));
      break;

      default:
        textblock += char;
      break;
    }
  }
  flush();

  return tokens;
};

const compileHTML = (tokens) => {
  let html = '';
  let em = false;
  let strong = false;
  let heading = 0;

  for (let i = 0, l = tokens.length; i < l; i++) {
    const token = tokens[i];

    switch (token.type) {
      case Token.Strong:
        html += strong ? '</strong>' : '<strong>';
        strong = !strong;
      break;
      
      case Token.Emphasis:
        html += em ? '</em>' : '<em>';
        em = !em;
      break;

      case Token.Text:
        if (i < l - 1 && tokens[i + 1].type === Token.Newline && !heading) {
          html += `<p>${token.value}</p>\n`;
          i++;
        } else {
          html += token.value;
        }
      break;
      
      case Token.Newline:
        let offset = -5;
        if (heading) {
          html += `</h${heading}>\n`;
          offset -= 5;
        }
        const slice = html.slice(offset,offset + 4);
        if (slice !== '</p>' && !heading) html += '<br>\n';
        heading = 0;
      break;

      case Token.Heading:
        heading = token.value;
        html += `<h${heading}>`;
      break;

      default:
        console.log('WARNING: Unrecognized Token');
        console.log(token);
      break;
    }
  }

  return `<!DOCTYPE html>\n<html>\n${html}\n</html>`;
};

const parseFile = (fname, verbose = false) => {
  fname = path.resolve(fname);
  const pth = path.parse(fname);
  const savename = path.join(pth.dir, pth.name+'.html');

  const md = fs.readFileSync(fname, {encoding: 'utf8'});
  const tokens = lex(md);
  const html = compileHTML(tokens);

  if (verbose) {
    console.log(md);
    console.log(tokens);
    console.log(html);
  }

  fs.writeFileSync(savename,html);
};

parseFile('./Samples/sample.md');
parseFile('./Presentation.md');