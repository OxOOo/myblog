
$(function() {

var PAGE_TOKEN = window.location.search.slice(1);

var comments = [];
var reply_comment_id = null;
function findoutComment(id) {
    var comment = null;
    comments.forEach(function(x) {
        if (x.id == id)
            comment = x;
    });
    return comment;
}
function showReply() {
    var comment = findoutComment(reply_comment_id);

    if (comment) {
        $('#reply_msg').text('回复：' + comment.content);
        $('#reply_box').fadeIn();
    } else {
        $('#reply_box').fadeOut();
    }
}
$('#reply_remove').click(function() {
    reply_comment_id = null;
    showReply();
});

$('#comment_form').submit(function() {
    var content = $('#comment_content').val().trim();
    var nickname = $('#comment_nickname').val().trim();
    if (nickname.length == 0) {
        alert('昵称不能为空');
        return false;
    }
    if (content.length == 0) {
        alert('评论内容不能为空');
        return false;
    }
    $.post('/comments/submit_comment', {
        page_token: PAGE_TOKEN,
        comment_content: content,
        comment_nickname: nickname,
        reply_comment_id: reply_comment_id,
    }, function() {
        location.reload();
    });
    return false;
});

async.auto({
    template: function(callback) {
        callback(null, $('#template').html());
    },
    comments: function(callback) {
        $.post('/comments/comments', {page_token: PAGE_TOKEN}, function(data) {
            comments = data;
            callback(null, data);
        });
    },
    process: ['template', 'comments', function(results, callback) {
        var html = ejs.render(results.template, {
            comments: results.comments,
            page_token: PAGE_TOKEN,
            findoutComment: findoutComment,
        });
        $('#comments_views').html(html);

        $('.reply_btn').click(function() {
            reply_comment_id = $(this).attr('data-id');
            showReply();
            $('#comment_content').focus();
        });

        callback(null);
    }]
});

});