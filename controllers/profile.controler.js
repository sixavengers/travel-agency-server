const User = require("../Models/User");

const updateProfile = async (req, res) => {
    try {
      const id = req.userData.id
    //  ------------------get name address phone from request body-----------------
     const {name,address,phone} = req.body;
     if(!name || !address || !phone){
        return res.status(400).json({ messages: "All Fields Are Required" });
     } 
     // -----------------Save user-----------------
      const updatedUser = await User.findByIdAndUpdate(id,{
       name:name,
       address:address,
        phone:phone
      }).select("-password -_id -tourInfo -isverify -avatar -role -email");
      return res.status(200).json({
        messages: "Profile Updated Successfully",
        updatedUser
      })
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
    }
  }
    module.exports = {
        updateProfile,
    }