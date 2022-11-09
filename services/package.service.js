const Packages = require("../Models/PackagesModel");

const packageCreateService = async (data) => {
    const package = await Packages.create(data);
    return package;
}

module.exports = {packageCreateService};