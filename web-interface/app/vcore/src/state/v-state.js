const VState = ( function() { // eslint-disable-line no-unused-vars

  /**
   * V Core Module to manage the app's state
   *
   */

  'use strict';

  document.onkeyup = function( e ) {
    if ( e.ctrlKey && e.which == 83 ) {
      console.log( V.getState() );
    }
    else if ( e.ctrlKey && e.which == 65 ) {
      console.log( V.getCache() );
    }
  };

  const state = {};

  const cache = {};

  /* ================== public methods ================== */

  function getState( which = 'all' ) {
    return which == 'all' ? state : state[which];
  }

  function setState( which, data ) {

    /**
     * sync Cookies also for activeAddress and activeEntity
     *
     */

    if ( data == 'clear' ) {
      delete state[which];
      return;
    }

    if ( !state[which] ) {
      state[which] = {};
    }

    if ( typeof data == 'object' ) {
      Object.assign( state[which], data );
    }
    else {
      state[which] = data;
    }

    if ( which == 'activeAddress' ) {
      setCookie( 'last-active-address', data );
    }
    else if ( which == 'activeEntity' && data && data.private ) {
      setCookie( 'last-active-uphrase', data.private.uPhrase );
    }

  }

  function getCache( which ) {
    return which ? cache[which] : cache;
  }

  function setCache( which, data ) {
    if ( data == 'clear' ) {
      delete cache[which];
      return;
    }

    if ( !cache[which] ) {
      cache[which] = {};
    }

    if ( Array.isArray( data ) ) {
      const obj = {
        timestamp: Date.now(),
        date: new Date(),
        data: data
      };
      Object.assign( cache[which], obj );
    }
    else if ( typeof data == 'object' ) {
      Object.assign( cache[which], data );
    }
    else {
      cache[which] = data;
    }
  }

  function getNavItem( whichItem, whichNav ) {
    if ( whichItem == 'active' ) {
      // const converted = V.castCamelCase( getState( 'active' ).navItem );
      if( Array.isArray( whichNav ) ) {
        let state;
        for ( let i = 0; i < whichNav.length; i++ ) {
          const query = getState( whichNav[i] )[ getState( 'active' ).navItem ];
          if ( query ) {
            state = query;
            break;
          }
        }
        return state;
      }
      else {
        return getState( whichNav )[ getState( 'active' ).navItem ];
      }
    }
    else {
      return getState( whichNav )[ whichItem ];
    }
  }

  function setNavItem( whichNav, data ) {
    Array.isArray( data ) ? null : data = [ data ];
    data.forEach( item => {
      try {
        const maxLength = 250;
        if ( item.title.length <= maxLength ) {
          const state = getState( whichNav );
          // const key = item.path;
          if ( state && state[item.path] ) {
            throw new Error( '"' + item.path + '" already set' );
          }
          const obj = {};

          obj[item.path] = item;
          setState( whichNav, obj );
        }
        else {
          throw new Error( 'Title too long (max ' + maxLength + ', has ' + item.title.length + '): ' + item.title );
        }
      }
      catch ( e ) {
        console.error( e );
      }
    } );

  }

  function getCookie( which ) {
    // return Cookies.get( which );
    return localStorage.getItem( which );

  }

  function setCookie( which, data ) {
    // if ( data == 'clear' ) {
    //   Cookies.remove( which );
    //   return;
    // }
    // Cookies.set( which, JSON.stringify( data ) );

    if ( data == 'clear' ) {
      localStorage.removeItem( which );
      return;
    }
    localStorage.setItem( which, JSON.stringify( data ) );
  }

  /* ====================== export ====================== */

  ( () => {
    V.getState = getState;
    V.setState = setState;
    V.getCache = getCache;
    V.setCache = setCache;
    V.getNavItem = getNavItem;
    V.setNavItem = setNavItem;
    V.getCookie = getCookie;
    V.setCookie = setCookie;
  } )();

  return {
    getState: getState,
    setState: setState,
    getCache: getCache,
    setCache: setCache,
    getNavItem: getNavItem,
    setNavItem: setNavItem,
    getCookie: getCookie,
    setCookie: setCookie
  };

} )();
