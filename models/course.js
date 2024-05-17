import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    userId: String,
    title: String,
    description: String,
    imageUrl: String,
    price: Number,
    difficulty: String,
    isPublished: {
      type: Boolean,
      default: false,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    attachments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attachment",
      },
    ],

    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],

    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "Purchase",
      },
    ],
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
