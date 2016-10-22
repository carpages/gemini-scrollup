/**
 * @fileoverview

A Gemini plugin that adds a scroll-to-top button when the user starts scrolling
up.

### Notes
- Requires an include to ``scrollup.scss`` in your Gemini build

 *
 * @namespace gemini.scrollup
 * @copyright Carpages.ca 2014
 * @author Matt Rose <matt@mattrose.ca>
 *
 * @requires gemini
 *
 * @prop {string} buttonID {@link gemini.scrollup#buttonID}
 * @prop {string} buttonClass {@link gemini.scrollup#buttonClass}
 * @prop {string} buttonText {@link gemini.scrollup#buttonText}
 * @prop {integer} scrollDistance {@link gemini.scrollup#scrollDistance}
 * @prop {integer} scrollSpeed {@link gemini.scrollup#scrollSpeed}
 * @prop {integer} animationSpeed {@link gemini.scrollup#animationSpeed}
 * @prop {integer} throttle {@link gemini.scrollup#throttle}
 *
 * @example
  $.gemini.scrollup({
    buttonClass: 'scrollup  scrollup--custom',
    scrollDistance: 500
  });
 */

( function( factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define([ 'gemini' ], factory );
  } else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    module.exports = factory(
      require( 'gemini' )
    );
  } else {
    // Browser globals
    factory( G );
  }
}( function( $ ) {
  var _ = $._;

  // Make an object to be used by both $.scrollUp
  $.scrollup = function( options ) {
    var plugin = {
      settings: $.extend({}, {
        /**
         * The id of the scroll-to-top button
         *
         * @name gemini.scrollup#buttonID
         * @type string
         * @default 'js-scrollup-button'
         */
        buttonID:       'js-scrollup-button',
        /**
         * The class of the scroll-to-top button
         *
         * @name gemini.scrollup#buttonClass
         * @type string
         * @default 'scrollup'
         */
        buttonClass:    'scrollup',
        /**
         * The text of the scroll-to-top button
         *
         * @name gemini.scrollup#buttonText
         * @type string
         * @default 'Scroll to Top'
         */
        buttonText:     'Scroll to Top',
        /**
         * The the distance (px) from the top of the page before the
         * scroll-to-top button will show
         *
         * @name gemini.scrollup#scrollDistance
         * @type integer
         * @default 300
         */
        scrollDistance: 300,
        /**
         * The time (milliseconds) it takes for the page to scroll to the top
         * after the button is clicked
         *
         * @name gemini.scrollup#scrollSpeed
         * @type integer
         * @default 300
         */
        scrollSpeed:    300,
        /**
         * The time (milliseconds) it takes for the button to fade in and out
         *
         * @name gemini.scrollup#animationSpeed
         * @type integer
         * @default 250
         */
        animationSpeed: 250,
        /**
         * The time (milliseconds) between the plugin checking for the current
         * scroll position while scrolling
         *
         * @name gemini.scrollup#throttle
         * @type integer
         * @default 250
         */
        throttle:       250
      }, options ),

      init: function() {
        var plugin = this;

        /*
         * Button
         */
        // Create
        plugin.$button = $( '<div>', {
          id:      plugin.settings.buttonID,
          'class': plugin.settings.buttonClass,
          style:   'display:none;'
        })
          .text( plugin.settings.buttonText );

        // Add
        $( 'body' ).append( plugin.$button );

        // Click Event
        plugin.$button.click( function() {
          plugin.scrollUp();
        });

        /*
         * Scroll Event
         */
        plugin._lastTop = 0;
        $( window ).scroll( _.throttle( function( e ) {
          var scrollTop = $( window ).scrollTop();

          // If the user is below the scroll distance and scrolling up
          if ( scrollTop > plugin.settings.scrollDistance &&
              scrollTop < plugin._lastTop ) {
            plugin.show();
          } else {
            plugin.hide();
          }

          plugin._lastTop = scrollTop;
        }, plugin.settings.throttle ));
      },
      /**
       * Show the scroll-to-top button
       *
       * @method
       * @name gemini.scrollup#show
       * @return {object} Returns plugin object
      **/
      show: function() {
        var plugin = this;

        plugin.$button.stop( true, true ).fadeIn( plugin.settings.animationSpeed );

        return plugin;
      },
      /**
       * Hide the scroll-to-top button
       *
       * @method
       * @name gemini.scrollup#hide
       * @return {object} Returns plugin object
      **/
      hide: function() {
        var plugin = this;

        plugin.$button.stop( true, true ).fadeOut( plugin.settings.animationSpeed );

        return plugin;
      },
      /**
       * Scrolls the page to the top
       *
       * @method
       * @name gemini.scrollup#scrollUp
       * @return {object} Returns plugin object
      **/
      scrollUp: function() {
        var plugin = this;

        $( 'html, body' ).animate({ scrollTop: 0 }, plugin.settings.scrollSpeed );

        return plugin;
      }
    };

    plugin.init();

    return plugin;
  };
}));
