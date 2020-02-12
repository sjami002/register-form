const router = require("express").Router();
let Form = require("../models/form.model");

router.route("/").get((req, res) => {
  Form.find()
    .then(forms => res.json(forms))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const plan = Number(req.body.plan);
  const date = Date.parse(req.body.date);

  const newForm = new Form({
    username,
    description,
    plan,
    date
  });

  newForm
    .save()
    .then(() => res.json("Form added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Form.findById(req.params.id)
    .then(form => res.json(form))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Form.findByIdAndDelete(req.params.id)
    .then(() => res.json("Form deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

// ***
router.route("/:id/").delete((req, res) => {
  Form.findByIdAndDelete(req.params.id)
    .then(() => res.json("Form deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});
// ***

router.route("/update/:id").post((req, res) => {
  Form.findById(req.params.id)
    .then(form => {
      form.username = req.body.username;
      form.description = req.body.description;
      form.plan = Number(req.body.plan);
      form.date = Date.parse(req.body.date);

      form
        .save()
        .then(() => res.json("Form updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
