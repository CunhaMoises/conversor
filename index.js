const salariosMinimos = {
    "brasil": 1518,
    "estados-unidos": 1160,
    "japao": 176000,
    "portugal": 910,
    "alemanha": 2200,
    "franca": 1766,

};

let comparar = document.querySelector('.button')
let zerar_Campos = document.getElementById('zerar-campos')
let input = document.querySelectorAll('input')


const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const select1 = document.getElementById('pais1');
const select2 = document.getElementById('pais2');
const valor_Item = document.getElementById('input-valor-item')
let p1 = document.querySelector('.p3')
let p2 = document.querySelector('.p4')
let pSelect1 = document.querySelector('.p-select1')
let pSelect2 = document.querySelector('.p-select2')

//formata a entrada do input
Inputmask('decimal', {
    alias: 'numeric',          // Tipo numérico
    groupSeparator: '.',       // Separador de milhar
    radixPoint: ',',           // Separador decimal
    digits: 2,                 // Quantas casas decimais
    autoGroup: true,           // Agrupa automaticamente os milhares
    rightAlign: false,         // Mantém texto alinhado à esquerda
    allowMinus: false          // Não permite números negativos
}).mask(input);

//desativa input ou select
function verificarCampos() {
  const algum_Input_Preenchido = input1.value.trim() !== "" || input2.value.trim() !== "";
  const algum_Select_Preenchido = select1.value !== "" || select2.value !== "";

  // desativa os selects
  if (algum_Input_Preenchido) {
    select1.disabled = true;
    select2.disabled = true;
  } else {
    select1.disabled = false;
    select2.disabled = false;
  }

  // desativa os inputs
  if (algum_Select_Preenchido) {
    input1.disabled = true;
    input2.disabled = true;
  } else {
    input1.disabled = false;
    input2.disabled = false;
  }
}

// detecta mudanças em inputs e selects
[input1, input2].forEach(el => el.addEventListener('input', verificarCampos));
[select1, select2].forEach(el => el.addEventListener('change', verificarCampos));


zerar_Campos.addEventListener('click', ()=> {
    input1.value = ''
    input2.value = ''
    select1.value = ''
    select2.value = ''
    valor_Item.value = ''
    input1.disabled = false
    input2.disabled = false
    select1.disabled = false
    select2.disabled = false
    p1.style.visibility = 'hidden'
    p2.style.visibility = 'hidden'
    pSelect1.style.visibility = 'hidden'
    pSelect2.style.visibility = 'hidden'
})

comparar.addEventListener('click', ()=> {
    let input1 = document.getElementById('input1')
    let input2 = document.getElementById('input2')
    let input1_value = input1.value
    let input2_value = input2.value
    

    let select1 = document.getElementById('pais1')
    let select2 = document.getElementById('pais2')
    let select1_value = select1.value
    let select2_value = select2.value

    let h1 = document.getElementById('h1')
    
    let valorItem = document.getElementById('input-valor-item').value

    let salario_Pais1 = salariosMinimos[select1_value]
    let salario_Pais2 = salariosMinimos[select2_value]


    let p1 = document.querySelector('.p3')
    let p2 = document.querySelector('.p4')
    let pSelect1 = document.querySelector('.p-select1')
    let pSelect2 = document.querySelector('.p-select2')

    //converte o texto formatado pelo InputMask
    input1_value = parseFloat(input1_value.replace(/\./g,"").replace(",","."))
    input2_value = parseFloat(input2_value.replace(/\./g,"").replace(",","."))
    valorItem = parseFloat(valorItem.replace(/\./g,"").replace(",","."))


    let salario_Conta1 
    let salario_Conta2

    // verifica todos os campos zerados
    if (!input1_value && !input2_value && !select1_value && !select2_value) {

        h1.style.visibility = 'visible'
        h1.textContent = 'Preencha algum campo'
        h1.style.margin = '4vh 0 4vh 65vh'
        return
    }

    // verifica os campos com os mesmo valores
    if(input1_value === input2_value || select1_value === select2_value && select1_value !== '') {
        
        h1.style.margin = '4vh 0 4vh 50vh'
        h1.style.display = 'visible'
        h1.textContent = 'Os campos não podem ter o mesmo valor'
        p1.style.visibility = 'hidden'
        p2.style.visibility = 'hidden'
    }

    // verifica input ou valor-item zerado
    if (
        (!input1_value || !input2_value || !valorItem)  && 
        (!select1_value && !select2_value)
        ) {
        
        h1.style.visibility = 'visible'
        h1.textContent = 'Não pode haver campos vazios'
        h1.style.margin = '4vh 0 4vh 58vh'
        
    }

    // verifica select ou valor-item zerado
    if (
        (!select1_value || !select2_value || !valorItem)  && 
        (!input1_value && !input2_value)
        ) {
        
        h1.style.visibility = 'visible'
        h1.textContent = 'Não pode haver campos vazios'
        h1.style.margin = '4vh 0 4vh 58vh'
        
    }

    // faz conta usando os valores do select
    if (
        (select1_value && select2_value && valorItem) &&
        (select1_value !== select2_value)
        ) {
       
       h1.style.visibility = 'hidden'
       salario_Conta1 = salariosMinimos[select1_value]
       salario_Conta2 = salariosMinimos[select2_value]
       pSelect1.style.visibility = 'visible'
       pSelect2.style.visibility = 'visible'
       pSelect1.textContent = `Salário mínimo estimado em ${salariosMinimos[select1_value]}`
       pSelect2.textContent = `Salário mínimo estimado em ${salariosMinimos[select2_value]}`
       p1.style.visibility = 'visible'
       p2.style.visibility = 'visible'  
   }

    // faz conta usando os valores do input
    if (
        (input1_value  && input2_value && valorItem) && 
        (input1_value!== input2_value)
        ) {
        
        h1.style.visibility = 'hidden'
        salario_Conta1 = input1_value
        salario_Conta2 = input2_value
        p1.style.visibility = 'visible'
        p2.style.visibility = 'visible'

    } 


    // porcentagem do item sobre o salario
    let resultadoPorcentagem = ()=> (valorItem/salario_Conta1)*100
    
    // formata para ate 3 casas decimais
    function seTemDecimal (valor) {
        return Number.isInteger(valor) ? valor : valor.toFixed(3)
    }
    
    let formatadoPorcentagem = seTemDecimal(resultadoPorcentagem())

    // formata o valor-item para padrao brasileiro com ponto e vírgula
    let valorItemFormatado = valorItem.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    
    // faz a conta de quantos porcentos equivalem ao salario 2
    let resultadoSalario = function () {
        let resultado = formatadoPorcentagem/100
        return resultado*salario_Conta2
    }
    
    let formatadoSalario = Math.round(resultadoSalario())
    
    // formata o valor-item para padrao brasileiro com ponto e vírgula
    let abc = formatadoSalario.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    
    
    // mostra na tela os valores
    p1.textContent= `${valorItemFormatado} equivalem a ${formatadoPorcentagem}% do salário 1 `
    p2.textContent = `${formatadoPorcentagem}% do salário 2 é ${abc}`        
    
    
})


