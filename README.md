# AppTarefas

# Deploy pelo vercel - Passo a Passo
### criar o arquivo vercel.json
{
    "version": 2,
    "builds": [
        {
            "src": "./app.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/"
        }
    ]
}
### criar a variável PORT no .env, padrão node 3001
declarar a porta no app.js
const PORT = process.env.PORT || 3001;

### No arquivo package.json
adicionar o engines node
"engines": {
    "node": "18.x" },

verificar se existe o scripts---> "start": "node ./bin/www"

### Git - utilize o terminal e abra no diretório raiz do seu app
git init
git add .
git commit -m "feat: creat api controle de tarefas"
//crie um repositório no github, copie o link e cole no git push abaixo
 git push https://github.com/dacasfilipe/api-control-tasks.git
 verifique se o github recebeu os arquivos

### Vercel
acesse vercel.com
conecte o vercel com o github
add new --> Project
import seu git repository
escolha a pasta raiz do projeto em ./
configurar a variável de ambiente - Environment Variables
key PORT Value 9001
clicar em deploy

Congratulations:
copie a url do projeto do vercel na barra do navegador


