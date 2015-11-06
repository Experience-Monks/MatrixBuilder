<div id="Landing">
  <div class="form-container">
    <div class="title">{{title}}</div>
     <div class="description">{{{description}}}</div>
    <div v-on="click: clear" class="btn btn-clear">Clear</div>
    <div v-el="questionType" v-on="click: onClickQuestionType" class="btn btn-question"></div>
    <div class="scroll-container">
      <div class="form" v-class="columnize: !questions.isBasic">
        <div class="form-item" v-repeat="q: questions.data">
          <input id="{{q.id}}" class="cb-q" type="checkbox" v-on="click: onClickFilter" v-model="q.value" />
          <label for="{{q.id}}">{{q.question}}</label>
          <div v-if="questions.isBasic" class="info">{{{q.info}}}</div>
        </div>
      </div>
    </div>
    <p class="powered">Powered by <a href="http://caniuse.com">Caniuse.com</a></p>
  </div>
  <div class="matrix-container">
    <div v-el="matrix" class="matrix">
      <div class="section">
        <div class="title">Desktop</div>
        <div v-el="browsers">
          <div v-repeat="matrix.data.desktop.browsers" class="row">
            <div class="name" v-class="error : !$value">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">Mobile</div>
        <div v-el="ios">
          <div class="subheader" v-class="error : !matrix.data.mobile.ios.browser">iOS <span class="val"><span v-repeat="matrix.data.mobile.ios.browser">{{$value}}</span></span>
            <span class="divider">/</span>Safari <span class="val"><span v-repeat="matrix.data.mobile.ios.browser">{{$value}}</span></span>
          </div>
          <div v-repeat="matrix.data.mobile.ios.devices" class="row"  v-class="error : !matrix.data.mobile.ios.browser">
            <div class="name">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
          </div>
        </div>
        <div v-el="android">
          <div class="subheader" v-class="error : !matrix.data.mobile.android.browser">Android <span class="val"><span v-repeat="matrix.data.mobile.android.os">{{$value}}</span></span>
            <span class="divider">/</span>Chrome <span class="val"><span v-repeat="matrix.data.mobile.android.browser">{{$value}}</span></span>
          </div>
          <div v-repeat="matrix.data.mobile.android.devices" class="row" v-class="error : !matrix.data.mobile.android.browser">
            <div class="name">{{$key}}</div><div class="version"><span v-repeat="$value">{{$value}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>