// Formata valores em reais
function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Calcula o total do pedido
function calculateTotal(items) {
  // TODO: Implementar a lógica para:
  // 1. Somar o preço final de cada item (após descontos)
  // 2. Retornar o total como número
  // 3. Logar o cálculo (ex.: "Total calculado: R$ X")
}

// Gera logs detalhados
function logAction(message, data = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, JSON.stringify(data));
}

module.exports = { formatCurrency, calculateTotal, logAction };