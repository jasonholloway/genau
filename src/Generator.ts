import _ from 'lodash';
import ExtensibleFunction from 'extensible-function';
import chance from 'chance';

class Generator extends ExtensibleFunction {

    private _fnGenerate : any;

    constructor(fn) {
        super((...args) => this.generate(undefined, ...args));
        this._fnGenerate = fn;
    }

    map(fnMap) {
        return new Generator(rand => withAmbient(rand, 
                                        () => fnMap(this._fnGenerate(rand), rand)));
    }

    with(arg) {
        const fnAddProps = _.isFunction(arg) ? arg : () => arg;
        return this.map((val, r) => ({ ...val, ...fnAddProps(val, r) }));
    }

    generate(rand, ...args) {
        const vettedRand = isRand(rand) ? rand : (getAmbientRand() || chance());        
        return withAmbient(vettedRand, () => this._fnGenerate.bind({ rand: vettedRand })(...args));
    }
}


const chanceProto = Object.getPrototypeOf(chance());

function isRand(obj) {
    return obj && Object.getPrototypeOf(obj) === chanceProto;
}


const rands = [];

function getAmbientRand() {
    return rands[0];
}

function withAmbient(rand, fn) {
    rands.unshift(rand);
    try {
        return fn();
    }
    finally {
        rands.shift();
    }
}

export { Generator };