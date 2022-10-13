const multer  = require('multer')
const upload = multer({ dest: './public/uploads' })

//Basic layout function

function Layout({ title, content }) {
  return /* html */ `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <main>
        ${content}
    </main>
</body>
</html>`;
}

//Home layout function

function Home() {
  return /*html */ `
    <h1>Petsagram</h1>
    <a href="/sign-up">Sign Up</a>
    or 
    <a href="/log-in">Log In</a>
    `;
}

function signUpForm(title) {
  return /*html*/ `
    <h1>${title}</h1>
<form method="POST">

    <label for="name">Name <span aria-hidden="true">*</span></label>
    <input id="name" name="name" required>

    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email" required>

    <label for="password">Password <span aria-hidden="true">*</span></label>
    <input type="password" id="password" name="password" required>

    <button>Sign up</button>
</form>
    `;
}

function Login() {
  return /* html */ `
     <h1>Log in Page</h1>

     <form method="POST" action="/log-in">
        <label for="email">Email <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" required />

        <label for="password"> Password <span aria-hidden="true">*</span></label>
        <input id="password" type="password" name="password" required />

        <button>Log In</button>
    </form>

    `;
}

function AllPets(petsList, id) {
  const pets = petsList.map(
    (pet) => `
    <li>
    <h2>${pet.pet_name}</h2>
    <p>${pet.pet_type}</p>;
    <img src="${pet.image_path}" alt="${pet.pet_type}" />
    </li>`
  );
  return /*html */ `
    ${Navigation(id)}
    <h1>All Pets</h1>
    <ul>
        ${pets.join("")}
    </ul>
    `;
}

function Navigation(id) {
  return /*html */ `
    <header>
        <nav> 
            <div>Petsagram</div> 
            <ul>
                <li><a href="/all-pets">All Pets</a></li>
                <li><a href="/my-pets/${id}">My Pets</a></li>
                <li><form method="POST" action="/log-out"><button>Log Out</button></form></li>
            </ul>
        </nav>
    </header>
    `;
}

function MyPets(id) {
  return /*html */ `
    ${Navigation(id)}
    <h1>Submit a post about your pet</h1>
    <form method="POST" enctype="multipart/form-data">
        <label for="petName">Pet Name<span aria-hidden="true">*</span></label>
        <input type="text" id="petName" name="petName" required>

        <label for="petType">Tell us about your pet<span aria-hidden="true">*</span></label>
        <input type="text" id="petType" name="petType" required>

        <label for="petImg">Pet Image<span aria-hidden="true">*</span></label>
        <input id="petImg" name="petImg" type="file">
        
        <label for="sharing">Do you want to share with other users?  
        <span aria-hidden="true">*</span>
        </label>
        <input id="sharing" name="sharing" type="checkbox">
        
        <button>Submit</button>
    </form>
    `;
}

function ExistingUser() {
  return /*html */ `
    <h1>This email already exists on our database</h1>
    <p>Please either sign up or try to log in</p>
    <a href="/log-in">Log in</a>
    or
    <a href="/sign-up">Sign up</a>
  `;
}

function ErrorPage() {
  return /* html */ `
   <h1>Login Failed</h1>
   <p>Something went wrong. Please enter the correct email or password.</p>
   <a href="/log-in">Log in</a>
   or
   <a href="/sign-up"> Sign up</a>`;
}

function sanitization(str) {
  return str.replace(/</g, "&lt");
}

module.exports = {
  Layout,
  Home,
  Login,
  signUpForm,
  AllPets,
  ErrorPage,
  MyPets,
  sanitization,
  ExistingUser,
};
