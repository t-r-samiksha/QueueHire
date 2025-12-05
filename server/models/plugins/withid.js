module.exports = function withId(schema) {
  // Create virtual "id" field
  schema.virtual('id').get(function () {
    return this._id.toString();
  });

  // Ensure virtuals appear in JSON responses
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false, // removes __v
    transform: (_, ret) => {
      delete ret._id; // optional: hide original _id
    },
  });

  schema.set('toObject', { virtuals: true });
};
