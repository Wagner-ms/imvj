// Script para autenticação

document.addEventListener('DOMContentLoaded', function() {
    // Elementos da página de login/cadastro
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    // Simulação de banco de dados de usuários (localStorage)
    // Em uma implementação real, isso seria feito em um servidor
    function initializeUserDb() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
    }
    
    function addUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    function findUserByEmail(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email);
    }
    
    // Inicializa o banco de dados de usuários
    initializeUserDb();
    
    // Função para validação de formulário
    function validateForm(formId) {
        const form = document.getElementById(formId);
        
        if (!form) return true; // Se o formulário não existir, não há o que validar
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                // Adiciona classe de erro
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    
    // Tratamento do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm('loginForm')) {
                showMessage('error', 'Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Simulação de autenticação
            const user = findUserByEmail(email);
            
            if (!user) {
                showMessage('error', 'Usuário não encontrado. Verifique seu email ou cadastre-se.');
                return;
            }
            
            if (user.password !== password) {
                showMessage('error', 'Senha incorreta. Tente novamente.');
                return;
            }
            
            // Login bem-sucedido
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.firstName,
                    email: user.email,
                    loggedIn: true
                }));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.firstName,
                    email: user.email,
                    loggedIn: true
                }));
            }
            
            showMessage('success', 'Login realizado com sucesso! Redirecionando...');
            
            // Redireciona para a área do aluno após 1 segundo
            setTimeout(() => {
                window.location.href = 'area-aluno.html';
            }, 1000);
        });
    }
    
    // Tratamento do formulário de cadastro
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm('registerForm')) {
                showMessage('error', 'Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('termsCheck').checked;
            
            // Validações adicionais
            if (password !== confirmPassword) {
                showMessage('error', 'As senhas não coincidem. Tente novamente.');
                return;
            }
            
            if (!termsAccepted) {
                showMessage('error', 'Você precisa aceitar os termos e condições para prosseguir.');
                return;
            }
            
            // Verifica se o email já está cadastrado
            const existingUser = findUserByEmail(email);
            if (existingUser) {
                showMessage('error', 'Este email já está cadastrado. Tente fazer login ou recuperar sua senha.');
                return;
            }
            
            // Cria um novo usuário
            const newUser = {
                id: Date.now().toString(),
                firstName,
                lastName,
                email,
                phone,
                password,
                createdAt: new Date().toISOString(),
                isActive: true
            };
            
            // Adiciona o usuário ao "banco de dados"
            addUser(newUser);
            
            showMessage('success', 'Cadastro realizado com sucesso! Você já pode fazer login.');
            
            // Limpa o formulário
            registerForm.reset();
            
            // Muda para a aba de login
            document.getElementById('login-tab').click();
        });
    }
    
    // Tratamento do link "Esqueci minha senha"
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Abre o modal de recuperação de senha
            const forgotPasswordModal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
            forgotPasswordModal.show();
        });
    }
    
    // Tratamento do formulário de recuperação de senha
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('recoveryEmail').value;
            
            // Verifica se o email existe no banco de dados
            const user = findUserByEmail(email);
            
            if (!user) {
                showMessage('error', 'Email não encontrado em nossa base de dados.', 'forgotPasswordModal');
                return;
            }
            
            // Simulação de envio de email de recuperação
            showMessage('success', 'Instruções de recuperação enviadas para seu email.', 'forgotPasswordModal');
            
            // Fecha o modal após 2 segundos
            setTimeout(() => {
                const forgotPasswordModal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                forgotPasswordModal.hide();
            }, 2000);
        });
    }
    
    // Função para exibir mensagens
    function showMessage(type, message, modalId = null) {
        // Remove qualquer mensagem anterior
        removeMessages();
        
        // Cria o elemento de mensagem
        const messageElement = document.createElement('div');
        messageElement.className = `alert alert-${type === 'error' ? 'danger' : 'success'} mt-3 message-alert`;
        messageElement.textContent = message;
        
        // Adiciona a mensagem ao DOM
        if (modalId) {
            // Se for em um modal, adiciona dentro do corpo do modal
            const modalBody = document.querySelector(`#${modalId} .modal-body`);
            if (modalBody) {
                modalBody.prepend(messageElement);
            }
        } else {
            // Caso contrário, adiciona abaixo do formulário ativo
            const activePane = document.querySelector('.tab-pane.active');
            if (activePane) {
                activePane.appendChild(messageElement);
            }
        }
        
        // Configura a remoção automática após 5 segundos
        setTimeout(removeMessages, 5000);
    }
    
    // Função para remover mensagens
    function removeMessages() {
        const messages = document.querySelectorAll('.message-alert');
        messages.forEach(message => message.remove());
    }
    
    // Verifica se o usuário já está logado
    function checkAuthStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
        
        // Se estiver na página de login e já estiver logado, redireciona para a área do aluno
        if (currentUser && currentUser.loggedIn && window.location.href.includes('acesso-aluno.html')) {
            window.location.href = 'area-aluno.html';
        }
        
        // Se estiver na área do aluno e não estiver logado, redireciona para a página de login
        if ((!currentUser || !currentUser.loggedIn) && window.location.href.includes('area-aluno.html')) {
            window.location.href = 'acesso-aluno.html';
        }
    }
    
    // Verifica o status de autenticação ao carregar a página
    checkAuthStatus();
}); 