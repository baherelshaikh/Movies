const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide product name'],
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    overview: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    image: {
      type: String,
      default: './uploads/interstellar.jfif',
    },
    actors: {
      type: [String],
      default: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
      required: true,
    },
    vimeoId: {
      type: Number,
      required: true,
    },
    year: {
      type: Number, // Define year as a number
      required: [true, 'Please provide the release year'], // Add a custom error message
    },
    division_name: {
      type: String,
      maxlength: [50, 'division name can not be more than 50 characters'],
    }
  },
);

// ProductSchema.pre('save', async function () {
//   if(this.image)
//   this.image = path.join('./uploads/', `${this.image}`)
// });

module.exports = mongoose.model('Movie', MovieSchema);
