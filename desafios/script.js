/*<!--
PROJETO TOTALMENTE ESTUDANTIL FEITO PARA FEIRA DE JOGOS DO ETE
# 
#Se voce é alguem olhando o codigo fonte, não faça algo que quebre o codigo e faça voce ter vantagem no 
#ranking ou algo assim, não é legal nem justo!
#DESENVOLVIDO POR John 1 TDS "A" ESCOLA TECNICA ESTADUAL DE PALMARES
# DATA DE CRIAÇÃO: 24/05/2024
# DATA DA ULTIMA MODIFICAÇÃO: 09/06/2024
# OUTROS PROJETOS EM: https://github.com/JohnJohn081
# ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄ 
#▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
#▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀       ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ 
#▐░▌               ▐░▌     ▐░▌                    ▐░▌     ▐░▌       ▐░▌▐░▌          
#▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌     ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
#▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌          ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌
#▐░█▀▀▀▀▀▀▀▀▀      ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀           ▐░▌     ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌
#▐░▌               ▐░▌     ▐░▌                    ▐░▌     ▐░▌       ▐░▌          ▐░▌
#▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄           ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
#▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌          ▐░▌     ▐░░░░░░░░░░▌ ▐░░░░░░░░░░░▌
# ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀            ▀       ▀▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀  

-->*/

const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option-btn');
const timerElement = document.getElementById('timer');
const hintElement = document.getElementById('hint');
const name = localStorage.getItem('userName');
const userClass = localStorage.getItem('turmaUser');
let acessoPag = localStorage.getItem('acessoPag', 'true') === 'true'; // dá o acesso para pagina1
let respondeu = false; 
let score = parseInt(localStorage.getItem('userScore')) || 0;
let timer; // Variável para armazenar o timer
let timeLeft = 60; // 1 minuto para cada pergunta
let dicas = 3; // quantidade de dicas
let usouDica = 'false'; // variavel utilizado na função getHint(Dica)

const firebaseConfig = {
    apiKey: "AIzaSyD2eNS_hDGUOcAUAmr5NFCUdWsjdelQHIE",
    authDomain: "ete-fisica.firebaseapp.com",
    projectId: "ete-fisica",
    storageBucket: "ete-fisica.appspot.com",
    messagingSenderId: "863092428014",
    appId: "1:863092428014:web:c9b843a75a0f3e65edb7ff"
  };


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Respostas do quiz e o sistema que carrega ele, facilmente acessado pelo Aluno caso tenha conhecimento necessario para tal ato
const questions = [
    {
        "question": "O que é força?",
        "options": ["A) A capacidade de um objeto de se mover", "B) A resistência ao movimento", "C) A interação que altera o estado de movimento de um objeto", "D) A quantidade de matéria em um objeto"],
        "answer": "C",
        "hint": "Está diretamente relacionada à segunda lei de Newton."
    },
    {
        "question": "Qual é a unidade de medida da força no Sistema Internacional (SI)?",
        "options": ["A) Joule", "B) Newton", "C) Watt", "D) Pascal"],
        "answer": "B",
        "hint": "É nomeada em homenagem ao cientista que formulou as leis do movimento."
    },
    {
        "question": "O que é inércia?",
        "options": ["A) A força que mantém os objetos em movimento", "B) A tendência de um objeto resistir a mudanças em seu estado de movimento", "C) A aceleração de um objeto devido à gravidade", "D) A energia armazenada em um objeto"],
        "answer": "B",
        "hint": "É um conceito central na primeira lei de Newton."
    },
    {
        "question": "O que é a aceleração?",
        "options": ["A) A mudança na posição de um objeto ao longo do tempo", "B) A taxa de variação da velocidade de um objeto", "C) A força aplicada a um objeto", "D) A resistência ao movimento de um objeto"],
        "answer": "B",
        "hint": "É calculada pela razão entre a variação da velocidade e o tempo."
    },
    {
        "question": "O que é a velocidade?",
        "options": ["A) A distância total percorrida por um objeto", "B) A razão entre a distância percorrida e o tempo", "C) A quantidade de força aplicada a um objeto", "D) A mudança na aceleração de um objeto"],
        "answer": "B",
        "hint": "É uma grandeza vetorial que possui direção e sentido."
    },
    {
        "question": "Qual é a diferença entre velocidade escalar e velocidade vetorial?",
        "options": ["A) Velocidade escalar não possui direção, enquanto velocidade vetorial possui", "B) Velocidade escalar é uma média, enquanto a vetorial é instantânea", "C) Velocidade escalar é sempre maior que a vetorial", "D) Velocidade escalar não depende da direção do movimento, enquanto a vetorial depende"],
        "answer": "D",
        "hint": "Uma das grandezas não depende da direção do movimento."
    },
    {
        "question": "O que é trabalho em física?",
        "options": ["A) A energia armazenada em um objeto", "B) O deslocamento causado por uma força aplicada", "C) A força necessária para mover um objeto", "D) A quantidade de energia dissipada por um sistema"],
        "answer": "B",
        "hint": "Está relacionado à força aplicada e ao deslocamento na mesma direção."
    },
    {
        "question": "O que é energia cinética?",
        "options": ["A) A energia armazenada em um objeto em repouso", "B) A energia associada ao movimento de um objeto", "C) A energia que não pode ser transformada", "D) A energia que é liberada durante uma reação química"],
        "answer": "B",
        "hint": "Depende da massa e da velocidade de um objeto."
    },
    {
        "question": "O que é energia potencial?",
        "options": ["A) A energia de movimento", "B) A energia armazenada devido à posição de um objeto", "C) A energia que um objeto tem ao atingir sua velocidade máxima", "D) A energia que não pode ser destruída"],
        "answer": "B",
        "hint": "Está relacionada à altura de um objeto em um campo gravitacional."
    },
    {
        "question": "O que é gravidade?",
        "options": ["A) A força que repulsa objetos com massa", "B) A resistência ao movimento em superfícies rugosas", "C) A força de atração entre dois corpos com massa", "D) A energia associada ao movimento dos planetas"],
        "answer": "C",
        "hint": "É a força responsável por manter os objetos ligados à Terra."
    },
    {
        "question": "O que é movimento uniforme?",
        "options": ["A) Movimento em que a aceleração é constante", "B) Movimento em que a velocidade é constante", "C) Movimento em linha reta com velocidade variável", "D) Movimento circular com velocidade constante"],
        "answer": "B",
        "hint": "A velocidade do objeto não varia ao longo do tempo."
    },
    {
        "question": "O que é movimento uniformemente variado (MUV)?",
        "options": ["A) Movimento com aceleração nula", "B) Movimento com velocidade constante", "C) Movimento com aceleração constante", "D) Movimento em que a aceleração é constante e a velocidade varia uniformemente"],
        "answer": "D",
        "hint": "Nesse tipo de movimento, a velocidade varia linearmente com o tempo."
    },
    {
        "question": "O que é a terceira lei de Newton?",
        "options": ["A) A lei da inércia", "B) A lei da ação e reação", "C) A lei da gravidade", "D) A lei da conservação de energia"],
        "answer": "B",
        "hint": "Para toda ação, existe uma reação de mesma intensidade e direção, mas em sentidos opostos."
    },
    {
        "question": "O que é energia mecânica?",
        "options": ["A) A soma da energia cinética e potencial de um sistema", "B) A energia armazenada em combustíveis", "C) A energia gerada por motores", "D) A energia que se dissipa em forma de calor"],
        "answer": "A",
        "hint": "É a energia total de um sistema considerando movimento e posição."
    },
    {
        "question": "O que é impulso?",
        "options": ["A) A quantidade de movimento de um objeto", "B) A força aplicada sobre um objeto por um período de tempo", "C) A mudança na velocidade de um objeto", "D) A força aplicada a um objeto durante um intervalo de tempo, resultando em uma mudança na quantidade de movimento"],
        "answer": "D",
        "hint": "Está relacionado à variação da quantidade de movimento."
    }
    
];

let currentQuestionIndex = 0;

// Função que carrega a proxima pergunta
function loadQuestion() {
    respondeu = false; 
    timeLeft = 60; // Reinicia o tempo
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    hintElement.textContent = "";
    

    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
    });
    startTimer();
}

// Função para iniciar e atualizar o cronômetro a cada segundo
function startTimer() {
    clearInterval(timer);
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                    
                } else {
                    localStorage.setItem('acessoPag', 'false');
                    addToRanking(name, userClass, score);
                    mostrarNotificacao("Pontuação registrada com Sucesso!");
                }
            }, 1000);
        }
    }, 1000);
}

// função que verifica se a resposta é certa ou não
function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector('.option-btn:hover');
    clearInterval(timer); // Para o cronômetro quando uma resposta é verificada

    if (!respondeu) { 
        respondeu = true; 

        if (answer === currentQuestion.answer) {
            selectedOption.classList.add('correto');
            score += 1; // Adiciona pontos se a resposta estiver correta
            usouDica = 'false';
        } else {
            selectedOption.classList.add('errado');
            usouDica = 'false';
        }

        localStorage.setItem('userScore', score); 

        setTimeout(() => {
            selectedOption.classList.remove('correto', 'errado');
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(); // chama a função que carrega a proxima pergunta
                mostrarNotificacao(currentQuestionIndex + "/15")                
            } else {
                localStorage.setItem('acessoPag', 'false');
                addToRanking(name, userClass, score);
                mostrarNotificacao("Pontuação registrada com Sucesso!");
            }
        }, 1000);
    }
}

// não utilize "/" dentro do seu userName pois isso vai causar um erro de document no firebase!
// função pra adicionar o User e seu Score na firebase. 
function addToRanking(name, userClass, score) {
    localStorage.setItem('userName', name);
    localStorage.setItem('turmaUser', userClass);
   db.collection("ranking").doc(name).set({ 
        name: name,
        class: userClass,
        score: score
    }).then((docRef) => {
        console.log("Pontuação adicionada com sucesso!");

        localStorage.setItem('acessoPag', 'false')
        window.location.href = '/../finalPage/home.html'; 
    }).catch((error) => {
        console.error("Erro ao adicionar pontuação: ", error);

    });
}    

function mostrarNotificacao(mensagem) {
    const notificacao = document.getElementById('notification');
    notificacao.innerText = mensagem;
    notificacao.className = 'notification show';
    setTimeout(() => {
        notificacao.className = notificacao.className.replace('show', '');
    }, 3000);
}


// função para dicas ()
function getHint() {
    if (usouDica === 'false'){
         if (dicas > 0){
            const currentQuestion = questions[currentQuestionIndex];
            hintElement.textContent = currentQuestion.hint; // Exibe a dica
            usouDica = 'true'; // variavel pra ele não flodar dica e perder todas as dicas
            dicas -= 1; // variavel dica sendo modificada para o valor atual
            mostrarNotificacao('Dicas' + dicas + '/3') 
            localStorage.setItem('userScore', score); // Atualiza o score no localStorage      
        }
        else{
            mostrarNotificacao("Voce já utilizou todas as dicas");
        }
    }
    else{
        console.log('voce ja utilizou dica');
    }
}


// verificação basica verificar acesso que só é consedido após o usuario clicar no botão iniciar submitBtn
if (!acessoPag) {
    alert('Usuario já respondeu a pergunta, clique em OK para iniciar o quiz');
    window.location.href = '/../../index.html'; 
} else {
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (!respondeu) { 
                checkAnswer(option.textContent.charAt(0)); 
                respondeu = true; 
            }
        });
    });  

    loadQuestion();
}

window.onload = localStorage.setItem('userScore', 0), score = 0; // Atualiza o score no localStorage     