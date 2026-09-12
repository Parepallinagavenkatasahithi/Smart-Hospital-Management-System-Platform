describe('Pharmacy & Inventory Logic', () => {
  it('should identify low stock items below reorder threshold', () => {
    const medicines = [
      { name: 'Med-A', totalStock: 10, reorderLevel: 25 },
      { name: 'Med-B', totalStock: 50, reorderLevel: 25 }
    ];
    const lowStock = medicines.filter(m => m.totalStock <= m.reorderLevel);
    expect(lowStock.length).toBe(1);
    expect(lowStock[0].name).toBe('Med-A');
  });

  it('should calculate total prescription item amounts', () => {
    const unitPrice = 15.0;
    const quantity = 3;
    expect(unitPrice * quantity).toBe(45.0);
  });
});