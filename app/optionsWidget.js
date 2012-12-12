/*
 * Copyright (c) 2012, Intel Corporation. All rights reserved.
 * File revision: 15 October 2012
 * Please see http://software.intel.com/html5/license/samples 
 * and the included README.md file for license terms and conditions.
 */


/* header toolbar button to open/close options menu */
var optionsBtn = {	
    init: function($page) {
        $($('#optionsBtnTmpl').html())
            .appendTo($page.find($('div[data-role=header]')))
            .button()
            .on('click', function() {
                /* TODO: debounce? */
                $.event.trigger('toggleOptionsMenu');
            });
    }
};


/* options menu */
var optionsMenu = {
    
    /* state of the four options to be synched across page transitions */
    options: [false, false, false, false],
    
    /* vertical position of menu */
    top: 0,
    
    /* create & initialize the options menu for given page */
    init: function($page) {
        
        /* insert & initialize options menu */
        $($('#optionsMenuTmpl').html())
            /* insert into dom */
            .prependTo($page.find($(':jqmData(role=content)')))
            /* set vertical position */
            .css('top', optionsMenu.top)
            /* get jQuery Mobile to process widget */
            .trigger('create')
            
        /* maintain state across page transitions */
        $page.on('pagebeforehide', function() {
            optionsMenu.suspend($(this));
        });
        $page.on('pagebeforeshow', function() {
            optionsMenu.resume($(this));
        });
        
    },
    
    /* calculate vertical position of menu */
    initPosition: function($page) {
        /* menu should be almost aligned with content area at the top (1px margin from header) */
        optionsMenu.top = $page.find(':jqmData(role=content)').position().top + 1;
        /* update position for current page's menu widget */
        /* other pages have not initialized yet, and will use correct optionsMenu.top value */
        $page.find('.optionsMenu').css('top', optionsMenu.top);
    },
  
    /* suspend options menu upon leaving current page */
    suspend: function($page) {
        var $el = $page.find('.optionsMenu');
        optionsMenu.saveState($el);
        $el.off('toggleOptionsMenu');
    },
    
    /* resume options menu (hidden but with correct state) upon entering new page */
    resume: function($page) {
        var $el = $page.find('.optionsMenu');
        $el.hide();
        optionsMenu.reconcileState($el);
        $el.on('toggleOptionsMenu', optionsMenu.toggle);
    },
    
    /* save state of options */
    saveState: function($optionsMenu) {
        $optionsMenu.find('input')
            .each(function(index) {
                optionsMenu.options[index] = $(this).is(':checked');                    
            });
    },
    
    /* update options with latest state */
    reconcileState: function($optionsMenu) {
        $optionsMenu.find('input')
            .each(function(index) {
                /* draw check marks for selected options */
                if (optionsMenu.options[index]) {
                    $(this).attr('checked', true).checkboxradio('refresh');
                } 
                /* clear check marks for unselected options */
                else {
                    $(this).attr('checked', false).checkboxradio('refresh');
                }    
            });
    },   

    /* toggle options menu visibility (in response to user click on options button) */
    toggle: function() {
        if ($(this).is(':visible')) {
            $(this).hide();
        } else {
            $(this).show();
        }	
    }   
};  


/* initialize options button & menu for each page */
$(document).on('pageinit', ':jqmData(role=page)', function() {
    optionsBtn.init($(this));
    optionsMenu.init($(this));    
});

/* figure out page layout dynamically to set correct options menu position */
$(document).one('pageshow', ':jqmData(role=page)', function() {
    optionsMenu.initPosition($(this));
});
