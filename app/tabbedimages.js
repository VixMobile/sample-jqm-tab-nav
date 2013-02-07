
$(document).ready(function(){
    // Upon clicking on thumbnail image, show the large image
    $(".thumbnail").click(function() {
        // change the main image source    
        var src = $(this).attr("src").match(/[^\.]+/) + ".jpg"; 
        $(".mainimage").attr("src", src);
        
        //highlight the active image thumbnail(clicked image)
        $(".thumbnail").removeClass("highlight");
        $(this).addClass("highlight");
     });
    
    // function to resize the content area
    function resizeContent(){
        var headerheight = $.mobile.activePage.children('[data-role="header"]').height();
        var footerheight = $.mobile.activePage.children('[data-role="footer"]').height();
        var windowheight = $(window).height();
        var windowwidth = $(window).width();
        // available content area height
        var content_height = windowheight - (headerheight+footerheight); 
        
        var full_image_div_height = content_height*0.85;
        var thumbnails_div_height = content_height*0.3;
        
        $(".content_div").css('height', content_height);
        $(".content_div").css('width', windowwidth);
        $(".thumbnails_div").css('height', thumbnails_div_height);
        $(".thumbnails_div").css('top', (full_image_div_height + 37));
        $(".mainimage_div").css('height', full_image_div_height);
        if(typeof window.onorientationchange != 'undefined'){
            if( orientation == 0 || orientation == 180){
                $(".thumbnail").css('width', windowwidth/6);
            } else{
                $(".thumbnail").css('width', "12%");
            }
        }
    }
    
    $('#birds').live('pageshow',function(event, ui) {
        // refresh main image : since we change the image src when thumbnail is clicked, this element
        // needs to be refreshed when page is changed through tab navigation
        $('.mainimage').attr("src", "images/Birds/birds1.jpg");   
    });
    $('#flowers').live('pageshow',function(event, ui) {
        // refresh main image : since we change the image src when thumbnail is clicked, this element
        // needs to be refreshed when page is changed through tab navigation
        $('.mainimage').attr("src", "images/Flowers/flowers1.jpg");   
    });
    $('#animals').live('pageshow',function(event, ui) {
        // refresh main image : since we change the image src when thumbnail is clicked, this element
        // needs to be refreshed when page is changed through tab navigation
        $('.mainimage').attr("src", "images/Animals/animals1.jpg");   
    });
    
    // bind event handler to resize the content area on orientation change
    $(window).bind('resize orientationchange pageshow', function(event){
        window.scrollTo(1,0);
        resizeContent();
    });
 
});