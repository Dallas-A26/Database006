const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  PaintingID: Number,
  ArtistID: Number,
  FirstName: String,
  LastName: String,
  ImageFileName: String,
  Title: String,
  GalleryID: Number,
  GalleryName: String,
  GalleryCity: String,
  GalleryCountry: String,
  Latitude: Number,
  Longitude: Number,
  ShapeID: Number,
  ShapeName: String,
  MuseumLink: String,
  AccessionNumber: String,
  CopyrightText: String,
  Description: String,
  Excerpt: String,
  YearOfWork: Number,
  Width: Number,
  Height: Number,
  Medium: String,
  Cost: Number,
  MSRP: Number,
  WikiLink: String,
  JsonAnnotations: mongoose.Schema.Types.Mixed
}, { collection: 'paintings' });

module.exports = mongoose.model('Painting', paintingSchema);