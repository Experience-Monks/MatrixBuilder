 
<div class="container">
  <h4 class="title">{{title}}</h4>
  <img src="assets/jam3Logo.svg" id="logo" alt="Jam3 logo" class="logo" width="43px" height="20px"> 

  <div id="Landing">
    <div class="form-container">
      <h1 class="title">{{title}}</h1>
       <p class="description">{{{description}}}</p>
       <div class="buttons">
      <button v-on="click: clear" class="btn btn-clear">Clear<span class="arrow"><img src="assets/arrowDark.png" width="7px" height="14px"/></span></button>
      <button v-el="questionType" v-on="click: onClickQuestionType" class="btn btn-question"></button>
      </div>
      <hr>
      <div class="scroll-container">
        <div class="form">
          <div class="column">
            <div class="form-item" id="{{q.id}}-item" v-repeat="q: questions.data.column0">
              <input id="{{q.id}}" class="cb-q" type="checkbox" v-on="click: onClickFilter" v-model="q.value" />
              <label for="{{q.id}}">{{q.question}}</label>
              <div v-if="questions.isBasic" class="info"   id="{{q.id}}-info">{{{q.info}}}</div>
            </div>
          </div>

          <div class="column">
            <div class="form-item" id="{{q.id}}-item" v-repeat="q: questions.data.column1">
              <input id="{{q.id}}" class="cb-q" type="checkbox" v-on="click: onClickFilter" v-model="q.value" />
              <label for="{{q.id}}">{{q.question}}</label>
              <div v-if="questions.isBasic" class="info"   id="{{q.id}}-info">{{{q.info}}}</div>
            </div>
          </div>

        </div>
      </div>
      <p class="powered">Powered by <a href="http://caniuse.com">Caniuse.com</a></p>
    </div>
    <div class="matrix-container">
      <div v-el="matrix" class="matrix">
        <div class="section">
          <h2 class="title" id="_Desktop">_Desktop<span class="arrow"><img src="assets/arrowLight.png" width="14px" height="9px"/></span></h2>
          <div v-el="browsers" id="_Desktop-content">
            <div v-repeat="matrix.data.desktop.browsers" class="row">
              <div class="name" v-class="error : !$value">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
               <hr>
            </div>
          </div>
        </div>
        <div class="section">
          <h2 class="title" id="_Mobile">_Mobile<span class="arrow"><img src="assets/arrowLight.png" width="14px" height="9px"/></span></h2>
          <div v-el="ios" id="_Mobile-content">
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