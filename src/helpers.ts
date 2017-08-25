import {Generator} from './Generator';
import * as _ from 'lodash';


export const genBool = new Generator(function({ likelihood = 50 }) {
    return this.rand.bool({ likelihood });
});

export const genMany = new Generator(function(gen, opts) {
    return _.range(_.isNumber(opts) ? opts : this.rand.integer(opts))
            .map(() => evaluate(gen));
});

export const genWord = new Generator(function() { 
    return this.rand.word(); 
});

export const genGuid = new Generator(function() { 
    return this.rand.guid(); 
});

export const genDate = new Generator(function() { 
    return this.rand.date(); 
});

export const genPick = new Generator(function(gen) {
    const vals = evaluate(gen);
    return this.rand.pickone(vals);
});

export const genPickSome = new Generator(function(gen, count) {
    const vals = evaluate(gen);
    return this.rand.pickset(vals, _.isNumber(count) ? count : this.rand.integer({ max: vals.length }));
});

function evaluate(gen) {
    if(_.isFunction(gen)) {
        return gen();
    }
    else {
        return gen;
    }
}
