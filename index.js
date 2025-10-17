let botao = document.querySelector('.button')
let input = document.querySelectorAll('.input')
Inputmask('decimal', {
    alias: 'numeric',          // Tipo numérico
    groupSeparator: '.',       // Separador de milhar
    radixPoint: ',',           // Separador decimal
    digits: 2,                 // Quantas casas decimais
    autoGroup: true,           // Agrupa automaticamente os milhares
    rightAlign: false,         // Mantém texto alinhado à esquerda
    allowMinus: false          // Não permite números negativos
  }).mask(input);


botao.addEventListener('click', ()=> {
    let salario1 = document.getElementById('input1').value
    let salario2 = document.getElementById('input2').value
    let valorItem = document.getElementById('input-valor-item').value
    let p1 = document.querySelector('.p3')
    let p2 = document.querySelector('.p4')

    salario1 = parseFloat(salario1.replace(/\./g,"").replace(",","."))
    salario2 = parseFloat(salario2.replace(/\./g,"").replace(",","."))
    valorItem = parseFloat(valorItem.replace(/\./g,"").replace(",","."))

    

    let resultadoPorcentagem = ()=> (valorItem/salario1)*100
    
    function seTemDecimal (valor) {
        return Number.isInteger(valor) ? valor : valor.toFixed(3)
    }
    
    let formatadoPorcentagem = seTemDecimal(resultadoPorcentagem())

    let valorItemFormatado = valorItem.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    })
    
    p1.textContent= `${valorItemFormatado} equivalem a ${formatadoPorcentagem}% do salário 1 `
    p1.style.display = 'block'

    let resultadoSalario = function () {
        let resultado = formatadoPorcentagem/100
        return resultado*salario2
    }

    let formatadoSalario = Math.round(resultadoSalario())

    let abc = formatadoSalario.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    })


    p2.textContent = `${formatadoPorcentagem}% do salário 2 é ${abc}`
    p2.style.display = 'block'

})

