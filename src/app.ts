import { Engine, Scene, FreeCamera, Vector3, Mesh, Curve3, Color3, Color4 } from "@babylonjs/core";

class App {
    constructor() {
        const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        const divFps = document.getElementById("fps");
        
        const engine = new Engine(canvas, true);
        divFps.innerHTML = engine.getFps().toFixed() + " fps";

        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        
        const camera = new FreeCamera("camera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        
        const quadOrigin = new Vector3(-4, 0, 0);
        const quadDestination = new Vector3(-2, 0, 0);
        const quadControl = new Vector3(-3, 2, 0);
        const quadPoints = 30;

        const quadBezierVectors = Curve3.CreateQuadraticBezier(quadOrigin, quadControl, quadDestination, quadPoints);
        const quadBezierCurve = Mesh.CreateLines("quadBezier", quadBezierVectors.getPoints(), scene);
        quadBezierCurve.color = new Color3(1, 0, 0);

        const cubicOrigin = new Vector3(2, 0, 0);
        const cubicDestination = new Vector3(4, 0, 0);
        const cubicControlOne = new Vector3(2.5, 2, 0);
        const cubicControlTwo = new Vector3(3.5, 2, 0);
        const cubicPoints = 30;

        const cubicBezierVectors = Curve3.CreateCubicBezier(cubicOrigin, cubicControlOne, cubicControlTwo, cubicDestination, cubicPoints);
        const cubicBezierCurve = Mesh.CreateLines("cubicBezier", cubicBezierVectors.getPoints(), scene);
        cubicBezierCurve.color = new Color3(0, 0, 1);

        engine.runRenderLoop(() => {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
    });
    }
}
new App();