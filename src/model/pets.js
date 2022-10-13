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

const insert_pet = db.prepare(/*sql*/ `
INSERT INTO pets (pet_name, user_id, pet_type, image_path, private)
VALUES ($pet_name, $user_id, $pet_type, $image_path, $private)
RETURNING id
`);

function insertPet(pet_name, user_id, pet_type, image_path, private) {
  return insert_pet.get({pet_name, user_id, pet_type, image_path, private})
}


module.exports = { getAllPets, insertPet };
