class Essay {
  constructor({ _id, name, essay, recipie, tags }) {
    this._id = _id;
    this.name = name;
    this.essay = essay;
    this.recipie = recipie;
    this.tags = tags;
  }
}

module.exports = Essay;
