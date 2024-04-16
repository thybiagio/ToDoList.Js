'use strict';


const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
// Recupera os dados do banco e os converte de JSON para JavaScript
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));
//Salva os dados no banco, convertendo JavaScript para JSON

const criarItem = (tarefa, status, indice) => {
//Cria um novo item na lista de tarefas
    const item = document.createElement('label');
    item.classList.add('todo__item');
    //Cria um elemento <label> e adiciona a classe 'todo__item' a ele
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
            <div class="tarefa" data-indice=${indice}>${tarefa}</div>
            <input type="button" value="X" data-indice=${indice}>`;
            //Define o conteúdo HTML do item, incluindo uma caixa de seleção, a descrição da tarefa e um botão para remoção
    document.getElementById('todoList').appendChild(item);
    //Adiciona o item à lista de tarefas no documento HTML
};

const limparTarefas = () => {
    //Função para limpar a lista de tarefas no documento HTML
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
    //Remove todos os filhos do elemento com o id 'todoList'
};

const atualizarTela = () => {
    //Atualiza a tela com base nos dados armazenados
    const banco = getBanco();
    //Recupera os dados do banco
    limparTarefas();
    //Limpa a lista de tarefas no documento HTML
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
    //Para cada item no banco, cria e exibe um novo item na lista de tarefas
};

const inserirItem = (evento) => {
    //Função para inseriri um novo item na lista de tarefas quando uma tecla é pressionada
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': texto, 'status': '' });
        //Adiciona uma nova tarefa ao banco
        setBanco(banco);
        //Salva o banco atualizado no localStorage
        atualizarTela();
        //Atualiza a tela exibindo a nova tarefa
        evento.target.value = '';
        //Limpa o campo de entrada
    }
};

const removerItem = (indice) => {
    //Função para remover um item da lista de tarefas
    const banco = getBanco();
    banco.splice(indice, 1);
    //Remove o item do banco
    setBanco(banco);
    //Salva o banco atualizado no localStorage
    atualizarTela();
    //Atualiza a tela removendo o item
};

const atualizarItem = (indice) => {
    //Função para atualizar o status de uma tarefa
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    //Alterna o status da tarefa  entre checked e vazio
    setBanco(banco);
    //Salva o banco atualizado no localStorage
    atualizarTela();
    //Atualiza a tela exibindo o novo status da tarefa
};

const editarItem = (indice, novoTexto) => {
    //Função para editar o texto de uma tarefa
    const banco = getBanco();
    banco[indice].tarefa = novoTexto;
    //Atualiza o texto da tarefa no banco
    setBanco(banco);
    //Salva o banco atualizado no localStorage
    atualizarTela();
    //Atualiza a tela exibindo o texto atualizado da tarefa
};

const clickItem = (evento) => {
    //Função para lidar com cliques em items da lista de tarefas
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
        //Se o clique foi em um botão de remoção, remove o item correspondente
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
        //Se o clique foi em uma caixa de seleção, atualiza o status da tarefa
    }
};

const editarTarefa = (evento) => {
    //Função para editar o texto de uma tarefa ao clicar sobre ele
    const elemento = evento.target;
    if (elemento.classList.contains('tarefa')) {
        const indice = elemento.dataset.indice;
        const novoTexto = prompt('Editar tarefa:', elemento.innerText);
        //Solicita ao usuário um novo texto para a tarefa
        if (novoTexto !== null) {
            editarItem(indice, novoTexto);
            //Se um novo texto foi fornecido, edita a tarefa correspondente.
        }
    }
};

//Adiciona os event listeners aos elementos necessários
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('todoList').addEventListener('click', editarTarefa);

//Atualiza a tela com base nos dados armazenados no carregamento da página
atualizarTela();
