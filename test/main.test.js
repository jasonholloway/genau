const expect = require('chai').expect;
const Generator = require('../src/Generator')

describe('asadsasd', () => {

    const genWord = new Generator(() => 'wibble');

    const genMessage = new Generator(() => ({
        greeting: genWord
    }));

    it('generables are flattened in generation', () => {
        const message = genMessage.generate();
        expect(message.greeting).to.be.string('wibble');
    });

});