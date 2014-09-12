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
        7: 'Not allowed',
        255: 'Internal error'
    };

    // Composable interfaces

    export interface ISecretPhrase {
        secretPhrase: string;
    }


    export interface IPeer {
        peer: string;
    }

    export interface IActive {
        active?: boolean;
    }

    export interface IPeers extends IActive {}

    export interface IMessage {
        message?: string;
        messageIsText?: boolean;
    }

    export interface IReadMessage extends
        ITransaction,
        ISecretPhrase
    {

    }

    export interface ISignTransaction extends
        IUnsignedTransactionBytes,
        IUnsignedTransactionJSON,
        ISecretPhrase
    {

    }

    export interface ISendMessage extends
        IRecipient,
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

    export interface ISendMoney extends
        IRecipient,
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
        amountNQT: number;
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

    export interface ILeaseBalance extends
        IRecipient,
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
        period: number;
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

    export interface ITransferAsset extends
        IRecipient,
        IAsset,
        IQuantityQNT,
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
        comment?: string;
    }

    export interface IAssets {
        assets: number;
    }

    export interface IAssetsByIssuer extends IAccount
    {}

    export interface IPlaceOrder extends
        IAsset,
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IQuantityQNT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IMessageEncryptToSelf,
        IEncryptedMessageToSelf,
        IRecipientPublicKey,
        IPriceNQT
    {
    }

    export interface IPlaceBidOrder extends IPlaceOrder {}
    export interface IPlaceAskOrder extends IPlaceOrder {}

    export interface IIssueAsset extends
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IQuantityQNT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IMessageEncryptToSelf,
        IEncryptedMessageToSelf,
        IRecipientPublicKey
    {
        name: string;
        description: string;
        decimals: number;
    }

    export interface ITrades extends
        IAsset,
        ILastIndex
    {}

    export interface ILimit {
        limit?: number;
    }

    export interface IBlockHeight {
        height?: number;
    }

    export interface IBlock extends IBlockHeight {
        block: number;
        includeTransactions?: boolean;
    }

    export interface IToken {
        website: string;
        token: string;
    }

    export interface IConfirmations {
        numberOfConfirmations?: number;
    }

    export interface IType {
        type?: number;
    }

    export interface ISubtype extends IType {
        subtype?: number;
    }

    export interface IFirstIndex {
        firstIndex?: number;
    }

    export interface ILastIndex extends IFirstIndex {
        lastIndex?: number;
    }

    export interface IMessageEncrypt extends IMessage {
        messageToEncrypt?: any;
        messageToEncryptIsText?: boolean;
    }

    export interface IDGSSeller {
        seller: number;
    }

    export interface IDGSBuyer {
        buyer: number;
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

    export interface IPriceNQT {
        priceNQT: number;
    }

    export interface IQuantityQNT {
        quantityQNT: number;
    }

    export interface ITransactionBytes {
        transactionBytes?: any;
    }

    export interface IUnsignedTransactionJSON {
        unsignedTransactionJSON?: string;
    }

    export interface ITransactionJSON {
        transactionJSON?: string;
    }

    export interface ITransaction {
        transaction: string;
    }

    export interface ITransactionHash {
        fullHash?: string;
    }

    export interface ITransactionInfo extends
        ITransaction,
        ITransactionHash
    {

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

    export interface IForging extends
        ISecretPhrase
    {

    }

    export interface IAccountInfo extends
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
    }

    export interface IAccountGuaranteed extends
        IAccount,
        IConfirmations
    {

    }

    export interface IAliases extends
        IAccount,
        ITimestamp
    {}

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

    export interface IAccountTransactions extends
        IAccount,
        ITimestamp,
        ISubtype,
        ILastIndex,
        IConfirmations
    {}

    export interface IAccountTransactionIds extends IAccountTransactions
    {}

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
        IAlias,
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IDeadline,
        IBroadcast,
        IReferencedTransaction,
        IEncryptedMessageToSelf,
        IMessageEncryptToSelf,
        IRecipientPublicKey
    {

    }

    export interface ISetAlias extends
        ISecretPhrase,
        IPublicKey,
        IFeeNQT,
        IDeadline,
        IReferencedTransaction,
        IBroadcast,
        IEncryptedMessageToSelf,
        IMessageEncryptToSelf,
        IRecipientPublicKey
    {
        aliasName: string;
        aliasURI: string;
    }

    export interface ISellAlias extends
        IAlias,
        IRecipient,
        IPriceNQT,
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

    export interface IAskOrder extends IOrder {}
    export interface IBidOrder extends IOrder {}

    export interface IOrderIds extends
        IAsset,
        ILimit
    {}

    export interface IBidOrderIds extends IOrderIds {}
    export interface IAskOrderIds extends IOrderIds {}
    export interface IAskOrders extends IOrderIds {}
    export interface IBidOrders extends IOrderIds {}

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

    export interface IDGSGoods
    {
        goods: any;
    }

    export interface IDGSSellerGoods extends
        IDGSSeller,
        ILastIndex
    {
        inStockOnly?: boolean;
    }

    export interface IDGSPendingPurchases extends
        IDGSSeller,
        ILastIndex
    {

    }

    export interface IDGSDelist extends
        IDGSBase,
        IDGSGoods
    {
    }

    export interface IDGSList extends
        IDGSBase,
        IPriceNQT
    {
        name: string;
        description: string;
        tags: any;
        quantity: number;
    }

    export interface IDGSPurchase
    {
        purchase: any;
    }

    export interface IDGSDelivery extends
        IDGSBase
    {
        discountNQT: number;
        goodsToEncrypt: any;
        goodsIsText: boolean;
        goodsData: any;
        goodsNonce: any;
    }

    export interface IDGSFeedback extends
        IDGSBase,
        IDGSPurchase
    {
    }

    export interface IDGSPriceChange extends
        IDGSBase,
        IDGSGoods,
        IPriceNQT
    {
    }

    export interface IDGSSetPurchase extends
        IDGSBase,
        IDGSGoods,
        IPriceNQT
    {
        quantity: number;
        deliveryDeadlineTimestamp: any;
    }

    export interface IDGSPurchases extends
        IDGSSeller,
        IDGSBuyer,
        ILastIndex
    {
        completed?: boolean;
    }

    export interface IDGSQuantityChange extends
        IDGSBase,
        IDGSGoods
    {
        deltaQuantity: any;
    }

    export interface IDGSRefund extends
        IDGSBase,
        IDGSPurchase
    {
        refundNQT: number;
    }

    export interface IMarkHost extends
        ISecretPhrase
    {
        data?: any;
        host: string;
        height?: number;
    }

    // Specific responses

    var extend = (dest: any, src: any) => {
        for (var i in src) {
            /*istanbul ignore else*/
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
                if (typeof obj[name] === 'undefined' || obj[name] === null) {
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

            return new Promise((resolve: (value: any) => void, reject: (reason: IError) => void) => {
                this.request.post(req, (err: any, response: any, body: any) => {
                    if (err) {
                        reject({errorCode: 255, errorDescription: String(err['message'] ? err['message'] : err)});
                    } else {
                        if (typeof body === 'object') {
                            if (body.errorCode) {
                                reject(body);
                            } else {
                                resolve(body);
                            }
                        }  else {
                            reject({errorCode: 1, errorDescription: ErrorCodes[1]});
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

        dgsPurchase(req: IDGSSetPurchase): Promise<IResponse>;
        dgsPurchase(req: IDGSSetPurchase, callback: ICallback): void;
        dgsPurchase(req: IDGSSetPurchase, callback?: ICallback): any {
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

        getAccountTransactionIds(req: IAccountTransactionIds): Promise<IResponse>;
        getAccountTransactionIds(req: IAccountTransactionIds, callback: ICallback): void;
        getAccountTransactionIds(req: IAccountTransactionIds, callback?: ICallback): any {
            return this._call('getAccountTransactionIds', req, callback);
        }

        getAccountTransactions(req: IAccountTransactions): Promise<IResponse>;
        getAccountTransactions(req: IAccountTransactions, callback: ICallback): void;
        getAccountTransactions(req: IAccountTransactions, callback?: ICallback): any {
            return this._call('getAccountTransactions', req, callback);
        }

        getAlias(req: IAlias): Promise<IResponse>;
        getAlias(req: IAlias, callback: ICallback): void;
        getAlias(req: IAlias, callback?: ICallback): any {
            return this._call('getAlias', req, callback);
        }

        getAliases(req: IAliases): Promise<IResponse>;
        getAliases(req: IAliases, callback: ICallback): void;
        getAliases(req: IAliases, callback?: ICallback): any {
            return this._call('getAliases', req, callback);
        }

        /**
         * Obtain information associated with all the assets in the exchange
         */
        getAllAssets(): Promise<IResponse>;
        getAllAssets(req: IRequest): Promise<IResponse>;
        getAllAssets(req: IRequest, callback: ICallback): void;
        getAllAssets(req?: IRequest, callback?: ICallback): any {
            return this._call('getAllAssets', req, callback);
        }

        /**
         * getAllOpenOrders
         */
        getAllOpenOrders(): Promise<IResponse>;
        getAllOpenOrders(req: IRequest): Promise<IResponse>;
        getAllOpenOrders(req: IRequest, callback: ICallback): void;
        getAllOpenOrders(req?: IRequest, callback?: ICallback): any {
            return this._call('getAllOpenOrders', req, callback);
        }

        getAllTrades(req: ITimestamp): Promise<IResponse>;
        getAllTrades(req: ITimestamp, callback: ICallback): void;
        getAllTrades(req: ITimestamp, callback?: ICallback): any {
            return this._call('getAllTrades', req, callback);
        }

        getAskOrder(req: IAskOrder): Promise<IResponse>;
        getAskOrder(req: IAskOrder, callback: ICallback): void;
        getAskOrder(req: IAskOrder, callback?: ICallback): any {
            return this._call('getAskOrder', req, callback);
        }

        getAskOrderIds(req: IAskOrderIds): Promise<IResponse>;
        getAskOrderIds(req: IAskOrderIds, callback: ICallback): void;
        getAskOrderIds(req: IAskOrderIds, callback?: ICallback): any {
            return this._call('getAskOrderIds', req, callback);
        }

        getAskOrders(req: IAskOrders): Promise<IResponse>;
        getAskOrders(req: IAskOrders, callback: ICallback): void;
        getAskOrders(req: IAskOrders, callback?: ICallback): any {
            return this._call('getAskOrders', req, callback);
        }

        getAsset(req: IAsset): Promise<IResponse>;
        getAsset(req: IAsset, callback: ICallback): void;
        getAsset(req: IAsset, callback?: ICallback): any {
            return this._call('getAsset', req, callback);
        }

        getAssetIds(): Promise<IResponse>;
        getAssetIds(req: IRequest): Promise<IResponse>;
        getAssetIds(req: IRequest, callback: ICallback): void;
        getAssetIds(req?: IRequest, callback?: ICallback): any {
            return this._call('getAssetIds', req, callback);
        }

        getAssets(req: IAssets): Promise<IResponse>;
        getAssets(req: IAssets, callback: ICallback): void;
        getAssets(req: IAssets, callback?: ICallback): any {
            return this._call('getAssets', req, callback);
        }

        getAssetsByIssuer(req: IAssetsByIssuer): Promise<IResponse>;
        getAssetsByIssuer(req: IAssetsByIssuer, callback: ICallback): void;
        getAssetsByIssuer(req: IAssetsByIssuer, callback?: ICallback): any {
            return this._call('getAssetsByIssuer', req, callback);
        }

        getBalance(req: IAccount): Promise<IResponse>;
        getBalance(req: IAccount, callback: ICallback): void;
        getBalance(req: IAccount, callback?: ICallback): any {
            return this._call('getBalance', req, callback);
        }

        getBidOrder(req: IBidOrder): Promise<IResponse>;
        getBidOrder(req: IBidOrder, callback: ICallback): void;
        getBidOrder(req: IBidOrder, callback?: ICallback): any {
            return this._call('getBidOrder', req, callback);
        }

        getBidOrderIds(req: IBidOrderIds): Promise<IResponse>;
        getBidOrderIds(req: IBidOrderIds, callback: ICallback): void;
        getBidOrderIds(req: IBidOrderIds, callback?: ICallback): any {
            return this._call('getBidOrderIds', req, callback);
        }

        getBidOrders(req: IBidOrders): Promise<IResponse>;
        getBidOrders(req: IBidOrders, callback: ICallback): void;
        getBidOrders(req: IBidOrders, callback?: ICallback): any {
            return this._call('getBidOrders', req, callback);
        }

        getBlock(req: IBlock): Promise<IResponse>;
        getBlock(req: IBlock, callback: ICallback): void;
        getBlock(req: IBlock, callback?: ICallback): any {
            return this._call('getBlock', req, callback);
        }

        getBlockId(req: IBlockHeight): Promise<IResponse>;
        getBlockId(req: IBlockHeight, callback: ICallback): void;
        getBlockId(req: IBlockHeight, callback?: ICallback): any {
            return this._call('getBlockId', req, callback);
        }

        getBlockchainStatus(): Promise<IResponse>;
        getBlockchainStatus(req: IRequest): Promise<IResponse>;
        getBlockchainStatus(req: IRequest, callback: ICallback): void;
        getBlockchainStatus(req?: IRequest, callback?: ICallback): any {
            return this._call('getBlockchainStatus', req, callback);
        }

        getConstants(): Promise<IResponse>;
        getConstants(req: IRequest): Promise<IResponse>;
        getConstants(req: IRequest, callback: ICallback): void;
        getConstants(req?: IRequest, callback?: ICallback): any {
            return this._call('getConstants', req, callback);
        }

        getDGSGood(req: IDGSGoods): Promise<IResponse>;
        getDGSGood(req: IDGSGoods, callback: ICallback): void;
        getDGSGood(req: IDGSGoods, callback?: ICallback): any {
            return this._call('getDGSGood', req, callback);
        }

        getDGSGoods(req: IDGSSellerGoods): Promise<IResponse>;
        getDGSGoods(req: IDGSSellerGoods, callback: ICallback): void;
        getDGSGoods(req: IDGSSellerGoods, callback?: ICallback): any {
            return this._call('getDGSGoods', req, callback);
        }

        getDGSPendingPurchases(req: IDGSPendingPurchases): Promise<IResponse>;
        getDGSPendingPurchases(req: IDGSPendingPurchases, callback: ICallback): void;
        getDGSPendingPurchases(req: IDGSPendingPurchases, callback?: ICallback): any {
            return this._call('getDGSPendingPurchases', req, callback);
        }

        getDGSPurchase(req: IDGSPurchase): Promise<IResponse>;
        getDGSPurchase(req: IDGSPurchase, callback: ICallback): void;
        getDGSPurchase(req: IDGSPurchase, callback?: ICallback): any {
            return this._call('getDGSPurchase', req, callback);
        }

        getDGSPurchases(req: IDGSPurchases): Promise<IResponse>;
        getDGSPurchases(req: IDGSPurchases, callback: ICallback): void;
        getDGSPurchases(req: IDGSPurchases, callback?: ICallback): any {
            return this._call('getDGSPurchases', req, callback);
        }

        getForging(req: IForging): Promise<IResponse>;
        getForging(req: IForging, callback: ICallback): void;
        getForging(req: IForging, callback?: ICallback): any {
            return this._call('getForging', req, callback);
        }

        getGuaranteedBalance(req: IAccountGuaranteed): Promise<IResponse>;
        getGuaranteedBalance(req: IAccountGuaranteed, callback: ICallback): void;
        getGuaranteedBalance(req: IAccountGuaranteed, callback?: ICallback): any {
            return this._call('getGuaranteedBalance', req, callback);
        }

        getMyInfo(): Promise<IResponse>;
        getMyInfo(req: IRequest): Promise<IResponse>;
        getMyInfo(req: IRequest, callback: ICallback): void;
        getMyInfo(req?: IRequest, callback?: ICallback): any {
            return this._call('getMyInfo', req, callback);
        }

        getNextBlockGenerators(): Promise<IResponse>;
        getNextBlockGenerators(req: IRequest): Promise<IResponse>;
        getNextBlockGenerators(req: IRequest, callback: ICallback): void;
        getNextBlockGenerators(req?: IRequest, callback?: ICallback): any {
            return this._call('getNextBlockGenerators', req, callback);
        }

        getPeer(req: IPeer): Promise<IResponse>;
        getPeer(req: IPeer, callback: ICallback): void;
        getPeer(req: IPeer, callback?: ICallback): any {
            return this._call('getPeer', req, callback);
        }

        getPeers(req: IPeers): Promise<IResponse>;
        getPeers(req: IPeers, callback: ICallback): void;
        getPeers(req: IPeers, callback?: ICallback): any {
            return this._call('getPeers', req, callback);
        }

        getPoll(req: IPoll): Promise<IResponse>;
        getPoll(req: IPoll, callback: ICallback): void;
        getPoll(req: IPoll, callback?: ICallback): any {
            return this._call('getPoll', req, callback);
        }

        getPollIds(): Promise<IResponse>;
        getPollIds(req: IRequest): Promise<IResponse>;
        getPollIds(req: IRequest, callback: ICallback): void;
        getPollIds(req?: IRequest, callback?: ICallback): any {
            return this._call('getPollIds', req, callback);
        }

        getState(): Promise<IResponse>;
        getState(req: IRequest): Promise<IResponse>;
        getState(req: IRequest, callback: ICallback): void;
        getState(req?: IRequest, callback?: ICallback): any {
            return this._call('getState', req, callback);
        }

        getTime(): Promise<IResponse>;
        getTime(req: IRequest): Promise<IResponse>;
        getTime(req: IRequest, callback: ICallback): void;
        getTime(req?: IRequest, callback?: ICallback): any {
            return this._call('getTime', req, callback);
        }

        getTrades(req: ITrades): Promise<IResponse>;
        getTrades(req: ITrades, callback: ICallback): void;
        getTrades(req: ITrades, callback?: ICallback): any {
            return this._call('getTrades', req, callback);
        }

        getTransaction(req: ITransactionInfo): Promise<IResponse>;
        getTransaction(req: ITransactionInfo, callback: ICallback): void;
        getTransaction(req: ITransactionInfo, callback?: ICallback): any {
            return this._call('getTransaction', req, callback);
        }

        getTransactionBytes(req: ITransaction): Promise<IResponse>;
        getTransactionBytes(req: ITransaction, callback: ICallback): void;
        getTransactionBytes(req: ITransaction, callback?: ICallback): any {
            return this._call('getTransactionBytes', req, callback);
        }

        getUnconfirmedTransactionIds(req: IAccount): Promise<IResponse>;
        getUnconfirmedTransactionIds(req: IAccount, callback: ICallback): void;
        getUnconfirmedTransactionIds(req: IAccount, callback?: ICallback): any {
            return this._call('getUnconfirmedTransactionIds', req, callback);
        }

        getUnconfirmedTransactions(req: IAccount): Promise<IResponse>;
        getUnconfirmedTransactions(req: IAccount, callback: ICallback): void;
        getUnconfirmedTransactions(req: IAccount, callback?: ICallback): any {
            return this._call('getUnconfirmedTransactions', req, callback);
        }

        issueAsset(req: IIssueAsset): Promise<IResponse>;
        issueAsset(req: IIssueAsset, callback: ICallback): void;
        issueAsset(req: IIssueAsset, callback?: ICallback): any {
            return this._call('issueAsset', req, callback);
        }

        leaseBalance(req: ILeaseBalance): Promise<IResponse>;
        leaseBalance(req: ILeaseBalance, callback: ICallback): void;
        leaseBalance(req: ILeaseBalance, callback?: ICallback): any {
            return this._call('leaseBalance', req, callback);
        }

        markHost(req: IMarkHost): Promise<IResponse>;
        markHost(req: IMarkHost, callback: ICallback): void;
        markHost(req: IMarkHost, callback?: ICallback): any {
            return this._call('markHost', req, callback);
        }

        parseTransaction(req: IParseTransaction): Promise<IResponse>;
        parseTransaction(req: IParseTransaction, callback: ICallback): void;
        parseTransaction(req: IParseTransaction, callback?: ICallback): any {
            return this._call('parseTransaction', req, callback);
        }

        placeAskOrder(req: IPlaceAskOrder): Promise<IResponse>;
        placeAskOrder(req: IPlaceAskOrder, callback: ICallback): void;
        placeAskOrder(req: IPlaceAskOrder, callback?: ICallback): any {
            return this._call('placeAskOrder', req, callback);
        }

        placeBidOrder(req: IPlaceBidOrder): Promise<IResponse>;
        placeBidOrder(req: IPlaceBidOrder, callback: ICallback): void;
        placeBidOrder(req: IPlaceBidOrder, callback?: ICallback): any {
            return this._call('placeBidOrder', req, callback);
        }

        readMessage(req: IReadMessage): Promise<IResponse>;
        readMessage(req: IReadMessage, callback: ICallback): void;
        readMessage(req: IReadMessage, callback?: ICallback): any {
            return this._call('readMessage', req, callback);
        }

        rsConvert(req: IAccount): Promise<IResponse>;
        rsConvert(req: IAccount, callback: ICallback): void;
        rsConvert(req: IAccount, callback?: ICallback): any {
            return this._call('rsConvert', req, callback);
        }

        sellAlias(req: ISellAlias): Promise<IResponse>;
        sellAlias(req: ISellAlias, callback: ICallback): void;
        sellAlias(req: ISellAlias, callback?: ICallback): any {
            return this._call('sellAlias', req, callback);
        }

        sendMessage(req: ISendMessage): Promise<IResponse>;
        sendMessage(req: ISendMessage, callback: ICallback): void;
        sendMessage(req: ISendMessage, callback?: ICallback): any {
            return this._call('sendMessage', req, callback);
        }

        sendMoney(req: ISendMoney): Promise<IResponse>;
        sendMoney(req: ISendMoney, callback: ICallback): void;
        sendMoney(req: ISendMoney, callback?: ICallback): any {
            return this._call('sendMoney', req, callback);
        }

        setAccountInfo(req: IAccountInfo): Promise<IResponse>;
        setAccountInfo(req: IAccountInfo, callback: ICallback): void;
        setAccountInfo(req: IAccountInfo, callback?: ICallback): any {
            return this._call('setAccountInfo', req, callback);
        }

        setAlias(req: ISetAlias): Promise<IResponse>;
        setAlias(req: ISetAlias, callback: ICallback): void;
        setAlias(req: ISetAlias, callback?: ICallback): any {
            return this._call('setAlias', req, callback);
        }

        signTransaction(req: ISignTransaction): Promise<IResponse>;
        signTransaction(req: ISignTransaction, callback: ICallback): void;
        signTransaction(req: ISignTransaction, callback?: ICallback): any {
            return this._call('signTransaction', req, callback);
        }

        startForging(req: ISecretPhrase): Promise<IResponse>;
        startForging(req: ISecretPhrase, callback: ICallback): void;
        startForging(req: ISecretPhrase, callback?: ICallback): any {
            return this._call('startForging', req, callback);
        }

        stopForging(req: ISecretPhrase): Promise<IResponse>;
        stopForging(req: ISecretPhrase, callback: ICallback): void;
        stopForging(req: ISecretPhrase, callback?: ICallback): any {
            return this._call('stopForging', req, callback);
        }

        transferAsset(req: ITransferAsset): Promise<IResponse>;
        transferAsset(req: ITransferAsset, callback: ICallback): void;
        transferAsset(req: ITransferAsset, callback?: ICallback): any {
            return this._call('transferAsset', req, callback);
        }

        constructor(endpoint: string) {
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
    }
}

export = Nxt;