
var username;

$(document).ready(function()
{

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    username = $('#username').html();

    pullData();

    $(document).keyup(function(e) {
        if (e.keyCode == 13)
            sendMessage();
        /*else
            isTyping();*/
    });

    //push the scroll button at the top level
    var out = document.getElementById("chat-window");
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

    setInterval(function() {
        // scroll to bottom if isScrolledToBottom is true
        if (isScrolledToBottom) {
        out.scrollTop = out.scrollHeight - out.clientHeight
        }
    }, 500);

    setInterval(function(){
        chatUpdate();
    }, 1000);
});


function pullData()
{
    retrieveChatMessages();
    // retrieveTypingStatus();
}

function retrieveChatMessages()
{
    $.get('retrieveChatMessages', function(data)
    {
        //retreived the last 6 messages;
        if (data.length > 0){
            for(var i in data){
                if(data[i].sender === username){
                    $('#chat-window').append(
                        `<div class="media  my-4">
                        <img class="mr-3 rounded-circle my" src="https://via.placeholder.com/45x45" alt="Generic placeholder image">
                        <div class="media-body border-bottom">
                        <h5 class="mt-0 text-success">me</h5><caption> on: ${data[i].created_at}</caption>
                        <p>${data[i].message}</p>
                        </div>
                    </div>`
                    );
                }else{
                    $('#chat-window').append(
                        `<div class="media  my-4">
                        <img class="mr-3 rounded-circle my" src="https://via.placeholder.com/45x45" alt="Generic placeholder image">
                        <div class="media-body border-bottom">
                        <h5 class="mt-0">${data[i].sender}</h5><caption> on: ${data[i].created_at}</caption>
                        <p>${data[i].message}</p>
                        </div>
                    </div>`
                    );
                }
            }
            updateLatestId(data);
        }
    });
}

function chatUpdate()
{
    if('lastid' in localStorage){
        var lastId = localStorage.getItem('lastid');
    }

    $.post('retrieveInstantMessages', {lastId: lastId}, function(data)
    {
        //update chat messages
        if (data.length > 0){
            for(var i in data){
                if(data[i].sender === username){
                    $('#chat-window').append(
                        `<div class="media  my-4">
                        <img class="mr-3 rounded-circle my" src="https://via.placeholder.com/45x45" alt="Generic placeholder image">
                        <div class="media-body border-bottom">
                        <h5 class="mt-0 text-success">me</h5><caption> on: ${data[i].created_at}</caption>
                        <p>${data[i].message}</p>
                        </div>
                    </div>`
                    );
                }else{
                    $('#chat-window').append(
                        `<div class="media  my-4">
                        <img class="mr-3 rounded-circle my" src="https://via.placeholder.com/45x45" alt="Generic placeholder image">
                        <div class="media-body border-bottom">
                        <h5 class="mt-0">${data[i].sender}</h5><caption> on: ${data[i].created_at}</caption>
                        <p>${data[i].message}</p>
                        </div>
                    </div>`
                    );
                }
            }
            
            updateLatestId(data);
        }
    });
}


function updateLatestId(data){
    let lastItem = data.pop();
    if (typeof(Storage) !== "undefined") {
        if('lastid' in localStorage)
            localStorage.removeItem('lastid');
        localStorage.setItem("lastid", lastItem.id);
    } else {
        alert('Local Sotrage not supported');
    }
}
/*
function retrieveTypingStatus()
{
    $.post('http://first-app.seven/retrieveTypingStatus', {username: username}, function(username)
    {
        if (username.length > 0)
            $('#typingStatus').html(username+' is typing...');
        else
            $('#typingStatus').html('');
    });
}
*/

function sendMessage()
{
    var message = $('#message').val();

    if (message.length > 0)
    {
        $.post('sendMessage', {message: message}, function(data)
        {
            console.log('message posted')
            $('#message').val('');
        });
    }
}

/*
function isTyping()
{
    $.post('http://first-app.seven/isTyping', {username: username});
}

function notTyping()
{
    $.post('http://first-app.seven/notTyping', {username: username});
}
*/