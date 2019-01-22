var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  var img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);

  var data = img_data.data;
  var gx = [[1, 0, -1], [1, 0, -1], [1, 0, -1]];
  var gy = [[1, 1, 1], [0, 0, 0], [-1, -1, -1]];

  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }

  var mul = (m1, m2) => {
    return m1
      .map((num, index) => {
        return num.map((n, index2) => {
          return n * m2[index][index2];
        });
      })
      .reduce((acc, val) => (acc += val.reduce((acc, val) => (acc += val))), 0);
  };

  for (let i = 0; i < data.length; i++) {
    matrix = [[], [], []];
    matrix[0].push(data[i - 301]);
    matrix[0].push(data[i - 300]);
    matrix[0].push(data[i - 299]);

    matrix[1].push(data[i - 1]);
    matrix[1].push(data[i]);
    matrix[1].push(data[i + 1]);

    matrix[2].push(data[i + 299]);
    matrix[2].push(data[i + 300]);
    matrix[2].push(data[i + 301]);
    console.log(matrix);
    data[i] = mul(gx, matrix);
    console.log(data[i]);
  }
  //generate matrix
  //     var matrix = [];
  //     for (let i = 0; i < 300; i++) {
  //       var tmp = [];
  //       for (let j = 0; j < 150; j++) tmp.push(data[j]);
  //       matrix.push(tmp);
  //     }

  //     var width = 300,
  // height = 150,
  // buffer = new Uint8ClampedArray(width * height * 4);

  console.log(img_data);

  ctx.putImageData(img_data, 0, 0);
};
img.src = "http://127.0.0.1:5500/db/RGB%20Images/001/IMG_001_L_1.JPG";
