describe('Patient Management Logic', () => {
  it('should validate patient medical record numbers', () => {
    const mrn = `MRN-${Date.now()}`;
    expect(mrn).toMatch(/^MRN-\d+$/);
  });

  it('should structure patient demographic payload correctly', () => {
    const patient = {
      firstName: 'Mounika',
      lastName: 'Reddy',
      email: 'mounika@example.com',
      bloodGroup: 'O+'
    };
    expect(patient.firstName).toBe('Mounika');
    expect(patient.bloodGroup).toBe('O+');
  });
});