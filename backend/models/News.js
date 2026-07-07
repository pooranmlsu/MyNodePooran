const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
      maxlength: [5000, 'Content cannot be more than 5000 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Technology', 'Business', 'Health', 'Science', 'Sports', 'Entertainment', 'Politics', 'Other'],
      default: 'Other',
    },
    tags: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
newsSchema.index({ title: 'text', content: 'text', author: 'text', tags: 'text' });

module.exports = mongoose.model('News', newsSchema);