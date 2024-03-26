'use strict';

                /*<label class="todo__item">
                <input type="checkbox">
                <div>teste de item 1</div>
                <input type="button" value="X">
                </label>*/

//let banco = [
  //  {'tarefa': 'Estudar JavaScript', 'status':''},
   // {'tarefa': 'Terminar Serie Netflix', 'status':'checked'},
//] 

//mostrar o aplication para exibir o conceito do json no google chrome

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
        item.classList.add('todo__item');
        item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
            <div>${tarefa}</div>
            <input type="button" value="X" data-indice=${indice}>`
    document.getElementById('todoList').appendChild(item);
    
}// apos aqui testar no navegador e tirar digitar no console criarItem()

const limparTarefas = () =>{
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    const banco = getBanco();
    limparTarefas();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    //console.log(tecla); para testar se esta mostrando o que esta sendo digitado
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status':''});
        setBanco(banco);
        atualizarTela();
        evento.target.value='';//limpar a tarefa apos digitação
    }

}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}
const clickItem = (evento) => {
    const elemento = evento.target;
    //console.log(elemento); - para verificar se identifica os itens do html ao clicar no console do google chrome
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice)
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
} 



document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);//testar que nao esta diferenciando os values no html e que precisa ter uma diferença aqui nos values de cada tarefa

atualizarTela();