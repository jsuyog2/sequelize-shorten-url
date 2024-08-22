const shortenerFactory = require('../lib/shortener');

// Mock the Sequelize instance and the Url model
const UrlMock = {
    create: jest.fn(),
    findOne: jest.fn(),
};

// Initialize the shortener with the mocked Sequelize instance
const shortener = shortenerFactory({
    define: jest.fn(() => UrlMock)
});

describe('Shortener Module', () => {
    afterEach(() => {
        // Clear mocks after each test
        jest.clearAllMocks();
    });

    /**
     * Test: should create a short URL and store it in the database.
     * This test checks that the `createShortUrl` function generates a short URL
     * and correctly stores the original URL and short URL in the database.
     */
    test('should create a short URL and store it in the database', async () => {
        // Mock implementation of Url.create
        UrlMock.create.mockResolvedValue({
            originalUrl: 'https://example.com',
            shortUrl: 'shortUrlCode',
            clicks: 0,
        });

        // Call createShortUrl function
        const result = await shortener.createShortUrl('https://example.com');

        // Assertions
        expect(result).toEqual({
            originalUrl: 'https://example.com',
            shortUrl: 'shortUrlCode',
            clicks: 0,
        });
        expect(UrlMock.create).toHaveBeenCalledWith({
            originalUrl: 'https://example.com',
            shortUrl: expect.any(String),
        });
    });

    /**
     * Test: should retrieve the original URL and increment the click count.
     * This test checks that the `getOriginalUrl` function retrieves the original URL
     * based on the provided short URL and increments the click count.
     */
    test('should retrieve original URL and increment click count', async () => {
        // Mock implementation of Url.findOne
        const mockSave = jest.fn(); // Create a mock for the save function
        UrlMock.findOne.mockResolvedValue({
            originalUrl: 'https://example.com',
            shortUrl: 'shortUrlCode',
            clicks: 0,
            save: mockSave, // Mock the save function
        });

        // Call getOriginalUrl function
        const result = await shortener.getOriginalUrl('shortUrlCode');

        // Assertions
        expect(result).toEqual({
            originalUrl: 'https://example.com',
            shortUrl: 'shortUrlCode',
            clicks: 1,
        });
        expect(UrlMock.findOne).toHaveBeenCalledWith({
            where: { shortUrl: 'shortUrlCode' },
        });
        expect(mockSave).toHaveBeenCalled(); // Ensure the mock save function is called
    });

    /**
     * Test: should return null when the short URL is not found.
     * This test verifies that the `getOriginalUrl` function returns null when
     * the provided short URL does not exist in the database.
     */
    test('should return null when short URL is not found', async () => {
        // Mock implementation of Url.findOne to return null
        UrlMock.findOne.mockResolvedValue(null);

        // Call getOriginalUrl function
        const result = await shortener.getOriginalUrl('nonExistentShortUrl');

        // Assertions
        expect(result).toBeNull();
        expect(UrlMock.findOne).toHaveBeenCalledWith({
            where: { shortUrl: 'nonExistentShortUrl' },
        });
    });

    /**
     * Test: should retrieve URL statistics.
     * This test checks that the `getUrlStats` function retrieves the statistics
     * for a given short URL, including the original URL and click count.
     */
    test('should retrieve URL statistics', async () => {
        // Mock implementation of Url.findOne
        UrlMock.findOne.mockResolvedValue({
            originalUrl: 'https://example.com',
            shortUrl: 'shortUrlCode',
            clicks: 10,
        });

        // Call getUrlStats function
        const result = await shortener.getUrlStats('shortUrlCode');

        // Assertions
        expect(result).toEqual({
            originalUrl: 'https://example.com',
            shortUrl: 'shortUrlCode',
            clicks: 10,
        });
        expect(UrlMock.findOne).toHaveBeenCalledWith({
            where: { shortUrl: 'shortUrlCode' },
        });
    });

    /**
     * Test: should return null for stats when short URL is not found.
     * This test verifies that the `getUrlStats` function returns null when the
     * provided short URL does not exist in the database.
     */
    test('should return null for stats when short URL is not found', async () => {
        // Mock implementation of Url.findOne to return null
        UrlMock.findOne.mockResolvedValue(null);

        // Call getUrlStats function
        const result = await shortener.getUrlStats('nonExistentShortUrl');

        // Assertions
        expect(result).toBeNull();
        expect(UrlMock.findOne).toHaveBeenCalledWith({
            where: { shortUrl: 'nonExistentShortUrl' },
        });
    });
});
