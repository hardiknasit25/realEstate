const residencyModel = require("../Model/RecidencyModel.js");
const { errorHandler } = require("../utils/error.js");

exports.createListing = async (req, res, next) => {
  try {
    const listing = await residencyModel.create(req.body)
    return res.status(201).json(listing);
  } catch (error) {
    next(error)
  }
}

exports.properties = async (req, res, next) => {
  try {
    const singleRecy = await residencyModel.find().sort({ _id: -1 });
    res.status(201).json(singleRecy);
  } catch (error) {
    next(error);
  }
}

exports.saleproperties = async (req, res, next) => {
  try {
    const singleRecy = await residencyModel.find({ type: "sale" }).sort({ _id: -1 });
    res.status(201).json(singleRecy);
  } catch (error) {
    next(error);
  }
}

exports.rentproperties = async (req, res, next) => {
  try {
    const singleRecy = await residencyModel.find({ type: "rent" }).sort({ _id: -1 });
    res.status(201).json(singleRecy);
  } catch (error) {
    next(error);
  }
}

exports.oneproperties = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleRecyById = await residencyModel.findById({ _id: id });
    res.status(201).json(singleRecyById);
  } catch (err) {
    next(errorHandler(501, "Property not found"))
  }
}

exports.userproperty = async (req, res, next) => {

  // console.log(req.user.id, req.params.id);
  const {id} = req.params
  // if (req.user.id === req.params.id) {
    try {
      const listings = await residencyModel.find({ userRef: id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  // } else {
    // return next(errorHandler(401, 'You can only view your own listings!'));
  // }

}

exports.deleteproperty = async (req, res, next) => {
  const listing = await residencyModel.findById(req.params.id);

  // if(!listing) {
  //   return next(errorHandler(404,'Listing not found'));
  // }

  // if(req.params.id !== listing.userRef){
  //   next(errorHandler(401, 'You can only delete your one listings!'))
  // }

  try {
    await residencyModel.findByIdAndDelete(req.params.id) 
    res.status(200).json("Listing has been deleted! ")   
  } catch (error) {
    next(error)
  }
}

exports.updateproperty = async (req, res, next) => {
  const listing = await residencyModel.findById(req.params.id);

  try {
    const updateListing = await residencyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )

    res.status(200).json(updateListing)
  } catch (error) {
    next(error);
  }
}

exports.getproperty = async (req, res, next) => {
  try {
    const Listing = await residencyModel.findById(req.params.id)
    res.status(200).json(Listing);
  } catch (error) {
    next(error)
  }
}

exports.getproperties = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await residencyModel.find({
      name: { $regex: searchTerm, $options: 'i' },
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};