var registerSystem = require('../core/system').registerSystem;
var THREE = require('../lib/three');

/**
 * Determines state of various renderer properties.
 */
// TODO ditch this system once material component is removed and any references are removed from hubs
module.exports.System = registerSystem('renderer', {
  applyColorCorrection: function (colorOrTexture) {
    if (colorOrTexture.isColor) {
      colorOrTexture.convertSRGBToLinear();
    } else if (colorOrTexture.isTexture) {
      colorOrTexture.encoding = THREE.sRGBEncoding;
    }
  }
});
