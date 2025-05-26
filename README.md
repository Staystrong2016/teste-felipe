# Desafio de Programação: Sistema de Gerenciamento de Pedidos de E-commerce

Bem-vindo ao desafio de programação! Este projeto simula um sistema de gerenciamento de pedidos para um e-commerce, com funcionalidades como validação de estoque, processamento de pagamentos com múltiplas processadoras (GhostPay, Sharkfy, NovaEra), aplicação de descontos dinâmicos e gerenciamento de chargebacks. Seu objetivo é completar os arquivos JavaScript incompletos para que o sistema passe em todos os testes fornecidos. **Não é permitido o uso de qualquer tipo de inteligência artificial para resolver este desafio.**

## Contexto

Você foi contratado para desenvolver um sistema que processa pedidos de um e-commerce. O sistema deve:

- Validar o estoque dos produtos antes de processar o pedido.
- Selecionar a melhor processadora de pagamento com base em taxas e disponibilidade.
- Aplicar descontos com base em regras dinâmicas (ex.: por categoria, total do pedido ou promoções sazonais).
- Gerenciar chargebacks (estornos) para pedidos com problemas (ex.: fraude).
- Gerar relatórios detalhados com status, totais, descontos aplicados, processadora utilizada e informações de chargeback.
- Registrar logs detalhados de todas as ações para rastreamento.

Os arquivos estão parcialmente implementados, com comentários TODO indicando o que precisa ser feito. Os testes automatizados, escritos com Jest, validarão sua implementação.

## Estrutura do Projeto

O projeto contém os seguintes arquivos:

- **main.js**: Orquestra o fluxo do pedido, chamando funções de validação, pagamento, descontos e atualização de estoque. Contém a função principal `processOrder`.
- **inventory.js**: Gerencia o estoque, com funções `validateStock` (valida disponibilidade) e `updateStock` (atualiza estoque após pedido).
- **payment.js**: Lida com pagamentos, com funções `selectProcessor` (escolhe a processadora), `processPayment` (processa o pagamento) e `registerChargeback` (registra chargebacks).
- **discount.js**: Aplica descontos dinâmicos com a função `applyDiscounts`, considerando regras como descontos por categoria ou total.
- **utils.js**: Contém funções auxiliares, como `formatCurrency` (formata valores em reais), `calculateTotal` (calcula o total do pedido) e `logAction` (gera logs).
- **tests.test.js**: Contém a suíte de testes automatizados com Jest, cobrindo seis cenários (pedido válido, estoque insuficiente, processadora indisponível, chargeback, desconto por total e quantidade negativa).

## Objetivo

Sua tarefa é implementar as partes faltantes dos arquivos `main.js`, `inventory.js`, `payment.js`, `discount.js` e `utils.js`, seguindo os comentários TODO e as especificações abaixo. A implementação deve passar em todos os testes executados pelo Jest.

## Instruções para Completar o Desafio

1. **Leia os comentários TODO**:
   - Cada arquivo contém instruções detalhadas sobre o que implementar. Por exemplo:
     - Em `main.js`, implemente a lógica completa de `processOrder`, incluindo validação, estoque, descontos, pagamento e atualização de estoque.
     - Em `payment.js`, implemente a seleção da processadora com base na menor taxa e disponibilidade.

2. **Implemente as funções**:
   - Siga as especificações de entrada e saída descritas nos comentários e na seção "Formato Esperado" (abaixo).
   - Garanta que as funções tratem casos de erro (ex.: estoque insuficiente, processadora indisponível, quantidade negativa).

3. **Teste frequentemente**:
   - Execute `npm test` após cada alteração para verificar o progresso.
   - Concentre-se em fazer um teste passar de cada vez, corrigindo os erros indicados pelo Jest.

4. **Valide os logs**:
   - Verifique se os logs gerados por `logAction` são claros e úteis para depuração.
