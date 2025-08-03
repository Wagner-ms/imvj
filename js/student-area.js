// Script para a área do aluno

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.loggedIn) {
        // Redireciona para a página de login se não estiver logado
        window.location.href = 'acesso-aluno.html';
        return;
    }
    
    // Exibe o nome do usuário na barra de navegação e na saudação
    const userNameDisplay = document.getElementById('userNameDisplay');
    const welcomeUserName = document.getElementById('welcomeUserName');
    
    if (userNameDisplay) userNameDisplay.textContent = currentUser.name;
    if (welcomeUserName) welcomeUserName.textContent = currentUser.name;
    
    // Gerencia o modal de vídeo
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
    
    // Tratamento do botão "Marcar como Concluída"
    const markAsCompletedBtn = document.getElementById('markAsCompleted');
    
    if (markAsCompletedBtn) {
        markAsCompletedBtn.addEventListener('click', function() {
            // Em uma implementação real, enviaria uma requisição para o servidor
            // Por agora, apenas mostra uma mensagem e atualiza a UI localmente
            alert('Aula marcada como concluída! Seu progresso foi atualizado.');
            
            // Fecha o modal
            const modalInstance = bootstrap.Modal.getInstance(videoModal);
            modalInstance.hide();
            
            // Simula a atualização na interface
            const progressBars = document.querySelectorAll('.progress-bar');
            if (progressBars.length >= 2) {
                // Atualiza a barra de progresso da segunda aula
                progressBars[1].style.width = '100%';
                progressBars[1].classList.remove('bg-warning');
                progressBars[1].classList.add('bg-success');
                
                // Atualiza o badge da segunda aula
                const badges = document.querySelectorAll('.badge');
                if (badges.length >= 5) {
                    badges[4].textContent = 'Concluída';
                    badges[4].classList.remove('bg-warning');
                    badges[4].classList.add('bg-success');
                }
            }
            
            // Atualiza o contador de aulas concluídas
            const completedClassesEl = document.querySelector('.dashboard-summary h3:nth-of-type(2)');
            if (completedClassesEl) {
                completedClassesEl.textContent = '2';
            }
        });
    }
    
    // Tratamento do botão de logout
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove as informações de usuário do armazenamento
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
            
            // Redireciona para a página de login
            window.location.href = 'acesso-aluno.html';
        });
    }
    
    // Tratamento do botão Editar Perfil
    const editProfileBtn = document.getElementById('editProfileBtn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Busca os dados completos do usuário
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.id === currentUser.id);
            
            if (!user) {
                alert('Erro ao carregar informações do usuário.');
                return;
            }
            
            // Preenche o formulário com os dados do usuário
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPhone').value = user.phone || '';
            document.getElementById('editPassword').value = '';
            document.getElementById('confirmEditPassword').value = '';
            
            // Abre o modal
            const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
            editProfileModal.show();
        });
    }
    
    // Tratamento do botão Salvar Alterações do perfil
    const saveProfileChangesBtn = document.getElementById('saveProfileChanges');
    
    if (saveProfileChangesBtn) {
        saveProfileChangesBtn.addEventListener('click', function() {
            const firstName = document.getElementById('editFirstName').value;
            const lastName = document.getElementById('editLastName').value;
            const phone = document.getElementById('editPhone').value;
            const password = document.getElementById('editPassword').value;
            const confirmPassword = document.getElementById('confirmEditPassword').value;
            
            // Validações básicas
            if (!firstName || !lastName) {
                alert('Nome e sobrenome são obrigatórios.');
                return;
            }
            
            if (password && password !== confirmPassword) {
                alert('As senhas não coincidem.');
                return;
            }
            
            // Atualiza os dados do usuário
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            
            if (userIndex === -1) {
                alert('Erro ao atualizar perfil.');
                return;
            }
            
            // Atualiza os dados
            users[userIndex].firstName = firstName;
            users[userIndex].lastName = lastName;
            users[userIndex].phone = phone;
            
            if (password) {
                users[userIndex].password = password;
            }
            
            // Salva no localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Atualiza o usuário logado
            const updatedCurrentUser = {
                ...currentUser,
                name: firstName
            };
            
            if (localStorage.getItem('currentUser')) {
                localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            }
            
            // Atualiza a exibição do nome na página
            if (userNameDisplay) userNameDisplay.textContent = firstName;
            if (welcomeUserName) welcomeUserName.textContent = firstName;
            
            // Fecha o modal
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            editProfileModal.hide();
            
            alert('Perfil atualizado com sucesso!');
        });
    }
    
    // Tratamento do botão de novo tópico no fórum
    const submitTopicBtn = document.getElementById('submitTopic');
    
    if (submitTopicBtn) {
        submitTopicBtn.addEventListener('click', function() {
            const title = document.getElementById('topicTitle').value;
            const content = document.getElementById('topicContent').value;
            const category = document.getElementById('topicCategory').value;
            
            if (!title || !content) {
                alert('Por favor, preencha o título e o conteúdo do tópico.');
                return;
            }
            
            // Em uma implementação real, enviaria os dados para o servidor
            // Por agora, apenas mostra uma mensagem de confirmação
            alert('Tópico criado com sucesso!');
            
            // Fecha o modal
            const newTopicModal = bootstrap.Modal.getInstance(document.getElementById('newTopicModal'));
            newTopicModal.hide();
            
            // Limpa o formulário
            document.getElementById('newTopicForm').reset();
        });
    }
}); 