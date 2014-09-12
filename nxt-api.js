var _req = require('request');

var request;

try  {
    request = require('browser-request');
} catch (e) {
    request = _req;
}

var Promise = require('bluebird');

var Nxt;
(function (Nxt) {
    'use strict';

    Nxt.ErrorCodes = {
        1: 'Incorrect request',
        2: 'Blockchain not up to date',
        3: 'Parameter not specified',
        4: 'Incorrect parameter',
        5: 'Unknown object (block, transaction, etc.)',
        6: 'Not enough funds',
        7: 'Not allowed',
        255: 'Internal error'
    };

    

    

    

    

    

    

    

    

    // Specific responses
    var extend = function (dest, src) {
        for (var i in src) {
            /*istanbul ignore else*/
            if (Object.prototype.hasOwnProperty.call(src, i)) {
                dest[i] = src[i];
            }
        }

        return dest;
    };

    var API = (function () {
        function API(endpoint) {
            this.config = {};
            this.request = request;
            if (!endpoint) {
                throw new Error('Endpoint must be provided');
            }

            if (endpoint.indexOf('http') !== 0) {
                throw new Error('Endpoint must be set with protocol, either https:// or http://');
            }

            if (endpoint.indexOf('/nxt') === -1) {
                endpoint = endpoint + '/nxt';
            }

            this.config.url = endpoint;
            this.config.json = true;
        }
        API.prototype._clean = function (obj) {
            Object.getOwnPropertyNames(obj).forEach(function (name) {
                if (typeof obj[name] === 'undefined' || obj[name] === null) {
                    delete obj[name];
                }
            });
        };

        API.prototype._call = function (name, qs, callback) {
            var _this = this;
            var req = {};

            if (!name) {
                throw new TypeError('Must provide a name for _call');
            }

            extend(req, this.config);

            if (typeof qs === 'object') {
                extend(qs, {
                    'requestType': name
                });
            } else {
                qs = {
                    'requestType': name
                };
            }

            req['qs'] = qs;

            this._clean(qs);

            return new Promise(function (resolve, reject) {
                _this.request.post(req, function (err, response, body) {
                    if (err) {
                        reject({ errorCode: 255, errorDescription: String(err['message'] ? err['message'] : err) });
                    } else {
                        if (typeof body === 'object') {
                            if (body.errorCode) {
                                reject(body);
                            } else {
                                resolve(body);
                            }
                        } else {
                            reject({ errorCode: 1, errorDescription: Nxt.ErrorCodes[1] });
                        }
                    }
                });
            }).nodeify(callback);
        };

        API.prototype.broadcastTransaction = function (req, callback) {
            return this._call('broadcastTransaction', req, callback);
        };

        API.prototype.buyAlias = function (req, callback) {
            return this._call('buyAlias', req, callback);
        };

        API.prototype.calculateFullHash = function (req, callback) {
            return this._call('calculateFullHash', req, callback);
        };

        API.prototype.cancelAskOrder = function (req, callback) {
            return this._call('cancelAskOrder', req, callback);
        };

        API.prototype.cancelBidOrder = function (req, callback) {
            return this._call('cancelBidOrder', req, callback);
        };

        API.prototype.castVote = function (req, callback) {
            return this._call('castVote', req, callback);
        };

        API.prototype.createPoll = function (req, callback) {
            return this._call('createPoll', req, callback);
        };

        API.prototype.decodeHallmark = function (req, callback) {
            return this._call('decodeHallmark', req, callback);
        };

        API.prototype.decodeToken = function (req, callback) {
            return this._call('decodeToken', req, callback);
        };

        API.prototype.decryptFrom = function (req, callback) {
            return this._call('decryptFrom', req, callback);
        };

        API.prototype.dgsDelisting = function (req, callback) {
            return this._call('dgsDelisting', req, callback);
        };

        API.prototype.dgsDelivery = function (req, callback) {
            return this._call('dgsDelivery', req, callback);
        };

        API.prototype.dgsFeedback = function (req, callback) {
            return this._call('dgsFeedback', req, callback);
        };

        API.prototype.dgsListing = function (req, callback) {
            return this._call('dgsListing', req, callback);
        };

        API.prototype.dgsPriceChange = function (req, callback) {
            return this._call('dgsPriceChange', req, callback);
        };

        API.prototype.dgsPurchase = function (req, callback) {
            return this._call('dgsPurchase', req, callback);
        };

        API.prototype.dgsQuantityChange = function (req, callback) {
            return this._call('dgsQuantityChange', req, callback);
        };

        API.prototype.dgsRefund = function (req, callback) {
            return this._call('dgsRefund', req, callback);
        };

        API.prototype.encryptTo = function (req, callback) {
            return this._call('encryptTo', req, callback);
        };

        API.prototype.generateToken = function (req, callback) {
            return this._call('generateToken', req, callback);
        };

        API.prototype.getAccount = function (req, callback) {
            return this._call('getAccount', req, callback);
        };

        API.prototype.getAccountBlockIds = function (req, callback) {
            return this._call('getAccountBlockIds', req, callback);
        };

        API.prototype.getAccountCurrentAskOrderIds = function (req, callback) {
            return this._call('getAccountCurrentAskOrderIds', req, callback);
        };

        API.prototype.getAccountCurrentBidOrderIds = function (req, callback) {
            return this._call('getAccountCurrentBidOrderIds', req, callback);
        };

        API.prototype.getAccountId = function (req, callback) {
            return this._call('getAccountId', req, callback);
        };

        API.prototype.getAccountPublicKey = function (req, callback) {
            return this._call('getAccountPublicKey', req, callback);
        };

        API.prototype.getAccountTransactionIds = function (req, callback) {
            return this._call('getAccountTransactionIds', req, callback);
        };

        API.prototype.getAccountTransactions = function (req, callback) {
            return this._call('getAccountTransactions', req, callback);
        };

        API.prototype.getAlias = function (req, callback) {
            return this._call('getAlias', req, callback);
        };

        API.prototype.getAliases = function (req, callback) {
            return this._call('getAliases', req, callback);
        };

        API.prototype.getAllAssets = function (req, callback) {
            return this._call('getAllAssets', req, callback);
        };

        API.prototype.getAllOpenOrders = function (req, callback) {
            return this._call('getAllOpenOrders', req, callback);
        };

        API.prototype.getAllTrades = function (req, callback) {
            return this._call('getAllTrades', req, callback);
        };

        API.prototype.getAskOrder = function (req, callback) {
            return this._call('getAskOrder', req, callback);
        };

        API.prototype.getAskOrderIds = function (req, callback) {
            return this._call('getAskOrderIds', req, callback);
        };

        API.prototype.getAskOrders = function (req, callback) {
            return this._call('getAskOrders', req, callback);
        };

        API.prototype.getAsset = function (req, callback) {
            return this._call('getAsset', req, callback);
        };

        API.prototype.getAssetIds = function (req, callback) {
            return this._call('getAssetIds', req, callback);
        };

        API.prototype.getAssets = function (req, callback) {
            return this._call('getAssets', req, callback);
        };

        API.prototype.getAssetsByIssuer = function (req, callback) {
            return this._call('getAssetsByIssuer', req, callback);
        };

        API.prototype.getBalance = function (req, callback) {
            return this._call('getBalance', req, callback);
        };

        API.prototype.getBidOrder = function (req, callback) {
            return this._call('getBidOrder', req, callback);
        };

        API.prototype.getBidOrderIds = function (req, callback) {
            return this._call('getBidOrderIds', req, callback);
        };

        API.prototype.getBidOrders = function (req, callback) {
            return this._call('getBidOrders', req, callback);
        };

        API.prototype.getBlock = function (req, callback) {
            return this._call('getBlock', req, callback);
        };

        API.prototype.getBlockId = function (req, callback) {
            return this._call('getBlockId', req, callback);
        };

        API.prototype.getBlockchainStatus = function (req, callback) {
            return this._call('getBlockchainStatus', req, callback);
        };

        API.prototype.getConstants = function (req, callback) {
            return this._call('getConstants', req, callback);
        };

        API.prototype.getDGSGood = function (req, callback) {
            return this._call('getDGSGood', req, callback);
        };

        API.prototype.getDGSGoods = function (req, callback) {
            return this._call('getDGSGoods', req, callback);
        };

        API.prototype.getDGSPendingPurchases = function (req, callback) {
            return this._call('getDGSPendingPurchases', req, callback);
        };

        API.prototype.getDGSPurchase = function (req, callback) {
            return this._call('getDGSPurchase', req, callback);
        };

        API.prototype.getDGSPurchases = function (req, callback) {
            return this._call('getDGSPurchases', req, callback);
        };

        API.prototype.getForging = function (req, callback) {
            return this._call('getForging', req, callback);
        };

        API.prototype.getGuaranteedBalance = function (req, callback) {
            return this._call('getGuaranteedBalance', req, callback);
        };

        API.prototype.getMyInfo = function (req, callback) {
            return this._call('getMyInfo', req, callback);
        };

        API.prototype.getNextBlockGenerators = function (req, callback) {
            return this._call('getNextBlockGenerators', req, callback);
        };

        API.prototype.getPeer = function (req, callback) {
            return this._call('getPeer', req, callback);
        };

        API.prototype.getPeers = function (req, callback) {
            return this._call('getPeers', req, callback);
        };

        API.prototype.getPoll = function (req, callback) {
            return this._call('getPoll', req, callback);
        };

        API.prototype.getPollIds = function (req, callback) {
            return this._call('getPollIds', req, callback);
        };

        API.prototype.getState = function (req, callback) {
            return this._call('getState', req, callback);
        };

        API.prototype.getTime = function (req, callback) {
            return this._call('getTime', req, callback);
        };

        API.prototype.getTrades = function (req, callback) {
            return this._call('getTrades', req, callback);
        };

        API.prototype.getTransaction = function (req, callback) {
            return this._call('getTransaction', req, callback);
        };

        API.prototype.getTransactionBytes = function (req, callback) {
            return this._call('getTransactionBytes', req, callback);
        };

        API.prototype.getUnconfirmedTransactionIds = function (req, callback) {
            return this._call('getUnconfirmedTransactionIds', req, callback);
        };

        API.prototype.getUnconfirmedTransactions = function (req, callback) {
            return this._call('getUnconfirmedTransactions', req, callback);
        };

        API.prototype.issueAsset = function (req, callback) {
            return this._call('issueAsset', req, callback);
        };

        API.prototype.leaseBalance = function (req, callback) {
            return this._call('leaseBalance', req, callback);
        };

        API.prototype.markHost = function (req, callback) {
            return this._call('markHost', req, callback);
        };

        API.prototype.parseTransaction = function (req, callback) {
            return this._call('parseTransaction', req, callback);
        };

        API.prototype.placeAskOrder = function (req, callback) {
            return this._call('placeAskOrder', req, callback);
        };

        API.prototype.placeBidOrder = function (req, callback) {
            return this._call('placeBidOrder', req, callback);
        };

        API.prototype.readMessage = function (req, callback) {
            return this._call('readMessage', req, callback);
        };

        API.prototype.rsConvert = function (req, callback) {
            return this._call('rsConvert', req, callback);
        };

        API.prototype.sellAlias = function (req, callback) {
            return this._call('sellAlias', req, callback);
        };

        API.prototype.sendMessage = function (req, callback) {
            return this._call('sendMessage', req, callback);
        };

        API.prototype.sendMoney = function (req, callback) {
            return this._call('sendMoney', req, callback);
        };

        API.prototype.setAccountInfo = function (req, callback) {
            return this._call('setAccountInfo', req, callback);
        };

        API.prototype.setAlias = function (req, callback) {
            return this._call('setAlias', req, callback);
        };

        API.prototype.signTransaction = function (req, callback) {
            return this._call('signTransaction', req, callback);
        };

        API.prototype.startForging = function (req, callback) {
            return this._call('startForging', req, callback);
        };

        API.prototype.stopForging = function (req, callback) {
            return this._call('stopForging', req, callback);
        };

        API.prototype.transferAsset = function (req, callback) {
            return this._call('transferAsset', req, callback);
        };
        return API;
    })();
    Nxt.API = API;
})(Nxt || (Nxt = {}));

module.exports = Nxt;
