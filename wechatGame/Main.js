/**
 * 初始化整个游戏的精灵，游戏开始的入口
 */
import {DataStore} from './js/base/DataStore.js';
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Birds} from "./js/player/Birds.js";
import {Score} from "./js/player/Score.js";
import {StartButton} from "./js/player/StartButton.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {Land} from "./js/runtime/land.js";
import {Director} from './js/Director.js'

export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }
    // bgm
    createBackgroundMusic(){
        const bgm =wx.createInnerAudioContext();
        bgm.autoplay=true;
        bgm.loop=true;
        bgm.src='./audios/bgm.mp3'
    }
    onResourceFirstLoaded(map) {
        this.dataStore.canvas=this.canvas;
        this.dataStore.ctx=this.ctx;
        this.dataStore.res=map;
        this.createBackgroundMusic();
        this.init();
    }
    init(){
        // 首先重置游戏是没有结束的
        this.director.isGameOver=false;
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton);
        this.registerEvent();
        // 创建铅笔要在游戏逻辑运行之前
        this.director.createPencil();
        this.director.run();
    }
    registerEvent(){
        wx.onTouchStart(()=>{
            if(this.director.isGameOver){
                console.log('游戏开始');
                this.init();
            }else {
                this.director.birdsEvent();
            }
        })
    }
}