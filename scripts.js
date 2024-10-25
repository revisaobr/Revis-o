

    
const fireworkData = [
        { range: [1, 5], message: "Legal", colorClass: "blue-dark", image: "fogo1.png" },
        { range: [5, 15], message: "Bom", colorClass: "blue-light", image: "fogo2.png" },
        { range: [15, 30], message: "Excelente", colorClass: "orange", image: "fogo3.png" },
        { range: [30, 60], message: "Extremamente Bom", colorClass: "purple", image: "fogo4.png" },
        { range: [60, Infinity], message: "Épico", colorClass: "epic", image: "fogo5.png" }
    ];

    const sequenceDaysElement = document.getElementById("sequenceDays");
    const fireworkImage = document.getElementById("fireworkImage");
    const fireworkMessage = document.getElementById("fireworkMessage");
    const resetTempo = document.getElementById("resetTempo");

    function getTodayDateString() {
        const today = new Date();
        return today.toLocaleDateString();
    }

    function loadSequence() {
        const lastVisit = localStorage.getItem("lastVisitDate");
        const sequenceDays = parseInt(localStorage.getItem("sequenceDays")) || 1;

        const today = getTodayDateString();
        if (lastVisit && lastVisit !== today) {
            const daysPassed = (new Date(today) - new Date(lastVisit)) / (1000 * 60 * 60 * 24);
            if (daysPassed > 1) {
                resetSequence();
                return;
            }
            localStorage.setItem("sequenceDays", sequenceDays + 1);
        } else if (!lastVisit) {
            localStorage.setItem("sequenceDays", 1);
        }

        localStorage.setItem("lastVisitDate", today);
        updateFireworkDisplay();
    }

    function resetSequence() {
        localStorage.setItem("sequenceDays", 1);
        localStorage.setItem("lastVisitDate", getTodayDateString());
        updateFireworkDisplay();
    }

    function updateFireworkDisplay() {
        const days = parseInt(localStorage.getItem("sequenceDays"));
        const plural = days > 1 ? "dias" : "dia";
        sequenceDaysElement.innerText = `Sua sequência: ${days} ${plural}`;

        let firework = fireworkData[0];
        for (let data of fireworkData) {
            if (days >= data.range[0] && days < data.range[1]) {
                firework = data;
                break;
            }
        }

        fireworkImage.src = firework.image;
        fireworkMessage.innerText = firework.message;
        fireworkMessage.className = `message ${firework.colorClass}`;
    }

    function updateResetTempo() {
        const now = new Date();
        const resetTime = new Date();
        resetTime.setHours(24, 0, 0, 0);
        if (now > resetTime) resetTime.setDate(resetTime.getDate() + 1);

        const timeLeft = resetTime - now;
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        resetTempo.innerText = `Tempo para resetar: ${hours}h ${minutes}m ${seconds}s`;
    }

    loadSequence();
    updateResetTempo();
    setInterval(updateResetTempo, 1000); // Atualiza o tempo a cada segundo

const overlay = document.getElementById('overlay');
document.addEventListener('DOMContentLoaded', function() {
    // Esconde a tela de carregamento e exibe o conteúdo principal após 2 segundos
    setTimeout(() => {
        document.querySelector('.splash-screen').style.display = 'block';
        document.querySelector('.main-content').style.display = 'block';
    }, 0000);

    
    
             function updateTimer(timerElement) {
            const lastUpdate = new Date(timerElement.getAttribute('data-update-time'));
            const now = new Date();
            const diff = now - lastUpdate;

            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            let timeString = '';
            if (days > 0) {
                timeString = `${days} dia${days > 1 ? 's' : ''}`;
            } else if (hours > 0) {
                timeString = `${hours} hora${hours > 1 ? 's' : ''}`;
            } else {
                timeString = `${minutes} minuto${minutes > 1 ? 's' : ''}`;
            }

            timerElement.innerText = timeString;
        }

        function initializeTimers() {
            const timers = document.querySelectorAll('.timer');
            timers.forEach(timerElement => {
                updateTimer(timerElement);
                setInterval(() => updateTimer(timerElement), 60000); // Atualiza o timer a cada minuto
            });
        }

        initializeTimers(); // Inicializa os timers
    // Alterna o menu de abas ao clicar no ícone de menu
    hamburgerMenu.addEventListener('click', function() {
        const isOpen = tabsContainer.style.transform === 'translateX(0%)';
        
        tabsContainer.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0%)';
        hamburgerMenu.classList.toggle('open', !isOpen);
    });

    // Fecha o menu de abas ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!tabsContainer.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            tabsContainer.style.transform = 'translateX(-100%)';
            hamburgerMenu.classList.remove('open');
            
        }
    });

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // Fecha o menu de abas ao clicar, tocar ou deslizar fora dele
document.addEventListener('click', closeMenu);
document.addEventListener('touchstart', closeMenu);
document.addEventListener('touchmove', closeMenu);

function closeMenu(event) {
    if (!tabsContainer.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        tabsContainer.style.transform = 'translateX(-100%)';
        hamburgerMenu.classList.remove('open');
    }
}

            
            // Atualiza o estado das abas
            tabLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Transição para ocultar todas as abas
            tabContents.forEach(content => {
                content.classList.add('hidden');
                setTimeout(() => content.classList.remove('active'), 300);
            });

            // Mostra a aba selecionada com transição
            const tabContent = document.querySelector(this.getAttribute('href'));
            setTimeout(() => {
                tabContent.classList.add('active');
                tabContent.classList.remove('hidden');
            }, 300);

            // Adiciona estado ao histórico
            const tabId = this.getAttribute('href').substring(1);
            history.pushState({ tabId: tabId }, null, `#${tabId}`);

            // Fecha o menu de abas e redefine o ícone de menu
            tabsContainer.style.transform = 'translateX(-100%)';
            hamburgerMenu.classList.remove('open');
        });
    });

    // Manipula o botão de voltar do navegador
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.tabId) {
            const tabLink = document.querySelector(`a[href="#${event.state.tabId}"]`);
            if (tabLink) {
                tabLink.click();
            }
        }
    });

    // Seleciona automaticamente a primeira aba ou a aba do hash da URL
    if (tabLinks.length > 0) {
        const initialTab = window.location.hash ? window.location.hash.substring(1) : tabLinks[0].getAttribute('href').substring(1);
        const initialTabLink = document.querySelector(`a[href="#${initialTab}"]`);
        if (initialTabLink) {
            initialTabLink.click();
        } else {
            tabLinks[0].click();
        }
    }
});
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.classList.remove("show");
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.add("show");
        }
    });
}




function goToTab(tabId) {
    const targetTab = document.querySelector(`#${tabId}`);
    targetTab.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    var menu = document.getElementById('menuItems');
    menu.style.display = (menu.style.display === 'block' ? 'none' : 'block');
}

function toggleTransitions() {
    var body = document.body;
    if (body.classList.contains('no-transitions')) {
        body.classList.remove('no-transitions');
        localStorage.setItem('transitionsDisabled', 'false');
    } else {
        body.classList.add('no-transitions');
        localStorage.setItem('transitionsDisabled', 'true');
    }
    updateToggleText();
}

function updateToggleText() {
    var toggleText = document.querySelector('li[onclick="toggleTransitions()"]');
    if (localStorage.getItem('transitionsDisabled') === 'true') {
        toggleText.textContent = 'Ativar transições';
    } else {
        toggleText.textContent = 'Desativar transições';
    }
}

// Fechar o menu ao clicar em qualquer parte da tela
document.addEventListener('click', function(event) {
    var menu = document.getElementById('menuItems');
    if (event.target.closest('.menu') === null && menu.style.display === 'block') {
        menu.style.display = 'none';
    }
});
// Função para carregar configurações salvas
window.onload = function() {
    var notasSalvas = localStorage.getItem('anotacoes');
    if (notasSalvas) {
        document.getElementById('notepad').value = notasSalvas;
    }
    
    var corSalva = localStorage.getItem('corTexto');
    if (corSalva) {
        document.getElementById('notepad').style.color = corSalva;
        document.getElementById('corTexto').value = corSalva;
    }
    
    var fonteSalva = localStorage.getItem('fonteSelecionada');
    if (fonteSalva) {
        document.getElementById('notepad').style.fontFamily = fonteSalva;
        document.getElementById('fonte').value = fonteSalva;
    }
    
    var tamanhoFonteSalvo = localStorage.getItem('tamanhoFonte');
    if (tamanhoFonteSalvo) {
        document.getElementById('notepad').style.fontSize = tamanhoFonteSalvo + 'px';
        document.getElementById('tamanhoFonte').value = tamanhoFonteSalvo;
    }
}

// Função para salvar configurações
function salvarAnotacoes() {
    var anotacoes = document.getElementById('notepad').value;
    localStorage.setItem('anotacoes', anotacoes);
    
    var cor = document.getElementById('corTexto').value;
    localStorage.setItem('corTexto', cor);
    
    var fonteSelecionada = document.getElementById('fonte').value;
    localStorage.setItem('fonteSelecionada', fonteSelecionada);
    
    var tamanhoFonte = document.getElementById('tamanhoFonte').value;
    localStorage.setItem('tamanhoFonte', tamanhoFonte);
    
    exibirMensagem('saveMessage');
}

// Função para limpar configurações
function limparAnotacoes() {
    localStorage.removeItem('anotacoes');
    localStorage.removeItem('corTexto');
    localStorage.removeItem('fonteSelecionada');
    localStorage.removeItem('tamanhoFonte'); // Remover o tamanho da fonte salvo também ao limpar
    document.getElementById('notepad').value = '';
    document.getElementById('notepad').style.color = ''; // Resetar a cor do texto
    document.getElementById('notepad').style.fontFamily = ''; // Resetar a fonte
    document.getElementById('notepad').style.fontSize = ''; // Resetar o tamanho da fonte
    document.getElementById('corTexto').value = '#000000'; // Resetar o valor do seletor de cor
    document.getElementById('fonte').value = 'Arial'; // Resetar o valor do seletor de fonte
    document.getElementById('tamanhoFonte').value = '14'; // Resetar o valor do seletor de tamanho da fonte
    exibirMensagem('clearMessage');
}

// Função para mudar a cor do texto
function mudarCorTexto() {
    var cor = document.getElementById('corTexto').value;
    document.getElementById('notepad').style.color = cor;
    localStorage.setItem('corTexto', cor); // Salvar a cor no localStorage
}

// Função para mudar a fonte
function mudarFonte() {
    var fonteSelecionada = document.getElementById('fonte').value;
    document.getElementById('notepad').style.fontFamily = fonteSelecionada;
    localStorage.setItem('fonteSelecionada', fonteSelecionada); // Salvar a fonte no localStorage
}

// Função para mudar o tamanho da fonte
function mudarTamanhoFonte() {
    var tamanhoFonte = document.getElementById('tamanhoFonte').value;
    document.getElementById('notepad').style.fontSize = tamanhoFonte + 'px';
    localStorage.setItem('tamanhoFonte', tamanhoFonte); // Salvar o tamanho da fonte no localStorage
}
// Função para exibir mensagens
function exibirMensagem(id) {
    var mensagem = document.getElementById(id);
    mensagem.style.display = 'block';
    setTimeout(function() {
        mensagem.style.display = 'none';
    }, 2000); // Oculta a mensagem após 2 segundos
}
function checkVersions() {
    // Redirecionar para o link de verificar versões
    window.location.href = 'https://www.mediafire.com/folder/qpuyyl1xwj56m/Revisao';
}
  function novoLink() {
    // Redirecionar para o novo link desejado
    window.location.href = 'https://wa.me/?text=Instale%20o%20aplicativo%20Revisão%20para%20não%20perder%20a%20matéria:%20https%3A%2F%2Fwww.mediafire.com%2Ffolder%2Fqpuyyl1xwj56m%2FRevisao';
}

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('overlay');
    
    document.body.classList.add('popup-active'); // Impede a rolagem do fundo
    popup.style.transform = 'translate(-50%, -50%) scale(0.7)';
    setTimeout(() => {
      popup.classList.add('active');
      overlay.classList.add('active');
    }, 50);
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('overlay');
    
    popup.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('popup-active'); // Permite que o fundo role novamente
    setTimeout(() => {
      popup.style.transform = 'translate(-50%, -50%) scale(0.7)';
    }, 300);
}
      // Função para apagar todos os cookies
        function deleteAllCookies() {
            const cookies = document.cookie.split(";");

            cookies.forEach(cookie => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });
        }

        // Função para limpar localStorage e sessionStorage
        function clearStorage() {
            localStorage.clear();  // Limpa o localStorage
            sessionStorage.clear(); // Limpa o sessionStorage
        }

        // Função para redefinir todos os dados salvos no navegador
        function resetAllData() {
            deleteAllCookies(); // Apagar todos os cookies
            clearStorage();     // Limpar localStorage e sessionStorage
            alert("Os dados foram redefinidos!");
        }
        
        function startTimer(element) {
      const endTime = new Date(element.getAttribute("data-endtime")).getTime();

      function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
          element.innerHTML = "Tempo esgotado";
          clearInterval(timerInterval);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let timerText = "";
        if (days > 0) timerText += days + "d ";
        if (hours > 0) timerText += hours + "h ";
        if (minutes > 0) timerText += minutes + "m ";
        timerText += seconds + "s";

        element.innerHTML = timerText;
      }

      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);
    }

    // Iniciar todos os timers na página automaticamente
    document.querySelectorAll(".timer").forEach(startTimer);
    