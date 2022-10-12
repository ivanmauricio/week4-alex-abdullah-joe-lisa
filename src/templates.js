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

function signUpForm() {
    return /*html*/ `
    <h1>Create an account</h1>
<form method="POST">
<label for="name">Name</label>
<input type="name" id="name" name="name">
<label for="email">Email</label>
<input type="email" id="email" name="email">
<label for="pw">Password</label>
<input type="password" id="pw" name="pw">
<button>Sign up</button>
</form>
    `  
}

module.exports = { signUpForm, Layout, Home };

