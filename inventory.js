const { logAction } = require('./utils');

// Valida se há estoque suficiente para o pedido
function validateStock(orderItems, inventory) {
  // TODO: Implementar a lógica para:
  // 1. Verificar se cada item do pedido tem estoque suficiente
  // 2. Retornar true se todos os itens estão disponíveis, false caso contrário
  // 3. Logar cada validação (ex.: "Validando estoque para productId X")
}

// Atualiza o estoque após um pedido bem-sucedido
function updateStock(orderItems, inventory) {
  // TODO: Implementar a lógica para:
  // 1. Reduzir o estoque de cada item conforme a quantidade do pedido
  // 2. Retornar o inventário atualizado
  // 3. Logar cada atualização (ex.: "Estoque atualizado para productId X")
}

module.exports = { validateStock, updateStock };