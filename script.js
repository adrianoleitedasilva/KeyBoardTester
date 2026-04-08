const pressedKeyElement = document.getElementById("pressed-key");
const testedCountElement = document.getElementById("tested-count");
const coveragePercentElement = document.getElementById("coverage-percent");
const remainingCountElement = document.getElementById("remaining-count");
const remainingKeysElement = document.getElementById("remaining-keys");
const resetButton = document.getElementById("reset-button");

/**
 * Seleciona todas as teclas renderizadas no teclado virtual.
 */
const allKeyElements = Array.from(document.querySelectorAll(".key"));

/**
 * Cria uma lista única de códigos das teclas exibidas.
 */
const allKeyCodes = allKeyElements.map((key) => key.dataset.key);

/**
 * Conjunto com as teclas já testadas.
 */
const testedKeys = new Set();

/**
 * Quantidade total de teclas do teclado virtual.
 */
const totalKeys = allKeyCodes.length;

/**
 * Retorna um nome mais amigável para a tecla.
 */
function formatKeyName(code, key = "") {
  const keyMap = {
    Escape: "Esc",
    Backspace: "Backspace",
    Tab: "Tab",
    CapsLock: "Caps Lock",
    Enter: "Enter",
    ShiftLeft: "Shift Esquerdo",
    ShiftRight: "Shift Direito",
    ControlLeft: "Ctrl Esquerdo",
    ControlRight: "Ctrl Direito",
    AltLeft: "Alt Esquerdo",
    AltRight: "AltGr / Alt Direito",
    MetaLeft: "Win Esquerdo",
    MetaRight: "Win Direito",
    ContextMenu: "Menu",
    Space: "Espaço",
    ArrowUp: "Seta Cima",
    ArrowDown: "Seta Baixo",
    ArrowLeft: "Seta Esquerda",
    ArrowRight: "Seta Direita",
    Quote: "\"",
    Minus: "-",
    Equal: "=",
    BracketLeft: "´ `",
    BracketRight: "[ {",
    Backslash: "] }",
    Semicolon: "Ç",
    Backquote: "~ ^",
    IntlBackslash: "\\ |",
    Comma: ", ;",
    Period: ". :",
    Slash: "/ ?",
    NumLock: "Num Lock",
    NumpadDivide: "Num /",
    NumpadMultiply: "Num *",
    NumpadSubtract: "Num -",
    NumpadAdd: "Num +",
    NumpadEnter: "Num Enter",
    NumpadDecimal: "Num ."
  };

  if (keyMap[code]) {
    return keyMap[code];
  }

  if (code.startsWith("Key")) {
    return code.replace("Key", "");
  }

  if (code.startsWith("Digit")) {
    return code.replace("Digit", "");
  }

  if (code.startsWith("Numpad")) {
    return code.replace("Numpad", "Num ");
  }

  if (key && key.length === 1) {
    return key.toUpperCase();
  }

  return code;
}

/**
 * Atualiza contador, cobertura e quantidade restante.
 */
function updateStats() {
  const testedCount = testedKeys.size;
  const remainingCount = totalKeys - testedCount;
  const coverage = ((testedCount / totalKeys) * 100).toFixed(0);

  testedCountElement.textContent = testedCount;
  coveragePercentElement.textContent = `${coverage}%`;
  remainingCountElement.textContent = remainingCount;
}

/**
 * Atualiza a lista visual de teclas pendentes.
 */
function updateRemainingKeysList() {
  const remainingKeys = allKeyCodes.filter((code) => !testedKeys.has(code));

  remainingKeysElement.innerHTML = "";

  if (remainingKeys.length === 0) {
    const success = document.createElement("div");
    success.className = "empty-state";
    success.textContent = "Parabéns! Todas as teclas do layout foram testadas.";
    remainingKeysElement.appendChild(success);
    return;
  }

  remainingKeys.forEach((code) => {
    const item = document.createElement("span");
    item.className = "remaining-item";
    item.textContent = formatKeyName(code);
    remainingKeysElement.appendChild(item);
  });
}

/**
 * Ativa a tecla pressionada no layout.
 */
function activateKey(code) {
  const keyElement = document.querySelector(`[data-key="${code}"]`);
  if (keyElement) {
    keyElement.classList.add("active");
  }
}

/**
 * Desativa a tecla no layout.
 */
function deactivateKey(code) {
  const keyElement = document.querySelector(`[data-key="${code}"]`);
  if (keyElement) {
    keyElement.classList.remove("active");
  }
}

/**
 * Marca a tecla como testada.
 */
function markAsTested(code) {
  const keyElement = document.querySelector(`[data-key="${code}"]`);

  if (keyElement && !testedKeys.has(code)) {
    testedKeys.add(code);
    keyElement.classList.add("tested");
    updateStats();
    updateRemainingKeysList();
  }
}

/**
 * Remove destaques ativos.
 */
function clearActiveKeys() {
  document.querySelectorAll(".key.active").forEach((key) => {
    key.classList.remove("active");
  });
}

/**
 * Reseta todo o teste.
 */
function resetTest() {
  testedKeys.clear();

  allKeyElements.forEach((key) => {
    key.classList.remove("tested");
    key.classList.remove("active");
  });

  pressedKeyElement.textContent = "Nenhuma";
  updateStats();
  updateRemainingKeysList();
}

/**
 * Evento de tecla pressionada.
 */
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code.startsWith("Arrow")) {
    event.preventDefault();
  }

  pressedKeyElement.textContent = formatKeyName(event.code, event.key);
  activateKey(event.code);
  markAsTested(event.code);
});

/**
 * Evento de tecla solta.
 */
window.addEventListener("keyup", (event) => {
  deactivateKey(event.code);
});

/**
 * Remove teclas ativas ao perder foco.
 */
window.addEventListener("blur", clearActiveKeys);

/**
 * Evento do botão de reset.
 */
resetButton.addEventListener("click", resetTest);

/**
 * Inicialização.
 */
updateStats();
updateRemainingKeysList();
