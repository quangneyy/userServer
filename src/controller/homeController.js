const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  // model => get data from database

  return res.render("user.ejs");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
};
