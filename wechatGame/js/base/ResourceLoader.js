/**
 * 资源文件夹在加载，确保canvas在图片加载完后 渲染
 */
import {Resources} from './Resources.js';

export class ResourceLoader{
    constructor(){
        this.map=new Map(Resources);
        for (let [key,value] of this.map){
            const  image=wx.createImage();
            image.src=value;
            this.map.set(key,image);
        }
    }
    onLoaded(callback){
        let loadedCount=0;
        for (let value of this.map.values()){
          value.onload=()=>{
            loadedCount++;
            if (loadedCount >= this.map.size) {
              callback(this.map);
            }
          }
            
        }
    }
    static create(){
        return new ResourceLoader();
    }
}