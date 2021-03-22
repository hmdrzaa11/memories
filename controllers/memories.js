const Memory = require("../models/Memory");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
let multer = require("multer");
let path = require("path");
const AppError = require("../utils/AppError");
let sharp = require("sharp");
let deletePic = require("../utils/deletePics");

//***************** multer config ******************* */

let multerStorage = multer.memoryStorage();
let fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    return cb(null, true);
  } else {
    return cb(new AppError("this file type is not supported", 400), false);
  }
};

exports.uploader = multer({
  //this is going to put the image into req
  storage: multerStorage,
  fileFilter,
});

//this is going to resize it

exports.resizeImage = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) return next();
  let filename = `memories-${req.user._id}-${Date.now()}.jpeg`;
  req.file.filename = filename;
  let filePath = path.join(__dirname, `../public/images/memories/${filename}`);
  await sharp(req.file.buffer)
    .resize(1200, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(filePath);
  next();
});

//**************************************************** */

exports.createMemory = catchAsyncErrors(async (req, res, next) => {
  let { title, description } = req.body;
  let memory = await Memory.create({
    title,
    description,
    author: req.user._id,
    image: req.file.filename,
  });
  res.status(201).json({
    status: "success",
    memory,
  });
});

exports.getAllMemories = catchAsyncErrors(async (req, res, next) => {
  let memories = await Memory.find();
  res.status(200).json({
    status: "success",
    results: memories.length,
    memories,
  });
});

exports.updateMemory = catchAsyncErrors(async (req, res, next) => {
  let memId = req.params.memId;
  let userId = req.user._id;
  let memory = await Memory.findOne({ _id: memId, author: userId });
  if (!memory) {
    return next(new AppError("memory not found", 404));
  }

  if (req.file) {
    req.body.image = req.file.filename;
    //delete previous image
    await deletePic(memory.image);
  }
  let updatedMem = await Memory.findByIdAndUpdate(memory._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    memory: updatedMem,
  });
});

exports.deleteMemory = catchAsyncErrors(async (req, res, next) => {
  let memory = await Memory.findOneAndDelete({
    _id: req.params.memId,
    author: req.user._id,
  });
  if (!memory) {
    return next(new AppError("memory not found", 404));
  }

  await deletePic(memory.image);

  res.status(204).json({
    status: "success",
  });
});

exports.getSingleMemory = catchAsyncErrors(async (req, res, next) => {
  let memory = await Memory.findById(req.params.memId).populate("reviews");
  res.json({
    status: "success",
    memory,
  });
});
