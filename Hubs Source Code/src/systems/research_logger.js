import qsTruthy from '../utils/qs_truthy';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { oculusTouchUserBindings } from "../systems/userinput/bindings/oculus-touch-user";

AFRAME.registerSystem('research_logger', {
  init: function() {
    this.enableLogger = qsTruthy('log');
    console.log('RESEARCH LOGGER', this.enableLogger);
    this.tickCount = 0;
    this.lastFPS = 0;
    this.lastFpsUpdate = performance.now();
    this.frameCount = 0;
    this.tickPayloadSize = 9; // data sent every 10 seconds 
    this.payload = [];
    //this.pl=[];

    //get IP
//    this.myIP = getMyIp();
//    this.ipAddress = '';

//    this.myIP.then((ipAdd)=>{
//      this.ipAddress = ipAdd;
//    });
  },
  
  /*logThumbstick: function (evt) {
    if (evt.detail.y > 0.95) { console.log("DOWN"); }
    if (evt.detail.y < -0.95) { console.log("UP"); }
    if (evt.detail.x < -0.95) { console.log("LEFT"); }
    if (evt.detail.x > 0.95) { console.log("RIGHT"); }
  },*/


  tick() {
    // UNCOMMMENT THIS IF YOU DON"T WANT AUTO LOGGING
    // if (!this.enableLogger) {
    //   return;
    // }

    const now = performance.now();
    this.frameCount++;
    if (now >= this.lastFpsUpdate + 1000) {
      this.lastFPS = parseFloat((this.frameCount / ((now - this.lastFpsUpdate) / 1000)).toFixed(2));
      this.lastFpsUpdate = now;
      this.frameCount = 0;

      //this.el.addEventListener('thubmstickmoved',this.logThumbstick);

      const userinput = AFRAME.scenes[0].systems.userinput;
      const avatarPOV = document.getElementById('avatar-pov-node');
      const avatarRig = document.getElementById('avatar-rig');
      const rigPosition = avatarRig.object3D.getWorldPosition(new THREE.Vector3());
      const rigQuant = avatarRig.object3D.getWorldQuaternion(new THREE.Quaternion());
      const rigDirection = avatarRig.object3D.getWorldDirection(new THREE.Vector3());
      const povPosition = avatarPOV.object3D.getWorldPosition(new THREE.Vector3());
      const povQuant = avatarPOV.object3D.getWorldQuaternion(new THREE.Quaternion());
      const povDirection = avatarPOV.object3D.getWorldDirection(new THREE.Vector3());


      //const gamepadInfo = document.getElementById('gamepad-Info')
      var game = navigator.getGamepads();
      const event = game.gamepad();
      console.log(event.index, event.buttons.pressed);
      
      window.addEventListener("gamepadconnected", function(e){
        var gp = navigator.getGamepads()[e.gamepad.index];
        //gamepadInfo.textContent = 'Gamepad connected at index ${gp.index}: ${gp.id}';
        console.log(gp.index, gp.id, gp.buttons.length,gp.axes.length)
        this.payload.push({
          controllerIndex: gp.index,
          controllerId : gp.id
        })

      });
 
    //this.payload.push({
         // index: gp.index,
          //button: gp.buttons
        //});

        //this.requestAnimationFrame(Start);

        //this.cindex = gp.index;
        //this.cid = gp.id;
        //console.log("controller is conneced at %d position: %s. %d buttons, %d coordination.",
        //e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length,e.gamepad.axes.length);
     // });
      //const gamepads = navigator.getGamepads();
      //const leftgamepads = gamepads.find(gamepads.hand === 'left');
      //const rightgamepads = gamepads.find(gamepads.hand === 'right');
      
      //console.log("leftgamepads:"+leftgamepads);
      //console.log("rightgamepads:"+rightgamepads);

      this.payload.push({
        timestamp: Date.now(),
        duration : (now/1000).toFixed(2),
        
        rigPositionX : this.flattenZeros(rigPosition.x),
        rigPositionY : this.flattenZeros(rigPosition.y),
        rigPositionZ : this.flattenZeros(rigPosition.z),

        povPositionX : this.flattenZeros(povPosition.x),
        povPositionY : this.flattenZeros(povPosition.y),
        povPositionZ : this.flattenZeros(povPosition.z),

        rigQuantX : this.flattenZeros(rigQuant._x),
        rigQuantY : this.flattenZeros(rigQuant._y),
        rigQuantZ : this.flattenZeros(rigQuant._z),
        povQuantX : this.flattenZeros(povQuant._x),
        povQuantY : this.flattenZeros(povQuant._y),
        povQuantZ : this.flattenZeros(povQuant._z),

        rigDirectionX : this.flattenZeros(rigDirection.x),
        rigDirectionY : this.flattenZeros(rigDirection.y),
        rigDirectionZ : this.flattenZeros(rigDirection.z),

        povDirectionX : this.flattenZeros(povDirection.x),
        povDirectionY : this.flattenZeros(povDirection.y),
        povDirectionZ : this.flattenZeros(povDirection.z),

        //Contoller: this.controller,
        //C_index: this.cindex,
        


        fps : this.lastFPS,
        isEntered : AFRAME.scenes[0].states.includes('entered') ? 1 : 0,
        isMuted : AFRAME.scenes[0].states.includes('muted') ? 1 : 0
        
      });

      //this.pl.push({
        //rightID: this.rightgamepads.gamepads.displayId(),
        //rightIndex: this.rightgamepads.gamepads.index(),
        //rightconnect: this.rightgamepads.gampads.connected()
      //});

      this.tickCount++;
    }
    // const userinput = AFRAME.scenes[0].systems.userinput;
    // const avatarPOV = document.getElementById('avatar-pov-node');
    // const avatarRig = document.getElementById('avatar-rig');
    // const rigPosition = avatarRig.object3D.getWorldPosition(new THREE.Vector3());
    // const rigQuant = avatarRig.object3D.getWorldQuaternion(new THREE.Quaternion());
    // const rigDirection = avatarRig.object3D.getWorldDirection(new THREE.Vector3());
    // const povPosition = avatarPOV.object3D.getWorldPosition(new THREE.Vector3());
    // const povQuant = avatarPOV.object3D.getWorldQuaternion(new THREE.Quaternion());
    // const povDirection = avatarPOV.object3D.getWorldDirection(new THREE.Vector3());
    // this.payload.push({      
    //   timestamp: this.lastFPS
      // AFRAME.scenes[0].ownerDocument.location.pathname,
      // AFRAME.scenes[0].ownerDocument.location.search,
      // AFRAME.scenes[0].systems['hubs-systems'].characterController.fly ? 1 : 0,
      // AFRAME.scenes[0].states.includes('spacebubble') ? 1 : 0,
      // AFRAME.scenes[0].states.includes('visible') ? 1 : 0,
      // AFRAME.scenes[0].states.includes('loaded') ? 1 : 0,
      // AFRAME.scenes[0].states.includes('entered') ? 1 : 0,
      // AFRAME.scenes[0].states.includes('muted') ? 1 : 0,
      
      // AFRAME.scenes[0].systems['local-audio-analyser'].volume,
      // window.APP.store.state.preferences.audioOutputMode === 'audio' ? 1 : 0
    // });
    if (this.tickCount > this.tickPayloadSize) {
      let infodata = getUUID();
        
        // timestamp, // post time
        // window.APP.store.credentialsAccountId !== null ? window.APP.store.credentialsAccountId : '',
        // window.APP.store.state.profile.avatarId,
        // avatarRig.components['player-info'].identityName !== undefined
        //   ? avatarRig.components['player-info'].identityName
        //   : '',
        // avatarRig.components['player-info'].displayName !== null ? avatarRig.components['player-info'].displayName : '',
        // avatarRig.components['player-info'].isRecording,
        // avatarRig.components['player-info'].isOwner
      
      //infodata = infodata.concat(this.getDeviceInfo());
      // IP: this.ipAddress,
      this.researchCollect({ UUID: infodata, DATA: this.payload, Controller: this.pl});
      this.payload = [];
      this.tickCount = 0;
    }
  },

  flattenZeros(n, p = 1000000000) {
    return Math.round(n * p) / p;
  },

  // This doesn't change a lot, so lets just push it once per POST
  // getDeviceInfo() {
  //   const deviceInfo = [
  //     AFRAME.utils.device.isBrowserEnvironment ? 1 : 0,
  //     AFRAME.utils.device.checkARSupport() ? 1 : 0,
  //     AFRAME.utils.device.checkHeadsetConnected() ? 1 : 0,
  //     AFRAME.utils.device.isIOS() ? 1 : 0,
  //     AFRAME.utils.device.isLandscape() ? 1 : 0,
  //     AFRAME.utils.device.isMobile() ? 1 : 0,
  //     AFRAME.utils.device.isMobileVR() ? 1 : 0,
  //     AFRAME.utils.device.isOculusBrowser() ? 1 : 0,
  //     AFRAME.utils.device.isR7() ? 1 : 0,
  //     AFRAME.utils.device.isTablet() ? 1 : 0,
  //     AFRAME.utils.device.isWebXRAvailable ? 1 : 0
  //   ];
  //   return deviceInfo;
  // },

  researchCollect(data, url = "https://us-central1-hubscollection-5b08b.cloudfunctions.net/user") {
  //researchCollect(data, url = "https://us-central1-cs695hubs-e838e.cloudfunctions.net/log") {
    //https://us-central1-hubscollection-5b08b.cloudfunctions.net/user
    if (data === undefined) return;
    
    console.log(AFRAME.scenes[0]);
    axios.post(url, data)
      .then((res) => {
        console.log("recorded " + res.body);
        console.log("recorded succeed!")
      })
      .catch((err) => {
        console.log("Logger Error:", err);
      });

    // const Http = new XMLHttpRequest();
    // Http.setRequestHeader('Access-Control-Allow-Origin', '*');
    // Http.open("POST", url, async = true);
    // Http.send(JSON.stringify(data));

  }
});


// Store this locally in case we need it later. TODO: we could push it
// into the Hub Store but nah.  RFC4122 UUIDs from
// https://github.com/uuidjs/uuid
//function getUUID(appkey = 'socialvr4chi') {
function getUUID(appkey = 'hubscollect') {
  let uuid = localStorage.getItem(appkey);
  if (uuid === null) {
    uuid = uuidv4();
    localStorage.setItem(appkey, uuid);
  }
  return uuid;
}







//async function getMyIp(){
//  const myIP = await new Promise((s,f,c=new RTCPeerConnection(),k='candidate')=>(c.createDataChannel()))
//}