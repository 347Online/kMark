class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }
  add(value) {
    const tree = new Tree(value);
    tree.parent = this;

    this.children.push(tree);
  }
}

module.exports = Tree;