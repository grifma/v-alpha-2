const Canvas = ( function() { // eslint-disable-line no-unused-vars

  /**
   * V Theme Module to initialize the app and its "canvas"
   *
   * Note: This module is loaded by V Core to INITIALIZE THE THEME
   *
   */

  'use strict';

  /* ================== private methods ================= */

  async function launchStylesheets() {

    if ( V.getSetting( 'useBuilds' ) ) {
      await Promise.all( [
        V.setStylesheet( '/css/builds/v.min.css' )
      ] );
      console.log( '*** css builds loaded ***' );
    }
    else {
      await Promise.all( [
        V.setStylesheet( '/css/src/0_0_variables.css' ),
        V.setStylesheet( '/css/src/1_0_reset-normalize.css' ),
        V.setStylesheet( '/css/src/1_1_reset.css' ),
        V.setStylesheet( '/css/src/2_0_typography.css' ),
        V.setStylesheet( '/css/src/2_2_color.css' ),
        V.setStylesheet( '/css/src/3_0_utilities.css' ),
        V.setStylesheet( '/css/src/4_0_components.css' ),
        V.setStylesheet( '/css/src/8_0_overrides.css' ),
        V.setStylesheet( '/css/src/9_0_leaflet.css' )
      ] );
      console.log( '*** css source files loaded ***' );
    }
  }

  async function launchScripts() {

    if( !V.getSetting( 'useBuilds' ) ) {
      await Promise.all( [
        V.setScript( '/theme/src/canvas/components.js' ),
        V.setScript( '/theme/src/canvas/background.js' ),
        V.setScript( '/theme/src/canvas/haze.js' ),
        V.setScript( '/theme/src/canvas/feature.js' ),
        V.setScript( '/theme/src/canvas/header.js' ),
        V.setScript( '/theme/src/canvas/page.js' ),
        V.setScript( '/theme/src/modal/components.js' ),
        V.setScript( '/theme/src/modal/modal.js' ),
        V.setScript( '/theme/src/interaction/components.js' ),
        V.setScript( '/theme/src/interaction/button.js' ),
        V.setScript( '/theme/src/interaction/form.js' ),
        V.setScript( '/theme/src/interaction/join.js' ),
        V.setScript( '/theme/src/navigation/components.js' ),
        V.setScript( '/theme/src/navigation/navigation.js' ),
      ] );
      console.log( '*** theme source scripts loaded ***' );
    }

    if( V.getSetting( 'useBuilds' ) ) {
      await Promise.all( [
        V.setScript( '/plugins/builds/vplugins.min.js' ),
      ] );
      console.log( '*** plugins builds loaded ***' );
    }
    else {
      await Promise.all( [
        V.setScript( '/plugins/src/account/components.js' ),
        V.setScript( '/plugins/src/account/account.js' ),
        V.setScript( '/plugins/src/entity/components.js' ),
        V.setScript( '/plugins/src/entity/editable.js' ),
        V.setScript( '/plugins/src/entity/display.js' ),
        V.setScript( '/plugins/src/entity/settings.js' ),
        V.setScript( '/plugins/src/entity/entitylist.js' ),
        V.setScript( '/plugins/src/chat/components.js' ),
        V.setScript( '/plugins/src/chat/chat.js' ),
        V.setScript( '/plugins/src/map/map.js' ),
        V.setScript( '/plugins/src/google/google.js' ),
        V.setScript( '/plugins/src/data/components.js' ),
        V.setScript( '/plugins/src/data/data.js' ),
        V.setScript( '/plugins/src/marketplace/components.js' ),
        V.setScript( '/plugins/src/marketplace/marketplace.js' ),
        V.setScript( '/plugins/src/media/components.js' ),
        V.setScript( '/plugins/src/media/media.js' ),
      ] );
      console.log( '*** plugins source scripts loaded ***' );
    }

    V.setNode( 'body', '' );

    if( V.getSetting( 'demoContent' ) ) {
      await Promise.all( [
        V.setScript( '/assets/demo-content/demo-content.js' )
      ] );
      console.log( '*** demo content loaded ***' );
    }
  }

  function setFont() {

    // TODO
    // ['IBMPlexSans-Regular', 'IBMPlexSans-Medium', 'IBMPlexSans-Bold'].forEach( font => {
    //   V.sN( 'head', {
    //     t: 'link',
    //     a: {
    //       rel: 'preload',
    //       as: 'font',
    //       crossorigin: 'anonymous',
    //       href: 'assets/font/' + font + '.ttf',
    //     }
    //   } );
    // } );

    V.setStyle( 'font-styles', {
      '@font-face': {
        'font-family': 'IBM Plex Regular',
        'src': 'url(/assets/font/IBMPlexSans-Regular.ttf) format(\'truetype\')',
        'font-display': 'fallback',
        'unicode-range': 'U+000-024F'
      },
      '@font-face-2': {
        'font-family': 'IBM Plex Medium',
        'src': 'url(/assets/font/IBMPlexSans-Medium.ttf) format(\'truetype\')',
        'font-display': 'fallback',
        'unicode-range': 'U+000-024F'
      },
      '@font-face-3': {
        'font-family': 'IBM Plex Bold',
        'src': 'url(/assets/font/IBMPlexSans-Bold.ttf) format(\'truetype\')',
        'font-display': 'fallback',
        'unicode-range': 'U+000-024F'
      }
    } );
  }

  function setState() {

    V.setState( 'screen', {
      height: Number( window.innerHeight ),
      width: Number( window.innerWidth ),
      brandPrimary: V.getCss( '--brandPrimary' ),
      brandSecondary: V.getCss( '--brandSecondary' ),
      buttonBkg: V.getCss( '--buttonBkg' ),
    } );
    V.setState( 'active', {} );
    V.setState( 'page', {
      height: V.getCss( '--page-position-peek' ),
      top: V.setPipe( V.getCss, V.castRemToPixel )( '--page-position-top' ),
      topSelected: V.setPipe( V.getCss, V.castRemToPixel )( '--page-position-top-selected' ),
      peek: V.getCss( '--page-position-peek' ),
      closed: V.getCss( '--page-position-closed' ),
      detach: V.setPipe( V.getCss, V.castRemToPixel )( '--desktop-page-detach' )
    } );

    /* calculate page size for the feature and top position according to screen dimensions */
    const state = V.getState();
    V.setState( 'page', { topCalc: state.screen.height - state.page.top - state.page.detach * 1.5 } );
    V.setState( 'page', { topSelectedCalc: state.screen.height - state.page.topSelected - state.page.detach * 1.5 } );
    V.setState( 'page', { featureCalc:
      Math.floor(
        state.screen.height
      - state.page.topSelected
      // - state.page.detach
      - ( state.screen.width < 600 ? state.screen.width : 600 ) * 9/16
      )
    } );
    V.setState( 'page', { featureDimensions: {
      width: state.screen.width < 600 ? state.screen.width : 495,
      height: Math.floor(
        ( state.screen.width < 600 ? state.screen.width : 495 ) * 9/16
      )
    }
    } );

    V.setState( 'header', {

      isHazed: false,

      serviceNavTop: V.setPipe( V.getCss, V.castRemToPixel, Number )( '--service-nav-top' ),
      serviceNavLeft: V.getCss( '--service-nav-left' ),

      entityNavTop: V.getCss( '--entity-nav-top' ),
      entityNavLeft: V.getCss( '--entity-nav-left' ),

    } );
  }

  function setCss() {

    /* make screen size available to CSS */
    document.documentElement.style.setProperty( '--screen-height', `${ window.innerHeight }px` );
    document.documentElement.style.setProperty( '--screen-width', `${ window.innerWidth }px` );

  }

  function setWindow() {

    function refresh() {
      location.reload();
    }

    // window.onresize = function() {
    //   V.setNode( 'body', 'clear' );
    //   clearTimeout( V.getState( 'throttle' ) );
    //   V.setState( 'throttle', setTimeout( refresh, 200 ) );
    // };

  }

  function presenter( historyState ) {
    return Promise.resolve( historyState );
  }

  function view(
    historyState,
    path = historyState ? historyState.path : ''
  ) {

    /**
     * Canvas view renders on initial page load, reload and history change
     *
     */

    setNavStates(); // if !serviceNav

    initCanvas(); // if !background

    returningUser(); // if !activeEntity

    V.castRoute( path )
      .then( (
        x,
        status = x.status,
        which = x.data[0]
      ) => {
        if ( ['home'].includes( status ) ) {
          Marketplace.draw();
        }
        else if ( ['market', 'market category'].includes( status ) ) {
          Marketplace.draw( which );
        }
        else if ( ['media', 'media category'].includes( status ) ) {
          Media.draw( which );
        }
        else if ( ['data'].includes( status ) ) {
          Data.draw( which );
        }
        else if ( ['user profile'].includes( status ) ) {
          User.draw( which );
        }
        else if ( ['user account'].includes( status ) ) {
          Account.draw( which );
        }
        else if ( ['user entities'].includes( status ) ) {
          EntityList.draw( which );
        }
        else if ( ['user settings'].includes( status ) ) {
          Settings.draw( which );
        }
        else if ( ['chat everyone'].includes( status ) ) {
          Chat.draw( which );
        }
        else if ( ['profile'].includes( status ) ) {
          Profile.draw( which );
        }

      } );

  }

  function setNavStates() {
    if( !V.getState( 'serviceNav' ) ) {
      Chat.launch(); // sets navItem & sets socket.on
      Data.launch(); // sets navItem
      Marketplace.launch(); // sets navItem
      Media.launch(); // sets navItem
      User.launch(); // sets navItem
    }

    if ( V.getSetting( 'demoContent' ) ) {
      ( async () => {
        for ( let i = 0; i < DemoContent.mongoArr.length; i++ ) {
          await V.setEntity( DemoContent.mongoArr[i] );
        }
      } )();
    }
  }

  function initCanvas() {
    if( !V.getNode( 'background' ) ) {
      Background.launch(); // sets node
      Haze.launch(); // sets node
      Feature.launch(); // sets node
      Header.launch(); // sets nodes
      Button.launch(); // sets nodes: hidden buttons
      Page.launch(); //  sets nodes: page elements and adds flick and click handlers for sliding
    }
  }

  function returningUser() {
    if( !V.getState( 'activeEntity' ) ) {
      const returningWallet = V.getCookie( 'last-active-address' );
      const returningUphrase = V.getCookie( 'last-active-uphrase' );

      if ( returningWallet ) {
        Join.draw( 'authenticate' );
      }
      else if ( returningUphrase ) {
        ( async () => {
          const returningEntity = await V.getEntity( V.castJson( returningUphrase ) );
          V.setState( 'activeEntity', returningEntity.data[0] );
          Join.draw( 'new entity was set up' );
        } )();
      }
      else {
        Join.launch(); // sets node: join button
      }
    }
  }

  /* ============ public methods and exports ============ */

  async function launch() {

    await launchStylesheets();
    await launchScripts();

    V.setPipe(
      setState,
      setWindow,
      setCss,
      setFont,
    )();

  }

  function draw( historyState ) {
    presenter( historyState ).then( historyState => { view( historyState ) } );
  }

  return {
    launch: launch,
    draw: draw
  };

} )();
