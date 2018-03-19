
function user(data) {
    this.id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.status = data.status;
    this.image = data.image;
}

module.exports = user;