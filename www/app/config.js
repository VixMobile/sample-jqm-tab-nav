/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global $:false*/
/*
 * Copyright (c) 2012, Intel Corporation. All rights reserved.
 * File revision: 15 October 2012
 * Please see http://software.intel.com/html5/license/samples 
 * and the included README.md file for license terms and conditions.
 */


/* override jQuery Mobile defaults */

/* no animated page transitions */
$(document).bind('mobileinit', function () {
    $.mobile.defaultPageTransition = 'none';
});

/* keep header and footer visible at all times */
$(document).on('pageinit', ':jqmData(role=page)', function() {
    $(this).find(':jqmData(role=header)').fixedtoolbar( { tapToggle: false } ); 
    $(this).find(':jqmData(role=footer)').fixedtoolbar( { tapToggle: false } );     
});
