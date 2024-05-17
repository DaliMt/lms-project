import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    title: String,
    position: Number,
    options: [
      {
        type: String,
        ref: "Option",
      },
    ],
    correctAnswer: {
      type: Number,
      ref: "CorrectAnswer",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  },

  {
    timestamps: true,
  }
);
mongoose.models = {};
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
