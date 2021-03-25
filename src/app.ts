import { Engine, Scene, FreeCamera, Vector3, Mesh, Curve3, Color3, Color4 } from "@babylonjs/core";

class App {
    constructor() {
        const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        
        let engine = new Engine(canvas, true);
        let scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
        
        let camera = new FreeCamera("camera", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        
        let quadOrigin = new Vector3(-4, 0, 0);
        let quadDestination = new Vector3(-2, 0, 0);
        let quadControl = new Vector3(-3, 2, 0);
        let quadPoints = 30;

        let quadBezierVectors = Curve3.CreateQuadraticBezier(quadOrigin, quadControl, quadDestination, quadPoints);
        let quadBezierCurve = Mesh.CreateLines("quadBezier", quadBezierVectors.getPoints(), scene);
        quadBezierCurve.color = new Color3(1, 0, 0);

        let cubicOrigin = new Vector3(2, 0, 0);
        let cubicDestination = new Vector3(4, 0, 0);
        let cubicControlOne = new Vector3(2.5, 2, 0);
        let cubicControlTwo = new Vector3(3.5, 2, 0);
        let cubicPoints = 30;

        let cubicBezierVectors = Curve3.CreateCubicBezier(cubicOrigin, cubicControlOne, cubicControlTwo, cubicDestination, cubicPoints);
        let cubicBezierCurve = Mesh.CreateLines("cubicBezier", cubicBezierVectors.getPoints(), scene);
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