import _req = require('request');

var request: typeof _req;

try {
    request = require('browser-request');
} catch (e) {
    request = _req;
}

import Promise = require('bluebird');

module Nxt {
    'use strict';

    export var ErrorCodes: {[index: number]: string} = {
        1: 'Incorrect request',
        2: 'Blockchain not up to date',
        3: 'Parameter not specified',
        4: 'Incorrect parameter',
        5: 'Unknown object (block, transaction, etc.)',
        6: 'Not enough funds',
        7: 'Not allowed'
    };

    // Composable interfaces

    export interface ISecretPhrase {
        secretPhrase: string;
    }

    export interface IMessage {
        message?: string;
        messageIsText?: boolean;
    }

    export interface IDeadline {
        deadline: number;
    }

    export interface IPublicKey {
        publicKey?: string;
    }

    export interface IAccount {
        account: string;
    }

    export interface ITimestamp {
        timestamp?: number;
    }

    export interface IOrder {
        order: number;
    }

    export interface IAsset {
        asset: number;
    }

    export interface ILimit {
        limit?: number;
    }

    export interface IToken {
        website: string;
        token: string;
    }

    export interface IMessageEncrypt extends IMessage {
        messageToEncrypt?: any;
        messageToEncryptIsText?: boolean;
    }

    export interface IMessageEncryptToSelf extends IMessageEncrypt {
        messageToEncryptToSelf?: any;
        messageToEncryptToSelfIsText?: boolean;
    }

    export interface IEncryptedMessage extends IMessage {
        encryptedMessageData?: any;
        encryptedMessageNonce?: any;
    }

    export interface IEncryptedMessageToSelf extends IEncryptedMessage {
        encryptToSelfMessageData?: any;
        encryptToSelfMessageNonce?: any;
    }

    export interface IResponse {

    }

    export interface IRequest {

    }

    export interface ICallback {
        (err: any, result: any): void;
    }

    export interface IError {
        errorDescription: string;
        errorCode: number;
    }

    export interface ITransactionBytes {
        transactionBytes?: any;
    }

    export interface ITransactionJSON {
        transactionJSON?: string;
    }

    export interface ITransaction {
        transaction: string;
    }

    export interface IVerify {
        verify: boolean;
    }

    export interface IFeeNQT {
        feeNQT: number;
    }

    export interface IBroadcast {
        broadcast: boolean;
    }

    export interface IAlias {
        alias?: number;
        aliasName?: string;
    }

    export interface IReferencedTransaction {
        referencedTransactionFullHash?: number;
    }

    export interface IRecipient {
        recipient: number;
    }

    export interface IRecipientPublicKey {
        recipientPublicKey?: string;
    }

    export interface IUnsignedTransactionBytes {
        unsignedTransactionBytes: string;
    }

    export interface ISignatureHash {
        signatureHash: string;
    }

    export interface IPoll {
        poll: number;
    }

    // Specific requests

    // Account

    export interface IAccountBlockIds extends
        IAccount,
        ITimestamp
    {

    }

    export interface IAccountCurrentOrderIds extends
        IAsset,
        IAccount
    {

    }

    export interface IAccountCurrentBuyOrderIds extends IAccountCurrentOrderIds {}
    export interface IAccountCurrentAskOrderIds extends IAccountCurrentOrderIds {}

    export interface IAccountId extends
        IAccount,
        IPublicKey
    {

    }

    // Transaction

    export interface IBroadcastTransaction extends
        ITransactionBytes,
        ITransactionJSON
    {

    }

    export interface IParseTransaction extends
        IBroadcastTransaction
    {

    }

    // Alias

    export interface IBuyAlias extends
        IEncryptedMessage,
        IEncryptedMessageToSelf,
        IMessageEncrypt,
        IMessageEncryptToSelf,
        IPublicKey,
        IFeeNQT,
        ISecretPhrase,
        IDeadline,
        IAlias,
        IReferencedTransaction,
        IRecipientPublicKey,
        IBroadcast
    {

    }

    export interface ICalculateHash extends
        IUnsignedTransactionBytes,
        ISignatureHash
    {

    }

    export interface IDecodeHallmark
    {
        hallmark: string;
    }

    // Order

    export interface ICancelOrder extends
        IOrder,
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IMessageEncryptToSelf,
        IEncryptedMessageToSelf,
        IRecipientPublicKey
    {}

    export interface ICancelAskOrder extends ICancelOrder
    {}

    export interface ICancelBidOrder extends ICancelOrder
    {}

    // Poll

    export interface IPollCast extends
        IPoll,
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IMessageEncryptToSelf,
        IEncryptedMessageToSelf,
        IRecipientPublicKey
    {
        vote1?: any;
        vote2?: any;
        vote3?: any;
    }

    export interface ICreatePoll extends
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IMessageEncryptToSelf,
        IEncryptedMessageToSelf,
        IRecipientPublicKey
    {
        name: string;
        description: string;
        minNumberOfOptions: number;
        maxNumberOfOptions: number;
        optionsAreBinary: boolean;
        option1: any;
        option2?: any;
        option3?: any;
    }

    // Decrypt / encrypt
    export interface IDecryptFrom extends
        ISecretPhrase,
        IAccount
    {
        data: any;
        nonce: any;
        decryptedMessageIsText: boolean;
    }

    export interface IEncryptTo extends
        IRecipient,
        ISecretPhrase,
        IMessage
    {

    }

    // DGS

    export interface IDGSBase extends
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IMessageEncryptToSelf,
        IEncryptedMessageToSelf,
        IRecipientPublicKey
    {

    }

    export interface IDGSDelist extends
        IDGSBase
    {
        goods: any;
    }

    export interface IDGSList extends
        IDGSBase
    {
        name: string;
        description: string;
        tags: any;
        quantity: number;
        priceNQT: number;
    }

    export interface IDGSDelivery extends
        IDGSBase
    {
        purchase: any;
        discountNQT: number;
        goodsToEncrypt: any;
        goodsIsText: boolean;
        goodsData: any;
        goodsNonce: any;
    }

    export interface IDGSFeedback extends
        IDGSBase
    {
        purchase: any;
    }

    export interface IDGSPriceChange extends
        IDGSBase
    {
        goods: any;
        priceNQT: number;
    }

    export interface IDGSPurchase extends
        IDGSBase
    {
        goods: any;
        priceNQT: number;
        quantity: number;
        deliveryDeadlineTimestamp: any;
    }

    export interface IDGSQuantityChange extends
        IDGSBase
    {
        goods: any;
        deltaQuantity: any;
    }

    export interface IDGSRefund extends
        IDGSBase
    {
        purchase: any;
        refundNQT: number;
    }

    // Specific responses

    var extend = (dest: any, src: any) => {
        for (var i in src) {
            if (Object.prototype.hasOwnProperty.call(src, i)) {
                dest[i] = src[i];
            }
        }

        return dest;
    };

    export class API {
        public config: _req.Options = {};
        public request = request;

        private _clean(obj: any) {
            Object.getOwnPropertyNames(obj).forEach((name: string) => {
                if (typeof obj[name] === 'undefined') {
                    delete obj[name];
                }
            });
        }

        private _call(name: string, qs: Object): Promise<IResponse>;
        private _call(name: string, qs: Object, callback: ICallback): void;
        private _call(name: string, qs?: Object, callback?: ICallback): any {
            var req: any = {};

            if (!name) {
                throw new TypeError('Must provide a name for _call');
            }

            extend(req, this.config);

            if (qs) {
                qs = extend(qs, {
                    'requestType': name
                });
            } else {
                qs = {
                    'requestType': name
                };
            }

            req['qs'] = qs;

            this._clean(qs);

            return new Promise((resolve, reject) => {
                this.request.post(req, (err: any, response: any, body: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (body.errorCode) {
                            var error: IError = body;
                            reject(error);
                        } else {
                            resolve(body);
                        }
                    }
                });
            }).nodeify(callback);
        }

        /**
         * Broadcasts a transaction to the network
         */
        broadcastTransaction(req: IBroadcastTransaction): Promise<IResponse>;
        broadcastTransaction(req: IBroadcastTransaction, callback: ICallback): void;
        broadcastTransaction(req: IBroadcastTransaction, callback?: ICallback): any {
            return this._call('broadcastTransaction', req, callback);
        }

        /**
         * Buy an alias
         */
        buyAlias(req: IBuyAlias): Promise<IResponse>;
        buyAlias(req: IBuyAlias, callback: ICallback): void;
        buyAlias(req: IBuyAlias, callback?: ICallback): any {
            return this._call('buyAlias', req, callback);
        }

        /**
         * Calculates the full hash of a transaction
         */
        calculateFullHash(req: ICalculateHash): Promise<IResponse>;
        calculateFullHash(req: ICalculateHash, callback: ICallback): void;
        calculateFullHash(req: ICalculateHash, callback?: ICallback): any {
            return this._call('calculateFullHash', req, callback);
        }

        /**
         * Issue a cancel for an existing order
         */
        cancelAskOrder(req: ICancelAskOrder): Promise<IResponse>;
        cancelAskOrder(req: ICancelAskOrder, callback: ICallback): void;
        cancelAskOrder(req: ICancelAskOrder, callback?: ICallback): any {
            return this._call('cancelAskOrder', req, callback);
        }

        /**
         * Issue a cancel for an existing order
         */
        cancelBidOrder(req: ICancelBidOrder): Promise<IResponse>;
        cancelBidOrder(req: ICancelBidOrder, callback: ICallback): void;
        cancelBidOrder(req: ICancelBidOrder, callback?: ICallback): any {
            return this._call('cancelBidOrder', req, callback);
        }

        /**
         * Cast your vote on a poll
         */
        castVote(req: IPollCast): Promise<IResponse>;
        castVote(req: IPollCast, callback: ICallback): void;
        castVote(req: IPollCast, callback?: ICallback): any {
            return this._call('castVote', req, callback);
        }

        /**
         * Create a new poll
         */
        createPoll(req: ICreatePoll): Promise<IResponse>;
        createPoll(req: ICreatePoll, callback: ICallback): void;
        createPoll(req: ICreatePoll, callback?: ICallback): any {
            return this._call('createPoll', req, callback);
        }

        /**
         * Decodes a node hallmark.
         */
        decodeHallmark(req: IDecodeHallmark): Promise<IResponse>;
        decodeHallmark(req: IDecodeHallmark, callback: ICallback): void;
        decodeHallmark(req: IDecodeHallmark, callback?: ICallback): any {
            return this._call('decodeHallmark', req, callback);
        }

        /**
         * Decodes an authorization token. This is used to authorize an account on a
         * specific web site without requiring the transmission of a secret passphrase.
         */
        decodeToken(req: IToken): Promise<IResponse>;
        decodeToken(req: IToken, callback: ICallback): void;
        decodeToken(req: IToken, callback?: ICallback): any {
            return this._call('decodeToken', req, callback);
        }

        decryptFrom(req: IDecryptFrom): Promise<IResponse>;
        decryptFrom(req: IDecryptFrom, callback: ICallback): void;
        decryptFrom(req: IDecryptFrom, callback?: ICallback): any {
            return this._call('decryptFrom', req, callback);
        }

        dgsDelisting(req: IDGSDelist): Promise<IResponse>;
        dgsDelisting(req: IDGSDelist, callback: ICallback): void;
        dgsDelisting(req: IDGSDelist, callback?: ICallback): any {
            return this._call('dgsDelisting', req, callback);
        }

        dgsDelivery(req: IDGSDelivery): Promise<IResponse>;
        dgsDelivery(req: IDGSDelivery, callback: ICallback): void;
        dgsDelivery(req: IDGSDelivery, callback?: ICallback): any {
            return this._call('dgsDelivery', req, callback);
        }

        dgsFeedback(req: IDGSFeedback): Promise<IResponse>;
        dgsFeedback(req: IDGSFeedback, callback: ICallback): void;
        dgsFeedback(req: IDGSFeedback, callback?: ICallback): any {
            return this._call('dgsFeedback', req, callback);
        }

        dgsListing(req: IDGSList): Promise<IResponse>;
        dgsListing(req: IDGSList, callback: ICallback): void;
        dgsListing(req: IDGSList, callback?: ICallback): any {
            return this._call('dgsListing', req, callback);
        }

        dgsPriceChange(req: IDGSPriceChange): Promise<IResponse>;
        dgsPriceChange(req: IDGSPriceChange, callback: ICallback): void;
        dgsPriceChange(req: IDGSPriceChange, callback?: ICallback): any {
            return this._call('dgsPriceChange', req, callback);
        }

        dgsPurchase(req: IDGSPurchase): Promise<IResponse>;
        dgsPurchase(req: IDGSPurchase, callback: ICallback): void;
        dgsPurchase(req: IDGSPurchase, callback?: ICallback): any {
            return this._call('dgsPurchase', req, callback);
        }

        dgsQuantityChange(req: IDGSQuantityChange): Promise<IResponse>;
        dgsQuantityChange(req: IDGSQuantityChange, callback: ICallback): void;
        dgsQuantityChange(req: IDGSQuantityChange, callback?: ICallback): any {
            return this._call('dgsQuantityChange', req, callback);
        }

        dgsRefund(req: IDGSRefund): Promise<IResponse>;
        dgsRefund(req: IDGSRefund, callback: ICallback): void;
        dgsRefund(req: IDGSRefund, callback?: ICallback): any {
            return this._call('dgsRefund', req, callback);
        }

        encryptTo(req: IEncryptTo): Promise<IResponse>;
        encryptTo(req: IEncryptTo, callback: ICallback): void;
        encryptTo(req: IEncryptTo, callback?: ICallback): any {
            return this._call('encryptTo', req, callback);
        }

        /**
         * Creates an authorization token. Tokens can be used to authorize an
         * account on a specific web site without requiring the transmission of a secret passphrase.
         */
        generateToken(req: IToken): Promise<IResponse>;
        generateToken(req: IToken, callback: ICallback): void;
        generateToken(req: IToken, callback?: ICallback): any {
            return this._call('generateToken', req, callback);
        }

        /**
         * Retrieves the account information associated with a supplied account number.
         */
        getAccount(req: IAccount): Promise<IResponse>;
        getAccount(req: IAccount, callback: ICallback): void;
        getAccount(req: IAccount, callback?: ICallback): any {
            return this._call('getAccount', req, callback);
        }

        /**
         * Retrieves the blockIDs for all blocks generated by a supplied account. Results are sorted chronologically.
         */
        getAccountBlockIds(req: IAccountBlockIds): Promise<IResponse>;
        getAccountBlockIds(req: IAccountBlockIds, callback: ICallback): void;
        getAccountBlockIds(req: IAccountBlockIds, callback?: ICallback): any {
            return this._call('getAccountBlockIds', req, callback);
        }

        /**
         * Obtain current order IDs for bid or ask orders for a specific account,
         * optionally filtered by an an assetID. Implemented in version 0.5.9.
         */
        getAccountCurrentAskOrderIds(req: IAccountCurrentAskOrderIds): Promise<IResponse>;
        getAccountCurrentAskOrderIds(req: IAccountCurrentAskOrderIds, callback: ICallback): void;
        getAccountCurrentAskOrderIds(req: IAccountCurrentAskOrderIds, callback?: ICallback): any {
            return this._call('getAccountCurrentAskOrderIds', req, callback);
        }

        /**
         * Obtain current order IDs for bid or ask orders for a specific account,
         * optionally filtered by an an assetID. Implemented in version 0.5.9.
         */
        getAccountCurrentBidOrderIds(req: IAccountCurrentBuyOrderIds): Promise<IResponse>;
        getAccountCurrentBidOrderIds(req: IAccountCurrentBuyOrderIds, callback: ICallback): void;
        getAccountCurrentBidOrderIds(req: IAccountCurrentBuyOrderIds, callback?: ICallback): any {
            return this._call('getAccountCurrentBidOrderIds', req, callback);
        }

        /**
         * Retrieves the account number associated with a supplied passphrase.
         */
        getAccountId(req: IAccountId): Promise<IResponse>;
        getAccountId(req: IAccountId, callback: ICallback): void;
        getAccountId(req: IAccountId, callback?: ICallback): any {
            return this._call('getAccountId', req, callback);
        }

        getAccountPublicKey(req: IAccount): Promise<IResponse>;
        getAccountPublicKey(req: IAccount, callback: ICallback): void;
        getAccountPublicKey(req: IAccount, callback?: ICallback): any {
            return this._call('getAccountPublicKey', req, callback);
        }

        getAccountTransactionIds(req): Promise<IResponse>;
        getAccountTransactionIds(req, callback: ICallback): void;
        getAccountTransactionIds(req, callback?: ICallback): any {
            return this._call('getAccountTransactionIds', req, callback);
        }

        getAccountTransactions(req): Promise<IResponse>;
        getAccountTransactions(req, callback: ICallback): void;
        getAccountTransactions(req, callback?: ICallback): any {
            return this._call('getAccountTransactions', req, callback);
        }

        getAlias(req: IAlias): Promise<IResponse>;
        getAlias(req: IAlias, callback: ICallback): void;
        getAlias(req: IAlias, callback?: ICallback): any {
            return this._call('getAlias', req, callback);
        }

        getAliases(req): Promise<IResponse>;
        getAliases(req, callback: ICallback): void;
        getAliases(req, callback?: ICallback): any {
            return this._call('getAliases', req, callback);
        }

        /**
         * Obtain information associated with all the assets in the exchange
         */
        getAllAssets(req: IRequest): Promise<IResponse>;
        getAllAssets(req: IRequest, callback: ICallback): void;
        getAllAssets(req: IRequest, callback?: ICallback): any {
            return this._call('getAllAssets', {}, callback);
        }

        /**
         * getAllOpenOrders
         */
        getAllOpenOrders(req: IRequest): Promise<IResponse>;
        getAllOpenOrders(req: IRequest, callback: ICallback): void;
        getAllOpenOrders(req: IRequest, callback?: ICallback): any {
            return this._call('getAllOpenOrders', {}, callback);
        }

        getAllTrades(req: ITimestamp): Promise<IResponse>;
        getAllTrades(req: ITimestamp, callback: ICallback): void;
        getAllTrades(req: ITimestamp, callback?: ICallback): any {
            return this._call('getAllTrades', req, callback);
        }

        getAskOrder(req: IOrder): Promise<IResponse>;
        getAskOrder(req: IOrder, callback: ICallback): void;
        getAskOrder(req: IOrder, callback?: ICallback): any {
            return this._call('getAskOrder', req, callback);
        }

        getAskOrderIds(req): Promise<IResponse>;
        getAskOrderIds(req, callback: ICallback): void;
        getAskOrderIds(req, callback?: ICallback): any {
            return this._call('getAskOrderIds', req, callback);
        }

        getAskOrders(req): Promise<IResponse>;
        getAskOrders(req, callback: ICallback): void;
        getAskOrders(req, callback?: ICallback): any {
            return this._call('getAskOrders', req, callback);
        }

        getAsset(req): Promise<IResponse>;
        getAsset(req, callback: ICallback): void;
        getAsset(req, callback?: ICallback): any {
            return this._call('getAsset', req, callback);
        }

        getAssetIds(req): Promise<IResponse>;
        getAssetIds(req, callback: ICallback): void;
        getAssetIds(req, callback?: ICallback): any {
            return this._call('getAssetIds', req, callback);
        }

        getAssets(req): Promise<IResponse>;
        getAssets(req, callback: ICallback): void;
        getAssets(req, callback?: ICallback): any {
            return this._call('getAssets', req, callback);
        }

        getAssetsByIssuer(req): Promise<IResponse>;
        getAssetsByIssuer(req, callback: ICallback): void;
        getAssetsByIssuer(req, callback?: ICallback): any {
            return this._call('getAssetsByIssuer', req, callback);
        }

        getBalance(req: IAccount): Promise<IResponse>;
        getBalance(req: IAccount, callback: ICallback): void;
        getBalance(req: IAccount, callback?: ICallback): any {
            return this._call('getBalance', req, callback);
        }

        getBidOrder(req: IOrder): Promise<IResponse>;
        getBidOrder(req: IOrder, callback: ICallback): void;
        getBidOrder(req: IOrder, callback?: ICallback): any {
            return this._call('getBidOrder', req, callback);
        }

        getBidOrderIds(req): Promise<IResponse>;
        getBidOrderIds(req, callback: ICallback): void;
        getBidOrderIds(req, callback?: ICallback): any {
            return this._call('getBidOrderIds', req, callback);
        }

        getBidOrders(req): Promise<IResponse>;
        getBidOrders(req, callback: ICallback): void;
        getBidOrders(req, callback?: ICallback): any {
            return this._call('getBidOrders', req, callback);
        }

        getBlock(req): Promise<IResponse>;
        getBlock(req, callback: ICallback): void;
        getBlock(req, callback?: ICallback): any {
            return this._call('getBlock', req, callback);
        }

        getBlockId(req): Promise<IResponse>;
        getBlockId(req, callback: ICallback): void;
        getBlockId(req, callback?: ICallback): any {
            return this._call('getBlockId', req, callback);
        }

        getBlockchainStatus(req): Promise<IResponse>;
        getBlockchainStatus(req, callback: ICallback): void;
        getBlockchainStatus(req, callback?: ICallback): any {
            return this._call('getBlockchainStatus', req, callback);
        }

        getConstants(req): Promise<IResponse>;
        getConstants(req, callback: ICallback): void;
        getConstants(req, callback?: ICallback): any {
            return this._call('getConstants', req, callback);
        }

        getDGSGood(req): Promise<IResponse>;
        getDGSGood(req, callback: ICallback): void;
        getDGSGood(req, callback?: ICallback): any {
            return this._call('getDGSGood', req, callback);
        }

        getDGSGoods(req): Promise<IResponse>;
        getDGSGoods(req, callback: ICallback): void;
        getDGSGoods(req, callback?: ICallback): any {
            return this._call('getDGSGoods', req, callback);
        }

        getDGSPendingPurchases(req): Promise<IResponse>;
        getDGSPendingPurchases(req, callback: ICallback): void;
        getDGSPendingPurchases(req, callback?: ICallback): any {
            return this._call('getDGSPendingPurchases', req, callback);
        }

        getDGSPurchase(req): Promise<IResponse>;
        getDGSPurchase(req, callback: ICallback): void;
        getDGSPurchase(req, callback?: ICallback): any {
            return this._call('getDGSPurchase', req, callback);
        }

        getDGSPurchases(req): Promise<IResponse>;
        getDGSPurchases(req, callback: ICallback): void;
        getDGSPurchases(req, callback?: ICallback): any {
            return this._call('getDGSPurchases', req, callback);
        }

        getForging(req): Promise<IResponse>;
        getForging(req, callback: ICallback): void;
        getForging(req, callback?: ICallback): any {
            return this._call('getForging', req, callback);
        }

        getGuaranteedBalance(req): Promise<IResponse>;
        getGuaranteedBalance(req, callback: ICallback): void;
        getGuaranteedBalance(req, callback?: ICallback): any {
            return this._call('getGuaranteedBalance', req, callback);
        }

        getMyInfo(req): Promise<IResponse>;
        getMyInfo(req, callback: ICallback): void;
        getMyInfo(req, callback?: ICallback): any {
            return this._call('getMyInfo', req, callback);
        }

        getNextBlockGenerators(req): Promise<IResponse>;
        getNextBlockGenerators(req, callback: ICallback): void;
        getNextBlockGenerators(req, callback?: ICallback): any {
            return this._call('getNextBlockGenerators', req, callback);
        }

        getPeer(req): Promise<IResponse>;
        getPeer(req, callback: ICallback): void;
        getPeer(req, callback?: ICallback): any {
            return this._call('getPeer', req, callback);
        }

        getPeers(req): Promise<IResponse>;
        getPeers(req, callback: ICallback): void;
        getPeers(req, callback?: ICallback): any {
            return this._call('getPeers', req, callback);
        }

        getPoll(req): Promise<IResponse>;
        getPoll(req, callback: ICallback): void;
        getPoll(req, callback?: ICallback): any {
            return this._call('getPoll', req, callback);
        }

        getPollIds(req): Promise<IResponse>;
        getPollIds(req, callback: ICallback): void;
        getPollIds(req, callback?: ICallback): any {
            return this._call('getPollIds', req, callback);
        }

        getState(req): Promise<IResponse>;
        getState(req, callback: ICallback): void;
        getState(req, callback?: ICallback): any {
            return this._call('getState', req, callback);
        }

        getTime(req): Promise<IResponse>;
        getTime(req, callback: ICallback): void;
        getTime(req, callback?: ICallback): any {
            return this._call('getTime', req, callback);
        }

        getTrades(req): Promise<IResponse>;
        getTrades(req, callback: ICallback): void;
        getTrades(req, callback?: ICallback): any {
            return this._call('getTrades', req, callback);
        }

        getTransaction(req): Promise<IResponse>;
        getTransaction(req, callback: ICallback): void;
        getTransaction(req, callback?: ICallback): any {
            return this._call('getTransaction', req, callback);
        }

        getTransactionBytes(req): Promise<IResponse>;
        getTransactionBytes(req, callback: ICallback): void;
        getTransactionBytes(req, callback?: ICallback): any {
            return this._call('getTransactionBytes', req, callback);
        }

        getUnconfirmedTransactionIds(req): Promise<IResponse>;
        getUnconfirmedTransactionIds(req, callback: ICallback): void;
        getUnconfirmedTransactionIds(req, callback?: ICallback): any {
            return this._call('getUnconfirmedTransactionIds', req, callback);
        }

        getUnconfirmedTransactions(req): Promise<IResponse>;
        getUnconfirmedTransactions(req, callback: ICallback): void;
        getUnconfirmedTransactions(req, callback?: ICallback): any {
            return this._call('getUnconfirmedTransactions', req, callback);
        }

        issueAsset(req): Promise<IResponse>;
        issueAsset(req, callback: ICallback): void;
        issueAsset(req, callback?: ICallback): any {
            return this._call('issueAsset', req, callback);
        }

        leaseBalance(req): Promise<IResponse>;
        leaseBalance(req, callback: ICallback): void;
        leaseBalance(req, callback?: ICallback): any {
            return this._call('leaseBalance', req, callback);
        }

        markHost(req): Promise<IResponse>;
        markHost(req, callback: ICallback): void;
        markHost(req, callback?: ICallback): any {
            return this._call('markHost', req, callback);
        }

        parseTransaction(req: IParseTransaction): Promise<IResponse>;
        parseTransaction(req: IParseTransaction, callback: ICallback): void;
        parseTransaction(req: IParseTransaction, callback?: ICallback): any {
            return this._call('parseTransaction', req, callback);
        }

        placeAskOrder(req): Promise<IResponse>;
        placeAskOrder(req, callback: ICallback): void;
        placeAskOrder(req, callback?: ICallback): any {
            return this._call('placeAskOrder', req, callback);
        }

        placeBidOrder(req): Promise<IResponse>;
        placeBidOrder(req, callback: ICallback): void;
        placeBidOrder(req, callback?: ICallback): any {
            return this._call('placeBidOrder', req, callback);
        }

        readMessage(req): Promise<IResponse>;
        readMessage(req, callback: ICallback): void;
        readMessage(req, callback?: ICallback): any {
            return this._call('readMessage', req, callback);
        }

        rsConvert(req): Promise<IResponse>;
        rsConvert(req, callback: ICallback): void;
        rsConvert(req, callback?: ICallback): any {
            return this._call('rsConvert', req, callback);
        }

        sellAlias(req): Promise<IResponse>;
        sellAlias(req, callback: ICallback): void;
        sellAlias(req, callback?: ICallback): any {
            return this._call('sellAlias', req, callback);
        }

        sendMessage(req): Promise<IResponse>;
        sendMessage(req, callback: ICallback): void;
        sendMessage(req, callback?: ICallback): any {
            return this._call('sendMessage', req, callback);
        }

        sendMoney(req): Promise<IResponse>;
        sendMoney(req, callback: ICallback): void;
        sendMoney(req, callback?: ICallback): any {
            return this._call('sendMoney', req, callback);
        }

        setAccountInfo(req): Promise<IResponse>;
        setAccountInfo(req, callback: ICallback): void;
        setAccountInfo(req, callback?: ICallback): any {
            return this._call('setAccountInfo', req, callback);
        }

        setAlias(req): Promise<IResponse>;
        setAlias(req, callback: ICallback): void;
        setAlias(req, callback?: ICallback): any {
            return this._call('setAlias', req, callback);
        }

        signTransaction(req): Promise<IResponse>;
        signTransaction(req, callback: ICallback): void;
        signTransaction(req, callback?: ICallback): any {
            return this._call('signTransaction', req, callback);
        }

        startForging(req): Promise<IResponse>;
        startForging(req, callback: ICallback): void;
        startForging(req, callback?: ICallback): any {
            return this._call('startForging', req, callback);
        }

        stopForging(req): Promise<IResponse>;
        stopForging(req, callback: ICallback): void;
        stopForging(req, callback?: ICallback): any {
            return this._call('stopForging', req, callback);
        }

        transferAsset(req): Promise<IResponse>;
        transferAsset(req, callback: ICallback): void;
        transferAsset(req, callback?: ICallback): any {
            return this._call('transferAsset', req, callback);
        }

        constructor(endpoint: string) {
            this.config.url = endpoint;
            this.config.json = true;
        }
    }
}

export = Nxt;
