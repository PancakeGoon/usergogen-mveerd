const p = require('../../src/prepare')

describe('Prepare', function() {
    it('unnest', function() {
        p.unnest({'a.b.c': 1}).should.deep.equal({a: {b: {c: 1}}})
        p.unnest({'a.b.c': {
            d: 2,
            'e.f': 3
        }}).should.deep.equal({a: {b: {c: {d: 2, e: {f: 3}}}}})
    })

    it('extend', function() {
        p.extend('something', undefined).should.equal('something')
        should.equal(p.extend('something', '!!unset'), undefined)
        p.extend(undefined, 'something').should.equal('something')
        p.extend(28, 'something').should.equal('something')
        p.extend('something', 28).should.equal(28)
        p.extend(27, 28).should.equal(28)
        p.extend({a: 1, c: 1, d: 1}, {b: 2, c: 2, d: '!!unset'}).should.deep.equal({a: 1, b: 2, c: 2})
        p.extend([3, 2, 1], [null, 4, 5]).should.deep.equal([3, 4, 5])
    })

    it('inherit', function() {
        p.inherit({
            a: {
                x: 1,
                y: 2
            },
            b: {
                extends: 'a',
                z: 3
            },
            c: {
                extends: 'b',
                w: 4
            }
        }).c.should.deep.equal({
            x: 1,
            y: 2,
            z: 3,
            w: 4
        })
    })
})