import _req = require('request');
declare module Nxt {
    var ErrorCodes: {
        [index: number]: string;
    };
    interface ISecretPassPhrase {
        secretPhrase: string;
    }
    interface IMessage {
        message?: string;
        messageIsText?: boolean;
    }
    interface IDeadline {
        deadline: number;
    }
    interface IPublicKey {
        publicKey?: string;
    }
    interface IAccount {
        account: string;
    }
    interface ITimestamp {
        timestamp?: number;
    }
    interface IOrder {
        order: number;
    }
    interface IAsset {
        asset: number;
    }
    interface ILimit {
        limit?: number;
    }
    interface IMessageEncrypt extends IMessage {
        messageToEncrypt?: any;
        messageToEncryptIsText?: boolean;
    }
    interface IMessageEncryptToSelf extends IMessage {
        messageToEncryptToSelf?: any;
        messageToEncryptToSelfIsText?: boolean;
    }
    interface IEncryptedMessage extends IMessage {
        encryptedMessageData?: any;
        encryptedMessageNonce?: any;
    }
    interface IEncryptedMessageToSelf extends IMessage {
        encryptToSelfMessageData?: any;
        encryptToSelfMessageNonce?: any;
    }
    interface IResponse {
    }
    interface IRequest {
    }
    interface ICallback {
        (err: any, result: any): void;
    }
    interface IError {
        errorDescription: string;
        errorCode: number;
    }
    interface ITransaction {
        transactionBytes?: any;
        transactionJSON?: string;
    }
    interface IFeeNQT {
        feeNQT: number;
    }
    interface IBroadcast {
        broadcast: boolean;
    }
    interface IAlias {
        alias?: number;
        aliasName?: string;
    }
    interface IReferencedTransaction {
        referencedTransactionFullHash?: number;
    }
    interface IRecipient {
        recipient: number;
    }
    interface IRecipientPublicKey {
        recipientPublicKey?: string;
    }
    interface IBuyAlias extends IEncryptedMessage, IEncryptedMessageToSelf, IMessageEncrypt, IMessageEncryptToSelf, IPublicKey, IFeeNQT, ISecretPassPhrase, IDeadline, IAlias, IReferencedTransaction, IRecipientPublicKey, IBroadcast {
    }
    class API {
        public config: _req.Options;
        public request: typeof _req;
        private _clean(obj);
        private _call(name, qs);
        /**
        * Broadcasts a transaction to the network
        */
        public broadcastTransaction(req: ITransaction): Promise<IResponse>;
        public broadcastTransaction(req: ITransaction, callback: ICallback): void;
        /**
        * Buy an alias
        */
        public buyAlias(req: IBuyAlias): Promise<IResponse>;
        public buyAlias(req: IBuyAlias, callback: ICallback): void;
        /**
        * Calculates the full hash of a transaction
        */
        public calculateFullHash(req: IRequest): Promise<IResponse>;
        public calculateFullHash(req: IRequest, callback: ICallback): void;
        /**
        * Issue a cancel for an existing order
        */
        public cancelAskOrder(req: IRequest): Promise<IResponse>;
        public cancelAskOrder(req: IRequest, callback: ICallback): void;
        /**
        * Issue a cancel for an existing order
        */
        public cancelBidOrder(req: IRequest): Promise<IResponse>;
        public cancelBidOrder(req: IRequest, callback: ICallback): void;
        /**
        * Cast your vote on a poll
        */
        public castVote(req: IRequest): Promise<IResponse>;
        public castVote(req: IRequest, callback: ICallback): void;
        /**
        * Create a new poll
        */
        public createPoll(req: IRequest): Promise<IResponse>;
        public createPoll(req: IRequest, callback: ICallback): void;
        /**
        * Decodes a node hallmark.
        */
        public decodeHallmark(req: IRequest): Promise<IResponse>;
        public decodeHallmark(req: IRequest, callback: ICallback): void;
        /**
        * Decodes an authorization token. This is used to authorize an account on a
        * specific web site without requiring the transmission of a secret passphrase.
        */
        public decodeToken(req: IRequest): Promise<IResponse>;
        public decodeToken(req: IRequest, callback: ICallback): void;
        public decryptFrom(req: IRequest): Promise<IResponse>;
        public decryptFrom(req: IRequest, callback: ICallback): void;
        public dgsDelisting(req: IRequest): Promise<IResponse>;
        public dgsDelisting(req: IRequest, callback: ICallback): void;
        public dgsDelivery(req: IRequest): Promise<IResponse>;
        public dgsDelivery(req: IRequest, callback: ICallback): void;
        public dgsFeedback(req: IRequest): Promise<IResponse>;
        public dgsFeedback(req: IRequest, callback: ICallback): void;
        public dgsListing(req: IRequest): Promise<IResponse>;
        public dgsListing(req: IRequest, callback: ICallback): void;
        public dgsPriceChange(req: IRequest): Promise<IResponse>;
        public dgsPriceChange(req: IRequest, callback: ICallback): void;
        public dgsPurchase(req: IRequest): Promise<IResponse>;
        public dgsPurchase(req: IRequest, callback: ICallback): void;
        public dgsQuantityChange(req: IRequest): Promise<IResponse>;
        public dgsQuantityChange(req: IRequest, callback: ICallback): void;
        public dgsRefund(req: IRequest): Promise<IResponse>;
        public dgsRefund(req: IRequest, callback: ICallback): void;
        public encryptTo(req: IRequest): Promise<IResponse>;
        public encryptTo(req: IRequest, callback: ICallback): void;
        /**
        * Creates an authorization token. Tokens can be used to authorize an
        * account on a specific web site without requiring the transmission of a secret passphrase.
        */
        public generateToken(req: IRequest): Promise<IResponse>;
        public generateToken(req: IRequest, callback: ICallback): void;
        /**
        * Retrieves the account information associated with a supplied account number.
        */
        public getAccount(req: IRequest): Promise<IResponse>;
        public getAccount(req: IRequest, callback: ICallback): void;
        /**
        * Retrieves the blockIDs for all blocks generated by a supplied account. Results are sorted chronologically.
        */
        public getAccountBlockIds(req: IRequest): Promise<IResponse>;
        public getAccountBlockIds(req: IRequest, callback: ICallback): void;
        /**
        * Obtain current order IDs for bid or ask orders for a specific account,
        * optionally filtered by an an assetID. Implemented in version 0.5.9.
        */
        public getAccountCurrentAskOrderIds(req: IRequest): Promise<IResponse>;
        public getAccountCurrentAskOrderIds(req: IRequest, callback: ICallback): void;
        /**
        * Obtain current order IDs for bid or ask orders for a specific account,
        * optionally filtered by an an assetID. Implemented in version 0.5.9.
        */
        public getAccountCurrentBidOrderIds(req: IRequest): Promise<IResponse>;
        public getAccountCurrentBidOrderIds(req: IRequest, callback: ICallback): void;
        /**
        * Retrieves the account number associated with a supplied passphrase.
        */
        public getAccountId(req: IRequest): Promise<IResponse>;
        public getAccountId(req: IRequest, callback: ICallback): void;
        public getAccountPublicKey(req: IRequest): Promise<IResponse>;
        public getAccountPublicKey(req: IRequest, callback: ICallback): void;
        public getAccountTransactionIds(req: IRequest): Promise<IResponse>;
        public getAccountTransactionIds(req: IRequest, callback: ICallback): void;
        public getAccountTransactions(req: IRequest): Promise<IResponse>;
        public getAccountTransactions(req: IRequest, callback: ICallback): void;
        public getAlias(req: IRequest): Promise<IResponse>;
        public getAlias(req: IRequest, callback: ICallback): void;
        public getAliases(req: IRequest): Promise<IResponse>;
        public getAliases(req: IRequest, callback: ICallback): void;
        /**
        * Obtain information associated with all the assets in the exchange
        */
        public getAllAssets(): Promise<IResponse>;
        public getAllAssets(callback: ICallback): void;
        /**
        * getAllOpenOrders
        */
        public getAllOpenOrders(): Promise<IResponse>;
        public getAllOpenOrders(callback: ICallback): void;
        public getAllTrades(req: ITimestamp): Promise<IResponse>;
        public getAllTrades(req: ITimestamp, callback: ICallback): void;
        public getAskOrder(req: IOrder): Promise<IResponse>;
        public getAskOrder(req: IOrder, callback: ICallback): void;
        public getAskOrderIds(req: IRequest): Promise<IResponse>;
        public getAskOrderIds(req: IRequest, callback: ICallback): void;
        public getAskOrders(req: IRequest): Promise<IResponse>;
        public getAskOrders(req: IRequest, callback: ICallback): void;
        public getAsset(req: IRequest): Promise<IResponse>;
        public getAsset(req: IRequest, callback: ICallback): void;
        public getAssetIds(req: IRequest): Promise<IResponse>;
        public getAssetIds(req: IRequest, callback: ICallback): void;
        public getAssets(req: IRequest): Promise<IResponse>;
        public getAssets(req: IRequest, callback: ICallback): void;
        public getAssetsByIssuer(req: IRequest): Promise<IResponse>;
        public getAssetsByIssuer(req: IRequest, callback: ICallback): void;
        public getBalance(req: IAccount): Promise<IResponse>;
        public getBalance(req: IAccount, callback: ICallback): void;
        public getBidOrder(req: IOrder): Promise<IResponse>;
        public getBidOrder(req: IOrder, callback: ICallback): void;
        public getBidOrderIds(req: IRequest): Promise<IResponse>;
        public getBidOrderIds(req: IRequest, callback: ICallback): void;
        public getBidOrders(req: IRequest): Promise<IResponse>;
        public getBidOrders(req: IRequest, callback: ICallback): void;
        public getBlock(req: IRequest): Promise<IResponse>;
        public getBlock(req: IRequest, callback: ICallback): void;
        public getBlockId(req: IRequest): Promise<IResponse>;
        public getBlockId(req: IRequest, callback: ICallback): void;
        public getBlockchainStatus(req: IRequest): Promise<IResponse>;
        public getBlockchainStatus(req: IRequest, callback: ICallback): void;
        public getConstants(req: IRequest): Promise<IResponse>;
        public getConstants(req: IRequest, callback: ICallback): void;
        public getDGSGood(req: IRequest): Promise<IResponse>;
        public getDGSGood(req: IRequest, callback: ICallback): void;
        public getDGSGoods(req: IRequest): Promise<IResponse>;
        public getDGSGoods(req: IRequest, callback: ICallback): void;
        public getDGSPendingPurchases(req: IRequest): Promise<IResponse>;
        public getDGSPendingPurchases(req: IRequest, callback: ICallback): void;
        public getDGSPurchase(req: IRequest): Promise<IResponse>;
        public getDGSPurchase(req: IRequest, callback: ICallback): void;
        public getDGSPurchases(req: IRequest): Promise<IResponse>;
        public getDGSPurchases(req: IRequest, callback: ICallback): void;
        public getForging(req: IRequest): Promise<IResponse>;
        public getForging(req: IRequest, callback: ICallback): void;
        public getGuaranteedBalance(req: IRequest): Promise<IResponse>;
        public getGuaranteedBalance(req: IRequest, callback: ICallback): void;
        public getMyInfo(req: IRequest): Promise<IResponse>;
        public getMyInfo(req: IRequest, callback: ICallback): void;
        public getNextBlockGenerators(req: IRequest): Promise<IResponse>;
        public getNextBlockGenerators(req: IRequest, callback: ICallback): void;
        public getPeer(req: IRequest): Promise<IResponse>;
        public getPeer(req: IRequest, callback: ICallback): void;
        public getPeers(req: IRequest): Promise<IResponse>;
        public getPeers(req: IRequest, callback: ICallback): void;
        public getPoll(req: IRequest): Promise<IResponse>;
        public getPoll(req: IRequest, callback: ICallback): void;
        public getPollIds(req: IRequest): Promise<IResponse>;
        public getPollIds(req: IRequest, callback: ICallback): void;
        public getState(req: IRequest): Promise<IResponse>;
        public getState(req: IRequest, callback: ICallback): void;
        public getTime(req: IRequest): Promise<IResponse>;
        public getTime(req: IRequest, callback: ICallback): void;
        public getTrades(req: IRequest): Promise<IResponse>;
        public getTrades(req: IRequest, callback: ICallback): void;
        public getTransaction(req: IRequest): Promise<IResponse>;
        public getTransaction(req: IRequest, callback: ICallback): void;
        public getTransactionBytes(req: IRequest): Promise<IResponse>;
        public getTransactionBytes(req: IRequest, callback: ICallback): void;
        public getUnconfirmedTransactionIds(req: IRequest): Promise<IResponse>;
        public getUnconfirmedTransactionIds(req: IRequest, callback: ICallback): void;
        public getUnconfirmedTransactions(req: IRequest): Promise<IResponse>;
        public getUnconfirmedTransactions(req: IRequest, callback: ICallback): void;
        public issueAsset(req: IRequest): Promise<IResponse>;
        public issueAsset(req: IRequest, callback: ICallback): void;
        public leaseBalance(req: IRequest): Promise<IResponse>;
        public leaseBalance(req: IRequest, callback: ICallback): void;
        public markHost(req: IRequest): Promise<IResponse>;
        public markHost(req: IRequest, callback: ICallback): void;
        public parseTransaction(req: IRequest): Promise<IResponse>;
        public parseTransaction(req: IRequest, callback: ICallback): void;
        public placeAskOrder(req: IRequest): Promise<IResponse>;
        public placeAskOrder(req: IRequest, callback: ICallback): void;
        public placeBidOrder(req: IRequest): Promise<IResponse>;
        public placeBidOrder(req: IRequest, callback: ICallback): void;
        public readMessage(req: IRequest): Promise<IResponse>;
        public readMessage(req: IRequest, callback: ICallback): void;
        public rsConvert(req: IRequest): Promise<IResponse>;
        public rsConvert(req: IRequest, callback: ICallback): void;
        public sellAlias(req: IRequest): Promise<IResponse>;
        public sellAlias(req: IRequest, callback: ICallback): void;
        public sendMessage(req: IRequest): Promise<IResponse>;
        public sendMessage(req: IRequest, callback: ICallback): void;
        public sendMoney(req: IRequest): Promise<IResponse>;
        public sendMoney(req: IRequest, callback: ICallback): void;
        public setAccountInfo(req: IRequest): Promise<IResponse>;
        public setAccountInfo(req: IRequest, callback: ICallback): void;
        public setAlias(req: IRequest): Promise<IResponse>;
        public setAlias(req: IRequest, callback: ICallback): void;
        public signTransaction(req: IRequest): Promise<IResponse>;
        public signTransaction(req: IRequest, callback: ICallback): void;
        public startForging(req: IRequest): Promise<IResponse>;
        public startForging(req: IRequest, callback: ICallback): void;
        public stopForging(req: IRequest): Promise<IResponse>;
        public stopForging(req: IRequest, callback: ICallback): void;
        public transferAsset(req: IRequest): Promise<IResponse>;
        public transferAsset(req: IRequest, callback: ICallback): void;
        constructor(endpoint: string);
    }
}
export = Nxt;
