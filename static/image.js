var download1 = '';

$(document).ready(function () {

  const defaultBtn = document.getElementById("default-btn");
  const customBtn = document.getElementsByClassName("up")[0];
  customBtn.addEventListener("click", () => {
    defaultBtn.click();
  })

  defaultBtn.addEventListener("change", function (e) {

    const image_div = document.querySelector(".image");
    if (image_div.childNodes.length > 0) {
      console.log(image_div.childNodes);
      image_div.removeChild(image_div.childNodes[0]);

    }

    const file = e.target.files[0];
    console.log(file);
    if (file) {
      document.querySelector('.plus').remove();
      document.querySelector('.textl').remove()
      let reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        var image = new Image();
        image.src = result;
        image_div.appendChild(image);
        document.querySelector(".wrapper").style.border = "none";
      }
      reader.readAsDataURL(file);
    }
    if (this.value) {
      let valueStore = this.value;
      document.querySelector(".file-name").innerHTML = e.target.value.split('\\').pop();;
    }
    var firebaseConfig = {
      apiKey: "AIzaSyAVMkc8bRkFMU_cZNpNr3mZF2NV8yi7TA4",
      authDomain: "editor-4bfb9.firebaseapp.com",
      projectId: "editor-4bfb9",
      storageBucket: "editor-4bfb9.appspot.com",
    };
    firebase.initializeApp(firebaseConfig);

    var uploadTask = firebase.storage().ref('images/' + file.name).put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Succesfull upload and Edited Image has been shown
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          download1 = downloadURL;
          document.querySelector('.download').remove();
          document.querySelector('.textr').remove();
          document.querySelector(".wp2").style.border = "none";
          var image = document.createElement('img');
          var image2 = document.getElementsByClassName('image2')[0];
          image.src = downloadURL;
          image2.appendChild(image);
        });
      }
    );
  })

  const downloadBtn = document.getElementById("download-btn");
  const customBtn1 = document.getElementsByClassName("dw")[0];
  customBtn1.addEventListener("click", () => {
    downloadBtn.click();
    console.log('clicked cus');
  })
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement('a')
    link.href = download1
    link.download = 'output.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
});