const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    plan: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
