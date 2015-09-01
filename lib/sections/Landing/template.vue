<div id="Landing">
  <div class="form-container">
    <div class="title">{{title}}</div>
    <div class="form">
      <label v-repeat="q: questions"><input id="{{q.id}}" type="checkbox" v-on="click: onClick" />{{q.question}}</label>
    </div>
  </div>
  <div class="matrix-container">
    <div v-el="matrix" class="matrix">
      <div class="section">
        <div class="title">Desktop</div>
        <div v-el="browsers">
          <div v-repeat="browser: matrix.desktop.browsers" class="row">
            <div class="name">{{browser.name}}</div><div class="version">{{browser.versions}}</div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">Mobile</div>
        <div class="subheader">iOS {{matrix.mobile.ios.os}} &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp; {{matrix.mobile.ios.browser.name}} {{matrix.mobile.ios.browser.versions}}</div>
        <div v-el="devices">
          <div v-repeat="device: matrix.mobile.ios.devices" class="row">
            <div class="name">{{device.name}}</div><div class="version">{{device.versions}}</div>
          </div>
        </div>
        <div class="subheader">Android {{matrix.mobile.android.os}}<span>/</span>{{matrix.mobile.android.browser.name}} {{matrix.mobile.android.browser.versions}}</div>
        <div v-el="devices">
          <div v-repeat="device: matrix.mobile.android.devices" class="row">
            <div class="name">{{device.name}}</div><div class="version">{{device.versions}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>