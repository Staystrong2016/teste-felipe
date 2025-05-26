const { processOrder } = require('./main');
const { registerChargeback } = require('./payment');

describe('Sistema de Gerenciamento de Pedidos', () => {
  // Dados padrão reutilizáveis
  const defaultInventory = {
    1: { stock: 5, category: 'eletrônicos' },
    2: { stock: 3, category: 'livros' },
  };

  const defaultProcessors = [
    { name: 'GhostPay', fee: 0.02, isAvailable: true },
    { name: 'Sharkfy', fee: 0.03, isAvailable: true },
    { name: 'NovaEra', fee: 0.025, isAvailable: false },
  ];

  const defaultDiscountRules = [
    { type: 'category', category: 'eletrônicos', discount: 0.1 },
    { type: 'total', minTotal: 1000, discount: 0.05 },
  ];

  test('Deve processar pedido válido com descontos e pagamento bem-sucedido', () => {
    const order = {
      id: 'order123',
      items: [
        { productId: 1, quantity: 2, unitPrice: 500 },
        { productId: 2, quantity: 1, unitPrice: 300 },
      ],
    };
    const expectedTotal = 'R$ 1.200,00'; // 2 * 500 * 0.9 + 300
    const result = processOrder(order, defaultInventory, defaultDiscountRules, defaultProcessors);

    expect(result).toBeDefined();
    expect(result.status).toBe('success');
    expect(result.total).toBe(expectedTotal);
    expect(result.processor).toBe('GhostPay');
    expect(result.items).toHaveLength(2);
    expect(result.items[0]).toMatchObject({
      productId: 1,
      quantity: 2,
      unitPrice: 500,
      discountApplied: 0.1,
      finalPrice: 900,
    });
    expect(result.items[1]).toMatchObject({
      productId: 2,
      quantity: 1,
      unitPrice: 300,
      discountApplied: 0,
      finalPrice: 300,
    });
    expect(result.discounts).toBe('R$ 100,00');
    expect(result.chargeback).toEqual({ status: false, reason: null });
    expect(result.message).toMatch(/sucesso/i);
  });

  test('Deve falhar para estoque insuficiente', () => {
    const order = {
      id: 'order124',
      items: [{ productId: 1, quantity: 10, unitPrice: 500 }],
    };
    const inventory = { 1: { stock: 5, category: 'eletrônicos' } };
    const result = processOrder(order, inventory, [], defaultProcessors);

    expect(result).toBeDefined();
    expect(result.status).toBe('failed');
    expect(result.message).toMatch(/estoque/i);
    expect(result.items).toEqual([]);
    expect(result.total).toBe('R$ 0,00');
    expect(result.chargeback).toEqual({ status: false, reason: null });
  });

  test('Deve falhar para processadora indisponível', () => {
    const order = {
      id: 'order125',
      items: [{ productId: 1, quantity: 1, unitPrice: 500 }],
    };
    const processors = [{ name: 'NovaEra', fee: 0.025, isAvailable: false }];
    const result = processOrder(order, defaultInventory, [], processors);

    expect(result).toBeDefined();
    expect(result.status).toBe('failed');
    expect(result.message).toMatch(/processadora/i);
    expect(result.processor).toBeNull();
    expect(result.items).toEqual([]);
    expect(result.total).toBe('R$ 0,00');
    expect(result.chargeback).toEqual({ status: false, reason: null });
  });

  test('Deve processar pedido com chargeback', () => {
    const order = {
      id: 'order126',
      items: [{ productId: 1, quantity: 1, unitPrice: 500 }],
    };
    // Processa o pedido normalmente
    let result = processOrder(order, defaultInventory, [], defaultProcessors);
    // Registra chargeback
    registerChargeback(order.id, 'Fraude detectada');
    // Reprocessa com flag de chargeback
    result = processOrder({ ...order, hasChargeback: true }, defaultInventory, [], defaultProcessors);

    expect(result).toBeDefined();
    expect(result.status).toBe('chargeback');
    expect(result.chargeback).toEqual({ status: true, reason: 'Fraude detectada' });
    expect(result.message).toMatch(/chargeback/i);
    expect(result.total).toBe('R$ 0,00');
    expect(result.items).toEqual([]);
  });

  test('Deve aplicar desconto por total maior que R$1000', () => {
    const order = {
      id: 'order127',
      items: [
        { productId: 1, quantity: 3, unitPrice: 500 },
        { productId: 2, quantity: 1, unitPrice: 100 },
      ],
    };
    const discountRules = [{ type: 'total', minTotal: 1000, discount: 0.05 }];
    const expectedTotal = 'R$ 1.520,00'; // (3 * 500 + 100) * 0.95
    const result = processOrder(order, defaultInventory, discountRules, defaultProcessors);

    expect(result).toBeDefined();
    expect(result.status).toBe('success');
    expect(result.total).toBe(expectedTotal);
    expect(result.discounts).toBe('R$ 80,00');
    expect(result.processor).toBe('GhostPay');
    expect(result.items).toHaveLength(2);
    expect(result.chargeback).toEqual({ status: false, reason: null });
    expect(result.message).toMatch(/sucesso/i);
  });

  test('Deve falhar para quantidade negativa', () => {
    const order = {
      id: 'order128',
      items: [{ productId: 1, quantity: -1, unitPrice: 500 }],
    };
    const result = processOrder(order, defaultInventory, [], defaultProcessors);

    expect(result).toBeDefined();
    expect(result.status).toBe('failed');
    expect(result.message).toMatch(/quantidade/i);
    expect(result.items).toEqual([]);
    expect(result.total).toBe('R$ 0,00');
    expect(result.chargeback).toEqual({ status: false, reason: null });
  });
});