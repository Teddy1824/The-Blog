const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema(
  {
    main_image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: false,
    },
    user_image: {
      type: String,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: String,
        icon: '',
        name: "like",
        liked_by: [

        ]
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("technology", technologySchema);
