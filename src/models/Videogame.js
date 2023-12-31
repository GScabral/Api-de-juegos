const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER, 
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false
    } ,
    platforms:{
      type: DataTypes.STRING,
      allowNull:false
    }  ,
    image:{
      type: DataTypes.STRING,
      allowNull:false
    } ,
    released:{
      type: DataTypes.DATE,
      allowNull:false
    },
    rating:{
      type:DataTypes.DECIMAL,
      allowNull:false,
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'db' 
    }
  },{
    timestamps:false
  });
};
