const { Profile } = require("../../db");

const getProfileById = async ({ id }) => {
  if (!id) throw Error("Please provide a valid ID.");
  const profileById = await Profile.findOne({ where: { id } });
  return profileById;
};

module.exports = getProfileById;
