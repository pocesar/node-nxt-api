describe('NXT', function(){

    it('exists', function(){
        expect(NXT).to.be.ok;
        expect(NXT.API).to.be.ok;
        expect(NXT.ErrorCodes).to.be.ok;
    });

    describe('API', function(){
        beforeEach(function(){
            this.instance = new NXT.API('http://127.0.0.1:9999');
        });

        it('has endpoint defined', function(){
            expect(this.instance.config).to.be.an('object').that.deep.equal({
                url: 'http://127.0.0.1:9999/nxt',
                json: true
            });
        });

        it('responds to all ' + (Object.keys(NXT.API.prototype).length) + ' APIs defined with non error', function(){
            var
                i,
                promises = [],
                self = this,
                names = Object.keys(NXT.API.prototype),
                skip = ['_call','_clean'].concat(Object.keys(this.instance));


            sinon.stub(this.instance.request, 'post', function(args, callback){
                expect(args.url).to.equal('http://127.0.0.1:9999/nxt');
                expect(args.json).to.equal(true);
                expect(args.qs).to.be.an('object');
                callback(null, true, {'ok': args.qs.expected});
            });

            for (i = 0; i < names.length; i++) {
                if (skip.indexOf(names[i]) !== -1) { continue; }

                promises.push(this.instance[names[i]]({expected: names[i]}).then((function(name){
                    return function(q){
                        //console.log(name, q);
                        expect(q).to.have.deep.property('ok', name);
                    };
                })(names[i])));
            }

            return Promise.all(promises);
        });

        it('responds with errorCode and errorDescription', function(){
            var self = this;

            sinon.stub(self.instance.request, 'post', function(args, callback) {
                callback(args.qs.error);
            });

            return self.instance.getBlockchainStatus({error: 'errored'})
            .then(function(){
                expect(function(){}).to.throw(/Should not succeed/);
            }, function(err){
                expect(err).to.deep.equal({errorCode: 255, errorDescription: 'errored'});

                return self.instance.getBlockchainStatus({error: new Error('Internal')});
            })
            .then(function(){
                expect(function(){}).to.throw(/Should not succeed/);
            }, function(err){
                expect(err).to.deep.equal({errorCode: 255, errorDescription: 'Internal'});

                self.instance.request.post.restore();

                sinon.stub(self.instance.request, 'post', function(args, callback) {
                    callback(null, false, {errorCode: args.qs.error.code, errorDescription: args.qs.error.desc});
                });

                return self.instance.getBlockchainStatus({error: {code: 1, desc: NXT.ErrorCodes[1]}});
            })
            .then(function(){
                expect(function(){}).to.throw(/Should not succeed/);
            }, function(err){
                expect(err).to.deep.equal({errorCode: 1, errorDescription: NXT.ErrorCodes[1]});

                self.instance.request.post.restore();

                sinon.stub(self.instance.request, 'post', function(args, callback) {
                    callback(null, false, false);
                });

                return self.instance.getBlockchainStatus();
            })
            .then(function(){
                expect(function(){}).to.throw(/Should not succeed/);
            }, function(err) {
                expect(err).to.deep.equal({errorCode: 1, errorDescription: NXT.ErrorCodes[1]});
            });
        });

        it('doesnt double append /nxt', function(){
            var instance = new NXT.API('http://127.0.0.1:9999/nxt');

            expect(instance.config.url).to.match(/\/nxt$/);
        });

        it('filters out undefined and null arguments, leaving boolean alone', function(){
            var obj = {
                falsy: false,
                nully: null,
                undefinedy: undefined
            };
            this.instance._clean(obj);
            expect(obj).to.deep.equal({falsy: false});
        });

        it('throws', function(){
            var self = this;

            expect(function(){
                new NXT.API();
            }).to.throw(Error, 'Endpoint must be provided');

            expect(function(){
                new NXT.API('127.0.0.1');
            }).to.throw(Error, 'Endpoint must be set with protocol, either https:// or http://');

            expect(function(){
                self.instance._call();
            }).to.throw(Error, 'Must provide a name for _call');
        });

        it('has dual API', function(done){
            var self = this;

            sinon.stub(this.instance.request, 'post', function(args, callback){
                callback(null, true, {'ok': true});
            });

            this.instance.getBlockchainStatus({}, function(err, q){
                expect(err).to.not.be.ok;
                expect(q).to.deep.equal({ok: true});

                self.instance.getBlockchainStatus().then(function(q){
                    expect(q).to.deep.equal({ok: true});
                    done();
                });
            });

        });

        afterEach(function(){
            if (this.instance.request.post.restore) {
                this.instance.request.post.restore();
            }
            this.instance = null;
        });
    });

});