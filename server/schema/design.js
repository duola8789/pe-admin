/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('design', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // 自增id
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    pic: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updater: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    services: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    designer: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    releaseTime: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'design'
  });
};
