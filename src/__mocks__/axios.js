export default {
    post: jest.fn().mockResolvedValue({
        response: {
            data: {}
        }
    }),
    put: jest.fn().mockResolvedValue({
        response: {
            data: {}
        }
    }),
    get: jest.fn().mockResolvedValue({
        data: {
            user: {
                userId: 'abc-123-xyz-789',
                email: 'a@b.com',
                username: '*',
                password: '*',
                firstName: '*',
                lastName: '*',
                phone: '3',
                dateOfBirth: '1234-01-01'
            }
        }
    })
}