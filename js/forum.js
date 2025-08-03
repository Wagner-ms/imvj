// Script para o fórum de discussão

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.loggedIn) {
        // Redireciona para a página de login se não estiver logado
        window.location.href = 'acesso-aluno.html';
        return;
    }
    
    // Exibe o nome do usuário na barra de navegação
    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) userNameDisplay.textContent = currentUser.name;
    
    // Banco de dados simulado para os tópicos de discussão
    const mockTopics = [
        {
            id: 1,
            title: 'Reflexão sobre Provérbios 3:5-6',
            content: 'Caros alunos, gostaria que compartilhassem suas reflexões sobre o versículo: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas."',
            author: 'Professor João',
            authorId: 'professor1',
            category: 'reflexao',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
            views: 24,
            replies: [
                {
                    id: 1,
                    content: 'Este versículo tem sido muito importante na minha vida. Aprendi que confiar em Deus significa não depender apenas da minha própria sabedoria, mas buscar a orientação divina em todas as decisões.',
                    author: 'Ana Souza',
                    authorId: 'user2',
                    createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000) // 1,5 dias atrás
                },
                {
                    id: 2,
                    content: 'Acredito que esse versículo nos ensina sobre humildade. Quando reconhecemos que nossa sabedoria é limitada e que precisamos da direção de Deus, Ele nos mostra o caminho certo a seguir.',
                    author: 'Carlos Mendes',
                    authorId: 'user3',
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 dia atrás
                },
                {
                    id: 3,
                    content: 'Para mim, esse versículo traz a ideia de reconhecer a soberania de Deus em todas as áreas da vida. Quando confiamos Nele "de todo o coração", estamos permitindo que Ele guie nossos passos.',
                    author: 'Beatriz Lima',
                    authorId: 'user4',
                    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 horas atrás
                },
                {
                    id: 4,
                    content: 'Tenho refletido muito sobre a segunda parte do versículo: "reconheça o Senhor em todos os seus caminhos". Isso me faz pensar em como devemos incluir a Deus em cada aspecto da nossa vida, não apenas nas decisões "importantes".',
                    author: 'Paulo Rodrigues',
                    authorId: 'user5',
                    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 horas atrás
                },
                {
                    id: 5,
                    content: 'Este versículo tem sido um lembrete constante para mim de que, mesmo quando não entendo o que está acontecendo na minha vida, posso confiar que Deus está no controle e tem um plano.',
                    author: 'Mariana Costa',
                    authorId: 'user6',
                    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 horas atrás
                }
            ]
        },
        {
            id: 2,
            title: 'Dúvida sobre o contexto histórico',
            content: 'Olá a todos! Estou estudando o contexto histórico do livro de Provérbios e gostaria de saber mais sobre a influência da cultura da época na escrita de Salomão. Alguém tem referências para compartilhar?',
            author: 'Maria Silva',
            authorId: 'user7',
            category: 'duvida',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
            views: 18,
            replies: [
                {
                    id: 6,
                    content: 'Maria, recomendo o livro "O Mundo do Antigo Testamento" de J. I. Packer, que traz insights interessantes sobre o contexto cultural em que Salomão escreveu.',
                    author: 'Professor João',
                    authorId: 'professor1',
                    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 dias atrás
                },
                {
                    id: 7,
                    content: 'Existe um artigo muito bom na revista "Estudos Bíblicos" edição 45 sobre a influência da literatura sapiencial egípcia nos escritos de Salomão. Posso compartilhar o PDF se você tiver interesse.',
                    author: 'Ricardo Alves',
                    authorId: 'user8',
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 dias atrás
                },
                {
                    id: 8,
                    content: 'É interessante notar que muitos dos provérbios têm paralelos em outras culturas do Oriente Médio da época. Isso mostra como a sabedoria divina pode se manifestar em diferentes contextos culturais.',
                    author: 'Felipe Santos',
                    authorId: 'user9',
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 dias atrás
                }
            ]
        },
        {
            id: 3,
            title: 'Como aplicar Provérbios 22:6 na educação dos filhos hoje',
            content: '"Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele." Como vocês aplicam este provérbio na educação dos filhos no contexto atual?',
            author: 'Pedro Oliveira',
            authorId: 'user10',
            category: 'aplicacao',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
            views: 32,
            replies: [
                {
                    id: 9,
                    content: 'Na minha experiência, este versículo enfatiza a importância de ensinar valores bíblicos aos filhos desde cedo. Em casa, fazemos devocionais diários e conversamos sobre como aplicar os princípios bíblicos em situações do dia a dia.',
                    author: 'Juliana Martins',
                    authorId: 'user11',
                    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 dias atrás
                },
                {
                    id: 10,
                    content: 'Acredito que o "caminho em que deve andar" se refere não apenas ao conhecimento bíblico, mas também ao desenvolvimento do caráter. Procuro ensinar meus filhos sobre honestidade, integridade e respeito através do meu próprio exemplo.',
                    author: 'Fernando Costa',
                    authorId: 'user12',
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 dias atrás
                },
                {
                    id: 11,
                    content: 'Um desafio que enfrentamos hoje é a influência da mídia e da internet. Procuramos monitorar o que nossos filhos consomem e usamos essas oportunidades para discutir valores cristãos em contraste com os valores do mundo.',
                    author: 'Camila Dias',
                    authorId: 'user13',
                    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 dias atrás
                },
                {
                    id: 12,
                    content: 'Algo que tem funcionado para nossa família é estabelecer rotinas que incluem momentos de oração, leitura bíblica e conversas sobre fé. Isso cria um ambiente onde os valores cristãos são vividos naturalmente.',
                    author: 'Roberto Silva',
                    authorId: 'user14',
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 dias atrás
                },
                {
                    id: 13,
                    content: 'Acho importante lembrar que cada criança é única. O "caminho em que deve andar" considera as características individuais de cada filho. Devemos observar seus dons e talentos para ajudá-los a desenvolver seu potencial dentro dos princípios bíblicos.',
                    author: 'Amanda Sousa',
                    authorId: 'user15',
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 dias atrás
                },
                {
                    id: 14,
                    content: 'Uma aplicação importante desse versículo é entender que a educação cristã é um processo contínuo. Não se trata apenas de momentos específicos de ensino, mas de um estilo de vida que permeia todas as áreas.',
                    author: 'Lucas Pereira',
                    authorId: 'user16',
                    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 dia atrás
                },
                {
                    id: 15,
                    content: 'Como pastor, tenho visto que as famílias que melhor aplicam esse princípio são aquelas que criam um ambiente onde a fé é vivida de forma autêntica, não apenas falada. As crianças aprendem mais pelo que veem do que pelo que ouvem.',
                    author: 'Pastor Marcos',
                    authorId: 'professor2',
                    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 horas atrás
                }
            ]
        }
    ];
    
    // Função para salvar os tópicos no localStorage
    function initializeTopics() {
        if (!localStorage.getItem('forumTopics')) {
            localStorage.setItem('forumTopics', JSON.stringify(mockTopics));
        }
    }
    
    // Inicializa os tópicos
    initializeTopics();
    
    // Obtém os tópicos do localStorage
    function getTopics() {
        return JSON.parse(localStorage.getItem('forumTopics')) || [];
    }
    
    // Salva os tópicos no localStorage
    function saveTopics(topics) {
        localStorage.setItem('forumTopics', JSON.stringify(topics));
    }
    
    // Formatação de data
    function formatDate(date) {
        const now = new Date();
        const diff = now - new Date(date);
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) {
            return days === 1 ? 'Há 1 dia' : `Há ${days} dias`;
        } else if (hours > 0) {
            return hours === 1 ? 'Há 1 hora' : `Há ${hours} horas`;
        } else if (minutes > 0) {
            return minutes === 1 ? 'Há 1 minuto' : `Há ${minutes} minutos`;
        } else {
            return 'Agora mesmo';
        }
    }
    
    // Função para abrir o modal de visualização de tópico
    function openTopicModal(topicId) {
        const topics = getTopics();
        const topic = topics.find(t => t.id === parseInt(topicId));
        
        if (!topic) {
            alert('Tópico não encontrado.');
            return;
        }
        
        // Atualiza as visualizações
        topic.views = (topic.views || 0) + 1;
        saveTopics(topics);
        
        // Define o título do modal
        const topicViewTitle = document.getElementById('topicViewTitle');
        if (topicViewTitle) topicViewTitle.textContent = topic.title;
        
        // Carrega o conteúdo do tópico
        const topicContent = document.getElementById('topicContent');
        if (topicContent) {
            topicContent.innerHTML = `
                <div class="d-flex align-items-center mb-3">
                    <div class="avatar me-3">
                        <i class="fas fa-user-circle fa-2x text-primary"></i>
                    </div>
                    <div>
                        <h5 class="mb-0">${topic.author}</h5>
                        <small class="text-muted">${formatDate(topic.createdAt)}</small>
                    </div>
                </div>
                <div class="topic-main-content mb-3">
                    ${topic.content}
                </div>
                <div class="topic-stats text-muted">
                    <span class="me-3"><i class="fas fa-comments me-1"></i> ${topic.replies.length} respostas</span>
                    <span><i class="fas fa-eye me-1"></i> ${topic.views} visualizações</span>
                </div>
            `;
        }
        
        // Carrega as respostas
        const topicReplies = document.getElementById('topicReplies');
        if (topicReplies) {
            if (topic.replies && topic.replies.length > 0) {
                topicReplies.innerHTML = topic.replies.map(reply => `
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="avatar me-3">
                                    <i class="fas fa-user-circle fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0">${reply.author}</h5>
                                    <small class="text-muted">${formatDate(reply.createdAt)}</small>
                                </div>
                            </div>
                            <div class="reply-content">
                                ${reply.content}
                            </div>
                        </div>
                    </div>
                `).join('');
            } else {
                topicReplies.innerHTML = '<p class="text-muted">Ainda não há respostas para este tópico. Seja o primeiro a responder!</p>';
            }
        }
        
        // Exibe o modal
        const topicViewModal = new bootstrap.Modal(document.getElementById('topicViewModal'));
        topicViewModal.show();
    }
    
    // Adiciona evento aos links de tópicos
    const topicLinks = document.querySelectorAll('.topic-link');
    topicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const topicId = this.getAttribute('data-topic-id');
            openTopicModal(topicId);
        });
    });
    
    // Tratamento do formulário de resposta
    const replyForm = document.getElementById('replyForm');
    if (replyForm) {
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const replyContent = document.getElementById('replyContent').value;
            
            if (!replyContent) {
                alert('Por favor, digite sua resposta.');
                return;
            }
            
            // Obtém o ID do tópico atual
            const topicViewTitle = document.getElementById('topicViewTitle');
            const topics = getTopics();
            const topic = topics.find(t => t.title === topicViewTitle.textContent);
            
            if (!topic) {
                alert('Erro ao enviar resposta.');
                return;
            }
            
            // Cria a nova resposta
            const newReply = {
                id: Date.now(),
                content: replyContent,
                author: currentUser.name,
                authorId: currentUser.id,
                createdAt: new Date()
            };
            
            // Adiciona a resposta ao tópico
            topic.replies.push(newReply);
            
            // Salva os tópicos atualizados
            saveTopics(topics);
            
            // Atualiza a exibição das respostas
            const topicReplies = document.getElementById('topicReplies');
            if (topicReplies) {
                const replyHTML = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="avatar me-3">
                                    <i class="fas fa-user-circle fa-2x text-primary"></i>
                                </div>
                                <div>
                                    <h5 class="mb-0">${newReply.author}</h5>
                                    <small class="text-muted">${formatDate(newReply.createdAt)}</small>
                                </div>
                            </div>
                            <div class="reply-content">
                                ${newReply.content}
                            </div>
                        </div>
                    </div>
                `;
                
                // Adiciona a nova resposta ao final
                if (topicReplies.innerHTML.includes('Ainda não há respostas')) {
                    topicReplies.innerHTML = replyHTML;
                } else {
                    topicReplies.innerHTML += replyHTML;
                }
            }
            
            // Atualiza a contagem de respostas
            const topicStats = document.querySelector('.topic-stats');
            if (topicStats) {
                const repliesCountEl = topicStats.querySelector('span:first-child');
                const repliesCount = topic.replies.length;
                repliesCountEl.innerHTML = `<i class="fas fa-comments me-1"></i> ${repliesCount} ${repliesCount === 1 ? 'resposta' : 'respostas'}`;
            }
            
            // Limpa o formulário
            replyForm.reset();
            
            alert('Resposta enviada com sucesso!');
        });
    }
    
    // Tratamento do botão de novo tópico
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
            
            // Cria um novo tópico
            const topics = getTopics();
            const newTopic = {
                id: Date.now(),
                title,
                content,
                author: currentUser.name,
                authorId: currentUser.id,
                category,
                createdAt: new Date(),
                views: 0,
                replies: []
            };
            
            // Adiciona o novo tópico
            topics.unshift(newTopic);
            
            // Salva os tópicos atualizados
            saveTopics(topics);
            
            // Fecha o modal
            const newTopicModal = bootstrap.Modal.getInstance(document.getElementById('newTopicModal'));
            newTopicModal.hide();
            
            // Limpa o formulário
            document.getElementById('newTopicForm').reset();
            
            alert('Tópico criado com sucesso! A página será recarregada para exibir seu novo tópico.');
            
            // Recarrega a página para exibir o novo tópico
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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
    
    // Tratamento dos filtros e busca
    const filterCategory = document.getElementById('filterCategory');
    const filterDate = document.getElementById('filterDate');
    const sortBy = document.getElementById('sortBy');
    const searchInput = document.getElementById('searchTopics');
    const searchButton = document.getElementById('searchButton');
    
    function applyFilters() {
        // Em uma implementação real, aqui filtraria os tópicos com base nos critérios selecionados
        // Por agora, apenas mostra uma mensagem
        alert('Filtros aplicados! Em uma implementação real, a lista de tópicos seria atualizada com base nos filtros selecionados.');
    }
    
    if (filterCategory) filterCategory.addEventListener('change', applyFilters);
    if (filterDate) filterDate.addEventListener('change', applyFilters);
    if (sortBy) sortBy.addEventListener('change', applyFilters);
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            
            if (!searchTerm) {
                alert('Por favor, digite um termo para buscar.');
                return;
            }
            
            // Em uma implementação real, aqui buscaria os tópicos com base no termo pesquisado
            alert(`Busca por "${searchTerm}" realizada! Em uma implementação real, os resultados seriam exibidos.`);
        });
    }
}); 