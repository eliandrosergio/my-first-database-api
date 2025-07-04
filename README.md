# my-first-database-api

Bem-vindo ao **My First Database API**, um projeto simples de API RESTful construído com Node.js e Express, que gerencia usuários armazenados em um arquivo JSON. Este projeto é ideal para aprender sobre APIs, validação de dados e manipulação de arquivos no Node.js.

## Descrição
Esta API permite criar e buscar usuários com base em parâmetros como `id` ou `nome`. Ela utiliza um arquivo JSON (`users.json`) como banco de dados e inclui validações para garantir a integridade dos dados enviados. O projeto incorpora boas práticas, como o uso de middlewares de segurança (`helmet`) e CORS, além de validação de entrada com `express-validator`.

## Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **express-validator**: Validação de dados de entrada.
- **helmet**: Segurança para cabeçalhos HTTP.
- **cors**: Suporte a requisições de origens diferentes.
- **fs.promises**: Manipulação de arquivos JSON.

## Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **npm** (geralmente incluído com o Node.js)

## Instalação
1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/efaustin/my-first-database-api.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd my-first-database-api
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como Usar
1. Inicie o servidor:
   ```bash
   node src/api.js
   ```
   O servidor estará rodando na porta padrão `3040` (ou na porta definida pela variável de ambiente `PORT`).

2. Acesse as rotas da API:
   - **POST /api/users**: Cria um novo usuário.
     - Exemplo de corpo da requisição:
       ```json
       {
         "nome": "João Silva",
         "idade": 25,
         "dataAdesao": "2023-10-01",
         "dataNascimento": "1998-05-15",
         "sexo": "M"
       }
       ```
   - **GET /api/get/:paramType/:paramValue**: Busca um usuário por `id` ou `nome`.
     - Exemplo: `GET /api/get/id/1` ou `GET /api/get/nome/João Silva`

3. Teste a API utilizando ferramentas como **Postman**, **cURL**, ou diretamente no navegador para requisições GET.

## Estrutura do Projeto
```
my-first-database-api/
├── src/
│   ├── api.js          # Código principal da API
│   ├── users.json      # Arquivo JSON que armazena os dados dos usuários
├── package.json        # Configurações e dependências do projeto
└── README.md           # Documentação do projeto
```

## Exemplos de Requisições
- **Criar um usuário**:
  ```bash
  curl -X POST http://localhost:3040/api/users \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria Souza","idade":30,"dataAdesao":"2023-10-01","dataNascimento":"1993-03-20","sexo":"F"}'
  ```
- **Buscar usuário por ID**:
  ```bash
  curl http://localhost:3040/api/get/id/1
  ```
- **Buscar usuário por nome**:
  ```bash
  curl http://localhost:3040/api/get/nome/Maria%20Souza
  ```

## Observações
- O arquivo `users.json` será criado automaticamente na primeira execução, caso não exista.
- A API inclui validação de entrada para os campos `nome`, `idade`, `dataAdesao`, `dataNascimento` e `sexo`.
- Erros são retornados com mensagens claras para facilitar a depuração.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato
Autor: efaustin  
Para dúvidas ou sugestões, abra uma *issue* no repositório ou entre em contato pelo GitHub.
