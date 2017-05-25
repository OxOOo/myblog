
```html
<iframe id="comments" style="width: 100%" scrolling="no"></iframe>
<script src="/comments/js/jquery.base64.js"></script>
<script src="/comments/js/jquery.ba-resize.min.js"></script>
<script>
    $(function() {
        var PAGE_TOKEN = $.base64.btoa(window.location.pathname);
        $('#comments').attr('src', '/comments/comments.html?'+PAGE_TOKEN);
        $('#comments').on('load', function() {
            $($('#comments')[0].contentWindow.document).find('body').resize(function() {
                $('#comments').height($('#comments')[0].contentWindow.document.documentElement.scrollHeight);
            });
            $('#comments').height($('#comments')[0].contentWindow.document.documentElement.scrollHeight);
        });
    });
</script>
```