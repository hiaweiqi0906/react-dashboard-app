export default {

  testEnvironment: "jsdom",

   transform: {

     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
     '^.+\\.(css|svg)$': 'jest-transform-stub',

   },
   moduleNameMapper: {
    // '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // optional, useful for mocking CSS modules
  },

   setupFilesAfterEnv: ['@testing-library/jest-dom'],

 };