$(function () {
    headerEvt();
    uiDropdown('.sub-depth .depth');
    fileUpload();
});

function gnbOpen() {
    var gnb = $('#gnb');
    var btn = $('header .btn-menu-all');
    var dim = '<div class="gnb-dim" onclick="gnbClose();">&nbsp;</div>';
    
    btn.addClass('open');
    gnb.show();
    gnb.before(dim);
    setTimeout(function(){
        gnb.addClass('m-open');
    }, 20);
}
function gnbClose() {
    var gnb = $('#gnb');
    var btn = $('header .btn-menu-all');

    gnb.removeClass('m-open');
    btn.removeClass('open');
    $('header .gnb-dim').remove();
    setTimeout(function(){
        gnb.hide();
    }, 300);
}
function headerEvt() {
    // pc sitemap click
    $('header .btn-sitemap').click(function(){
        if ($(this).hasClass('open')){
            $('header').removeClass('sitemap');
            $(this).removeClass('open');
        } else {
            $('header').addClass('sitemap');
            $(this).addClass('open');
        }
    });
    // mobile click
    $('header .btn-menu-all').click(function(){
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    // mobile gnb toggle
    $('#gnb .btn-depth-more').click(function(){
        var self = $(this);
        var depth = self.siblings('ul.depth2');
        var allBtn = $('#gnb .btn-depth-more');
        var allDepth = $('#gnb ul.depth2');

        if (self.hasClass('open')){
            depth.slideUp();
            self.removeClass('open');
        } else {
            allBtn.removeClass('open');
            allDepth.slideUp();
            self.addClass('open');
            depth.slideDown();
        }
    });
}

// file upload 
function fileUpload() {
    var obj = $('.inputfile-wrap');
    
    if (obj.length <= 0) return;

    var fileTarget = obj.find('input[type=file]');

    fileTarget.on('change', function(){
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('input[type=text]').val(filename);
    });
}

// dropdown
function uiDropdown(obj) { 
    var wrap = $(obj);
    $(obj+' .btn-toggle').on('click', function(e){
        var btn = $(this);
        var lists = btn.siblings('.lists');
        var wraps = btn.closest(obj);

        e.stopPropagation();
        e.preventDefault();

        if (wraps.hasClass('open')){
            wraps.removeClass('open');
        } else {
            $(obj).removeClass('open');
            wraps.addClass('open');
        }
    });
    $('html').click(function(e){
        if ( !$(e.target).is(wrap) ) {
            wrap.removeClass('open');
        }
    });
}