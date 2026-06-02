function calcularEmissao() {
  const hectares = document.getElementById("hectares").value;
  if (hectares <= 0) {
    document.getElementById("resultadoCalc").innerText = "Digite um valor válido!";
    return;
  }
  const emissao = hectares * 2; // Exemplo simples
  document.getElementById("resultadoCalc").innerText =
    `Estimativa: ${emissao} toneladas de CO₂ por ano.`;
}

function responderQuiz(correto) {
  const resultado = document.getElementById("resultadoQuiz");
  const botao1 = document.getElementById("opcao1");
  const botao2 = document.getElementById("opcao2");

  botao1.classList.remove("correto", "errado");
  botao2.classList.remove("correto", "errado");

  if (correto) {
    resultado.innerText = "✅ Resposta correta!";
    resultado.style.color = "green";
    botao1.classList.add("correto");
  } else {
    resultado.innerText = "❌ Resposta incorreta. A correta é: Rotação de culturas.";
    resultado.style.color = "red";
    botao1.classList.add("correto");
    botao2.classList.add("errado");
  }
}
