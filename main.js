// Right-click on index.html and click Open with Live Server for full dev tooling.

let canvas = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);

// await window.CrazyGames.SDK.init();

let level_data, map

const response = await fetch('./public/level_data.json');
level_data = await response.json();

console.log(level_data);







let createScene = function () {



    let scene = new BABYLON.Scene(engine);

    let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    scene.enablePhysics(new BABYLON.Vector3(0, -0.5, 0), new BABYLON.CannonJSPlugin());

    let light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);
    light.shadowEnabled = true;
    light.intensity = 0.7;

    /* map = new Array(level_data[level_number].grid.length);
    for(let z = 0; z<level_data.level[level_number].grid.length; z++) {
        map[z] = new Array(level_data.level[level_number].grid[0].length);
        for(let y = 0; y<level_data.level[level_number].grid[0].length; y++) {
            map[z][y] = new Array(level_data.level[level_number].grid[0][0].length);
            for(let x = 0; x<level_data.level[level_number].grid[0][0].length; x++) {
                if (level_data.level[level_number].grid[0][0].length == 1) {
                    map[x][y][z] = BABYLON.MeshBuilder.CreateBox("box",1,1,1,scene);
                }
            }
        }
    } */

    let loadLevel = function(level_number) {
    console.log(level_data);
    console.log(level_data.levels[level_number].grid.length);
    map = new Array(level_data.levels[level_number].grid.length);
    for(let z = 0; z<level_data.levels[level_number].grid.length; z++) {
        map[z] = new Array(level_data.levels[level_number].grid[z].length);
        for(let y = 0; y<level_data.levels[level_number].grid[z].length; y++) {
            map[z][y] = new Array(level_data.levels[level_number].grid[z][y].length);
            for(let x = 0; x<level_data.levels[level_number].grid[z][y].length; x++) {
                if (level_data.levels[level_number].grid[z][y][x] == 1) {
                    map[z][y][x] = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 1, depth: 1}, scene);
                    map[z][y][x].position.x = x
                    map[z][y][x].position.y = y
                    map[z][y][x].position.z = z
                }
            }
        }
    }
    return map
}
    
    map = loadLevel(0);
    console.log(map);

    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2}, scene);
    sphere.position.y = 2;

    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(sphere);
    ground.receiveShadows = true;

    return scene;
};

let scene = createScene();
engine.runRenderLoop(function () {
    scene.render();
});