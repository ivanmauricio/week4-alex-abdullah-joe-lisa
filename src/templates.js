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

module.exports = { Layout, Home };
