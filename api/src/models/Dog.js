const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID, // genera un id random para que no se pise con el id de la api
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //no te permito que estes vacio //obligatorio.
      primaryKey: true, // para especificar una primaryKey
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.JSON, // genera un id random para que no se pise con el id de la api
      allowNull: false, //no te permito que estes vacio //obligatorio.
    },
    weight: {
      type: DataTypes.JSON, // genera un id random para que no se pise con el id de la api
      allowNull: false, //no te permito que estes vacio //obligatorio.
    },
    life_span:{
      type: DataTypes.JSON, // genera un id random para que no se pise con el id de la api
      allowNull: true, //si te permito que estes vacio //obligatorio.
    },
    create: {
      type: DataTypes.BOOLEAN, // me ayuda a acceder a los perros que cree en base de datos. 
      dafaulValue: true, //se usa cuando uso un valor bolleano para darle un valor por defecto de true.
    },
  });
};
