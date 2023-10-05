const { Profile } = require("../../db");

const deleteProfile = async (id) => {
  if (!id) throw Error("Please provide a valid ID.");
  const profileFound = await Profile.findOne({ where: { id } });
  if (!profileFound) {
    throw new Error("Profile not found.");
  }

  await Profile.destroy({ where: { id } });

  return "User has been deleted successfully.";
};

module.exports = deleteProfile;
