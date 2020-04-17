const VSymbol = ( function() { // eslint-disable-line no-unused-vars

  /**
   * V Symbol Module to access Symbol chains
   *
   */

  'use strict';

  const Symbol = require( '/node_modules/symbol-sdk' ); // eslint-disable-line global-require
  const network = V.getNetwork( V.getNetwork( 'choice' ) );
  const repositoryFactory = new Symbol.RepositoryFactoryHttp( network.rpc );
  const accountHttp = repositoryFactory.createAccountRepository();
  const transactionHttp = repositoryFactory.createTransactionRepository();

  const divisibility = V.getSetting( 'tokenDivisibility' );

  /* ================== private methods ================= */

  /* ================== public methods  ================= */

  function setActiveAddress() {

    const account = Symbol.Account.generateNewAccount( Symbol.NetworkType[network.type] );
    // console.log( 'Your new account address is:', account.address.pretty(), 'and its private key is:', account.privateKey );
    return {
      success: true,
      status: 'Symbol credentials created',
      data: [ {
        address: account.address.pretty(),
        privateKey: account.privateKey
      } ]
    };
  }

  async function getAddressState(
    which = V.getState( 'activeAddress' )
  ) {

    const address = Symbol.Address.createFromRawAddress( which );

    const state = await accountHttp.getAccountInfo( address ).toPromise();
    console.log( state );

    const bal = state.mosaics.map( m => {
      const uInt = new Symbol.UInt64( [m.amount.lower, m.amount.higher] );
      const convert = uInt.compact() / Math.pow( 10, divisibility );
      return convert;
    } );

    if ( state.address ) {
      return {
        success: true,
        status: 'address state retrieved',
        ledger: 'Symbol',
        data: [{
          tokenBalance: bal,
          liveBalance: bal,
        }]
      };
    }
    else {
      return {
        success: false,
        status: 'could not retrieve address state',
        ledger: 'Symbol',
      };
    }

  }

  async function getAddressHistory(
    which = V.getState( 'activeAddress' )
  ) {

    const address = Symbol.Address.createFromRawAddress( which );

    // Page size between 10 and 100
    const pageSize = 10;
    const queryParams = new Symbol.QueryParams( { pageSize } );

    const transfers = await accountHttp.getAccountTransactions( address, queryParams ).toPromise();
    console.log( transfers );

    const filteredTransfers = transfers.map( ( tx ) => {
      const txData = {};

      txData.amount = tx.mosaics.map( m => {
        const uInt = new Symbol.UInt64( [m.amount.lower, m.amount.higher] );
        const convert = uInt.compact() / Math.pow( 10, divisibility );
        return convert;
      } );

      txData.fromAddress = '';
      txData.toAddress = tx.recipientAddress.address;

      txData.txType = '';

      txData.block = ( function( tx ) {
        const blk = tx.transactionInfo.height;
        const uInt = new Symbol.UInt64( [blk.lower, blk.higher] );
        const convert = uInt.compact();
        return convert;
      } )( tx );

      txData.logIndex = tx.transactionInfo.index;
      txData.hash = tx.transactionInfo.hash;

      txData.message = ( function( tx ) {
        // TODO
        return '';
      } )( tx );

      // console.log( txData );

      return txData;

    } );

    if ( transfers.length ) {
      return {
        success: true,
        status: 'transactions retrieved',
        ledger: 'Symbol',
        data: [ filteredTransfers ]
      };
    }
    else {
      return {
        success: false,
        status: 'no transfers',
        ledger: 'Symbol',
      };
    }

  }

  function setMosaicTransaction( data ) {

    // 1. Define the TransferTransaction
    console.log( data );

    const recipientAddress = Symbol.Address.createFromRawAddress( data.recipientAddress );
    const networkType = Symbol.NetworkType[network.type];
    const networkCurrencyMosaicId = new Symbol.MosaicId( network.mosaicId );

    const transferTransaction = Symbol.TransferTransaction.create(
      Symbol.Deadline.create(),
      recipientAddress,
      [ new Symbol.Mosaic( networkCurrencyMosaicId, Symbol.UInt64.fromUint( 10 * Math.pow( 10, divisibility ) ) ) ],
      Symbol.PlainMessage.create( data.reference ),
      networkType,
      Symbol.UInt64.fromUint( data.amount * divisibility )
    );
    console.log( transferTransaction );

    // 2. Sign the transaction

    const account = Symbol.Account.createFromPrivateKey( data.signature, networkType );
    const signedTransaction = account.sign( transferTransaction, network.generationHash );

    console.log( signedTransaction );

    // 3. Announce the transaction to the network

    console.log( transactionHttp );

    transactionHttp
      .announce( signedTransaction )
      .subscribe( ( x ) => {
        Modal.draw( 'transaction sent' );
        return console.log( x );
      }, ( err ) => {
        return console.error( err );
      } );

  }

  /* ====================== export  ===================== */

  ( () => {
    V.setActiveAddress = setActiveAddress;
    V.getAddressState = getAddressState;
    V.setMosaicTransaction = setMosaicTransaction;
    V.getAddressHistory = getAddressHistory;
  } )();

  return {
    setActiveAddress: setActiveAddress,
    getAddressState: getAddressState,
    setMosaicTransaction: setMosaicTransaction,
    getAddressHistory: getAddressHistory
  };

} )();
