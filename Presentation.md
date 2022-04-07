# kMarkdown

For my Solo Project, I opted to write a Parser for a small subset of Markdown syntax.

Originally created by John Gruber in 2004, Markdown is a miniature markup language. You've likely seen it used for styling on Social Platforms like Slack, Discord, Reddit and GitHub.

Markdown has lots and lots and lots of features, so to manage scope I made the decision to start with what I consider to be the most basic elements:


# Headings

**Bold**

*Italics*


On Day One I got all three of these working and my confidence soared, so I decided to try to add more elements which I had written down as stretch features. This is when I started to encounter blocks. Parsers are ***complicated.***

My code started to become an unmanageable spaghetti mess as there were just too many special cases for how the elements should interact with each other.

I spent a large portion of Day 2 going down a rabbit hole, most of which I ended up reverting, though it wasn't all bad. In this process I ended up doing lots of interesting research on more complex Data Structures and Abstract Syntax Trees which unfortunately I don't have time to go over today.

So let's get to a demo. I've written my notes using the operators that my parser understands. We're going to turn the symbols into HTML tags, and end up with a function HTML document we could put on a website.
(Show Notes file get converted to HTML)

Ultimately while most of the working code was written on Day one, I feel I have increased my understanding on how this kind of text processing is accomplished, putting me one step closer to my dream of creating my own programming language.

Thank you.