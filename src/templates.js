//Basic layout function

function Layout({ title, content }) {
  return /* html */ `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel ="stylesheet" href ="../styles.css">
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
  <div class = "home_container">
    <h1>Petsagram</h1>

   <div class="button_container">
    <a href="/sign-up">Sign Up</a>
    <a href="/log-in">Log In</a>
    </div>

  </div>
    `;
}

function signUpForm(title, errors = {}, values = {}) {
  return /*html*/ `
 <div class="form_container" >  

  <h1>${title}</h1>
<form  method="POST">

    <label for="name">Name <span aria-hidden="true">*</span></label>
    <input id="name" name="name"  value='${values.name ? values.name : ""}'>
    ${validation(errors.name)}

    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input type="email" id="email" name="email"  value='${
      values.email ? values.email : ""
    }'>
    ${validation(errors.email)}

    <label for="password">Password <span aria-hidden="true">*</span></label>
    <input type="password" id="password" name="password">
    ${validation(errors.password)}

    <button>Sign up</button>
</form>
</div>
    `;
}

function Login(errors = {}, values = {}) {
  return /* html */ `

  <div class="login_container"> 
     <h1>Log in Page</h1>

     <form method="POST" action="/log-in">
        <label for="email">Email <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" value="${
          values.email ? values.email : ""
        }" />
        ${validation(errors.email)}

        <label for="password"> Password <span aria-hidden="true">*</span></label>
        <input id="password" type="password" name="password" />
        ${validation(errors.password)}

        <button>Log In</button>
    </form>
  </div>  
    `;
}

function AllPets(petsList, id) {
  const pets = petsList.map(
    (pet) => `
   <div class="allpets_container">
      <li>
      <h2>${pet.pet_name}</h2>
      <p>${pet.pet_type}</p>
        <div class="image_container">
         <img src="${pet.image_path}" alt="${pet.pet_type}" />
        </div>
      </li>
    </div> 
    
    `
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
        <nav class ="nav_container"> 
            <h1>Petsagram</h1> 
            <ul class ="nav_items">
                <li><a href="/all-pets">All Pets</a></li>
                <li><a href="/my-pets/${id}">My Pets</a></li>
                <li><form method="POST" action="/log-out"><button>Log Out</button></form></li>
            </ul>
        </nav>
    </header>
    `;
}

function MyPets(id, petsList, errors = {}, values = {}) {
  console.log(petsList)
  const pets = petsList.map(
    (pet) => `
   <div class="allpets_container">
      <li>
      <h2>${pet.pet_name}</h2>
      <p>${pet.pet_type}</p>
        <div class="image_container">
         <img src="${pet.image_path}" alt="${pet.pet_type}" />
        </div>
      </li>
    </div> 
    
    `
  );
  return /*html */ `
    ${Navigation(id)}
    <h1>Submit a post about your pet</h1>
    <form method="POST" enctype="multipart/form-data">
        <label for="petName">Pet Name<span aria-hidden="true">*</span></label>
        <input type="text" id="petName" name="petName" value='${
          values.petName ? values.petName : ""
        }'>
        ${validation(errors.petName)}

        <label for="petType">Tell us about your pet<span aria-hidden="true">*</span></label>
        <input type="text" id="petType" name="petType" value='${
          values.petType ? values.petType : ""
        }'>
        ${validation(errors.petType)}

        <label for="petImg">Pet Image<span aria-hidden="true">*</span></label>
        <input id="petImg" name="petImg" type="file" >
        ${validation(errors.petImg)}
        
        <label for="sharing">Do you want to share with other users?  
        <span aria-hidden="true">*</span>
        </label>
        <input id="sharing" name="sharing" type="checkbox">
        
        <button>Submit</button>
    </form>
    <ul>
    ${pets.join("")}
</ul>
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

function validation(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
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
