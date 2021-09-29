// キャンバスサイズ
var SCREEN_WIDTH = 800;
var SCREEN_HEIGTH = 800;

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
    //html内に書いておいたcanvasのidをかけば、そこにレンダリングされる。
    canvas: document.querySelector('#myCanvas')
});
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGTH);
document.body.appendChild(renderer.domElement);

let mouse; //マウスの位置
let speed = 0.01; //四角形の回転スピード

let canvas = document.getElementById("myCanvas"); //htmlのcanvas要素を取得
// マウスが動いたら、マウスの位置を取得。
canvas.addEventListener('mousemove', function (e) {
    mouse = [e.offsetX, e.offsetY];
    // 以下のmap関数を用いて変換。
    speed = map(mouse[1], 1, 800, 0, 1) / 2;
});

// map()関数を作成。
// start1~end1の間で動くvalueの値を、start2~end2の間で動く値に変換。
// 例えば、1~100の間を動く50を、0~1の0.5に変換してくれます。
function map(value, start1, end1, start2, end2) {
    return start2 + (end2 - start2) * ((value - start1) / (end1 - start1));
}

//シーンを作成
var scene = new THREE.Scene();

//カメラを作成
//画角や、カメラの距離とかを設定。
var camera = new THREE.PerspectiveCamera(55, SCREEN_WIDTH / SCREEN_HEIGTH, 1, 1000);
var vFOV = camera.fov * (Math.PI / 180);
// カメラのz位置を書き換える。
camera.position.z = SCREEN_HEIGTH / (2 * Math.tan(vFOV / 2));

//四角インスタンスに入れる設定を作る。
var geometry = new THREE.PlaneGeometry(500, 60, 2, 2);
var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
});
// Three.meshインスタンスを作成。設定を入れておく。
var plane = new THREE.Mesh(geometry, material);
// sceneに入れておく。(あとでレンダリングする。)
scene.add(plane);

//描くための関数を作成
function render() {
    //これがあると、アニメーションになる。
    requestAnimationFrame(render);
    //回転。
    plane.rotation.x += speed;
    //シーンとカメラをレンダリング
    renderer.render(scene, camera);
}

// 最後に関数実行
render();