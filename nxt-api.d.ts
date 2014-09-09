import _req = require('request');
declare module Nxt {
    var ErrorCodes: {
        [index: number]: string;
    };
    interface ISecretPhrase {
        secretPhrase: string;
    }
    interface IPeer {
        peer: string;
    }
    interface IActive {
        active?: boolean;
    }
    interface IPeers extends IActive {
    }
    interface IMessage {
        message?: string;
        messageIsText?: boolean;
    }
    interface IReadMessage extends ITransaction, ISecretPhrase {
    }
    interface ISignTransaction extends IUnsignedTransactionBytes, IUnsignedTransactionJSON, ISecretPhrase {
    }
    interface ISendMessage extends IRecipient, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
    }
    interface ISendMoney extends IRecipient, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        amountNQT: number;
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
    interface ILeaseBalance extends IRecipient, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        period: number;
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
    interface ITransferAsset extends IRecipient, IAsset, IQuantityQNT, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        comment?: string;
    }
    interface IAssets {
        assets: number;
    }
    interface IAssetsByIssuer extends IAccount {
    }
    interface IPlaceOrder extends IAsset, ISecretPhrase, IPublicKey, IFeeNQT, IQuantityQNT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey, IPriceNQT {
    }
    interface IPlaceBidOrder extends IPlaceOrder {
    }
    interface IPlaceAskOrder extends IPlaceOrder {
    }
    interface IIssueAsset extends ISecretPhrase, IPublicKey, IFeeNQT, IQuantityQNT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        name: string;
        description: string;
        decimals: number;
    }
    interface ITrades extends IAsset, ILastIndex {
    }
    interface ILimit {
        limit?: number;
    }
    interface IBlockHeight {
        height?: number;
    }
    interface IBlock extends IBlockHeight {
        block: number;
        includeTransactions?: boolean;
    }
    interface IToken {
        website: string;
        token: string;
    }
    interface IConfirmations {
        numberOfConfirmations?: number;
    }
    interface IType {
        type?: number;
    }
    interface ISubtype extends IType {
        subtype?: number;
    }
    interface IFirstIndex {
        firstIndex?: number;
    }
    interface ILastIndex extends IFirstIndex {
        lastIndex?: number;
    }
    interface IMessageEncrypt extends IMessage {
        messageToEncrypt?: any;
        messageToEncryptIsText?: boolean;
    }
    interface IDGSSeller {
        seller: number;
    }
    interface IDGSBuyer {
        buyer: number;
    }
    interface IMessageEncryptToSelf extends IMessageEncrypt {
        messageToEncryptToSelf?: any;
        messageToEncryptToSelfIsText?: boolean;
    }
    interface IEncryptedMessage extends IMessage {
        encryptedMessageData?: any;
        encryptedMessageNonce?: any;
    }
    interface IEncryptedMessageToSelf extends IEncryptedMessage {
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
    interface IPriceNQT {
        priceNQT: number;
    }
    interface IQuantityQNT {
        quantityQNT: number;
    }
    interface ITransactionBytes {
        transactionBytes?: any;
    }
    interface IUnsignedTransactionJSON {
        unsignedTransactionJSON?: string;
    }
    interface ITransactionJSON {
        transactionJSON?: string;
    }
    interface ITransaction {
        transaction: string;
    }
    interface ITransactionHash {
        fullHash?: string;
    }
    interface ITransactionInfo extends ITransaction, ITransactionHash {
    }
    interface IVerify {
        verify: boolean;
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
    interface IUnsignedTransactionBytes {
        unsignedTransactionBytes: string;
    }
    interface ISignatureHash {
        signatureHash: string;
    }
    interface IPoll {
        poll: number;
    }
    interface IAccountBlockIds extends IAccount, ITimestamp {
    }
    interface IForging extends ISecretPhrase {
    }
    interface IAccountInfo extends ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        name: string;
        description: string;
    }
    interface IAccountGuaranteed extends IAccount, IConfirmations {
    }
    interface IAliases extends IAccount, ITimestamp {
    }
    interface IAccountCurrentOrderIds extends IAsset, IAccount {
    }
    interface IAccountCurrentBuyOrderIds extends IAccountCurrentOrderIds {
    }
    interface IAccountCurrentAskOrderIds extends IAccountCurrentOrderIds {
    }
    interface IAccountId extends IAccount, IPublicKey {
    }
    interface IAccountTransactions extends IAccount, ITimestamp, ISubtype, ILastIndex, IConfirmations {
    }
    interface IAccountTransactionIds extends IAccountTransactions {
    }
    interface IBroadcastTransaction extends ITransactionBytes, ITransactionJSON {
    }
    interface IParseTransaction extends IBroadcastTransaction {
    }
    interface IBuyAlias extends IAlias, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IBroadcast, IReferencedTransaction, IEncryptedMessageToSelf, IMessageEncryptToSelf, IRecipientPublicKey {
    }
    interface ISetAlias extends ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IEncryptedMessageToSelf, IMessageEncryptToSelf, IRecipientPublicKey {
        aliasName: string;
        aliasURI: string;
    }
    interface ISellAlias extends IAlias, IRecipient, IPriceNQT, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
    }
    interface ICalculateHash extends IUnsignedTransactionBytes, ISignatureHash {
    }
    interface IDecodeHallmark {
        hallmark: string;
    }
    interface ICancelOrder extends IOrder, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
    }
    interface ICancelAskOrder extends ICancelOrder {
    }
    interface ICancelBidOrder extends ICancelOrder {
    }
    interface IAskOrder extends IOrder {
    }
    interface IBidOrder extends IOrder {
    }
    interface IOrderIds extends IAsset, ILimit {
    }
    interface IBidOrderIds extends IOrderIds {
    }
    interface IAskOrderIds extends IOrderIds {
    }
    interface IAskOrders extends IOrderIds {
    }
    interface IBidOrders extends IOrderIds {
    }
    interface IPollCast extends IPoll, ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        vote1?: any;
        vote2?: any;
        vote3?: any;
    }
    interface ICreatePoll extends ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
        name: string;
        description: string;
        minNumberOfOptions: number;
        maxNumberOfOptions: number;
        optionsAreBinary: boolean;
        option1: any;
        option2?: any;
        option3?: any;
    }
    interface IDecryptFrom extends ISecretPhrase, IAccount {
        data: any;
        nonce: any;
        decryptedMessageIsText: boolean;
    }
    interface IEncryptTo extends IRecipient, ISecretPhrase, IMessage {
    }
    interface IDGSBase extends ISecretPhrase, IPublicKey, IFeeNQT, IDeadline, IReferencedTransaction, IBroadcast, IMessageEncryptToSelf, IEncryptedMessageToSelf, IRecipientPublicKey {
    }
    interface IDGSGoods {
        goods: any;
    }
    interface IDGSSellerGoods extends IDGSSeller, ILastIndex {
        inStockOnly?: boolean;
    }
    interface IDGSPendingPurchases extends IDGSSeller, ILastIndex {
    }
    interface IDGSDelist extends IDGSBase, IDGSGoods {
    }
    interface IDGSList extends IDGSBase, IPriceNQT {
        name: string;
        description: string;
        tags: any;
        quantity: number;
    }
    interface IDGSPurchase {
        purchase: any;
    }
    interface IDGSDelivery extends IDGSBase {
        discountNQT: number;
        goodsToEncrypt: any;
        goodsIsText: boolean;
        goodsData: any;
        goodsNonce: any;
    }
    interface IDGSFeedback extends IDGSBase, IDGSPurchase {
    }
    interface IDGSPriceChange extends IDGSBase, IDGSGoods, IPriceNQT {
    }
    interface IDGSSetPurchase extends IDGSBase, IDGSGoods, IPriceNQT {
        quantity: number;
        deliveryDeadlineTimestamp: any;
    }
    interface IDGSPurchases extends IDGSSeller, IDGSBuyer, ILastIndex {
        completed?: boolean;
    }
    interface IDGSQuantityChange extends IDGSBase, IDGSGoods {
        deltaQuantity: any;
    }
    interface IDGSRefund extends IDGSBase, IDGSPurchase {
        refundNQT: number;
    }
    interface IMarkHost extends ISecretPhrase {
        data?: any;
        host: string;
        height?: number;
    }
    class API {
        public config: _req.Options;
        public request: typeof _req;
        private _clean(obj);
        private _call(name, qs);
        /**
        * Broadcasts a transaction to the network
        */
        public broadcastTransaction(req: IBroadcastTransaction): Promise<IResponse>;
        public broadcastTransaction(req: IBroadcastTransaction, callback: ICallback): void;
        /**
        * Buy an alias
        */
        public buyAlias(req: IBuyAlias): Promise<IResponse>;
        public buyAlias(req: IBuyAlias, callback: ICallback): void;
        /**
        * Calculates the full hash of a transaction
        */
        public calculateFullHash(req: ICalculateHash): Promise<IResponse>;
        public calculateFullHash(req: ICalculateHash, callback: ICallback): void;
        /**
        * Issue a cancel for an existing order
        */
        public cancelAskOrder(req: ICancelAskOrder): Promise<IResponse>;
        public cancelAskOrder(req: ICancelAskOrder, callback: ICallback): void;
        /**
        * Issue a cancel for an existing order
        */
        public cancelBidOrder(req: ICancelBidOrder): Promise<IResponse>;
        public cancelBidOrder(req: ICancelBidOrder, callback: ICallback): void;
        /**
        * Cast your vote on a poll
        */
        public castVote(req: IPollCast): Promise<IResponse>;
        public castVote(req: IPollCast, callback: ICallback): void;
        /**
        * Create a new poll
        */
        public createPoll(req: ICreatePoll): Promise<IResponse>;
        public createPoll(req: ICreatePoll, callback: ICallback): void;
        /**
        * Decodes a node hallmark.
        */
        public decodeHallmark(req: IDecodeHallmark): Promise<IResponse>;
        public decodeHallmark(req: IDecodeHallmark, callback: ICallback): void;
        /**
        * Decodes an authorization token. This is used to authorize an account on a
        * specific web site without requiring the transmission of a secret passphrase.
        */
        public decodeToken(req: IToken): Promise<IResponse>;
        public decodeToken(req: IToken, callback: ICallback): void;
        public decryptFrom(req: IDecryptFrom): Promise<IResponse>;
        public decryptFrom(req: IDecryptFrom, callback: ICallback): void;
        public dgsDelisting(req: IDGSDelist): Promise<IResponse>;
        public dgsDelisting(req: IDGSDelist, callback: ICallback): void;
        public dgsDelivery(req: IDGSDelivery): Promise<IResponse>;
        public dgsDelivery(req: IDGSDelivery, callback: ICallback): void;
        public dgsFeedback(req: IDGSFeedback): Promise<IResponse>;
        public dgsFeedback(req: IDGSFeedback, callback: ICallback): void;
        public dgsListing(req: IDGSList): Promise<IResponse>;
        public dgsListing(req: IDGSList, callback: ICallback): void;
        public dgsPriceChange(req: IDGSPriceChange): Promise<IResponse>;
        public dgsPriceChange(req: IDGSPriceChange, callback: ICallback): void;
        public dgsPurchase(req: IDGSSetPurchase): Promise<IResponse>;
        public dgsPurchase(req: IDGSSetPurchase, callback: ICallback): void;
        public dgsQuantityChange(req: IDGSQuantityChange): Promise<IResponse>;
        public dgsQuantityChange(req: IDGSQuantityChange, callback: ICallback): void;
        public dgsRefund(req: IDGSRefund): Promise<IResponse>;
        public dgsRefund(req: IDGSRefund, callback: ICallback): void;
        public encryptTo(req: IEncryptTo): Promise<IResponse>;
        public encryptTo(req: IEncryptTo, callback: ICallback): void;
        /**
        * Creates an authorization token. Tokens can be used to authorize an
        * account on a specific web site without requiring the transmission of a secret passphrase.
        */
        public generateToken(req: IToken): Promise<IResponse>;
        public generateToken(req: IToken, callback: ICallback): void;
        /**
        * Retrieves the account information associated with a supplied account number.
        */
        public getAccount(req: IAccount): Promise<IResponse>;
        public getAccount(req: IAccount, callback: ICallback): void;
        /**
        * Retrieves the blockIDs for all blocks generated by a supplied account. Results are sorted chronologically.
        */
        public getAccountBlockIds(req: IAccountBlockIds): Promise<IResponse>;
        public getAccountBlockIds(req: IAccountBlockIds, callback: ICallback): void;
        /**
        * Obtain current order IDs for bid or ask orders for a specific account,
        * optionally filtered by an an assetID. Implemented in version 0.5.9.
        */
        public getAccountCurrentAskOrderIds(req: IAccountCurrentAskOrderIds): Promise<IResponse>;
        public getAccountCurrentAskOrderIds(req: IAccountCurrentAskOrderIds, callback: ICallback): void;
        /**
        * Obtain current order IDs for bid or ask orders for a specific account,
        * optionally filtered by an an assetID. Implemented in version 0.5.9.
        */
        public getAccountCurrentBidOrderIds(req: IAccountCurrentBuyOrderIds): Promise<IResponse>;
        public getAccountCurrentBidOrderIds(req: IAccountCurrentBuyOrderIds, callback: ICallback): void;
        /**
        * Retrieves the account number associated with a supplied passphrase.
        */
        public getAccountId(req: IAccountId): Promise<IResponse>;
        public getAccountId(req: IAccountId, callback: ICallback): void;
        public getAccountPublicKey(req: IAccount): Promise<IResponse>;
        public getAccountPublicKey(req: IAccount, callback: ICallback): void;
        public getAccountTransactionIds(req: IAccountTransactionIds): Promise<IResponse>;
        public getAccountTransactionIds(req: IAccountTransactionIds, callback: ICallback): void;
        public getAccountTransactions(req: IAccountTransactions): Promise<IResponse>;
        public getAccountTransactions(req: IAccountTransactions, callback: ICallback): void;
        public getAlias(req: IAlias): Promise<IResponse>;
        public getAlias(req: IAlias, callback: ICallback): void;
        public getAliases(req: IAliases): Promise<IResponse>;
        public getAliases(req: IAliases, callback: ICallback): void;
        /**
        * Obtain information associated with all the assets in the exchange
        */
        public getAllAssets(): Promise<IResponse>;
        public getAllAssets(req: IRequest): Promise<IResponse>;
        public getAllAssets(req: IRequest, callback: ICallback): void;
        /**
        * getAllOpenOrders
        */
        public getAllOpenOrders(): Promise<IResponse>;
        public getAllOpenOrders(req: IRequest): Promise<IResponse>;
        public getAllOpenOrders(req: IRequest, callback: ICallback): void;
        public getAllTrades(req: ITimestamp): Promise<IResponse>;
        public getAllTrades(req: ITimestamp, callback: ICallback): void;
        public getAskOrder(req: IAskOrder): Promise<IResponse>;
        public getAskOrder(req: IAskOrder, callback: ICallback): void;
        public getAskOrderIds(req: IAskOrderIds): Promise<IResponse>;
        public getAskOrderIds(req: IAskOrderIds, callback: ICallback): void;
        public getAskOrders(req: IAskOrders): Promise<IResponse>;
        public getAskOrders(req: IAskOrders, callback: ICallback): void;
        public getAsset(req: IAsset): Promise<IResponse>;
        public getAsset(req: IAsset, callback: ICallback): void;
        public getAssetIds(): Promise<IResponse>;
        public getAssetIds(req: IRequest): Promise<IResponse>;
        public getAssetIds(req: IRequest, callback: ICallback): void;
        public getAssets(req: IAssets): Promise<IResponse>;
        public getAssets(req: IAssets, callback: ICallback): void;
        public getAssetsByIssuer(req: IAssetsByIssuer): Promise<IResponse>;
        public getAssetsByIssuer(req: IAssetsByIssuer, callback: ICallback): void;
        public getBalance(req: IAccount): Promise<IResponse>;
        public getBalance(req: IAccount, callback: ICallback): void;
        public getBidOrder(req: IBidOrder): Promise<IResponse>;
        public getBidOrder(req: IBidOrder, callback: ICallback): void;
        public getBidOrderIds(req: IBidOrderIds): Promise<IResponse>;
        public getBidOrderIds(req: IBidOrderIds, callback: ICallback): void;
        public getBidOrders(req: IBidOrders): Promise<IResponse>;
        public getBidOrders(req: IBidOrders, callback: ICallback): void;
        public getBlock(req: IBlock): Promise<IResponse>;
        public getBlock(req: IBlock, callback: ICallback): void;
        public getBlockId(req: IBlockHeight): Promise<IResponse>;
        public getBlockId(req: IBlockHeight, callback: ICallback): void;
        public getBlockchainStatus(): Promise<IResponse>;
        public getBlockchainStatus(req: IRequest): Promise<IResponse>;
        public getBlockchainStatus(req: IRequest, callback: ICallback): void;
        public getConstants(): Promise<IResponse>;
        public getConstants(req: IRequest): Promise<IResponse>;
        public getConstants(req: IRequest, callback: ICallback): void;
        public getDGSGood(req: IDGSGoods): Promise<IResponse>;
        public getDGSGood(req: IDGSGoods, callback: ICallback): void;
        public getDGSGoods(req: IDGSSellerGoods): Promise<IResponse>;
        public getDGSGoods(req: IDGSSellerGoods, callback: ICallback): void;
        public getDGSPendingPurchases(req: IDGSPendingPurchases): Promise<IResponse>;
        public getDGSPendingPurchases(req: IDGSPendingPurchases, callback: ICallback): void;
        public getDGSPurchase(req: IDGSPurchase): Promise<IResponse>;
        public getDGSPurchase(req: IDGSPurchase, callback: ICallback): void;
        public getDGSPurchases(req: IDGSPurchases): Promise<IResponse>;
        public getDGSPurchases(req: IDGSPurchases, callback: ICallback): void;
        public getForging(req: IForging): Promise<IResponse>;
        public getForging(req: IForging, callback: ICallback): void;
        public getGuaranteedBalance(req: IAccountGuaranteed): Promise<IResponse>;
        public getGuaranteedBalance(req: IAccountGuaranteed, callback: ICallback): void;
        public getMyInfo(): Promise<IResponse>;
        public getMyInfo(req: IRequest): Promise<IResponse>;
        public getMyInfo(req: IRequest, callback: ICallback): void;
        public getNextBlockGenerators(): Promise<IResponse>;
        public getNextBlockGenerators(req: IRequest): Promise<IResponse>;
        public getNextBlockGenerators(req: IRequest, callback: ICallback): void;
        public getPeer(req: IPeer): Promise<IResponse>;
        public getPeer(req: IPeer, callback: ICallback): void;
        public getPeers(req: IPeers): Promise<IResponse>;
        public getPeers(req: IPeers, callback: ICallback): void;
        public getPoll(req: IPoll): Promise<IResponse>;
        public getPoll(req: IPoll, callback: ICallback): void;
        public getPollIds(): Promise<IResponse>;
        public getPollIds(req: IRequest): Promise<IResponse>;
        public getPollIds(req: IRequest, callback: ICallback): void;
        public getState(): Promise<IResponse>;
        public getState(req: IRequest): Promise<IResponse>;
        public getState(req: IRequest, callback: ICallback): void;
        public getTime(): Promise<IResponse>;
        public getTime(req: IRequest): Promise<IResponse>;
        public getTime(req: IRequest, callback: ICallback): void;
        public getTrades(req: ITrades): Promise<IResponse>;
        public getTrades(req: ITrades, callback: ICallback): void;
        public getTransaction(req: ITransactionInfo): Promise<IResponse>;
        public getTransaction(req: ITransactionInfo, callback: ICallback): void;
        public getTransactionBytes(req: ITransaction): Promise<IResponse>;
        public getTransactionBytes(req: ITransaction, callback: ICallback): void;
        public getUnconfirmedTransactionIds(req: IAccount): Promise<IResponse>;
        public getUnconfirmedTransactionIds(req: IAccount, callback: ICallback): void;
        public getUnconfirmedTransactions(req: IAccount): Promise<IResponse>;
        public getUnconfirmedTransactions(req: IAccount, callback: ICallback): void;
        public issueAsset(req: IIssueAsset): Promise<IResponse>;
        public issueAsset(req: IIssueAsset, callback: ICallback): void;
        public leaseBalance(req: ILeaseBalance): Promise<IResponse>;
        public leaseBalance(req: ILeaseBalance, callback: ICallback): void;
        public markHost(req: IMarkHost): Promise<IResponse>;
        public markHost(req: IMarkHost, callback: ICallback): void;
        public parseTransaction(req: IParseTransaction): Promise<IResponse>;
        public parseTransaction(req: IParseTransaction, callback: ICallback): void;
        public placeAskOrder(req: IPlaceAskOrder): Promise<IResponse>;
        public placeAskOrder(req: IPlaceAskOrder, callback: ICallback): void;
        public placeBidOrder(req: IPlaceBidOrder): Promise<IResponse>;
        public placeBidOrder(req: IPlaceBidOrder, callback: ICallback): void;
        public readMessage(req: IReadMessage): Promise<IResponse>;
        public readMessage(req: IReadMessage, callback: ICallback): void;
        public rsConvert(req: IAccount): Promise<IResponse>;
        public rsConvert(req: IAccount, callback: ICallback): void;
        public sellAlias(req: ISellAlias): Promise<IResponse>;
        public sellAlias(req: ISellAlias, callback: ICallback): void;
        public sendMessage(req: ISendMessage): Promise<IResponse>;
        public sendMessage(req: ISendMessage, callback: ICallback): void;
        public sendMoney(req: ISendMoney): Promise<IResponse>;
        public sendMoney(req: ISendMoney, callback: ICallback): void;
        public setAccountInfo(req: IAccountInfo): Promise<IResponse>;
        public setAccountInfo(req: IAccountInfo, callback: ICallback): void;
        public setAlias(req: ISetAlias): Promise<IResponse>;
        public setAlias(req: ISetAlias, callback: ICallback): void;
        public signTransaction(req: ISignTransaction): Promise<IResponse>;
        public signTransaction(req: ISignTransaction, callback: ICallback): void;
        public startForging(req: ISecretPhrase): Promise<IResponse>;
        public startForging(req: ISecretPhrase, callback: ICallback): void;
        public stopForging(req: ISecretPhrase): Promise<IResponse>;
        public stopForging(req: ISecretPhrase, callback: ICallback): void;
        public transferAsset(req: ITransferAsset): Promise<IResponse>;
        public transferAsset(req: ITransferAsset, callback: ICallback): void;
        constructor(endpoint: string);
    }
}
export = Nxt;
