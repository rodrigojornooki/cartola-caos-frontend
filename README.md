# 🔥 Cartola Caos - Frontend React

Uma aplicação web React que consome a API do Cartola Caos, um sistema de pontuação invertida que premia ações negativas dos jogadores no Cartola FC.

## 📋 Sobre o Projeto

O **Cartola Caos** é um sistema de pontuação personalizada onde:
- **Ações negativas** (gols contra, cartões, faltas) = **PONTOS POSITIVOS** 🏆
- **Ações positivas** (gols, assistências) = **PENALIZAÇÕES** 😱
- Quanto pior o jogador, mais pontos ele ganha no sistema!

## 🚀 Funcionalidades

### ⚽ Jogos da Rodada
- Lista todos os jogos da rodada atual
- Exibe escudos dos times e horários
- Interface limpa e responsiva

### 👥 Lista de Jogadores  
- Visualização de todos os jogadores do Cartola
- Pontuações tradicionais
- Filtros por posição com cores

### ⭐ Pontuação Personalizada
- **Sistema Caos**: Pontuação invertida que premia ações negativas
- Rankings ordenados pela pontuação personalizada
- Explicações contextuais para cada jogador
- Animações e feedback visual

## 🛠️ Tecnologias

- **React 18** com TypeScript
- **Vite** para desenvolvimento e build
- **Axios** para consumo da API
- **CSS3** com designs modernos
- **Responsive Design**

## 📦 Instalação

\`\`\`bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
\`\`\`

## 🔗 API Backend

A aplicação consome uma API Java Spring Boot com os seguintes endpoints:

- \`GET /api/jogadores/jogos-rodada\` - Lista de jogos da rodada
- \`GET /api/jogadores/cartola\` - Lista de jogadores tradicionais
- \`GET /api/jogadores/pontuados\` - Jogadores com pontuação personalizada

**Backend Repository**: [cartola-caos-java](https://github.com/rodrigojornooki/cartola-caos-java)

## 🎮 Como Usar

1. **Tela Inicial**: Visualize todos os jogos da rodada atual
2. **Botão "👥 Jogadores"**: Veja a lista tradicional de jogadores
3. **Botão "⭐ Pontuados"**: Acesse o ranking do Sistema Caos!

## 🏆 Sistema de Pontuação Caos

### Regras Personalizadas:
\`\`\`typescript
// Ações que GERAM pontos positivos (quanto mais, melhor!)
- Gols contra: +2.0 pontos
- Cartão vermelho: +5.0 pontos  
- Cartão amarelo: +1.0 ponto
- Faltas cometidas: +0.3 pontos
- Pênalti perdido: +3.0 pontos
- Impedimentos: +0.5 pontos

// Ações que PENALIZAM (reduzem pontuação)
- Gols: -8.0 pontos
- Assistências: -5.0 pontos
- Defesas: -1.0 ponto
\`\`\`

## 🎨 Design

- **Interface moderna** inspirada no iOS
- **Gradientes e animações** suaves
- **Cards responsivos** com hover effects
- **Cores das posições** para fácil identificação
- **Rankings visuais** com medalhas

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona perfeitamente em:
- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)  
- 💻 **Desktop** (1024px+)

## �� Deploy

\`\`\`bash
# Build otimizada
npm run build

# Arquivos gerados em /dist
# Pode ser deployado em qualquer servidor estático
\`\`\`

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (\`git checkout -b feature/MinhaFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add: MinhaFeature'\`)
4. Push para a branch (\`git push origin feature/MinhaFeature\`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Curtiu o projeto?** Deixe uma star no repositório!

🔥 **Sistema Caos**: Onde ser ruim é ser bom!
