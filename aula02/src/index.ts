
const nome:string = "Bruno";

const numero:number = 123; //"Bruno" da erro se passar string

console.log(nome);
console.log(numero);


function testarString(teste: String): String { // se é um texto simples é um texto
    return "é um texto";
}

interface IUser{
    nome: String,
    idade: number
}

function saudacao(User: IUser): String { 
    return `Olá ${User.nome}, você tem ${User.idade} anos de idade!`;
}

console.log(testarString("BRUNO"));
console.log(saudacao({nome:"BRUNO", idade : 23}));


interface IProduto {
    nome: String,
    preco: number,
    emEstoque: boolean,
    categorias: String[],
    localizacao: [number, number]
    StatusPedido: EStatusPedido
};

/*const produto1: IProduto = {
    nome: "Mouse",
    preco: 400,
    emEstoque:true
};

console.log(produto1);*/

enum EStatusPedido {
    PENDENTE = "PENDENTE",
    PROCESSANDO = "PROCESSANDO",
    ENTREGUE = "ENTREGUE",
    CANCELADO = "CANCELADO"
};

const produto2: IProduto = {
    nome: "Teclado",
    preco: 200,
    emEstoque: true,
    categorias: ["Periféricos", "Informática"],
    localizacao: [-23.5489, -46.6388],
    StatusPedido: EStatusPedido.PENDENTE
};

function exibirInformacoesProduto(produto: IProduto) {
    if (produto.emEstoque) {
        const precoFormatado = produto.preco.toLocaleString('pt-BR',{
             style: 'currency', currency: 'BRL'
            });
        console.log(`O produto ${produto.nome} está em estoque e custa ${precoFormatado}.`);
    } else {
        console.log(`O produto ${produto.nome} não está em estoque.`);
    }
}

exibirInformacoesProduto(produto2);