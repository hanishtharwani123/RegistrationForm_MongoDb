const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");
const port = process.env.PORT || 3000;

// To Access the style.css in Public/css
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

// To Access the index.hbs in template/views
const template_path = path.join(__dirname, "../template/views");
// To Access the index.hbs in template/partials
const partials_path = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/success", async (req, res) => {
  try {
    // res.send(req.body.firstname);
    // res.send(req.body.lastname);
    // res.send(req.body.email);
    // res.send(req.body.phone);
    // res.send(req.body.age);
    // res.send(req.body.password);
    // res.send(req.body.confirmpassword);

    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });

      const registered = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
