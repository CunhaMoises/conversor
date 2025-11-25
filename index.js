const salariosMinimos = {
    "brasil": 1518,
    "estados-unidos": 1160,
    "japao": 176000,
    "portugal": 910,
    "alemanha": 2200,
    "franca": 1766,

};

const moedas = {
    "real" : "R$",
    "dolar" : "$",
    "ien" : "¥",
    "euro": "€",
}

const paisParaMoeda = {
  'brasil': 'real',
  'estados-unidos': 'dolar',
  'japao': 'ien',
  'portugal': 'euro',
  'alemanha': 'euro',
  'franca': 'euro'
};



let comparar = document.querySelector('.button')
let zerar_Campos = document.getElementById('zerar-campos')
let calcular_Salario = document.querySelector('.calcular')
let input = document.querySelectorAll('input')


const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input_Quantos_Salarios = document.querySelector('.quantos-salarios2')

const select1 = document.getElementById('pais1');
const select2 = document.getElementById('pais2');
let select_Input = document.querySelectorAll('.moeda')
const valor_Item = document.getElementById('input-valor-item')

let p1 = document.querySelector('.p3')
let p2 = document.querySelector('.p4')
let pSelect1 = document.querySelector('.p-select1')
let pSelect2 = document.querySelector('.p-select2')

const div1 = document.querySelector('.flex-h2')
const div2 = document.querySelector('.flex')
const div3 = document.querySelector('.div-final')

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
    select_Input.forEach(el => {
        el.disabled = true
    })
  } else {
    input1.disabled = false;
    input2.disabled = false;
  }
}

// detecta mudanças em inputs e selects
[input1, input2].forEach(el => el.addEventListener('input', verificarCampos));
[select1, select2].forEach(el => el.addEventListener('change', verificarCampos));

function esconderDiv () {
    [div1,div2,div3].forEach (div => {
        div.style.display = 'none'
    })
}

zerar_Campos.addEventListener('click', ()=> {
    input1.value = ''
    input2.value = ''
    input_Quantos_Salarios.value = ''
    select1.value = ''
    select2.value = ''
    valor_Item.value = ''
    input1.disabled = false
    input2.disabled = false
    select1.disabled = false
    select2.disabled = false
    p1.style.display = 'none'
    p2.style.display = 'none'
    pSelect1.style.display = 'none'
    pSelect2.style.display = 'none'

    select_Input.forEach(select => {
        select.value =''
        select.disabled = false
    })

    esconderDiv()

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
    let h2 = document.querySelector('.aga2')
    const container = document.querySelector('.container-main')
    const div1 = document.querySelector('.flex-h2')
    const div2 = document.querySelector('.flex')
    let moeda_Select1 = document.querySelectorAll('.moeda')[0].value
    let moeda_Select2 = document.querySelectorAll('.moeda')[1].value

    
    let valorItem = document.getElementById('input-valor-item').value

    let salario_Pais1 = salariosMinimos[select1_value]
    let salario_Pais2 = salariosMinimos[select2_value]


    let p_porcentagem1 = document.querySelector('.p3')
    let p_porcentagem2 = document.querySelector('.p4')
    let pSelect1 = document.querySelector('.p-select1')
    let pSelect2 = document.querySelector('.p-select2')
    

    //converte o texto formatado pelo InputMask
    input1_value = parseFloat(input1_value.replace(/\./g,"").replace(",","."))
    input2_value = parseFloat(input2_value.replace(/\./g,"").replace(",","."))
    valorItem = parseFloat(valorItem.replace(/\./g,"").replace(",","."))

    function mudarContainer () {

        container.style.height = '93vh'
        container.style.marginTop = '50px'
    }

    function mostrarDiv () {
        [div1,div2].forEach(div => {
            div.style.display = 'flex'
        })
    }

    function getMoedaSelect (pais) {
        return moedas[paisParaMoeda[pais]]
    }

    function getMoedaInput (moeda) {
        return moedas[moeda]
    }

    let salario_Conta1 
    let salario_Conta2

    let moeda1
    let moeda2

    
    // verifica todos os campos zerados
    if (!input1_value && !input2_value && !select1_value && !select2_value) {
        h1.style.display = 'block'
        h1.textContent = 'Preencha os campos corretamente'
        return
    }

    // verifica os campos com os mesmo valores
    if(moeda_Select1 === moeda_Select2 || select1_value === select2_value && select1_value !== '') {
        esconderDiv ()
        h1.style.display = 'block'
        h1.textContent = 'Os campos país ou moedas não podem estar vazios ou terem o mesmo valor'
        p_porcentagem1.style.display = 'none'
        p_porcentagem2.style.display = 'none'
    }
    
    // verifica select ou valor-item zerado
    if (
        (!select1_value || !select2_value || !valorItem)  && 
        (!input1_value && !input2_value)
        ) {
        h1.style.display = 'block'
        h1.textContent = 'Não pode haver campos vazios1'
        
    }

    // verifica input,moeda ou valor-item zerado
    if (
        (!input1_value || !input2_value || moeda_Select1 === "" || moeda_Select2 === "" || !valorItem)  && 
        (select1_value === "" && select2_value === "")
        ) {
        h1.style.display = 'block'
        h1.textContent = 'Não pode haver campos vazios'
        return
    } 

    // faz conta usando os valores do select
    if (
        (select1_value && select2_value && valorItem) &&
        (select1_value !== select2_value)
        ) {
        mostrarDiv ()
        h1.style.display = 'none'
        salario_Conta1 = salariosMinimos[select1_value]
        salario_Conta2 = salariosMinimos[select2_value]
        moeda1 = getMoedaSelect(select1_value)
        moeda2 = getMoedaSelect(select2_value)
        pSelect1.style.display = 'block'
        pSelect2.style.display = 'block'
        pSelect1.textContent = `Salário mínimo estimado em ${salariosMinimos[select1_value]}`
        pSelect2.textContent = `Salário mínimo estimado em ${salariosMinimos[select2_value]}`
        p_porcentagem1.style.display = 'block'
        p_porcentagem2.style.display = 'block'  
   }

    // faz conta usando os valores do input
    if (
        (input1_value  && input2_value && valorItem) && 
        (moeda_Select1!== moeda_Select2)
        ) {
        mostrarDiv ()
        h1.style.display = 'none'
        salario_Conta1 = input1_value
        salario_Conta2 = input2_value
        moeda1 = getMoedaInput(moeda_Select1)
        moeda2 = getMoedaInput(moeda_Select2)
        p_porcentagem1.style.display = 'block'
        p_porcentagem2.style.display = 'block'

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

    
    let quantos_salarios1 = Math.ceil(valorItem/salario_Conta1)
    let palavra = quantos_salarios1 > 1 ? 'salários' : 'salário';

    // mostra na tela os valores
    p_porcentagem1.textContent= `${moeda1} ${valorItemFormatado} equivalem a  ${formatadoPorcentagem}% do salário 1 `
    p_porcentagem2.textContent = `${formatadoPorcentagem}% do salário 2 é ${moeda2} ${abc}`
    
    h2.textContent = `Para comprar um item no valor de ${moeda1} ${valorItemFormatado} precisa de ${quantos_salarios1} ${palavra}`
    
})

calcular_Salario.addEventListener('click', ()=> {
    let input = document.querySelector('.quantos-salarios2').value
    let input_salario = document.getElementById('input2').value
    let select = document.getElementById('pais2').value
    let h2 = document.querySelectorAll('.aga2')[1]
    let div = document.querySelector('.div-final')
    let moeda_input = document.querySelectorAll('.moeda')[1].value

    input = parseFloat(input.replace(/\./g,"").replace(",","."))
    input_salario = parseFloat(input_salario.replace(/\./g,"").replace(",","."))
    
    function getMoedasInput (moeda) {
        return moedas[moeda]
    }

    function getMoedasSelect (pais) {
        return moedas[paisParaMoeda[pais]]
    }

    let conta_Salario
    let moeda
    
    if (input_salario && !select) {
        conta_Salario = input_salario
        moeda = getMoedasInput(moeda_input)
    } else {
        conta_Salario = salariosMinimos[select]
        moeda = getMoedasSelect(select)
    }   
    
    let quantos_Salarios = Math.ceil (input/conta_Salario)
    let palavra = quantos_Salarios > 1 ? 'salários' : 'salário'


    div.style.display = 'block'
    h2.textContent = `Para comprar um item no valor de ${moeda} ${input} precisa de  ${quantos_Salarios} ${palavra}`
    
})



