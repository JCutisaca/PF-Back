const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      product: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allownull: false,
        defaultValue: [],
      },
    },
    { timestamps: true }
  );
};
