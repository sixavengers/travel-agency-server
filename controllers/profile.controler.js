const User = require("../Models/User");
// ------------------updateprofile-----------------
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
  const updateProfileImage = async (req, res) => {
    try {
      const id = req.userData.id
      const {url} = req.body;
      if(!avatar){
        return res.status(400).json({ messages: "All Fields Are Required" });
      }
      const updatedUser = await User.findByIdAndUpdate(id,{
        profileImg:url
      }).select("-password -_id -tourInfo -isverify -avatar -role -email");
      return res.status(200).json({
        messages: "Profile Image Updated Successfully",
        updatedUser
      })
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
    }
  }
  // -----------------get all users-----------------
const users = async (req, res) => {
  try {
    const id = req.userData.id;
    const user = await User.findById(id);
    // -----------------Check if requester is admin-----------------
    if (user.role !== "admin") {
      return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
    }
    const users = await User.find({});
    res.send({ success: true, message: "All Users",users:users });
  } catch (error) {
    res.status(500).json({ messages: error?.messages });
  }
  }
  // -----------------get user by id-----------------
  const userbyid = async (req, res) => {
    try {
      const requesterid = req.userData.id;
      const admin = await User.findById(requesterid);
      // -----------------Check if requester is admin-----------------
      if(admin.role !== "admin"){
        return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
      }
      const {id} = req.params;
      // -----------------Find user by id-----------------
      const user = await User.findById(id).select("-password");
      if(!user){
        return res.status(400).json({ messages: "User Not Found" });
      }
      res.send({ success: true, message: "User By Id",user:user });
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
      
    }
  }
  const changeRole = async(req,res)=>{
  try {
    const requesterid = req.userData.id;
    const admin = await User.findById(requesterid);
     // -----------------Check if requester is admin-----------------
    if(admin.role !== "admin"){
      return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
    }
    const {id} = req.params;
    // -----------------get role from body-----------------
    const {role} = req.body;
    // -----------------Cheack if role is valid-----------------
    if(role !== "admin" && role !== "user" && role !== "manager" && role !== "tour-guide"){
      return res.status(400).json({ messages: "Provide a valid role" });
    }
    // -----------------Find user by id-----------------
    const user = await User.findById(id);
    // -----------------Cheack this user already have this role-----------------
    if(user.role === role){
      return res.status(400).json({ messages: "This user already has this role" });
    }
    // -----------------Check if user found-----------------
    if(!user){
      return res.status(400).json({ messages: "User Not Found" });
    }
    // -----------------changes user role-----------------
    user.role=role;
    await user.save();
    res.send({ success: true, message: "User Role Changed Successfully",user:user });
  } catch (error) {
    res.status(500).json({ messages: error?.messages });
  }
  }
  // -----------------delete user-----------------
  const deleteUser = async(req,res)=>{
    try {
      const requesterid = req.userData.id;
      const admin = await User.findById(requesterid);
      // -----------------Check if requester is admin-----------------
      if(admin.role !== "admin"){
        return res.status(400).json({ messages: "You Don't Have The Authorization to Complete The Operation" });
      }
      const {id} = req.params;
      // -----------------Find user by id-----------------
      const user = await User.findById(id);
      if(user.role === "admin"){
        res.status(400).json({ messages: "You Can't Delete Admin" });
      }
      // -----------------Check if user found-----------------
      if(!user){
        return res.status(400).json({ messages: "User Not Found" });
      }
      // -----------------Delete user-----------------
      await user.remove();
      res.send({ success: true, message: "User Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ messages: error?.messages });
    }
  }
    module.exports = { updateProfile,updateProfileImage,users,userbyid,changeRole,deleteUser
    }