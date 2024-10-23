import { fetchCommandData } from './dataService';

global.fetch = jest.fn();

afterEach(() => {
    fetch.mockClear();  // Limpa o mock após cada teste
});

test('fetchCommandData returns data on successful fetch', async () => {
    const mockData = { email: ["example@example.com"] };
    
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
    });

    const data = await fetchCommandData();
    
    expect(data).toEqual(mockData);  // Verifica se os dados retornados estão corretos
});

test('fetchCommandData throws an error when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
    });

    await expect(fetchCommandData()).rejects.toThrow('Failed to fetch');
});
