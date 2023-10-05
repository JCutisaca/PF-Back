const { Profile } = require("../../db");

const updateProfile = async ({
  id,
  name,
  surname,
  email,
  phone,
  nickname,
  address,
  userphoto,
}) => {
  try {
    if (
      !(name || surname || email || phone || nickname || address || userphoto)
    ) {
      throw new Error("Please specify the information you want to update.");
    }

    let profile = await Profile.findByPk(id);

    if (!profile) {
      const existingProfile = await Profile.findOne({ where: { email } });

      if (existingProfile) {
        return "The email already exists";
      }
      profile = await Profile.create({
        id: id,
        name: name,
        surname: surname,
        email: email,
        phone: phone || null,
        nickname: nickname,
        address: address || null,
        userphoto: userphoto || "alt",
      });
      return `${profile.name} profile has been created`;
    }
    if (profile) {
      await profile.update({
        name: name || profile.name,
        surname: surname || profile.surname,
        email: email || profile.email,
        phone: phone || profile.phone,
        nickname: nickname || profile.nickname,
        address: address || profile.address,
        userphoto: userphoto || profile.userphoto,
      });
      return `${profile.name} profile has been modified`;
    }
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = updateProfile;
