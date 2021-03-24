import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, Mesh, Animation, PBRMaterial, StandardMaterial, ReflectionProbe, Color3 } from "@babylonjs/core";
import { SkyMaterial } from "@babylonjs/materials";

class App {
    constructor() {
        const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        
        var camera = new FreeCamera("camera", new Vector3(0, 2.5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        
        var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        
        var sphere = Mesh.CreateSphere("sphere", 16, 2, scene);
        sphere.position.y = 1;

        var ground = Mesh.CreateGround("ground", 6, 6, 2, scene);

        var green = new StandardMaterial("greenMaterial", scene);
        green.diffuseColor = new Color3(0.219, 0.502, 0.016);
        ground.material= green

        var skyboxMaterial = new SkyMaterial("skyMaterial", scene);
        skyboxMaterial.backFaceCulling = false;

        var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
        skybox.material = skyboxMaterial;

        var rp = new ReflectionProbe('ref', 512, scene);
        rp.renderList.push(skybox);

        var pbr = new PBRMaterial('pbr', scene);
        pbr.reflectionTexture = rp.cubeTexture;
        sphere.material = pbr;

        window.addEventListener("keydown", function (evt) {
            switch (evt.code) {
                case 'Digit1': setSkyConfig("material.inclination", skyboxMaterial.inclination, 0); break; // 1
                case 'Digit2': setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5); break; // 2
    
                case 'Digit3': setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1); break; // 3
                case 'Digit4': setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0); break; // 4
                
                case 'Digit5': setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 40); break; // 5
                case 'Digit6': setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5); break; // 6
                
                case 'Digit7': setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50); break; // 7
                case 'Digit8': setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0); break;  // 8

                default: break;
            }
        });

        var setSkyConfig = function (property, from, to) {
            var keys = [
                { frame: 0, value: from },
                { frame: 100, value: to }
            ];
            
            var animation = new Animation("animation", property, 100, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
            animation.setKeys(keys);
            
            scene.stopAnimation(skybox);
            scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
        };
        setSkyConfig("material.inclination", skyboxMaterial.inclination, 0);

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
    });
    }
}
new App();