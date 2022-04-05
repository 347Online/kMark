const fs = require('fs');

class Token {
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }
}

class TokenType {
  static Types = [];

  constructor(type) {
    this.type = type;
    TokenType.Types.push(this);
  }

  static Heading  = new TokenType("HEADING");
  static Emphasis = new TokenType("EMPHASIS");
  static Strong   = new TokenType("STRONG");
  static Text     = new TokenType("TEXT");
  static Newline  = new TokenType("NEWLINE");
}

/**
 * Turns a string of Markdown into an Array of Tokens
 * @param {string} string 
 * 
 * @returns {Array} [tokens]
*/
const lex = (string) => {
  const tokens = [];
  let textblock = '';
  const flush = () => {
    if (textblock) {
      tokens.push(new Token(TokenType.Text, textblock));
      textblock = '';
    }
  };

  // Iterate over all characters of string
  for (let i = 0, l = string.length; i < l; i++) {
    const char = string[i];

    const headings = { 
    };

    switch (char) {
      case '_':
      case '*':
        flush()
        if (string[i + 1] === char) {
          i++;
          tokens.push(new Token(TokenType.Strong));
        } else {
          tokens.push(new Token(TokenType.Emphasis));
        }
      break;
      
      case '#': {
        let count = 1;
        while (string[++i] === char) count++;
        //i--;
        count = Math.min(count,6);
        tokens.push(new Token(TokenType.Heading,count));
        }
      break;

      case '\n':
        flush();
        tokens.push(new Token(TokenType.Newline));
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
      case TokenType.Strong:
        html += strong ? '</strong>' : '<strong>';
        strong = !strong;
      break;
      
      case TokenType.Emphasis:
        html += em ? '</em>' : '<em>';
        em = !em;
      break;

      case TokenType.Text:
        if (i < l - 1 && tokens[i + 1].type === TokenType.Newline && !heading) {
          html += `<p>${token.value}</p>\n`;
          i++;
        } else {
          html += token.value;
        }
      break;
      
      case TokenType.Newline:
        let offset = -5;
        if (heading) {
          console.log('heading here');
          html += `</h${heading}>\n`;
          offset -= 5;
        }
        const slice = html.slice(offset,offset + 4);
        console.log('|' + slice + '|');
        if (slice !== '</p>' && !heading) html += '<br>\n';
        heading = 0;
      break;

      case TokenType.Heading:
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

const md = fs.readFileSync('./sample.md', {encoding: 'utf8'});
console.log(md);

const tokens = lex(md);
console.log(tokens);

const html   = compileHTML(tokens);
console.log(html);

fs.writeFileSync('./sample.html',html);


module.exports = {};