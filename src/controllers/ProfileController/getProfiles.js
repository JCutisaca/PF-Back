const { Profile } = require('../../db');

const getProfiles = async () => {
    try {
        const allProfiles = await Profile.findAll();
        return allProfiles;
    } catch (error) {
       return {error:error.message}
    }
};

module.exports = getProfiles;
