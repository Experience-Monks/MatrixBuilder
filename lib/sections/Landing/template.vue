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
        <div class="title">Browser Matrix</div>
        <div v-el="browsers">
          <div v-repeat="browser: matrix.browsers" class="row">
            <div class="name">{{browser.name}}</div><div class="version">{{browser.versions}}</div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">Device Matrix</div>
        <div v-el="devices">
          <div v-repeat="device: matrix.devices" class="row">
            <div class="name">{{device.name}}</div><div class="version">{{device.versions}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>