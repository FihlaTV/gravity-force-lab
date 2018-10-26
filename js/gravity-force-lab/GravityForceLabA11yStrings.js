// Copyright 2018, University of Colorado Boulder

/**
 * Strings for accessible content: alerts and descriptions in the PDOM.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );

  const GravityForceLabA11yStrings = {

    // Screen Summary Strings
    screenSummaryDescription: {
      value: 'The Play Area has a blue sphere labelled m1 and a red sphere labelled m2 and each sphere is held in place by a robot. A force vector starts at the center of each sphere and points directly at the opposite sphere. Spheres can be moved closer or further from one another, and the mass of each sphere can be increased or decreased. A ten-meter ruler can be moved around to take measurements. In the Control Area there are checkboxes and buttons to display force values with or without scientific notation, set the spheres to a constant size, and to reset the sim.'
    },
    simStateListLabel: {
      value: 'Currently, force on m1 by m2 is of equal magnitude and pointing directly opposite to the force on m2 by m1.'
    },
    massValuesAndComparisonSummaryPattern: {
      value: 'Mass of {{mass1Label}} is {{m1Mass}} kilograms, {{comparitiveValue}} {{mass2Label}} at {{m2Mass}} kilograms.'
    },

    // Object/sphere descriptions and labels

    mass1BlueSphere: {
      value: 'm1, Blue Sphere'
    },
    mass2RedSphere: {
      value: 'm2, Red Sphere'
    },

    ////////////////////////
    // Qualitative values //
    ////////////////////////

    // relative mass sizes
    muchMuchSmallerThan: {
      value: 'much much smaller than'
    },
    muchSmallerThan: {
      value: 'much smaller than'
    },
    slightlySmallerThan: {
      value: 'slightly smaller than'
    },
    comparableTo: {
      value: 'comparable to'
    },
    somewhatLargerThan: {
      value: 'somewhat larger than'
    },
    muchLargerThan: {
      value: 'much larger than'
    },
    muchMuchLargerThan: {
      value: 'much much larger than'
    },

    // mass sphere density
    notAtAllDense: {
      value: 'not at all dense'
    },
    notVeryDense: {
      value: 'not very dense'
    },
    somewhatDense: {
      value: 'somewhat dense'
    },
    ofMediumDensity: {
      value: 'of medium density'
    },
    dense: {
      value: 'dense'
    },
    veryDense: {
      value: 'very dense'
    },
    veryVeryDense: {
      value: 'very very dense'
    },

    ///////////
    // Units //
    ///////////

    micronewtons: {
      value: 'micronewtons'
    }
  };

  if ( assert ) { Object.freeze( GravityForceLabA11yStrings ); }

  return gravityForceLab.register( 'GravityForceLabA11yStrings', GravityForceLabA11yStrings );
} );