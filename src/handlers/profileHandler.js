const updateProfile = require("../controllers/ProfileController/updateProfile");
const getProfiles = require("../controllers/ProfileController/getProfiles");
const getProfileById = require("../controllers/ProfileController/getProfileByID");
const deleteProfile = require("../controllers/ProfileController/deleteProfile");

const updateProfileHandler = async (req, res) => {
  try {
    const user = await updateProfile(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfileHandler = async (req, res) => {
  try {
    const allUser = await getProfiles();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfileByIDHandler = async (req, res) => {
  try {
    const profileById = await getProfileById(req.params);
    res.status(200).json(profileById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfileHandler = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await deleteProfile(id);

    res.status(200).send("profile  has deleted💥💥");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateProfileHandler,
  getProfileHandler,
  deleteProfileHandler,
  getProfileByIDHandler,
};
