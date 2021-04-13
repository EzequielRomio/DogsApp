// const { DataTypes } = require('sequelize');
const S = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define('dog', {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    height: {
      type: S.JSON, // example "height":{"imperial":"9 - 11.5","metric":"23 - 29"}
      allowNull: false,
    },
    weight : {
      type: S.JSON, // example "weight":{"imperial":"6 - 13","metric":"3 - 6"}
      allowNull: false,
    },
    life_span: {
      type: S.STRING,
      allowNull: true,
    }, 
    external_api_id: {
      type: S.INTEGER,
      allowNull: true,
    }
  });
};
