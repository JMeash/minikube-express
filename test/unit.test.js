const { getCatImages } = require('../server/requester');

describe('unit', function () {
    describe('requester', function () {
        it('should request the cat API and return at least some data', async function () {
            const result = await getCatImages();
            const result_keys = Object.keys(...result.data).toString();
            expect(result_keys).toContain('url');
            expect(result_keys).toContain('breeds');
            expect(result_keys).toContain('id');
        });
    });
});
