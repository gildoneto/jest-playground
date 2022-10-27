//Classe pessoa que serve como molde para a criação dos objetos "residente" no array listaResidentes
const alert = msg => console.log(msg); 

const prompt = require('prompt-sync')();

let contador = 0;
let mediaR = 0;
let mediaIMC = 0;
let mediaIdade = 0;

const pessoa = {
  nome: '',
  idade: 0,
  peso: 0,
  altura: 0,
  renda: 0
};
const listaResidentes = []; //Lista que contém os residentes e seus dados

//função que cadastra os residentes e os adiciona à lista
function cadastrar() {
  pessoa.nome = prompt('Digite o nome: ');
  pessoa.idade = parseInt(prompt('Digite a idade: '));
  pessoa.peso = parseFloat(prompt('Digite o peso: '));
  pessoa.altura = parseFloat(prompt('Digite a altura: '));
  pessoa.renda = parseFloat(prompt('Digite a renda: '));

  listaResidentes.push(pessoa);
  adicionarPessoa();
}

//Pergunta ao usuário se ele deseja adicionarPessoa um novo residente
function adicionarPessoa(resposta) {
  ++contador;

  if (contador > 1) {
    resposta = prompt('Deseja cadastrar mais um residente?');
  } else {
    resposta = prompt('Deseja cadastrar um residente?');
  }

  if (resposta == 'sim') {
    cadastrar();
  } else {
    rendaMedia();
    imcMedio();
    idadeMedia();
    alert('Até mais!');
  }
}

adicionarPessoa();

function rendaMedia() {
  listaResidentes.forEach(function (residente) {
    let renda = residente.renda;
    mediaR += renda;
  });

  alert(
    `A média de renda na residência é: R$${mediaR / listaResidentes.length}`,
  );
}

function imcMedio() {
  listaResidentes.forEach(function (residente) {
    let peso = residente.peso;
    let altura = residente.altura;
    let imc = peso / altura ** 2;
    mediaIMC += imc;
  });

  alert(
    `A média do IMC na residência é:${(
      mediaIMC / listaResidentes.length
    ).toFixed()}`,
  );
}

function idadeMedia() {
  listaResidentes.forEach(function (residente) {
    let idade = residente.idade;
    mediaIdade += idade;
  });

  alert(
    `A média de idade na residência é: ${(
      mediaIdade / listaResidentes.length
    ).toFixed()}`,
  );
}

