let canvas = document.getElementById("render")
let engine = new BABYLON.Engine(canvas, true)

"use strict";

var x = 0;
var enableMesh = false;
console.log(enableMesh);

var scene = new BABYLON.Scene(engine);

var isButtonUp, isButtonDown = false;

BABYLON.SceneLoader.Append("city/", "city.babylon", scene, function (scene) {    

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var control = new BABYLON.GUI.TextBlock();
    control.text = "Use keyboard arrow left and right \n to look left and right";
    control.color = "white";
    control.fontSize = 20;
    control.top = -400;
    advancedTexture.addControl(control);   

    var title = new BABYLON.GUI.TextBlock();
    title.text = "THE DEATHLY HALLOWS QUEST";
    title.color = "black";
    title.fontSize = 30;
    title.top = -120;
    advancedTexture.addControl(title);  

    var description = new BABYLON.GUI.TextBlock();
    description.text = "Find the three magical objects and become the Master of Death 💀👑";
    description.color = "grey";
    description.fontSize = 20;
    description.top = -80;
    advancedTexture.addControl(description);   

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Start");
    button1.width = "150px";
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "blue";
    button1.onPointerUpObservable.add(function() {
        enableMesh = true;
        button1.isVisible = false;
        control.isVisible = false;
        title.isVisible = false;
        description.isVisible = false;
        start();
    });
    advancedTexture.addControl(button1);  

    var buttonFwd = BABYLON.GUI.Button.CreateSimpleButton("fwdB", "Forward"); 
    buttonFwd.width = "200px";
    buttonFwd.height = "50px";
    buttonFwd.color = "white";
    buttonFwd.background = "blue";
    buttonFwd.top = 300;
    buttonFwd.paddingRight = "100px";
    buttonFwd.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    buttonFwd.onPointerDownObservable.add(function () {
        isButtonUp = true;
    });
    buttonFwd.onPointerUpObservable.add(() => {
        isButtonUp = false;
    });

    advancedTexture.addControl(buttonFwd);

    var buttonBack = BABYLON.GUI.Button.CreateSimpleButton("buttonBack", "Back");
    buttonBack.width = "200px";
    buttonBack.height = "50px";
    buttonBack.color = "white";
    buttonBack.background = "blue";
    buttonBack.top = 350;
    buttonBack.paddingRight = "100px";
    buttonBack.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    buttonBack.onPointerDownObservable.add(function () {
        isButtonDown = true;
    });
    buttonBack.onPointerUpObservable.add(() => {
        isButtonDown = false;
    });

    advancedTexture.addControl(buttonBack);

    // Define shader material
    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertexElement: "vertexShaderCode",
        fragmentElement: "fragmentShaderCode"
    }, {
        attributes: ["position", "normal", "uv"],
        uniforms: ["world", "worldView", "worldViewProjection", "view", "project"]
    });
    var mainTexture = new BABYLON.Texture("black.jpg", scene);
    shaderMaterial.setTexture("textureSampler", mainTexture);

    // Sky box
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:250}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.01;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    
    // Spawn the checkpoints
    var cloak = createCheckPointOne(scene, shaderMaterial);
    var wand = createCheckPointTwo(scene, shaderMaterial);
    var stone = createCheckPointThree(scene, shaderMaterial);
        
    // Show the timer of the game but invisible before game end
    var count = 10
    count++ 
    var gameOver = new BABYLON.GUI.TextBlock();
    gameOver.text = + count + " Seconds";
    gameOver.color = "white";
    gameOver.fontSize = 24;
    gameOver.top = 100
    gameOver.isVisible = false
    advancedTexture.addControl(gameOver);   

    // Declare the congratulation GUI of the game but invisible before game end
    var congratz = new BABYLON.GUI.TextBlock();
    congratz.text = "CONGRATULATION you possess all the Deathly Hallows\nYou are the Master of Death 💀👑";
    congratz.color = "white";
    congratz.fontSize = 30;
    congratz.isVisible = false
    advancedTexture.addControl(congratz);   

    let cam = camera(scene);

    // Load the sound and play it automatically once ready
    let music = new BABYLON.Sound("music", "music/music.mp3", scene, null, { loop: true, autoplay: true });

    scene.registerBeforeRender(function () {
        if (isButtonUp) {
            cam.position.addInPlace(cam.getDirection(BABYLON.Vector3.Forward()));
        }
        if (isButtonDown) {
            cam.position.addInPlace(cam.getDirection(BABYLON.Vector3.Backward()));
        }
        cloak.isPickable = enableMesh;
        wand.isPickable = enableMesh;
        stone.isPickable = enableMesh;

        var timeSec = returnData(second);
        var timeMin = returnData(minute);

        if (x == 3 || x > 3){
            stop();
            clearTimeout(timer);
            clearInterval(cron);

            congratz.isVisible = true                    

            gameOver.isVisible = true
            if (!scene.deltaTime) return;
            count -= (scene.deltaTime / 1000);
            gameOver.text = String(timeMin) + " Minutes " + String(timeSec) + " Seconds";   
        }
    })

    engine.runRenderLoop(() => {
        scene.render()
    })
    window.addEventListener("resize", () => {
        engine.resize()
    })
});
