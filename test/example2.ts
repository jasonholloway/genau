// import * as _ from 'lodash';
// import { Generator, genBool, genMany, genWord, genGuid, genDate, genPick } from '../src/dataGen';


// class Gen<T> extends Function<T> {

// }

// class GenSet<T> extends Array<T> {

// }

// function gen<T>(args?: any) : T {
//     return null;
// }

// function genSet<T>(gen: () => T, size: number) : T[] {
//     return new GenSet<T>();
// } 


// gen<string>({ withFeathers: false }) 




// const genProvider = new Generator(() => {
//     return {
//         name: genWord()
//     };
// });

// const genHotel = new Generator(({ provider = genProvider() } = {}) => {
//     return {
//         provider,
//         code: genWord(),
//         isPromoted: genBool({ likelihood: 50 })
//     };
// });

// const genChange = new Generator(({ hotel = genHotel() } = {}) => ({
//                                     type: genWord(),
//                                     hotel
//                                 }));


// const genChangeset = new Generator(({ hotel = genHotel() } = {}) => {
//                             return {
//                                 provider: hotel.provider,
//                                 correlationId: genGuid(),
//                                 publishDate: genDate(),
//                                 changes: genMany(() => genChange({ hotel }), { min: 0, max: 10 })
//                             };
//                         });

// const genScenario = new Generator(({ scale = 1.0 }) => {
//     const providers = genSet(genProvider, 3 * scale);
//     const hotels = genMany(() => genHotel({ provider: genPick(providers) }), 20 * scale);
//     const changesets = genMany(() => genChangeset({ hotel: genPick(hotels) }), 30 * scale);

//     const countries = genSet(20, genProvider({ name:  }));
    
//     return {
//         providers,
//         hotels,
//         changesets,

//         promotedHotels: hotels.filter(h => h.isPromoted),
//         allChanges: _(changesets).flatMap(cs => cs.changes).value()
//     };
// });


// module.exports = {
//     genChange,
//     genChangeset,
//     genScenario
// };
