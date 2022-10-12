const db = require("../database/db");

const get_all_pets = db.prepare(/*sql*/ `
   SELECT 
     pet_name, 
     pet_type,
     image_path
   FROM pets   
`);

function getAllPets() {
  return get_all_pets.all();
}

module.exports = { getAllPets };
