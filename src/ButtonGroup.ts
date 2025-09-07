
import { ButtonGroupConfig, SmartButtonConfig } from './types';
import { SmartButton } from './SmartButton';
import { mergeClasses, validateConfig, generateId } from './utils';

export class ButtonGroup {
  private element: HTMLDivElement;
  private config: ButtonGroupConfig;
  private buttons: SmartButton[] = [];
  private isDestroyed: boolean = false;

  constructor(config: ButtonGroupConfig) {
    if (!validateConfig(config)) {
      throw new Error('Invalid configuration provided');
    }

    this.config = {
      direction: 'horizontal',
      spacing: '0.5rem',
      alignment: 'start',
      wrap: false,
      ...config
    };

    this.element = this.createElement();
    this.createButtons();
  }

  private createElement(): HTMLDivElement {
    const group = document.createElement('div');
    group.className = this.buildClassName();
    group.id = generateId();

    group.style.display = 'inline-flex';
    group.style.flexDirection = this.config.direction === 'vertical' ? 'column' : 'row';
    group.style.alignItems = this.getAlignment();
    group.style.gap = this.config.spacing || '0.5rem';
    group.style.flexWrap = this.config.wrap ? 'wrap' : 'nowrap';

    return group;
  }

  private buildClassName(): string {
    const classes = ['smart-button-group'];
    
    if (this.config.direction === 'vertical') {
      classes.push('smart-button-group--vertical');
    }
    
    return mergeClasses(...classes);
  }

  private getAlignment(): string {
    const alignmentMap = {
      'start': 'flex-start',
      'center': 'center',
      'end': 'flex-end'
    };
    return alignmentMap[this.config.alignment || 'start'];
  }

  private createButtons(): void {
    this.config.buttons.forEach((buttonConfig, index) => {
      const button = new SmartButton(buttonConfig);
      this.buttons.push(button);
      this.element.appendChild(button.getElement());
    });
  }

  public addButton(buttonConfig: SmartButtonConfig, index?: number): void {
    const button = new SmartButton(buttonConfig);
    
    if (index !== undefined && index >= 0 && index <= this.buttons.length) {
      this.buttons.splice(index, 0, button);
      const nextSibling = this.element.children[index];
      this.element.insertBefore(button.getElement(), nextSibling);
    } else {
      this.buttons.push(button);
      this.element.appendChild(button.getElement());
    }
  }

  public removeButton(index: number): boolean {
    if (index < 0 || index >= this.buttons.length) {
      return false;
    }

    const button = this.buttons[index];
    button.destroy();
    this.buttons.splice(index, 1);
    
    return true;
  }

  public getButton(index: number): SmartButton | null {
    if (index < 0 || index >= this.buttons.length) {
      return null;
    }
    return this.buttons[index];
  }

  public getButtons(): SmartButton[] {
    return [...this.buttons];
  }

  public setEnabled(enabled: boolean): void {
    this.buttons.forEach(button => {
      button.setEnabled(enabled);
    });
  }

  public setType(type: string): void {
    this.buttons.forEach(button => {
      button.setType(type as any);
    });
  }

  public setSize(size: string): void {
    this.buttons.forEach(button => {
      button.setSize(size as any);
    });
  }

  public updateConfig(newConfig: Partial<ButtonGroupConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    this.element.style.flexDirection = this.config.direction === 'vertical' ? 'column' : 'row';
    this.element.style.alignItems = this.getAlignment();
    this.element.style.gap = this.config.spacing || '0.5rem';
    this.element.style.flexWrap = this.config.wrap ? 'wrap' : 'nowrap';
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }

  public getConfig(): ButtonGroupConfig {
    return { ...this.config };
  }

  public destroy(): void {
    if (this.isDestroyed) return;
    
    this.buttons.forEach(button => {
      button.destroy();
    });
    this.buttons = [];
    
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    this.isDestroyed = true;
  }

  public isDestroyedState(): boolean {
    return this.isDestroyed;
  }
}

export default ButtonGroup;
