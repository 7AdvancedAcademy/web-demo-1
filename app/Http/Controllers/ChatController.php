<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Message;
use App\Models\ChatMessage;
use Auth;

class ChatController extends Controller
{

      public function sendMessage(Request $request)
      {

        $message = new Message();
        $message->message = $request->get('message');
        $message->sender = Auth::user()->name;
        $message->user()->associate(Auth::user()->id);
        $message->save();
        return 'successful';
      }

      public function isTyping(Request $request)
      {
          $username = $request->get('username');

          $chat = Message::find(1);
          if ($chat->user1 == $username)
              $chat->user1_is_typing = true;
          else
              $chat->user2_is_typing = true;
          $chat->save();
      }

      public function notTyping(Request $request)
      {
          $username = $request->get('username');

          $chat = Message::find(1);
          if ($chat->user1 == $username)
              $chat->user1_is_typing = false;
          else
              $chat->user2_is_typing = false;
          $chat->save();
      }

      public function retrieveChatMessages()
      {
          $messages = Message::orderBy('id', 'desc')->take(6)->get();
          return $messages;
      }

      //retreive instant messages
      public function retrieveInstantMessages(Request $request){
        $lastest = Message::where('id', '>', $request->get('lastId'))->orderBy('id', 'desc')->get();
        return $lastest;
      }

      public function retrieveTypingStatus(Request $request)
      {
          $username = $request->get('username');

          $chat = Message::find(1);
          if ($chat->user1 == $username)
          {
              if ($chat->user2_is_typing)
                  return $chat->user2;
          }
          else
          {
              if ($chat->user1_is_typing)
                  return $chat->user1;
          }
      }
  }
