import {HouseStyle, SecurityType} from '../interfaces';
import {Door} from './door';
import {SecuritySystem} from './security-system';
import {WindowModel} from './window-model';

export class House {
  public maxFloor = 1;
  public color = 'black';

  public windows: WindowModel[] = [];
  public door: Door;
  public securitySystem?: SecuritySystem;

  // этот флаг использовался в старом наследовании
  // оставил для возможной совместимости
  // хотя он нигде не используется
  public securitySystemNotCreated(): boolean {
    return this.securitySystem != undefined;
  }

  public constructor(
    windowsConfig: { count: number, size: number; style: HouseStyle },
    doorConfig: { size: number; style: HouseStyle },
    securitySystemConfig?: { type: SecurityType },
  ) {

    if(securitySystemConfig){
      this.securitySystem = new SecuritySystem(securitySystemConfig)
    }
    this.door = new Door(doorConfig);
    for (let i = 0; i < windowsConfig.count; i++) {
      this.windows.push(new WindowModel(windowsConfig));
    }
  }

  public openAllWindows(): void {
    this.windows.forEach(w => w.openWindow());
  }

  public paint(color: string): void {
    this.color = color;
  }

  public addFloor(): void {
    this.maxFloor += 1;
  }
}
