// Script para a página EBD Online

document.addEventListener('DOMContentLoaded', function() {
    // Gerenciamento dos filtros
    const filtroTrimestre = document.getElementById('filtroTrimestre');
    const filtroTema = document.getElementById('filtroTema');
    const aulasContainer = document.querySelector('.aulas-gravadas .row');
    const btnCarregarMais = document.querySelector('.aulas-gravadas .btn-outline-primary');
    
    // Caso os elementos existam na página
    if (filtroTrimestre && filtroTema) {
        // Função para filtrar aulas
        function filtrarAulas() {
            const trimestreSelecionado = filtroTrimestre.value;
            const temaSelecionado = filtroTema.value;
            
            // Aqui viria uma lógica de filtragem real
            // Por agora, apenas simulamos uma operação de filtragem
            
            // Simulação: ocultar o botão "Carregar Mais" após filtragem
            if (trimestreSelecionado !== 'Selecione o Trimestre' || temaSelecionado !== 'Selecione o Tema') {
                if (btnCarregarMais) btnCarregarMais.style.display = 'none';
            } else {
                if (btnCarregarMais) btnCarregarMais.style.display = 'inline-block';
            }
            
            console.log(`Filtrando: Trimestre=${trimestreSelecionado}, Tema=${temaSelecionado}`);
        }
        
        // Eventos para os filtros
        filtroTrimestre.addEventListener('change', filtrarAulas);
        filtroTema.addEventListener('change', filtrarAulas);
    }
    
    // Formulário de inscrição para notificações
    const emailInput = document.querySelector('.input-group input[type="email"]');
    const btnInscrever = document.querySelector('.input-group .btn-primary');
    
    if (emailInput && btnInscrever) {
        btnInscrever.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Por favor, insira seu email.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Aqui seria a lógica para enviar o email para um servidor
            // Por enquanto, apenas simulamos uma confirmação
            alert('Inscrição realizada com sucesso! Você receberá notificações sobre as próximas aulas.');
            emailInput.value = '';
        });
    }
    
    // Função para validar formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Funcionalidade dos botões de aulas
    const botoesAssistirAula = document.querySelectorAll('.aulas-gravadas .btn-primary');
    
    botoesAssistirAula.forEach(botao => {
        botao.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aqui seria a lógica para abrir o player de vídeo ou redirecionar
            // Por enquanto, apenas simulamos
            
            const aulaCard = this.closest('.card');
            const tituloAula = aulaCard.querySelector('.card-title').textContent;
            
            console.log(`Assistindo aula: ${tituloAula}`);
            alert(`Iniciando aula: ${tituloAula}`);
            
            // Na implementação real, aqui abriria um modal com o vídeo ou redirecionaria
        });
    });
    
    // Funcionalidade para o botão de aula ao vivo
    const btnAulaAoVivo = document.querySelector('.aulas-vivo .btn-primary');
    
    if (btnAulaAoVivo) {
        btnAulaAoVivo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aqui seria a lógica para direcionar para a sala de aula virtual
            // Por enquanto, apenas simulamos
            alert('Conectando à sala de aula virtual...');
            
            // Na implementação real, aqui redirecionaria para uma plataforma como Zoom, Meet, etc.
        });
    }
    
    // Simulação de contador regressivo para próxima aula
    const spanBadge = document.querySelector('.aulas-vivo .badge');
    
    if (spanBadge) {
        // Obtém o próximo domingo
        function getNextSunday() {
            const today = new Date();
            const daysUntilSunday = 7 - today.getDay();
            
            // Se hoje for domingo, pegamos o próximo domingo
            const daysToAdd = today.getDay() === 0 ? 7 : daysUntilSunday;
            
            const nextSunday = new Date(today);
            nextSunday.setDate(today.getDate() + daysToAdd);
            nextSunday.setHours(8, 0, 0, 0);
            
            return nextSunday;
        }
        
        const nextSunday = getNextSunday();
        
        // Atualiza o contador a cada segundo
        setInterval(function() {
            const now = new Date();
            const diff = nextSunday - now;
            
            if (diff <= 0) {
                spanBadge.textContent = "AGORA!";
                spanBadge.classList.remove('bg-danger');
                spanBadge.classList.add('bg-success');
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                
                if (days > 0) {
                    spanBadge.textContent = `Domingo, 08:00 (${days}d ${hours}h)`;
                } else {
                    spanBadge.textContent = `Domingo, 08:00 (${hours}h ${minutes}m)`;
                }
            }
        }, 1000);
    }

    // Gerenciamento do modal de vídeo
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoModalTitle = document.getElementById('videoModalTitle');
    
    if (videoModal) {
        videoModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const videoId = button.getAttribute('data-video-id');
            
            // Define o título do modal e o vídeo com base no ID do vídeo
            let videoTitle = 'Aula';
            let videoUrl = '';
            
            switch(videoId) {
                case 'aula1':
                    videoTitle = 'Introdução ao Livro de Provérbios';
                    videoUrl = 'https://www.youtube.com/embed/VIDEO_ID_1';
                    break;
                case 'aula2':
                    videoTitle = 'Sabedoria nos Relacionamentos';
                    videoUrl = 'https://www.youtube.com/embed/VIDEO_ID_2';
                    break;
                case 'aula3':
                    videoTitle = 'Princípios Financeiros em Provérbios';
                    videoUrl = 'https://www.youtube.com/embed/VIDEO_ID_3';
                    break;
                default:
                    videoTitle = 'Aula';
                    videoUrl = 'https://www.youtube.com/embed/VIDEO_ID_DEFAULT';
            }
            
            videoModalTitle.textContent = videoTitle;
            
            // Define o vídeo com um pequeno atraso para evitar problemas de carregamento
            setTimeout(() => {
                videoFrame.src = videoUrl;
            }, 300);
        });
        
        // Pausa o vídeo quando o modal é fechado
        videoModal.addEventListener('hidden.bs.modal', function() {
            videoFrame.src = '';
        });
    }
}); 