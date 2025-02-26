   document.addEventListener("DOMContentLoaded", function () {
            var hash = window.location.hash; // Obtém o ID da URL, ex: #sobre

            if (hash) { 
                var elemento = document.querySelector(hash); // Tenta encontrar o elemento
                if (!elemento) { // Se não encontrar, redireciona para #erro
                    window.location.hash = "#erro";
                }
            }
        });

  
  
  function fecharNotificacao(element) {
    element.style.display = 'none'; // Oculta o elemento clicado
}
// Script para abrir todos os links em uma nova aba
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os links na página
    const links = document.querySelectorAll('a');

    // Percorre todos os links e define o target como _blank
    links.forEach(function(link) {
        link.setAttribute('target', '_blank');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const h5Elements = document.querySelectorAll('.contener-main h5');

    h5Elements.forEach(h5 => {
      h5.addEventListener('click', () => {
        const title = h5.getAttribute('data-title') || 'Erro!';
        const text = h5.getAttribute('data-text') || 'Isso pode ser um erro.';
        const icon = h5.getAttribute('data-icon') || 'info';

        Swal.fire({
          title: title,
          text: text,
          icon: icon
        });
      });
    });
  });
  
 const likeButton = document.getElementById('likeButton');
    const floatingHearts = document.getElementById('floatingHearts');
    let heartInterval;
    const isLikedKey = 'isLiked';

    // Verifica o estado da curtida no armazenamento local
    if (localStorage.getItem(isLikedKey) === 'true') {
      likeButton.classList.add('liked');
    }

    likeButton.addEventListener('click', () => {
      const isLiked = likeButton.classList.toggle('liked');
      // Salva o estado da curtida no armazenamento local
      localStorage.setItem(isLikedKey, isLiked);
      if (isLiked) {
        spawnHearts(10); // Gera 10 corações ao curtir
      }
    });

    likeButton.addEventListener('mousedown', () => {
      heartInterval = setInterval(() => spawnHearts(1), 200);
    });

    likeButton.addEventListener('mouseup', () => {
      clearInterval(heartInterval);
    });

    likeButton.addEventListener('mouseleave', () => {
      clearInterval(heartInterval);
    });

    function spawnHearts(count) {
      for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`; // Gera corações em posições aleatórias
        heart.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        `;
        floatingHearts.appendChild(heart);

        // Remove o coração após 2 segundos
        setTimeout(() => {
          heart.remove();
        }, 2000);
      }
    }
        // Verifica se o usuário já clicou em "Entendi"
    if (localStorage.getItem('welcomeDismissed') === 'true') {
      document.getElementById('welcome-div').style.display = 'none';
    }

    // Função para fechar a div e salvar no localStorage
    document.getElementById('close-button').addEventListener('click', function () {
      document.getElementById('welcome-div').style.display = 'none';
      localStorage.setItem('welcomeDismissed', 'true');
    });
        const button = document.getElementById('scrollButton');
    const inicioTab = document.getElementById('inicio');
    const notepad = document.getElementById('notepad');

    function toggleButtonVisibility() {
      const notepadVisible = notepad.getBoundingClientRect().top < window.innerHeight &&
                             notepad.getBoundingClientRect().bottom >= 0;
      const inicioVisible = !inicioTab.classList.contains('hidden');
      
      // Exibe ou esconde o botão com base na visibilidade
      if (inicioVisible && !notepadVisible) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    }

    // Monitorar a rolagem e alternar a visibilidade do botão
    window.addEventListener('scroll', toggleButtonVisibility);

    // Alternar a exibição do botão quando as abas mudarem (se necessário)
    document.addEventListener('DOMContentLoaded', toggleButtonVisibility);
    function isMobileDevice() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Verificar se é um dispositivo móvel ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
      if (!isMobileDevice()) {
        button.style.display = 'none'; // Esconde o botão se não for móvel
      } else {
        toggleButtonVisibility(); // Exibe conforme a visibilidade da área
        window.addEventListener('scroll', toggleButtonVisibility);
      }
    });
    
    
    
    // Função para salvar as informações de acesso
function salvarAcesso() {
    // Pega a data atual
    const hoje = new Date().toISOString().split('T')[0]; // Apenas a data (YYYY-MM-DD)
    
    // Recupera os dados do localStorage ou inicia com valor padrão
    let acessos = JSON.parse(localStorage.getItem('acessos')) || { datas: [], tempoTotal: 0, numAcessos: 0 };

    // Adiciona a data se for um dia novo
    if (!acessos.datas.includes(hoje)) {
        acessos.datas.push(hoje);
    }

    // Incrementa o número de acessos
    acessos.numAcessos++;

    // Salva de volta no localStorage
    localStorage.setItem('acessos', JSON.stringify(acessos));
}

// Função para iniciar o cálculo do tempo na plataforma
let inicioSessao;
function iniciarSessao() {
    inicioSessao = Date.now();
}

// Função para finalizar o cálculo do tempo e atualizar o tempo médio
function finalizarSessao() {
    const tempoSessao = Date.now() - inicioSessao; // Tempo em milissegundos
    
    // Recupera os dados do localStorage
    let acessos = JSON.parse(localStorage.getItem('acessos')) || { datas: [], tempoTotal: 0, numAcessos: 0 };
    
    // Atualiza o tempo total e salva
    acessos.tempoTotal += tempoSessao;
    localStorage.setItem('acessos', JSON.stringify(acessos));
}

// Função para calcular e mostrar o tempo médio na plataforma
function calcularTempoMedio() {
    let acessos = JSON.parse(localStorage.getItem('acessos'));
    
    if (acessos && acessos.numAcessos > 0) {
        let tempoMedio = acessos.tempoTotal / acessos.numAcessos; // em ms
        let segundos = Math.floor(tempoMedio / 1000) % 60;
        let minutos = Math.floor(tempoMedio / 1000 / 60);

        console.log(`Tempo médio na plataforma: ${minutos} minutos e ${segundos} segundos.`);
    } else {
        console.log("Nenhum acesso registrado.");
    }
}

// Executa o registro de acesso e inicia a sessão ao carregar a página
window.addEventListener('load', () => {
    salvarAcesso();
    iniciarSessao();
});

// Finaliza a sessão ao sair da página
window.addEventListener('beforeunload', () => {
    finalizarSessao();
    calcularTempoMedio();
});
const searchInput = document.getElementById("search-bar");
        const searchPopup = document.getElementById("search-popup");
        const suggestionsList = document.getElementById("suggestions-list");

        function showPopup() {
            searchPopup.classList.add("visible");
        }

        function hidePopup() {
            setTimeout(() => {
                searchPopup.classList.remove("visible");
            }, 200);
        }

        function filterResults() {
            const query = searchInput.value.toLowerCase().trim();
            const allSuggestions = suggestionsList.querySelectorAll("li");
            document.getElementById("initial-suggestions").style.display = query ? "none" : "flex";
            
            allSuggestions.forEach(suggestion => {
                if (suggestion.textContent.toLowerCase().includes(query)) {
                    suggestion.style.display = "block";
                } else {
                    suggestion.style.display = "none";
                }
            });
        }

        function goToLink(link) {
            window.location.href = link;
        }

        suggestionsList.addEventListener("click", (event) => {
            if (event.target.tagName === "LI") {
                const link = event.target.getAttribute("data-link");
                goToLink(link);
            }
        });

           const carousel = document.querySelector('.carousel');
        const progressBar = document.querySelector('.progress');
        let index = 0;
        let startX;
        let isDragging = false;
        const slideInterval = 3000;function nextSlide() {
        index = (index + 1) % document.querySelectorAll('.slide').length;
        updateCarousel();
        resetProgressBar();
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function resetProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = `width ${slideInterval / 1000}s linear`;
            progressBar.style.width = '100%';
        }, 50);
    }

    let autoSlide = setInterval(nextSlide, slideInterval);
    resetProgressBar();

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoSlide);
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        let moveX = e.touches[0].clientX - startX;
        if (moveX > 50) {
            index = index > 0 ? index - 1 : document.querySelectorAll('.slide').length - 1;
            isDragging = false;
        } else if (moveX < -50) {
            index = (index + 1) % document.querySelectorAll('.slide').length;
            isDragging = false;
        }
        updateCarousel();
        resetProgressBar();
    });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
        autoSlide = setInterval(nextSlide, slideInterval);
        resetProgressBar();
    }); 


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
    