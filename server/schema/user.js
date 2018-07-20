/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // 自增id
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
