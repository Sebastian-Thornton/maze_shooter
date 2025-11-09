var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  light.intensity = 0.7;

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);
  sphere.position.y = 1;

  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

  return scene;
};

var scene = createScene();
engine.runRenderLoop(function () {
  scene.render();
});