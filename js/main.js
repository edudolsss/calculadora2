// Definindo visão de elementos.
let nav = document.getElementById('calMaluca').style.display = "none"
let regPoint = document.getElementById('registroPontos').style.display = "none"

// Conjunto de eventos ouvintes, por click.
document.getElementById('btnCalculadoraMaluca').addEventListener('click',mudarCalculadora)
document.getElementById('btnVoltar').addEventListener('click',mudarCalculadora)
document.getElementById('respondendo').addEventListener('click',responder)

//Função que monta a operação matemática na aplicação.
function teclando(tecla){
    let operacao = document.getElementById('contaMath')
    operacao.value += tecla
}

//Função que troca de calculadora comum, para calculadora maluca.
function mudarCalculadora(){
    if(nav == "none"){
        document.getElementById('calNormal').style.display = "none"
        nav = document.getElementById('calMaluca').style.display = "block"
        ativarTimer()
    }
    else{
        numeroDeQuestoes = 20
        nivel = 10
        vidas = 3
        regPoint = document.getElementById('registroPontos').style.display = "none"
        document.getElementById('acertos').innerHTML=""
        document.getElementById('erros').innerHTML=""
        nav = document.getElementById('calMaluca').style.display = "none"
        document.getElementById('calNormal').style.display = "block"
        clearTimeout(timerVar)
    }
}

// Função que resolve a operação informada.
function resolverOP(){
    const opAlvo = document.getElementById('contaMath').value

    const resultado = eval(`${opAlvo}`)

    console.log(resultado)

    document.getElementById('contaMath').value = resultado.toFixed(8)
    setTimeout(function(){
        document.getElementById('contaMath').value = ""
    },3000)
}

//Variáveis de controle.
let numeroDeQuestoes = 20
let nivel = 10
var vidas = 3
var count
let timerVar

//Ativar o timer e faz o texto de operação supresa ser atualizado, toda vez que o timer chegar a 0.
function ativarTimer(){
    criarOP(nivel)
    count = 180
    function start(){
        if ((count - 1) >= 0) {
            count -= 1
            console.log(count)
            document.getElementById('mostraTimer').innerHTML = count
            timerVar = setTimeout(start, 1000)
            if(count == 0){
                if(numeroDeQuestoes !=0){
                    numeroDeQuestoes -= 1
                    criarOP(nivel)
                    ativarTimer()
                }else{
                    regPoint = document.getElementById('registroPontos').innerHTML = "Acertos: " + pontos
                    regPoint = document.getElementById('registroPontos').style.display = "block"
                }
            }
        }
    }
    start()
}

//Função que cria a operação de forma randômica.
function criarOP(nivel){
    const ops = ['+','-','*','/']
    const valor1 = Math.floor(Math.random() * nivel)
    const valor2 = Math.floor(Math.random() * nivel)
    const op = ops[Math.floor(Math.random() * 4)]

    const opResult = (valor1+op+valor2)

    document.getElementById('questao').innerHTML = opResult
}

// Função de checagem de resultado e operador de pontos.
let pontos = 0
function responder(){
    let questaoAlvo = document.getElementById('questao').innerHTML
    var resposta = document.getElementById('respostinha').value
    let resultado = Math.abs(eval(`${questaoAlvo}`))

    if(resultado == resposta){
        pontos += 1
        console.log("Resultado:" , resultado)
        console.log("Resposta:", resposta)
        console.log("Nível:", nivel)
        console.log("Pontos:", pontos)
        console.log("Vidas:", vidas)
        if(pontos >= 5 && pontos <= 10 ){
            nivel *= 10
        }
        else if(pontos >= 11 && pontos <= 15){
            nivel *= 100
        }
        else if(pontos > 15){
            nivel *= 1000
        }
        clearTimeout(timerVar)
        count = 1
        ativarTimer()

        const p = document.createElement('p')
        p.innerHTML = `<p> Operação: ${questaoAlvo}  Resultado: ${resultado} Reposta: ${resposta}</p>`
        document.getElementById('acertos').appendChild(p)
        var resposta = document.getElementById('respostinha').value = ""



    }
    else if(resultado != resposta){
        vidas -= 1
        console.log("Resultado:" , resultado)
        console.log("Resposta: ", resposta)
        console.log("Nível: ", nivel)
        console.log("Pontos: ", pontos)
        console.log("Vidas:", vidas)
        if(vidas != 0){
            clearTimeout(timerVar)
            count = 1
            ativarTimer()
        }else{
            regPoint = document.getElementById('registroPontos').innerHTML = "Acertos: " + pontos
            regPoint = document.getElementById('registroPontos').style.display = "block"
            clearTimeout(timerVar)
        }
        const p = document.createElement('p')
        p.innerHTML = `<p> Operação: ${questaoAlvo}  Resultado: ${resultado} Reposta: ${resposta}</p>`
        document.getElementById('erros').appendChild(p)

        var resposta = document.getElementById('respostinha').value = ""
    }
}