Frontend - Plataforma de Cursos

# Como rodar o projeto
Pré-requisitos

- Node.js (>= 18)
- NPM ou Yarn
- Backend rodando (necessário para consumir a API)

## Instalação
```bash
# Clonar o repositório
git clone https://github.com/mateus124/frontend-nevoa
cd frontend-nevoa

# Instalar dependências
npm install
```

## Configuração
Crie um arquivo .env.local na pasta raiz e configure as variáveis:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_UPLOADS_URL=http://localhost:8080
```

## Iniciar servidor

```bash
npm run dev
Rodando aplicação na porta: 3000
Acesse em: http://localhost:3000
```

# Decisões importantes da arquitetura
- Framework: Utilizado Next.js pela performance, suporte a SSR/SSG e integração com React.

- Estilização: CSS Modules para escopo local e fácil manutenção.

- Autenticação: Context API (authContext) para gerenciar estado global do usuário.

- Componentização: Criação de componentes reutilizáveis como CourseCard, CourseCardEditable, CourseModal.

- Integração com API: Axios configurado em lib/api para chamadas ao backend.

- Paginação e busca: Implementadas no catálogo de cursos com debounce para otimizar requisições.

- Responsividade: Uso de Flexbox e media queries para garantir boa experiência em dispositivos móveis.

## Observações relevantes do desenvolvimento
- Proteção de rotas: Páginas como MyCoursesPage só podem ser acessadas por usuários autenticados. Caso contrário, há redirecionamento para /.

- Busca de cursos: Implementada com delay de 300ms para evitar excesso de requisições.

- Paginação: Navegação entre páginas de cursos com botões de avançar/voltar.

- Cards responsivos: Ajustados para manter tamanho uniforme e reorganizar layout em telas menores.

- Modal de cursos: Usado para criar/editar cursos sem sair da página principal.

## Boas práticas
- Separação clara entre componentes, páginas e contextos.

- Uso de variáveis de ambiente para URLs da API e uploads.

- Código organizado e modular.

- Tratamento de erros em chamadas à API.

## Links úteis
Backend API: http://localhost:8080/api/docs

Uploads de imagens: http://localhost:8080/uploads

Frontend rodando: http://localhost:3000