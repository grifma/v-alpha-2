const CanvasComponents = ( function() { // eslint-disable-line no-unused-vars

  /**
   * V Canvas Components
   *
   */

  'use strict';

  function notFound( which ) {
    return V.setNode( {
      t: 'p',
      c: 'pxy',
      h: V.i18n( 'No ' + which + ' found', 'theme' )
    } );
  }

  function background() {
    return V.setNode( {
      tag: 'background',
      id: 'background',
      classes: 'background fixed w-screen',
      setStyle: {
        background: {
          'background': 'rgba(115,182,230,1)',
          'height': 'calc(var(--screen-height) - var(--page-position-closed))',
          'z-index': -1
        }
      }
    } );
  }
  function haze() {
    return V.setNode( {
      tag: 'haze',
      classes: 'haze fixed w-screen hidden',
      setStyle: {
        haze: {
          top: 0,
          height: '45vh'
        }
      }
    } );
  }
  function feature() {
    return V.setNode( {
      tag: 'feature',
      classes: 'feature fixed w-screen hidden',
      setStyle: {
        feature: {
          top: 'var(--page-position-top-selected)',
          height: 'calc(var(--screen-width) * (9 / 16))'
        }
      }
    } );
  }
  function form() {
    return V.setNode( {
      tag: 'form',
      classes: 'plusform fixed w-screen hidden bkg-white',
      setStyle: {
        plusform: {
          'padding-top': 'var(--page-position-top-selected)',
          'height': '100%'
        }
      }
    } );
  }

  function balance() {
    return V.setNode( {
      tag: 'balance',
      classes: 'balance fixed cursor-pointer txt-anchor-mid',
      setStyle: {
        balance: {
          top: '2px',
          left: '2px'
        }
      }
    } );
  }
  function entityNav() {
    return V.setNode( {
      tag: 'entity-nav',
      classes: 'entity-nav fixed w-screen overflow-x-scroll',
      setStyle: {
        'entity-nav': {
          'padding-top': '4px',
          'padding-bottom': '8px',
          'top': 'var(--entities-nav-top)',
          'left': 'var(--entities-nav-left)'
        }
      }
    } );
  }
  function serviceNav() {
    return V.setNode( {
      tag: 'service-nav',
      classes: 'service-nav fixed w-screen overflow-x-scroll',
      setStyle: {
        'service-nav': {
          'padding-top': '4px',
          'padding-bottom': '28px',
          'top': 'var(--app-nav-top)',
          'left': 'var(--app-nav-left)'
        }
      }
    } );
  }
  function back() {
    return V.setNode( {
      tag: 'back',
      classes: 'back fixed',
      setStyle: {
        back: {
          top: 'var(--page-position-top-selected)',
          left: '11px'
        }
      },
      html: V.setNode( {
        tag: 'ul',
      } )
    } );
  }
  function interactions() {
    return V.setNode( {
      tag: 'interactions',
      classes: 'interactions fixed',
      setStyle: {
        interactions: {
          top: '11px',
          right: 0,
          width: '45%'
        }
      },
      html: V.setNode( {
        tag: 'ul',
        classes: 'flex items-center justify-end'
      } )
    } );
  }
  function handle() {
    return V.setNode( {
      tag: 'handle',
      classes: 'handle',
      setStyle: {
        handle: {
          'padding-top': '12px',
          'height': '26px',
          'display': 'block'
        }
      },
      html: V.setNode( {
        tag: 'div',
        classes: 'handle__bar rounded-full bkg-offblack',
        setStyle: {
          handle__bar: {
            'margin-left': 'auto',
            'margin-right': 'auto',
            'height': '4px',
            'width': '5%'
          }
        },
      } )
    } );
  }
  function topSlider() {
    return V.setNode( {
      tag: 'topslider'
    } );
  }

  function slider() {
    return V.castNode( {
      tag: 'slider',
      classes: 'flex overflow-x-scroll list-none'
    } );
  }

  function listings() {
    return V.setNode( {
      tag: 'listings'
    } );
  }

  function list( which ) {

    const $list = V.setNode( {
      tag: 'list',
      classes: 'flex flex-wrap content-start justify-evenly overflow-y-scroll list-none h-full',
    } );

    if ( which == 'narrow' ) {
      $list.style['max-width'] = '380px';
      $list.style.margin = '0 auto';
    }

    return $list;
  }

  function card( $cardContent ) {

    const cardLeftWidth = 25;

    return V.setNode( {
      t: 'li',
      c: 'pxy min-w-360',
      setStyle: {
        'card__top-left': {
          width: cardLeftWidth + '%',
        },
        'card__bottom-left': {
          'display': 'grid',
          'justify-items': 'center',
          'text-align': 'center',
          'width': cardLeftWidth + '%',
        },
        'card__top-right': {
          width: 100 - cardLeftWidth - 6 + '%',
        },
        'card__bottom-right': {
          width: 100 - cardLeftWidth - 6 + '%',
        },
        'card__unit': {
          width: '100%'
        }
      },
      h: V.setNode( {
        t: 'card',
        c: 'card__container flex card-shadow rounded bkg-white pxy',
        s: {
          card__container: {
            // 'height': 'var(--card-height)',
            'max-width': '360px',
            'flex-wrap': 'wrap'
          },
        },
        h: $cardContent
      } )
    } );
  }

  function header() {
    return V.setNode( {
      tag: 'header',
    } );
  }
  function page() {
    return V.setNode( {
      tag: 'page',
      classes: 'page fixed w-screen bkg-white',
      setStyle: {
        page: {
          bottom: 0,
          height: 'var(--page-position-peek)'
        }
      },
    } );
  }
  function content() {
    return V.setNode( {
      tag: 'content',
      html: V.setNode( {
        tag: 'topcontent'
      } )
    } );
  }

  return {
    notFound: notFound,
    background: background,
    haze: haze,
    feature: feature,
    form: form,
    balance: balance,
    entityNav: entityNav,
    serviceNav: serviceNav,
    back: back,
    interactions: interactions,
    handle: handle,
    topSlider: topSlider,
    slider: slider,
    listings: listings,
    list: list,
    card: card,
    header: header,
    page: page,
    content: content
  };

} )();
