describe('NXT', function(){

    it('should exist', function(){
        expect(NXT).to.be.ok;
        expect(NXT.API).to.be.ok;
        expect(NXT.ErrorCodes).to.be.ok;
    });

    describe('API', function(){
        beforeEach(function(){
            this.instance = new NXT.API('http://127.0.0.1:9999');
        });

        it('should have endpoint defined', function(){
            expect(this.instance.config).to.be.an('object').that.deep.equal({
                url: 'http://127.0.0.1:9999',
                json: true
            });
        });

        it('should respond to all APIs defined with non error', function(){
            var
                i,
                promises = [],
                names = Object.keys(NXT.API.prototype),
                skip = ['_call'].concat(Object.keys(this.instance));

            sinon.stub(this.instance.request, 'post', function(args, callback){
                expect(args.url).to.equal('http://127.0.0.1:9999');
                expect(args.json).to.equal(true);
                expect(args.qs).to.be.an('object');
                callback(null, true, {'ok': args.qs.expected});
            });

            for (i = 0; i < names.length; i++) {
                if (skip.indexOf(names[i]) !== -1) { continue; }

                promises.push(this.instance[names[i]]({expected: names[i]}).then((function(name){
                    return function(err, dummy, q){
                        console.log(name);
                        expect(q).to.have.deep.property('ok', name);
                    };
                })(names[i])));
            }

            return Promise.all(promises);
        });

        it('should respond with errorCode', function(){

        });

        afterEach(function(){
            this.instance = null;
        });
    });

});