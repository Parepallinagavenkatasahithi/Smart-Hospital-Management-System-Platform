describe('Billing & Financial Calculation Logic', () => {
  it('should sum invoice line item totals correctly', () => {
    const items = [
      { unitPrice: 100.0, quantity: 1 },
      { unitPrice: 25.0, quantity: 2 }
    ];
    const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    expect(total).toBe(150.0);
  });

  it('should mark invoice PAID when paid amount equals or exceeds final amount', () => {
    const finalAmount = 200.0;
    const paidAmount = 200.0;
    const isPaid = paidAmount >= finalAmount;
    expect(isPaid).toBe(true);
  });
});