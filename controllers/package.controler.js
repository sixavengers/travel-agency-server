const User = require("../Models/User");
const Packages = require("../Models/PackagesModel");
const { adminMail, serviceEmail } = require("../helpers/WelcomeMail");
const createPackage = async (req, res) => {
  try {
    const id = req.userData.id;
    const findUser = await User.findById(id);
    if (findUser.role !== "admin" && findUser.role !== "manager") {
      return res.status(401).json({
        status: false,
        messages: "You dont have permission to create package",
      });
    }
    // ------------------Get Data From Body------------------
    const { packageTypes, mealPlan, activities } = req.body;
    // make array of packageTypes and mealPlan and activities
    const packagetypes = [];
    const meal = [];
    const act = [];
    await packageTypes.split(" ").forEach((element) => {
      packagetypes.push(element);
    });
    await mealPlan.split(" ").forEach((element) => {
      meal.push(element);
    });
    await activities.split(" ").forEach((element) => {
      act.push(element);
    });
    const package = await Packages.create(req.body);
    package.isAvailable = false;
    package.createBy = id;
    package.packageTypes = packagetypes;
    package.mealPlan = meal;
    package.activities = act;
    await package.save();
    const mail = [];
    const admin = await User.find({ role: "admin" });
    admin.forEach((element) => {
      mail.push(element.email);
    });
    const url = `http://localhost:3000/api/package/createpackage/${package._id}`;
    mail.map(async (element) => {
      await adminMail(
        package?.name,
        element,
        url,
        "Please Approve This Package"
      );
    });
    await res.send({
      status: true,
      messages: "Package Created Successfully and Waiting for Admin Approval",
      data: package,
    });
  } catch (error) {
    res.status(500).send({ success: false, messages: error?.message });
  }
};
const cheackpackage = async (req, res) => {
  try {
    const adminId = req.userData.id;
    const findUser = await User.findById(adminId);
    if (findUser.role !== "admin") {
      return res.status(401).json({
        status: false,
        messages: "You dont have permission to access this route",
      });
    }
    const { id } = req.params;
    const package = await Packages.findById(id);
    if (!package) {
      return res.status(404).json({
        status: false,
        messages: "Package Not Found",
      });
    }
    res.send({
      status: true,
      messages: "Package Found",
      data: package,
    });
  } catch (error) {
    res.status(500).json({ success: false, messages: error?.message });
  }
};
const activepackage = async (req, res) => {
  try {
    const adminid = req.userData.id;
    const findUser = await User.findById(adminid);
    if (findUser.role !== "admin") {
      return res.status(401).json({
        status: false,
        messages: "You dont have permission to access this route",
      });
    }
    const { id } = req.params;
    const package = await Packages.findById(id);
    const packageownerid = package.createBy;
    const packageowner = await User.findById(packageownerid);
    const ownermail = packageowner.email;
    if (!package) {
      return res.status(404).json({
        status: false,
        messages: "Package Not Found",
      });
    }
    if (package.isAvailable === true) {
      return res.status(400).json({
        status: false,
        messages: "Package Already Active",
      });
    }
    const { data } = req.body;
    if (data === "true") {
      package.isAvailable = true;
      await package.save();
      serviceEmail(
        ownermail,
        "Your Package is Active Now",
        "Your Package is Active Now"
      );
      res.send({
        status: true,
        messages: "Package is Active",
        data: package,
      });
    } else {
      package.isAvailable = false;
      await package.save();
      serviceEmail(
        ownermail,
        "Your Package is Dicline by Admin",
        "Your Package is Dicline by Admin"
      );
      res.send({
        status: true,
        messages: "Package is Deactive",
        data: package,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, messages: error?.message });
  }
};
// -----------------Get All by owner id-----------------
const getpackagebyowner = async (req, res) => {
  try {
    const id = req.userData.id;
    const findUser = await User.findById(id);
    if (findUser.role !== "manager" && findUser.role !== "admin") {
      return res.status(401).json({
        status: false,
        messages: "You dont have permission to access this route",
      });
    }
    const package = await Packages.find({ createBy: id });
    if (!package) {
      return res.status(404).json({
        status: false,
        messages: "Package Not Found",
      });
    }
    res.send({
      status: true,
      messages: "Package Found",
      data: package,
    });
  } catch (error) {
    res.status(500).json({ success: false, messages: error?.message });
  }
};
const updatepackage = async (req, res) => {
  try {
    // ------------------get user id from token------------------
    const userid = req.userData.id;
    // ------------------find user by user id------------------
    const findUser = await User.findById(userid);
    if (findUser.role !== "admin" && findUser.role !== "manager") {
      return res.status(401).json({
        status: false,
        messages: "You dont have permission to update package",
      });
    }
    const { id } = req.params;
    const {
      price,
      packageClassess,
      packageTypes,
      mealPlan,
      activities,
      jurneyDate,
      returnDate,
      maxGroupSize,
    } = req.body;
    if (new Date().toJSON().slice(0, 10).replace(/-/g, "/") > jurneyDate) {
      return res.status(400).json({
        status: false,
        messages: "Jurney Date must be greater than today",
      });
    }
    // ------------------Cheack is date is valid------------------
    if (jurneyDate > returnDate || jurneyDate === returnDate) {
      return res.status(400).json({
        status: false,
        messages:
          "Jurney Date Must Be Less Than Return Date and Jurney Date Must Be Less Than Today",
      });
    }
    // make array of packageTypes and mealPlan and activities
    const packagetypes = [];
    const meal = [];
    const act = [];
    await packageTypes.split(" ").forEach((element) => {
      packagetypes.push(element);
    });
    await mealPlan.split(" ").forEach((element) => {
      meal.push(element);
    });
    await activities.split(" ").forEach((element) => {
      act.push(element);
    });
    const package = await Packages.updateMany(
      { _id: id },
      {
        $set: {
          price,
          packageClassess,
          packageTypes: packagetypes,
          mealPlan: meal,
          activities: act,
          jurneyDate,
          returnDate,
          maxGroupSize,
        },
      }
    );
    if (!package) {
      return res.status(404).json({
        status: false,
        messages: "Package Not Found",
      });
    }
    res.send({
      status: true,
      messages: "Package Updated Successfully",
      data: package,
    });
  } catch (error) {
    res.status(500).json({ success: false, messages: error?.message });
  }
};
const deletepackage = async (req, res) => {
  try {
    // ------------------get user id from token------------------
    const userid = req.userData.id;
    // ------------------find user by user id------------------
    const findUser = await User.findById(userid);
    if (findUser.role !== "manager" && findUser.role !== "admin") {
      return res.status(401).json({
        status: false,
        messages: "You dont have permission to delete package",
      });
    }
    const { id } = req.params;
    const package = await Packages.deleteOne(id);
    res.send({
      status: true,
      messages: "Package Deleted Successfully",
      data: package,
    });
  } catch (error) {
    res.status(500).json({ success: false, messages: error?.message });
  }
};

/* get all package*/
const getAllPackage = async (req, res) => {
  try {
    const { page, limit, packageClass } = req.query;

    let filter = {};

    if (packageClass) {
      filter.packageClassess = packageClass;
    }

    const package = await Packages.find(filter);
    if (!package) {
      return res.status(404).json({
        status: false,
        messages: "Package Not Found",
      });
    }
    res.send({
      status: true,
      messages: "Package Found",
      count: package.length,
      data: package,
    });
  } catch (error) {
    res.status(500).json({ success: false, messages: error?.message });
  }
};

module.exports = {
  createPackage,
  getpackagebyowner,
  updatepackage,
  deletepackage,
  cheackpackage,
  activepackage,
  getAllPackage,
};
