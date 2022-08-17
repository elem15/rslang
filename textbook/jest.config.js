module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
};
