const Generator = require('./Generator');
const _ = require('lodash');


const genBool = new Generator(function({ likelihood = 50 }) {
    return this.rand.bool({ likelihood });
});

const genMany = new Generator(function(gen, opts) {
    return _.range(_.isNumber(opts) ? opts : this.rand.integer(opts))
            .map(() => evaluate(gen));
});

const genWord = new Generator(function() { 
    return this.rand.word(); 
});

const genGuid = new Generator(function() { 
    return this.rand.guid(); 
});

const genDate = new Generator(function() { 
    return this.rand.date(); 
});

const genPick = new Generator(function(gen) {
    const vals = evaluate(gen);
    return this.rand.pickone(vals);
});

const genPickSome = new Generator(function(gen, count) {
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

module.exports = {
    genBool,
    genMany,
    genWord,
    genGuid,
    genDate,
    genPick,
    genPickSome
};