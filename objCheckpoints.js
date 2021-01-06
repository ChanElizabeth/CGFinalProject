const createCheckPointOne = (scene, material) => {
    
    var cape = BABYLON.SceneLoader.ImportMesh("", "cape/", "trixie-cape.obj", scene, function (newMeshes) {
        var cape = newMeshes[0];
        cape.material = material;
        cape.rotation.z = Math.PI;
        cape.position = new BABYLON.Vector3(40, 25, -5);
        cape.scaling = new BABYLON.Vector3(10, 10, 10);

        BABYLON.Animation.CreateAndStartAnimation("anim", cape, "position", 30, 120,
            cape.position, cape.position.add(new BABYLON.Vector3(0, 5, 0)));
            cape.actionManager = new BABYLON.ActionManager(scene);
            cape.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                x = x + 1;
                alert("You found the invisible cape\n Objects: " + String(x) + "/3");
                cape.scaling = new BABYLON.Vector3(0, 0, 0)
            }));
    });   

    return cape;
}

const createCheckPointTwo = (scene, material) => {

    let wand = new BABYLON.SceneLoader.ImportMesh('', 'wand-obj/', 'wand.obj', scene, (obj) => {
        obj.forEach((object, index) => {
            object.position = new BABYLON.Vector3(-5, 25, -20);
            object.scaling = new BABYLON.Vector3(1, 1, 1);
            object.rotation.z = Math.PI/4;
            object.material = material;
            var wandAnimation = new BABYLON.Animation("wandAnimation", "rotation.y", 60 , BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
            var wandAnimationKeys = [];
            wandAnimationKeys.push({
                frame: 0,
                value: 0
            });
            wandAnimationKeys.push({
                frame: 100,
                value: Math.PI
            });
            wandAnimation.setKeys(wandAnimationKeys);

            obj.animations = [wandAnimation];
            scene.beginAnimation(obj, 0, 100, true);

            object.actionManager = new BABYLON.ActionManager(scene);
            object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
                x = x + 1;
                alert("You found the wand\n Objects: "+ String(x) + "/3");
                object.scaling = new BABYLON.Vector3(0, 0, 0)
            }));
        });
    });

    return wand;

}

const createCheckPointThree = (scene, material) => {

    var stone = BABYLON.SceneLoader.ImportMesh("", "prism-obj/", "prism.obj", scene, function (newMeshes) {
        var stone = newMeshes[0];
        stone.material = material;
        stone.position = new BABYLON.Vector3(105, 25, 15);
        stone.scaling = new BABYLON.Vector3(0.8, 0.8, 0.8);

        BABYLON.Animation.CreateAndStartAnimation("anims", stone, "position", 30, 120,
            stone.position, stone.position.add(new BABYLON.Vector3(0, 0, 10)));

        stone.actionManager = new BABYLON.ActionManager(scene);
        stone.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            x = x + 1;
            alert("You found the resurrection stone\n Objects: " + String(x) + "/3");
            stone.scaling = new BABYLON.Vector3(0, 0, 0)
        }));
    });   

    return stone;
}