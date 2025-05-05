// app.js
const db = firebase.firestore();
const auth = firebase.auth();
let userId = null;

auth.onAuthStateChanged(user => {
  if (user) {
    userId = user.uid;
    carregarItens();
  } else {
    window.location.href = "login.html";
  }
});

function adicionarItem() {
  const nome = document.getElementById("itemInput").value;
  if (!nome.trim()) return;
  
  db.collection("listas")
    .doc(userId)
    .collection("itens")
    .add({
      nome: nome,
      comprado: false,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      document.getElementById("itemInput").value = "";
      carregarItens();
    });
}

function carregarItens() {
  const lista = document.getElementById("listaItens");
  lista.innerHTML = "";

  db.collection("listas")
    .doc(userId)
    .collection("itens")
    .orderBy("criadoEm", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const item = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
          <input type="checkbox" ${item.comprado ? "checked" : ""} onchange="marcarComprado('${doc.id}', this.checked)">
          ${item.nome}
          <button onclick="removerItem('${doc.id}')">🗑</button>
        `;
        lista.appendChild(li);
      });
    });
}

function marcarComprado(id, comprado) {
  db.collection("listas")
    .doc(userId)
    .collection("itens")
    .doc(id)
    .update({ comprado });
}

function removerItem(id) {
  db.collection("listas")
    .doc(userId)
    .collection("itens")
    .doc(id)
    .delete()
    .then(() => carregarItens());
}

function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
    }).catch((error) => {
      console.error("Erro ao sair:", error);
    });
  }
  