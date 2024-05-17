import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
  {
    title: String,
    position: Number,
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },

    userQProgress: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserQProgress",
      },
    ],
  },
  {
    timestamps: true,
  }
);
// Mongoose Schema for UserProgress

const userQProgressSchema = new Schema(
  {
    userId: String,
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create models from the schemas
mongoose.models = {};
const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
const UserQProgress =
  mongoose.models.UserQProgress ||
  mongoose.model("UserQProgress", userQProgressSchema);

// export default mongoose.model('Quiz', quizSchema);
export { Quiz, UserQProgress };
