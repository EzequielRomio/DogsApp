const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// "height":{"imperial":"9 - 11.5","metric":"23 - 29"}
// Peso *         // "weight":{"imperial":"6 - 13","metric":"3 - 6"}
// Años de vida   // "life_span":"10 - 12 years"
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
