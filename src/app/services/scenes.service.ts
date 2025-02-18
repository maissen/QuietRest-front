import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  public api_get_all_scenes = 'https://quietrest-back.onrender.com/api/get-scenes';
  public api_get_active_scene = 'https://quietrest-back.onrender.com/api/get-active-scene';

  private scenesList: any[] = [];
  private activeScene: any;

  setScenesList(list: any[]) {
    this.scenesList = list;
  }

  getScenesList(): any[] {
    return this.scenesList;
  }  

  setActiveScene(scene: any) {
    this.activeScene = scene;
  }

  getActiveScene(): any {
    return this.activeScene;
  }

  getSceneByID(sceneID: number): any {
    return this.scenesList.find(scene => scene.id === sceneID);
  }
}
