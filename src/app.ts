import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, SceneLoader, Color4, TransformNode, Color3, DirectionalLight, DefaultRenderingPipeline, ColorCurves, ColorGradingTexture, PBRMaterial, MeshBuilder, ReflectionProbe, Texture, Mesh } from "@babylonjs/core";

class App {

    scene! : Scene;
    engine! : Engine;
    camera! :ArcRotateCamera;

    constructor() {
        var canvas :HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
        this.engine = new Engine(canvas, true);
        this.scene = new Scene(this.engine);
        this.CreateCamera();
        if(canvas.height>canvas.width){this.camera.upVector= new Vector3(-1,0,0);}else{this.camera.upVector= new Vector3(0,1,0)};


        window.addEventListener("resize",()=>{this.resizeEngine() 
            if(canvas.height>canvas.width){this.camera.upVector= new Vector3(-1,0,0);}else{this.camera.upVector= new Vector3(0,1,0)};
        });
        const dirLight : DirectionalLight = new DirectionalLight("dirLight",Vector3.Up(),this.scene);
        dirLight.diffuse = new Color3(0.1,0.1,0.1);
        dirLight.specular = Color3.Blue();
        dirLight.intensity=1;
         dirLight.radius= 1;



        var defaultPipeline = new DefaultRenderingPipeline(
            "DefaultRenderingPipeline",
            true, // is HDR?
            this.scene,
            this.scene.cameras
        );
        if (defaultPipeline.isSupported) {
            /* MSAA */
            defaultPipeline.samples = 1; // 1 by default
            /* imageProcessing */
            defaultPipeline.imageProcessingEnabled = true; //true by default
            if (defaultPipeline.imageProcessingEnabled) {
                defaultPipeline.imageProcessing.contrast = 1;
                defaultPipeline.imageProcessing.exposure = 1; 
                defaultPipeline.imageProcessing.colorGradingEnabled = false; 
                if (defaultPipeline.imageProcessing.colorGradingEnabled) {
                    defaultPipeline.imageProcessing.colorGradingTexture = new ColorGradingTexture("textures/LateSunset.3dl", this.scene);
                }
                defaultPipeline.imageProcessing.colorCurvesEnabled = false; // false by default
                if (defaultPipeline.imageProcessing.colorCurvesEnabled) {
                    var curve = new ColorCurves();
                    curve.globalDensity = 50; // 0 by default
                    curve.globalExposure = 10; // 0 by default
                    curve.globalHue = 240; // 30 by default
                    curve.globalSaturation = 0; // 0 by default
                    curve.highlightsDensity = 10; // 0 by default
                    curve.highlightsExposure = 50; // 0 by default
                    curve.highlightsHue = 30; // 30 by default
                    curve.highlightsSaturation = 20; // 0 by default
                    curve.midtonesDensity = 20; // 0 by default
                    curve.midtonesExposure = -50; // 0 by default
                    curve.midtonesHue = 300; // 30 by default
                    curve.midtonesSaturation = 10; // 0 by default
                    curve.shadowsDensity = 100; // 0 by default
                    curve.shadowsExposure = 50; // 0 by default
                    curve.shadowsHue = 30; // 30 by default
                    curve.shadowsSaturation = 0; // 0 by default;
                    defaultPipeline.imageProcessing.colorCurves = curve;
                }
            }
            defaultPipeline.bloomEnabled = false; // false by default
            defaultPipeline.chromaticAberrationEnabled = false; // false by default
            defaultPipeline.depthOfFieldEnabled = false; // false by default
            defaultPipeline.fxaaEnabled = true; // false by default
            if (defaultPipeline.fxaaEnabled) {
                defaultPipeline.fxaa.samples = 4; // 1 by default
                defaultPipeline.fxaa.adaptScaleToCurrentViewport = true; // false by default
            }
            defaultPipeline.glowLayerEnabled = false;
            defaultPipeline.grainEnabled = true;
            if (defaultPipeline.grainEnabled) {
                defaultPipeline.grain.adaptScaleToCurrentViewport = true; // false by default
                defaultPipeline.grain.animated = false; // false by default
                // defaultPipeline.grain.intensity = 20; // 30 by default
                defaultPipeline.grain.intensity = 25; // 30 by default
                // defaultPipeline.grain.inspectableCustomProperties
            }
            defaultPipeline.sharpenEnabled = false;
        }

        this.CreateMonolyths2();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    async CreateMonolyths2(){

        this.scene.clearColor = new Color4(0,0,0);
        this.scene.environmentIntensity = 2;

        const {meshes} = await SceneLoader.ImportMeshAsync("","./assets/models/","Monolyths3.glb");

        const planeMat1 = new PBRMaterial("planeMat",this.scene);
        planeMat1.emissiveColor = new Color3(110/255,255/255,245/255);
        planeMat1.emissiveIntensity = 1;

        const planeMat2 = new PBRMaterial("planeMat2",this.scene);
        planeMat2.emissiveTexture = new Texture("./assets/textures/grad1.png",this.scene);
        planeMat2.emissiveColor = Color3.White();
        planeMat2.emissiveIntensity = 1;

        const planeMat3 = new PBRMaterial("planeMat3",this.scene);
        planeMat3.emissiveColor = new Color3(149/255,0/255,255/255);
        planeMat3.emissiveIntensity = 1;
        
        const planeMat4 = new PBRMaterial("planeMat4",this.scene);
        planeMat4.emissiveTexture = new Texture("./assets/textures/grad2.png",this.scene);
        planeMat4.emissiveColor = Color3.White();
        planeMat4.emissiveIntensity = 2;

        const planeMat5 = new PBRMaterial("planeMat5",this.scene);
        planeMat5.emissiveColor = Color3.White();
        planeMat5.emissiveIntensity = 100;

        const planeMat6 = new PBRMaterial("planeMat6",this.scene);
        planeMat6.emissiveTexture = new Texture("./assets/textures/grad3.png",this.scene);
        planeMat6.emissiveColor = Color3.White();
        planeMat6.emissiveIntensity = 1;

        
        let allPlanesArr = [] as Mesh[];
        let planeArr1 = [] as Mesh[];
        
        const liftplane = -.1;
        const plane1 = MeshBuilder.CreatePlane("plane1",{width:0.05,height:10});
        plane1.rotationQuaternion = null;
        plane1.isVisible = true;
        plane1.rotation.x =-Math.PI/2;
        plane1.rotation.y =2*Math.PI/3;
        plane1.position.y = 0.3;
        plane1.material = planeMat1;
        
        const plane11 = MeshBuilder.CreatePlane("plane11",{width:0.2,height:10});
        plane11.rotationQuaternion = null;
        plane11.isVisible = true;
        plane11.rotation.x =-Math.PI/2;
        plane11.rotation.y =2*Math.PI/3;
        plane11.position.y = 0.35;
        plane11.material = planeMat2;
        
        const plane12 = MeshBuilder.CreatePlane("plane12",{width:0.025,height:10});
        plane12.rotationQuaternion = null;
        plane12.isVisible = true;
        plane12.rotation.x =-95*Math.PI/180;
        plane12.rotation.y =-0.9*Math.PI/2;
        plane12.position.y = 0.18;
        plane12.material = planeMat3;
        
        const plane13 = MeshBuilder.CreatePlane("plane13",{width:1.5,height:10});
        plane13.rotationQuaternion = null;
        plane13.isVisible = true;
        plane13.rotation.x =-Math.PI/2;
        plane13.rotation.y =2*Math.PI/3;
        plane13.position.y = 0.4;
        plane13.material = planeMat4;
        
        const plane14 = MeshBuilder.CreatePlane("plane14",{width:0.025,height:10});
        plane14.rotationQuaternion = null;
        plane14.isVisible = true;
        plane14.rotation.z = Math.PI/2;
        plane14.rotation.x = -Math.PI/4;
        plane14.position.y = 0.16;
        plane14.position.z = 0.06;
        plane14.material = planeMat5;
        
        
        const plane15 = MeshBuilder.CreatePlane("plane15",{width:0.025,height:10});
        plane15.rotationQuaternion = null;
        plane15.isVisible = true;
        plane15.rotation.z = Math.PI/2;
        plane15.rotation.x = -3*Math.PI/4;
        plane15.position.y = 0.16;
        plane15.position.z = -0.06;
        plane15.material = planeMat5;
        
        planeArr1.push(plane1,plane11,plane12,plane13,plane14,plane15);



        let planeArr2 = [] as Mesh[];

        const planeNode2 = new TransformNode("planeNode2",this.scene);
        planeNode2.rotationQuaternion = null;

        const planeNode21 = new TransformNode("planeNode21",this.scene);
        planeNode21.rotationQuaternion = null;

        const planeNode23 = new TransformNode("planeNode23",this.scene);
        planeNode23.rotationQuaternion = null;

        const planeNode24 = new TransformNode("planeNode24",this.scene);
        planeNode24.rotationQuaternion = null;




        const plane2 = MeshBuilder.CreatePlane("plane2",{width:0.05,height:10});
        plane2.rotationQuaternion = null;
        plane2.isVisible = true;
        plane2.rotation.z =-Math.PI/3;
        plane2.material = planeMat1;
        plane2.parent = planeNode2;
        
        const plane21 = MeshBuilder.CreatePlane("plane21",{width:0.2,height:10});
        plane21.rotationQuaternion = null;
        plane21.isVisible = true;
        plane21.rotation.z =-Math.PI/3;
        plane21.material = planeMat2;
        plane21.parent = planeNode21;
        
        
        
        
        const plane22 = MeshBuilder.CreatePlane("plane22",{width:0.025,height:10});
        plane22.rotationQuaternion = null;
        plane22.isVisible = true;
        plane22.rotation.z = Math.PI/2;
        plane22.rotation.x = Math.PI/4;
        plane22.position.y = -0.16;
        plane22.position.z = 0.06;
        plane22.material = planeMat5;
        
        
        const plane23 = MeshBuilder.CreatePlane("plane23",{width:0.025,height:10});
        plane23.rotationQuaternion = null;
        plane23.isVisible = true;
        plane23.rotation.z =-82.5*Math.PI/180-Math.PI;
        plane23.material = planeMat6;
        plane23.parent = planeNode23;
        
        const plane24 = MeshBuilder.CreatePlane("plane24",{width:0.025,height:10});
        plane24.rotationQuaternion = null;
        plane24.isVisible = true;
        plane24.rotation.z =-97.5*Math.PI/180;
        plane24.material = planeMat6;
        plane24.parent = planeNode24;
        
        
        
        planeNode2.position.y = 0.15;
        planeNode21.position.y = 0.18;
        planeNode23.position.z = 0.05;
        planeNode24.position.z = 0.05;
        planeNode24.position.y = -0.01;

        planeNode2.rotation.x =-Math.PI/4;
        planeNode21.rotation.x =-Math.PI/4;
        planeNode23.rotation.x =-Math.PI/4;
        planeNode24.rotation.x =-Math.PI/4;
        planeArr2.push(plane2,plane21,plane22,plane23,plane24);
        

        allPlanesArr.push(plane1,plane11,plane12,plane13,plane14,plane15,plane2,plane21,plane22,plane23,plane24);
        allPlanesArr.forEach(e=>{
            e.layerMask = 0x10000000;
        });


        // const probeSize = 256;
        // const probeSize = 128;
        // const probeSize = 64;
        // const probeSize = 16;
        const probeSize = 8;

        const mainMaterial = meshes[1].material as PBRMaterial;
        const mainMaterial2 = mainMaterial.clone("mainMat1");
        meshes[1].material = mainMaterial;
        meshes[2].material = mainMaterial2;
        
        const probe1 = new ReflectionProbe("probe1", probeSize, this.scene);
        planeArr1.forEach(e=>{
            probe1.renderList!.push(e);
        });
        mainMaterial.albedoColor = new Color3(1, 0.5, 0.5);	
        mainMaterial.roughness = 0.15;
        mainMaterial.reflectionTexture = probe1.cubeTexture;
        mainMaterial.realTimeFiltering = true;
        
        const probe2 = new ReflectionProbe("probe2", probeSize, this.scene);
        planeArr2.forEach(e => {
            probe2.renderList!.push(e);
        });
        mainMaterial2.albedoColor = new Color3(1, 0.5, 0.5);	
        mainMaterial2.roughness = 0.15;
        mainMaterial2.reflectionTexture = probe2.cubeTexture;
        mainMaterial2.realTimeFiltering = true;



        //POSITIONING
        const node1 = new TransformNode("node1");
        const node2 = new TransformNode("node2");
        const theNode1 = new TransformNode("theNode1");
        const theNode2 = new TransformNode("theNode2");
        const theMainNode = new TransformNode("theMainNode");
        
        meshes[1].parent = node1;
        meshes[2].parent = node2;
        node1.parent =theNode1;
        node2.parent =theNode2;
        theNode1.parent = theMainNode;
        theNode2.parent = theMainNode;
        
        
        meshes[1].rotationQuaternion = null;
        meshes[2].rotationQuaternion = null;
        node1.rotationQuaternion = null;
        node2.rotationQuaternion = null;
        theNode1.rotationQuaternion = null;
        theNode2.rotationQuaternion = null;
        theMainNode.rotationQuaternion = null;
        
        
        meshes[1].rotation.x = Math.PI/6;
        meshes[2].rotation.x = -Math.PI/6;
        
        
        node1.rotation.z = Math.PI/12;
        
        
        node1.rotation.z = -Math.PI/12;
        node2.rotation.z = Math.PI/12;
        theNode1.rotation.y = -Math.PI/6;
        theNode2.rotation.y = Math.PI/6;
        
        node2.position.y +=0.1;
        node2.position.z -=0.3;




        let body :any;
        let html :any;
        let fullHeight :any;
        let height :any;
        let deltaHeight :any;
        let scrollTop = 0;
        let oldScrollTop =0;
        let oldScrollTop0 =1;
        let tFraction = 0;
        let mesh1X0 = 0;
        let mesh2X0 = 0;
        let mainNodeZ0 = 0;
        let node1Z0 = 0;
        let node2Z0 = 0;
        let theNode1Y0 = 0;
        let theNode2Y0 = 0;
        let mesh1FinalX = 0;
        let mesh2FinalX = 0;
        let mainNodeFinalZ = 0;
        let node1FinalZ = 0;
        let node2FinalZ = 0;
        let theNode1FinalY = 0;
        let theNode2FinalY = 0;
        
        
        
        
        
        body = document.body;
        html = document.documentElement;
        fullHeight = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight);
        height = document.body.offsetHeight;
        deltaHeight = fullHeight -height;
        
        
        
        
        window.addEventListener("resize",function(){
            body = document.body;
            html = document.documentElement;
            fullHeight = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight);
            height = document.body.offsetHeight;
            deltaHeight = fullHeight -height;
            // console.log("resized");
        });

        
        scrollTop = document.body.scrollTop;
        
        document.body.addEventListener("scroll", function(){
            scrollTop = document.body.scrollTop;
            // console.log("scrolled");
        });
        
        
        
        const rotateCoeff = 1/2;
        const animFrameSeconds = 6;
        const animFrameQuantity =animFrameSeconds*60;
        let maxtFraction =animFrameQuantity;
        let endFraction = true;
        const bazierPow = 1/6;
        let scrollDir = 0;
        let scrollDirOld =0;

        
        this.scene.registerBeforeRender(()=>{
            if(oldScrollTop>scrollTop){
                scrollDir = 1;
            }else if(oldScrollTop<scrollTop){
                scrollDir = 2;
            }
            if(oldScrollTop!==scrollTop){

                // if(scrollDirOld ==0){
                //     scrollDirOld = scrollDir;
                // }

                if(scrollDir!== scrollDirOld){
                    mesh1X0 = meshes[1].rotation.x;
                    mesh2X0 = meshes[2].rotation.x;
                    node1Z0 = node1.rotation.z;
                    node2Z0 = node2.rotation.z;
                    theNode1Y0 = theNode1.position.y;
                    theNode2Y0 = theNode2.position.y;
                    mainNodeZ0 = theMainNode.rotation.z; 
                    scrollDirOld = scrollDir;
                }

                if(endFraction==true){
                    mesh1X0 = meshes[1].rotation.x;
                    mesh2X0 = meshes[2].rotation.x;
                    node1Z0 = node1.rotation.z;
                    node2Z0 = node2.rotation.z;
                    theNode1Y0 = theNode1.position.y;
                    theNode2Y0 = theNode2.position.y;
                    mainNodeZ0 = theMainNode.rotation.z;
                }
                
                
                mesh1FinalX = Math.PI/6 + rotateCoeff*Math.PI*(scrollTop/deltaHeight)*2;
                mesh2FinalX = -Math.PI/6 - rotateCoeff*Math.PI*(scrollTop/deltaHeight)*2;
                node1FinalZ = -Math.PI/12 - Math.PI*Math.sin((scrollTop/deltaHeight)*Math.PI)/4;
                node2FinalZ = +Math.PI/12 + Math.PI*Math.sin((scrollTop/deltaHeight)*Math.PI)/4;
                theNode1FinalY = Math.sin((scrollTop/deltaHeight)*Math.PI)/3;
                theNode2FinalY = -Math.sin((scrollTop/deltaHeight)*Math.PI)/2;
                mainNodeFinalZ = Math.PI*Math.sin((scrollTop/deltaHeight)*Math.PI/2)/12;
                
                // oldScrollTop = scrollTop;
                oldScrollTop = scrollTop;
                maxtFraction = tFraction+animFrameQuantity;
                endFraction = false;
                // tFraction =0;
            }

            
            if(!endFraction){
                if(tFraction<=maxtFraction){
                    meshes[1].rotation.x = (mesh1FinalX- mesh1X0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+mesh1X0;
                    meshes[2].rotation.x = (mesh2FinalX- mesh2X0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+mesh2X0;
                    node1.rotation.z = (node1FinalZ-node1Z0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+node1Z0;
                    node2.rotation.z = (node2FinalZ-node2Z0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+node2Z0;
                    theNode1.position.y = (theNode1FinalY-theNode1Y0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+theNode1Y0;
                    theNode2.position.y = (theNode2FinalY-theNode2Y0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+theNode2Y0;
                    theMainNode.rotation.z = (mainNodeFinalZ- mainNodeZ0)*(Math.pow(Math.sin((tFraction/maxtFraction)*Math.PI/2),bazierPow))+mainNodeZ0;
                    if(tFraction!==animFrameQuantity){
                        tFraction+=1;
                    }else{
                        tFraction = 0;
                        maxtFraction = animFrameQuantity;
                        endFraction = true;
                        scrollDir =0;
                        scrollDirOld = 0;
                    }
                }
            }
            
        });
    }


    CreateCamera(){
        // this.camera = new ArcRotateCamera("Camera", Math.PI / 2, (2*Math.PI) / 5, 1.1, new Vector3(0.2,0,0), this.scene);
        this.camera = new ArcRotateCamera("Camera", Math.PI / 2, (2*Math.PI) / 5, 1.1, new Vector3(0.2,0,0), this.scene);
        this.camera.minZ = 0;
        this.camera.radius = 4;
        // this.camera.noRotationConstraint =true;
        // this.camera.rotationQuaternion
        // this.camera.rotation.z = Math.PI/2;
        // this.camera.attachControl();
    }

    resizeEngine(){
        this.engine.resize(true);
    }

}
new App();


