// auth.js
const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  auth.signInWithEmailAndPassword(email, senha)
    .then(() => window.location.href = "index.html")
    .catch(e => alert("Erro: " + e.message));
}

function cadastro() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  auth.createUserWithEmailAndPassword(email, senha)
    .then(() => alert("Cadastrado com sucesso!"))
    .catch(e => alert("Erro: " + e.message));
}
