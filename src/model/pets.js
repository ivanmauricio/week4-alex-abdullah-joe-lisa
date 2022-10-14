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

const get_users_pets = db.prepare(/*sql*/ `
   SELECT 
     id,
     pet_name, 
     pet_type,
     image_path,
     user_id
   FROM pets   
   WHERE user_id = ?
`);

function getUsersPets(user_id) {
  return get_users_pets.all(user_id);
}

const insert_pet = db.prepare(/*sql*/ `
INSERT INTO pets (pet_name, user_id, pet_type, image_path, private)
VALUES ($pet_name, $user_id, $pet_type, $image_path, $private)
RETURNING id
`);

function insertPet(pet_name, user_id, pet_type, image_path, private) {
  return insert_pet.get({pet_name, user_id, pet_type, image_path, private})
}


module.exports = { getAllPets, insertPet, getUsersPets };
