/* jshint indent: 2 */

export default function(sequelize, DataTypes) {
  return sequelize.define('example', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'example'
  });
};
