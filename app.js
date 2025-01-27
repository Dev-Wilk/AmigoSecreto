const listaAmigos = [];

function adicionarAmigo() {
    // Obtém o valor do campo de entrada
    const nome = document.getElementById('amigo').value.trim();

    // Validação para que o campo esteja preenchido com um nome válido.
    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    // Validação para que o nome não inicie com número.
    if (/^\d/.test(nome)) {
        alert("Nome não pode começar com número.");
        return;
    }

    // Validação para que o nome não seja repetido.
    for (let i = 0; i < listaAmigos.length; i++) {
        if (listaAmigos[i].nome === nome) {
            alert("Nome já existe na lista.");
            return;
        }
    }

    // Cria um objeto com o nome do amigo e adiciona na lista de amigos.
    const novoAmigo = {
        nome: nome,
    };
    listaAmigos.push(novoAmigo);

    // Atualiza a lista na interface
    atualizarListaAmigos();

    // Limpa o campo de entrada
    document.getElementById('amigo').value = '';
}

function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    listaAmigosElement.innerHTML = ''; // Limpa a lista atual

    // Adiciona cada amigo na lista
    listaAmigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo.nome;
        listaAmigosElement.appendChild(li);
    });
}

// Função para sortear um amigo da lista.
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Não há amigos na lista.");
        return;
    }

    // Lógica para sortear um amigo
    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    alert(`Amigo sorteado: ${amigoSorteado.nome}`);
}

// Limpa a lista de amigos
function limparLista() {
    listaAmigos.length = 0; 
    atualizarListaAmigos(); 
    alert("Lista de amigos foi limpa.");
}
