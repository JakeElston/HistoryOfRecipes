class Essay {
  constructor({ _id, name, author, essay, recipie, tags }) {
    this._id = _id;
    this.name = name;
    this.author = author;
    this.essay = essay;
    this.recipie = recipie;
    this.tags = tags;
  }
}

module.exports = Essay;
