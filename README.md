# KeyBoard Tester

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Keyboard_Tester](https://img.shields.io/badge/KeyBoard_Tester-ba3f1d?style=for-the-badge&logo=quicklook&logoColor=white)

Ferramenta web para testar todas as teclas de um teclado físico. Pressione cada tecla e acompanhe em tempo real quais já foram testadas, a cobertura percentual e quais ainda faltam.

## Tecnologias

- **HTML5** — estrutura semântica da aplicação
- **CSS3** — layout responsivo com Flexbox, variáveis de cor, animações e efeitos glassmorphism
- **JavaScript (ES6+)** — lógica de detecção de teclas via `KeyboardEvent`, manipulação do DOM e gerenciamento de estado com `Set`

## Como usar

1. Abra a aplicação no navegador.
2. Pressione qualquer tecla do seu teclado físico.
3. A tecla correspondente no layout virtual será destacada em **azul** enquanto estiver pressionada e ficará **roxa** após ser solta, indicando que foi testada.
4. O painel superior exibe em tempo real:
   - **Última tecla** — a tecla pressionada mais recentemente.
   - **Teclas testadas** — quantidade de teclas já validadas.
   - **Cobertura** — percentual do teclado coberto.
   - **Faltam testar** — quantidade de teclas ainda não pressionadas.
5. A seção inferior lista todas as teclas que ainda precisam ser testadas.
6. Clique em **Resetar teste** para zerar o progresso e começar do zero.

> O layout é baseado no teclado ABNT2 (padrão brasileiro).

## Como rodar o projeto

Por ser uma aplicação puramente front-end (sem dependências ou build), basta abrir o arquivo `index.html` diretamente no navegador:

### Opção 1 — abertura direta

```bash
# Clone o repositório
git clone https://github.com/adrianoleitedasilva/KeyBoardTester.git

# Acesse a pasta
cd KeyBoardTester

# Abra o arquivo no navegador (Windows)
start index.html

# Abra o arquivo no navegador (macOS)
open index.html

# Abra o arquivo no navegador (Linux)
xdg-open index.html
```
