// const { DataTypes } = require('sequelize');
const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// diferenciar ids: 

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.JSON, // example "height":{"imperial":"9 - 11.5","metric":"23 - 29"}
      allowNull: false,
    },
    weight : {
      type: DataTypes.JSON, // example "weight":{"imperial":"6 - 13","metric":"3 - 6"}
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    external_api_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
