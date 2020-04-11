const ChatComponents = ( function() { // eslint-disable-line no-unused-vars

  /**
   * Components for Chat Plugin
   *
   */

  'use strict';

  function topcontent() {
    return V.sN( {
      t: 'h2',
      c: 'font-bold fs-l leading-snug txt-center w-screen pxy',
      h: 'Chat with Everyone'
    } );
  }

  function message( msg ) {
    const width = msg.msg.length > 70 ? '300px' : msg.msg.length < 30 ? '220px' : '245px';
    const background = msg.sender == 'Me' ? msg.msg.match( 'You\'ve sent' ) ? '#c0d6b9' : '#e0e7eb' : '#f7f7f8';
    const style = msg.sender == 'Me' ? { 'margin-left': 'auto', 'width': width } : { 'margin-right': 'auto', 'width': width };
    return V.castNode( {
      tag: 'li',
      classes: 'w-screen pxy',
      y: style,
      html: '<message style="background:' + background + '" class="message__container flex card-shadow rounded bkg-white pxy">' +
                  '<div class="font-medium pxy">' +
                    ( msg.sender == 'Me' ? '' : '<p>' + msg.sender + '</p>' ) +
                    '<p>' + msg.msg + '</p>' +
                  '</div>' +
              '</message>'
    } );
  }

  function messageForm() {
    return V.sN( {
      t: 'div',
      s: {
        messagebox: {
          'bottom': '0',
          'border-top': '1px solid #e8e8ec',
          'background': '#d1d2da',
          'padding': '8px 5px'
        }
      },
      c: 'messagebox flex fixed pxy w-full bkg-white card-shadow',
    } );
  }

  function messageInput() {
    return V.sN( {
      t: 'textarea',
      // h: 'send 100 to Community #2121',
      // h: 'send Expert In Nodejs #2121 100',
      // h: 'send 2 to Community Contribution #2121 for hospital funding',
      // h: 'verify 0x3107b077b7745994cd93d85092db034ca1984d46',
      a: {
        placeholder: V.i18n( 'Send message or funds' )
      },
      s: {
        messagebox__input: {
          'height': '36px',
          'padding': '8px 15px',
          'min-width': '302px',
          'border': '1px solid #e8e8ec',
          'resize': 'none',
          'border-radius': '30px'
        }
      },
      c: 'messagebox__input mr-2'
    } );
  }

  function messageSend() {
    return V.sN( {
      t: 'button',
      s: {
        'circle-1': {
          width: '2.5rem',
          height: '2.5rem'
        }
      },
      c: 'circle-1 flex justify-center items-center rounded-full border-blackalpha bkg-white',
      h: V.getIcon( 'send' )
    } );
  }

  return {
    topcontent: topcontent,
    message: message,
    messageForm: messageForm,
    messageInput: messageInput,
    messageSend: messageSend
  };

} )();
