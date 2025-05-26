const { logAction } = require('./utils');

// Seleciona a melhor processadora com base em taxas e disponibilidade
function selectProcessor(processors, total) {
  // TODO: Implementar a lógica para:
  // 1. Escolher a processadora com a menor taxa para o valor total
  // 2. Verificar se a processadora está disponível (isAvailable: true)
  // 3. Retornar o nome da processadora (ex.: "GhostPay")
  // 4. Logar a seleção (ex.: "Processadora GhostPay selecionada")
}

// Processa o pagamento com a processadora selecionada
function processPayment(processor, total) {
  // TODO: Implementar a lógica para:
  // 1. Simular processamento de pagamento (retornar { success: true } para sucesso)
  // 2. Lançar erro para processadoras indisponíveis ou falhas
  // 3. Logar o resultado (ex.: "Pagamento de R$ X processado com GhostPay")
}

// Registra um chargeback para o pedido
function registerChargeback(orderId, reason) {
  // TODO: Implementar a lógica para:
  // 1. Registrar o chargeback com ID do pedido e motivo
  // 2. Retornar { status: true, reason }
  // 3. Logar o chargeback (ex.: "Chargeback registrado para orderId X")
}

module.exports = { selectProcessor, processPayment, registerChargeback };