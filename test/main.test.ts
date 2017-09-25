import { expect } from 'chai';
import * as seedRandom from 'seedrandom';

let rand = seedRandom('13');

function choose() : number {
    return rand();
}

function generate<T>(seed: any, fn: () => T) : T {
    rand = seedRandom(seed.toString());
    return fn();
}


describe('choose', () => {
    it('returns number', () => {
        const result = choose();
        expect(parseInt(result.toString(), 10)).to.not.be.NaN;
    });

    it('returns same when in similarly-seeded scope', () => {
        const res1 = generate(7, choose);
        const res2 = generate(7, choose);
        expect(res2).to.eql(res1);
    });
    
    it('returns differently when in differently-seeded scope', () => {
        const res1 = generate(7, choose);
        const res2 = generate(13, choose);
        expect(res2).to.not.eql(res1);
    });

});
