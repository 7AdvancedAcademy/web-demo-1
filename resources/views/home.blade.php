@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card msg-box">
                <div style="background: #05ab9f; color: #fff;" class="card-header">TIME LINE ALREADY <span class="msg-members">{{ count($members)}} MEMBERS</span> </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <div class="messages mb-4" id="chat-window">
                      
                    </div>


                    <div class="msg-input-box">
                      <div class="input-group">
                        <input type="text" id="message" class="form-control" placeholder="{{ Auth::user()->name }} type your text here." name="message" autofocus>
                        <div class="input-group-append">
                          <button class="btn btn-outline-success" type="button">
                            send
                          </button>
                        </div>
                      </div>
                      <p><caption id="typingStatus"></caption></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
