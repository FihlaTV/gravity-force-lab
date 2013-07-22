// Copyright 2002-2013, University of Colorado Boulder

/**
 * The string plugin loader has problems if you try to load the strings from different relative paths
 * So just load them once and make them easily available
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  "use strict";
  var Strings = require( "i18n!../nls/gravity-force-lab-strings" );
  return Strings;
} );