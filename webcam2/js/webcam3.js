(() => {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
  
    const width = 320; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
  
    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
  
    let streaming = false;
  
    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.
  
    let video2 = null;
    let canvas2 = null;
    let photo2 = null;
    let startbutton2 = null;
  
    function showViewLiveResultButton() {
      if (window.self !== window.top) {
        // Ensure that if our document is in a frame, we get the user
        // to first open it in its own tab or window. Otherwise, it
        // won't be able to request permission for camera access.
        document.querySelector(".contentarea").remove();
        const button = document.createElement("button");
        button.textContent = "View live result of the example code above";
        document.body.append(button);
        button.addEventListener('click', () => window.open(location.href));
        return true;
      }
      return false;
    }
  
    function startup() {
      if (showViewLiveResultButton()) { return; }
      video2 = document.getElementById('video2');
      canvas2 = document.getElementById('canvas2');
      photo2 = document.getElementById('photo2');
      startbutton2 = document.getElementById('startbutton2');
    //   var getWebcams = function() {
    //     return navigator.mediaDevices.enumerateDevices()
    //       .then((devices) => {
    //         devices.forEach((device) => {
    //             if(device.kind === 'videoinput'){
    //                 console.log(device.kind + ": LABEL = \"" + device.label +
    //                 "\" ID = " + device.deviceId);
    //             }
            
    //         });
      
    //         // return devices.filter((device) => {
    //         //   return device.kind === 'videoinput';
              
    //         // });
            
    //       });
          
    //   };
    //   getWebcams();
      

      navigator.mediaDevices.getUserMedia({video: {deviceId:{exact: 'd1bb6177a1fa67866890faf564c848e60bb32bde875596738e7d5f6626035449'}}, audio: false})
        .then((stream) => {
          video2.srcObject = stream;
          video2.play();
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
  
      video2.addEventListener('canplay', (ev) => {
        if (!streaming) {
          height = video2.videoHeight / (video2.videoWidth/width);
  
          // Firefox currently has a bug where the height can't be read from
          // the video, so we will make assumptions if this happens.
  
          if (isNaN(height)) {
            height = width / (4/3);
          }
  
          video2.setAttribute('width', width);
          video2.setAttribute('height', height);
          canvas2.setAttribute('width', width);
          canvas2.setAttribute('height', height);
          streaming = true;
        }
      }, false);
  
      startbutton2.addEventListener('click', (ev) => {
        takepicture();
        ev.preventDefault();
      }, false);
  
      clearphoto();
    }
  
    // Fill the photo with an indication that none has been
    // captured.
  
    function clearphoto() {
      const context = canvas2.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas2.width, canvas2.height);
  
      const data = canvas2.toDataURL('image/png');
      photo2.setAttribute('src', data);
    }
  
    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.
  
    function takepicture() {
      const context = canvas2.getContext('2d');
      if (width && height) {
        canvas2.width = width;
        canvas2.height = height;
        context.drawImage(video2, 0, 0, width, height);
  
        const data = canvas2.toDataURL('image/png');
        photo2.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }
  
    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
  })();
  