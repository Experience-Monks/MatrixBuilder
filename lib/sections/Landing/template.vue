 
<div class="container">
  <h4 class="title">{{title}}</h4>
  <img src="assets/jam3Logo.svg" id="logo" alt="Jam3 logo" class="logo" width="43px" height="20px"> 

  <div id="Landing">
    <div class="form-container">
      <h1 class="title">{{title}}</h1>
       <p class="description">{{{description}}}</p>
      <button v-on="click: clear" class="btn btn-clear">Clear</button>
      <button v-el="questionType" v-on="click: onClickQuestionType" class="btn btn-question"></button>
      <hr>
      <div class="scroll-container">
        <div class="form" v-class="columnize: !questions.isBasic">
          <div class="form-item" v-repeat="q: questions.data">
            <input id="{{q.id}}" class="cb-q" type="checkbox" v-on="click: onClickFilter" v-model="q.value" />
            <label for="{{q.id}}">{{q.question}}</label>
            <div v-if="questions.isBasic" class="info"   id="{{q.id}}-info">{{{q.info}}}</div>
          </div>
        </div>
      </div>
      <p class="powered">Powered by <a href="http://caniuse.com">Caniuse.com</a></p>
    </div>
    <div class="matrix-container">
      <div v-el="matrix" class="matrix">
        <div class="section">
          <h2 class="title">_Desktop</h2>
          <div v-el="browsers">
            <div v-repeat="matrix.data.desktop.browsers" class="row">
              <div class="name" v-class="error : !$value">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
               <hr>
            </div>
          </div>
        </div>
        <div class="section">
          <h2 class="title">_Mobile</h2>
          <div v-el="ios">
            <div class="subheader" v-class="error : !matrix.data.mobile.ios.browser">iOS <span class="val"><span v-repeat="matrix.data.mobile.ios.browser">{{$value}}</span></span>
              <span class="divider">/</span>Safari <span class="val"><span v-repeat="matrix.data.mobile.ios.browser">{{$value}}</span></span>
               <hr>
            </div>
            <div v-repeat="matrix.data.mobile.ios.devices" class="row"  v-class="error : !matrix.data.mobile.ios.browser">
              <div class="name">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
               <hr>
            </div>
          </div>
          <div v-el="android">
            <div class="subheader" v-class="error : !matrix.data.mobile.android.browser">Android <span class="val"><span v-repeat="matrix.data.mobile.android.os">{{$value}}</span></span>
              <span class="divider">/</span>Chrome <span class="val"><span v-repeat="matrix.data.mobile.android.browser">{{$value}}</span></span>
               <hr>
            </div>
            <div v-repeat="matrix.data.mobile.android.devices" class="row" v-class="error : !matrix.data.mobile.android.browser">
              <div class="name">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
               <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>