
import { 
  SmartButtonConfig, 
  ButtonType, 
  ButtonSize, 
  ButtonShape, 
  ButtonEffect,
  EffectConfig 
} from './types';
import { 
  generateId, 
  mergeClasses, 
  applyStyles, 
  createGradient, 
  createRippleEffect, 
  createIcon, 
  createLoadingSpinner,
  validateConfig,
  applyEffect,
  createCustomEvent,
  addEventListener,
  removeEventListener,
  convertValue
} from './utils';

export class SmartButton {
  private element: HTMLButtonElement;
  private config: SmartButtonConfig;
  private eventListeners: Map<string, EventListener> = new Map();
  private isDestroyed: boolean = false;

  constructor(config: SmartButtonConfig = {}) {
    if (!validateConfig(config)) {
      throw new Error('Invalid configuration provided');
    }

    this.config = {
      type: 'primary',
      size: 'md',
      shape: 'rounded',
      text: 'زر ذكي',
      disabled: false,
      loading: false,
      effect: 'none',
      ...config
    };

    this.element = this.createElement();
    this.attachEventListeners();
  }

  private createElement(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = this.buildClassName();
    button.textContent = this.config.text || '';
    button.disabled = this.config.disabled || false;
    button.id = generateId();

    if (this.config.customStyle) {
      applyStyles(button, this.config.customStyle);
    }

    if (this.config.gradient) {
      const gradient = createGradient(
        this.config.gradient.colors,
        this.config.gradient.direction,
        this.config.gradient.angle
      );
      button.style.background = gradient;
    }

    if (this.config.color) {
      button.style.color = this.config.color;
    }
    if (this.config.backgroundColor) {
      button.style.backgroundColor = this.config.backgroundColor;
    }
    if (this.config.borderColor) {
      button.style.borderColor = this.config.borderColor;
    }

    if (this.config.width) {
      button.style.width = convertValue(this.config.width);
    }
    if (this.config.height) {
      button.style.height = convertValue(this.config.height);
    }

    if (this.config.icon) {
      this.addIcon(button);
    }

    if (this.config.effect && this.config.effect !== 'none') {
      this.applyEffect(button);
    }

    if (this.config.loading) {
      this.setLoading(true);
    }

    return button;
  }

  private buildClassName(): string {
    const classes = ['smart-button'];
    
    if (this.config.type) {
      classes.push(`smart-button--${this.config.type}`);
    }
    
    if (this.config.size) {
      classes.push(`smart-button--${this.config.size}`);
    }
    
    if (this.config.shape) {
      classes.push(`smart-button--${this.config.shape}`);
    }
    
    if (this.config.effect && this.config.effect !== 'none') {
      classes.push(`smart-button--${this.config.effect}`);
    }
    
    if (this.config.loading) {
      classes.push('smart-button--loading');
    }
    
    if (this.config.customClass) {
      classes.push(this.config.customClass);
    }
    
    return mergeClasses(...classes);
  }

  private addIcon(button: HTMLButtonElement): void {
    if (!this.config.icon) return;

    let iconConfig;
    if (typeof this.config.icon === 'string') {
      iconConfig = {
        name: this.config.icon,
        position: 'left' as const
      };
    } else {
      iconConfig = this.config.icon;
    }

    const icon = createIcon(
      iconConfig.name,
      iconConfig.size,
      iconConfig.color
    );
    icon.classList.add(`smart-button__icon--${iconConfig.position}`);

    if (iconConfig.position === 'top' || iconConfig.position === 'bottom') {
      button.textContent = '';
    }

    if (iconConfig.position === 'left' || iconConfig.position === 'top') {
      button.insertBefore(icon, button.firstChild);
    } else {
      button.appendChild(icon);
    }
  }

  private applyEffect(button: HTMLButtonElement): void {
    if (!this.config.effect || this.config.effect === 'none') return;

    let effectConfig: EffectConfig;
    if (typeof this.config.effect === 'string') {
      effectConfig = {
        type: this.config.effect as ButtonEffect,
        duration: 300,
        intensity: 'medium'
      };
    } else {
      effectConfig = this.config.effect;
    }

    applyEffect(button, effectConfig);
  }

  private attachEventListeners(): void {
    if (this.config.onClick) {
      const clickHandler = (event: Event) => {
        const mouseEvent = event as MouseEvent;
        if (this.config.effect === 'ripple') {
          createRippleEffect(mouseEvent, this.element, this.config.rippleColor);
        }
        this.config.onClick!(mouseEvent);
      };
      this.eventListeners.set('click', clickHandler);
      addEventListener(this.element, 'click', clickHandler);
    }

    if (this.config.onHover) {
      const hoverHandler = (event: Event) => {
        const mouseEvent = event as MouseEvent;
        this.config.onHover!(mouseEvent);
      };
      this.eventListeners.set('mouseenter', hoverHandler);
      addEventListener(this.element, 'mouseenter', hoverHandler);
    }

    if (this.config.onFocus) {
      const focusHandler = (event: Event) => {
        const focusEvent = event as FocusEvent;
        this.config.onFocus!(focusEvent);
      };
      this.eventListeners.set('focus', focusHandler);
      addEventListener(this.element, 'focus', focusHandler);
    }

    if (this.config.onBlur) {
      const blurHandler = (event: Event) => {
        const focusEvent = event as FocusEvent;
        this.config.onBlur!(focusEvent);
      };
      this.eventListeners.set('blur', blurHandler);
      addEventListener(this.element, 'blur', blurHandler);
    }
  }

  public setLoading(loading: boolean): void {
    this.config.loading = loading;
    
    if (loading) {
      this.element.classList.add('smart-button--loading');
      this.element.disabled = true;
      
      const spinner = createLoadingSpinner('spinner');
      this.element.appendChild(spinner);
    } else {
      this.element.classList.remove('smart-button--loading');
      this.element.disabled = this.config.disabled || false;
      
      const spinner = this.element.querySelector('.smart-button__spinner');
      if (spinner) {
        spinner.remove();
      }
    }
  }

  public setText(text: string): void {
    this.config.text = text;
    this.element.textContent = text;
  }

  public setType(type: ButtonType): void {
    if (this.config.type) {
      this.element.classList.remove(`smart-button--${this.config.type}`);
    }
    
    this.config.type = type;
    this.element.classList.add(`smart-button--${type}`);
  }

  public setSize(size: ButtonSize): void {
    if (this.config.size) {
      this.element.classList.remove(`smart-button--${this.config.size}`);
    }
    
    this.config.size = size;
    this.element.classList.add(`smart-button--${size}`);
  }

  public setShape(shape: ButtonShape): void {
    if (this.config.shape) {
      this.element.classList.remove(`smart-button--${this.config.shape}`);
    }
    
    this.config.shape = shape;
    this.element.classList.add(`smart-button--${shape}`);
  }

  public setEffect(effect: ButtonEffect | EffectConfig): void {
    if (this.config.effect && this.config.effect !== 'none') {
      const oldEffect = typeof this.config.effect === 'string' 
        ? this.config.effect 
        : this.config.effect.type;
      this.element.classList.remove(`smart-button--${oldEffect}`);
    }
    
    this.config.effect = effect;
    if (effect !== 'none') {
      this.applyEffect(this.element);
    }
  }

  public setEnabled(enabled: boolean): void {
    this.config.disabled = !enabled;
    this.element.disabled = !enabled;
  }

  public getElement(): HTMLButtonElement {
    return this.element;
  }

  public getConfig(): SmartButtonConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<SmartButtonConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (newConfig.type || newConfig.size || newConfig.shape || newConfig.effect) {
      const parent = this.element.parentNode;
      const nextSibling = this.element.nextSibling;
      
      this.destroy();
      this.element = this.createElement();
      this.attachEventListeners();
      
      if (parent) {
        parent.insertBefore(this.element, nextSibling);
      }
    }
  }

  public addEventListener(event: string, handler: EventListener): void {
    this.eventListeners.set(event, handler);
    addEventListener(this.element, event, handler);
  }

  public removeEventListener(event: string): void {
    const handler = this.eventListeners.get(event);
    if (handler) {
      removeEventListener(this.element, event, handler);
      this.eventListeners.delete(event);
    }
  }

  public dispatchEvent(eventType: string, detail: any = {}): void {
    const event = createCustomEvent(eventType, detail);
    this.element.dispatchEvent(event);
  }

  public destroy(): void {
    if (this.isDestroyed) return;
    
    this.eventListeners.forEach((handler, event) => {
      removeEventListener(this.element, event, handler);
    });
    this.eventListeners.clear();
    
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    this.isDestroyed = true;
  }

  public isDestroyedState(): boolean {
    return this.isDestroyed;
  }
}

export default SmartButton;
