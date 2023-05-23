const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Videogames", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      // allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    launch_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
