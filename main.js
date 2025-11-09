var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);

  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

  var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-1, -2, -1), scene);
  light.position = new BABYLON.Vector3(20, 40, 20);
  light.shadowEnabled = true;
  light.intensity = 0.7;

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);
  sphere.position.y = 2;

  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

  sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

  var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
  shadowGenerator.addShadowCaster(sphere);
  ground.receiveShadows = true;

  return scene;
};

var scene = createScene();
engine.runRenderLoop(function () {
  scene.render();
});