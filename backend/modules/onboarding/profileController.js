// NEW:
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// ✅ 1. GET PROFILE (Updated to fetch Name/Email from User table)
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From the Token

    // A. Fetch User Basic Info (Name, Email, Role) directly from User Table
    const user = await User.findByPk(userId, {
      attributes: ['firstName', 'lastName', 'email', 'role', 'isOnboarded']
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // B. Fetch Extended Profile Info (Skills, Goal, Bio) from Profile Table
    const profile = await Profile.findOne({ where: { userId } });

    // C. Merge them into a single object for the frontend
    const fullProfile = {
      // Data from User Table
      firstName: user.firstName,
      lastName: user.lastName || "",
      email: user.email,
      role: user.role,
      isOnboarded: user.isOnboarded,

      // Data from Profile Table (Handle null if profile doesn't exist yet)
      careerGoal: profile?.careerGoal || "",
      skills: profile?.skills || [], // Ensure this is always an array
      bio: profile?.bio || "",
      graduationYear: profile?.graduationYear || "",
      degree: profile?.degree || "",
      university: profile?.university || "",
      city: profile?.city || "",
      state: profile?.state || "",
      country: profile?.country || ""
    };

    res.json(fullProfile);

  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error fetching profile" });
  }
};

// ✅ 2. UPDATE PROFILE (Your existing logic, polished)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 

    const { 
        role, 
        careerGoal, 
        bio, 
        graduationYear, 
        skills, 
        degree, 
        college, 
        city, 
        state, 
        country 
    } = req.body;

    // Update User Role if provided
    if (role) {
      await User.update({ role }, { where: { id: userId } });
    }

    const profileData = {
        userId,
        careerGoal,
        bio,
        graduationYear,
        skills,          
        degree,
        university: college, 
        city,
        state,
        country
    };

    // Find or Create Profile
    let profile = await Profile.findOne({ where: { userId } });

    if (profile) {
      await profile.update(profileData);
    } else {
      profile = await Profile.create(profileData);
      // Mark as onboarded only on first creation
      await User.update({ isOnboarded: true }, { where: { id: userId } });
    }

    res.json({ success: true, data: profile });

  } catch (error) {
    console.error("Profile Save Error:", error);
    res.status(500).json({ message: "Server Error saving profile" });
  }
};

module.exports = { updateProfile, getProfile };