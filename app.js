const listaAmigos = [];

// Carregar a lista do localStorage ao carregar a página
function carregarLista() {
    const listaSalva = localStorage.getItem('listaAmigos');
    if (listaSalva) {
        listaAmigos.push(...JSON.parse(listaSalva));
        ordenarLista(); // Ordena a lista ao carregar
        atualizarListaAmigos();
    }
}

// Salvar a lista no localStorage
function salvarLista() {
    localStorage.setItem('listaAmigos', JSON.stringify(listaAmigos));
}

// Adicionar um amigo à lista
function adicionarAmigo() {
    const nome = document.getElementById('amigo').value.trim();

    // Validação para que o campo esteja preenchido com um nome válido
    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    // Validação para que o nome não inicie com número
    if (/^\d/.test(nome)) {
        alert("Nome não pode começar com número.");
        return;
    }

    // Validação para que o nome contenha apenas letras e espaços
    if (!/^[a-zA-Z\s]+$/.test(nome)) {
        alert("Nome deve conter apenas letras e espaços.");
        return;
    }

    // Validação para que o nome não seja repetido
    if (listaAmigos.some(amigo => amigo.nome === nome)) {
        alert("Nome já existe na lista.");
        return;
    }

    // Adiciona o amigo à lista
    const novoAmigo = { nome: nome };
    listaAmigos.push(novoAmigo);
    ordenarLista(); // Ordena a lista após adicionar o novo amigo
    salvarLista();
    atualizarListaAmigos();

    // Exibe uma mensagem de sucesso
    const successMessage = document.createElement('div');
    successMessage.textContent = `${nome} foi adicionado à lista!`;
    successMessage.classList.add('success-message');
    document.body.appendChild(successMessage);

    // Remove a mensagem após 2 segundos
    setTimeout(() => {
        successMessage.remove();
    }, 2000);

    // Limpa o campo de entrada e define o foco de volta
    document.getElementById('amigo').value = '';
    document.getElementById('amigo').focus();
}

// Atualizar a lista de amigos na interface
function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    listaAmigosElement.innerHTML = '';

    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo.nome;

        // Botão para remover o amigo
        const removeButton = document.createElement('button');
        removeButton.textContent = '❌';
        removeButton.onclick = () => removerAmigo(index);
        removeButton.classList.add('remove-button');

        li.appendChild(removeButton);
        listaAmigosElement.appendChild(li);
    });
}

// Remover um amigo específico da lista
function removerAmigo(index) {
    if (confirm(`Tem certeza que deseja remover ${listaAmigos[index].nome} da lista?`)) {
        listaAmigos.splice(index, 1);
        salvarLista();
        atualizarListaAmigos();
    }
}

// Sortear um amigo da lista
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Não há amigos na lista.");
        return;
    }

    const amigoSorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    alert(`Amigo sorteado: ${amigoSorteado.nome}`);
}

// Limpar a lista de amigos
function limparLista() {
    if (confirm("Tem certeza que deseja limpar a lista?")) {
        listaAmigos.length = 0;
        salvarLista();
        atualizarListaAmigos();
        alert("Lista de amigos foi limpa.");
    }
}

// Ordenar a lista de amigos alfabeticamente
function ordenarLista() {
    listaAmigos.sort((a, b) => a.nome.localeCompare(b.nome));
    atualizarListaAmigos(); // Atualiza a interface após ordenar
}

// Exportar a lista de amigos como um arquivo .txt
function exportarLista() {
    if (listaAmigos.length === 0) {
        alert("Não há amigos na lista para exportar.");
        return;
    }

    // Cria o conteúdo do arquivo
    const conteudo = listaAmigos.map(amigo => amigo.nome).join('\n');

    // Cria um blob com o conteúdo
    const blob = new Blob([conteudo], { type: 'text/plain' });

    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lista_amigos.txt'; // Nome do arquivo
    link.click();

    // Limpa o objeto URL
    URL.revokeObjectURL(link.href);
}

// Carregar a lista ao iniciar a página
window.onload = carregarLista;