import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectTaxSliceAction } from "../redux-store/collectTaxSlice";
import { imgUrl } from "./imgUrl";

const CanvasDrawing = () => {
  const canvasRef = useRef();
  const [userName, setUserName] = useState("");
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(200);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.collectTax.users);
  useEffect(() => {
    console.log(canvasRef, "ref");
    const ctx = canvasRef.current.getContext("2d");
    console.log(ctx);
    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(10, 20, 200, 300);
    const image = new Image();
    image.src = imgUrl;
    image.addEventListener("load", () => {
      ctx.drawImage(
        image,
        0,
        0,
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
      const pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      console.log(pixels, "pixels");
      let particlesArray = [];
      const numberOfParticles = 5000;
      let mappedImage = [];
      let cellBrightness
      // for (let y = 0; y < canvasHeight; y++) {
      //   let row = [];
      //   for (let x = 0; x < canvasWidth; x++) {
      //     const red = pixels?.data[y * 4 * pixels.data + x * 4];
      //     const green = pixels?.data[y * 4 * pixels.data + (x * 4 + 1)];
      //     const blue = pixels?.data[y * 4 * pixels.data + (x * 4 + 2)];
      //     const brightness = calculateRelativeBrightness(red,green,blue)
      //     const cell = [cellBrightness=brightness]
      //     row.push(cell)
      //   }
      //   mappedImage.push(row)
      // }
      function calculateRelativeBrightness(red,green,blue){
        return Math.sqrt(
          (red*red)*0.299 +
          (green*green)*0.587+
          (blue*blue)*0.114
        )/100
      }
      class Particle {
        constructor() {
          this.x = Math.random() * canvasRef.current.clientWidth;
          this.y = 0;
          this.speed = 0;
          this.velocity = Math.random() * 0.5;
          this.size = Math.random() * 1.5 + 1;
        }
        update() {
          this.y += this.velocity;
          if (this.y >= canvasRef.current.clientHeight) {
            this.y = 0;
            this.x = Math.random() * canvasRef.current.clientWidth;
          }
        }
        draw() {
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      function initialize() {
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle());
        }
      }
      initialize();
      function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(
          0,
          0,
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        );
        for (let i = 0; i < particlesArray?.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
      }
      animate();
    });
  }, []);

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const userAddhandler = () => {
    dispatch(collectTaxSliceAction.collectCGST({ userName }));
  };

  console.log(user, "user");

  return (
    <div>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        className="canvas"
        ref={canvasRef}
      ></canvas>
      {/* <input type="text" value={userName} onChange={nameChangeHandler} />
      <button onClick={userAddhandler}>Add</button> */}
    </div>
  );
};

export default CanvasDrawing;
