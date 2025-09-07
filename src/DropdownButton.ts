
import { DropdownButtonConfig } from './types';
import { SmartButton } from './SmartButton';
import { mergeClasses, validateConfig, generateId, addEventListener, removeEventListener } from './utils';

export class DropdownButton {
  private element: HTMLDivElement;
  private button: SmartButton;
  private menu: HTMLDivElement;
  private config: DropdownButtonConfig;
  private eventListeners: Map<string, EventListener> = new Map();
  private isOpen: boolean = false;
  private isDestroyed: boolean = false;

  constructor(config: DropdownButtonConfig) {
    if (!validateConfig(config)) {
      throw new Error('Invalid configuration provided');
    }

    this.config = {
      position: 'bottom',
      trigger: 'click',
      ...config
    };

    this.element = this.createElement();
    this.button = this.createButton();
    this.menu = this.createMenu();
    this.attachEventListeners();
  }

  private createElement(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'smart-dropdown';
    container.id = generateId();
    return container;
  }

  private createButton(): SmartButton {
    const buttonConfig = { ...this.config };
    delete (buttonConfig as any).items;
    delete (buttonConfig as any).position;
    delete (buttonConfig as any).trigger;

    return new SmartButton(buttonConfig);
  }

  private createMenu(): HTMLDivElement {
    const menu = document.createElement('div');
    menu.className = this.buildMenuClassName();
    
    this.config.items.forEach((item, index) => {
      if (item.divider) {
        const divider = document.createElement('div');
        divider.className = 'smart-dropdown__divider';
        menu.appendChild(divider);
      } else {
        const menuItem = this.createMenuItem(item, index);
        menu.appendChild(menuItem);
      }
    });

    return menu;
  }

  private buildMenuClassName(): string {
    const classes = ['smart-dropdown__menu'];
    
    if (this.config.position) {
      classes.push(`smart-dropdown__menu--${this.config.position}`);
    }
    
    return mergeClasses(...classes);
  }

  private createMenuItem(item: any, index: number): HTMLButtonElement {
    const menuItem = document.createElement('button');
    menuItem.className = 'smart-dropdown__item';
    menuItem.textContent = item.text;
    (menuItem as HTMLButtonElement).disabled = item.disabled || false;
    menuItem.dataset.index = index.toString();

    if (item.icon) {
      const icon = document.createElement('i');
      icon.className = `smart-button__icon ${item.icon}`;
      icon.style.marginRight = '0.5rem';
      menuItem.insertBefore(icon, menuItem.firstChild);
    }

    if (!item.disabled) {
      menuItem.addEventListener('click', (event) => {
        event.stopPropagation();
        item.onClick(event);
        this.close();
      });
    }

    return menuItem;
  }

  private attachEventListeners(): void {
    this.element.appendChild(this.button.getElement());
    this.element.appendChild(this.menu);

    const buttonClickHandler = (event: Event) => {
      event.stopPropagation();
      this.toggle();
    };
    this.eventListeners.set('buttonClick', buttonClickHandler);
    addEventListener(this.button.getElement(), 'click', buttonClickHandler);

    const documentClickHandler = (event: Event) => {
      if (!this.element.contains(event.target as Node)) {
        this.close();
      }
    };
    this.eventListeners.set('documentClick', documentClickHandler);
    document.addEventListener('click', documentClickHandler);

    if (this.config.trigger === 'hover') {
      const mouseEnterHandler = () => this.open();
      const mouseLeaveHandler = () => this.close();
      
      this.eventListeners.set('mouseEnter', mouseEnterHandler);
      this.eventListeners.set('mouseLeave', mouseLeaveHandler);
      
      addEventListener(this.element, 'mouseenter', mouseEnterHandler);
      addEventListener(this.element, 'mouseleave', mouseLeaveHandler);
    }

    const keydownHandler = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Escape') {
        this.close();
      } else if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
        if (this.isOpen) {
          const activeItem = this.menu.querySelector('.smart-dropdown__item:focus');
          if (activeItem) {
            (activeItem as HTMLElement).click();
          }
        }
      } else if (keyboardEvent.key === 'ArrowDown') {
        keyboardEvent.preventDefault();
        this.focusNextItem();
      } else if (keyboardEvent.key === 'ArrowUp') {
        keyboardEvent.preventDefault();
        this.focusPreviousItem();
      }
    };
    this.eventListeners.set('keydown', keydownHandler);
    addEventListener(this.element, 'keydown', keydownHandler);
  }

  public open(): void {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.menu.classList.add('smart-dropdown__menu--show');
    this.updateMenuPosition();
    
    const firstItem = this.menu.querySelector('.smart-dropdown__item:not([disabled])') as HTMLElement;
    if (firstItem) {
      firstItem.focus();
    }
  }

  public close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.menu.classList.remove('smart-dropdown__menu--show');
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private updateMenuPosition(): void {
    const buttonRect = this.button.getElement().getBoundingClientRect();
    const menuRect = this.menu.getBoundingClientRect();
    
    this.menu.style.position = 'absolute';
    this.menu.style.top = '';
    this.menu.style.bottom = '';
    this.menu.style.left = '';
    this.menu.style.right = '';
    
    switch (this.config.position) {
      case 'top':
        this.menu.style.bottom = '100%';
        this.menu.style.left = '0';
        this.menu.style.marginBottom = '0.125rem';
        break;
      case 'left':
        this.menu.style.top = '0';
        this.menu.style.right = '100%';
        this.menu.style.marginRight = '0.125rem';
        break;
      case 'right':
        this.menu.style.top = '0';
        this.menu.style.left = '100%';
        this.menu.style.marginLeft = '0.125rem';
        break;
      default:
        this.menu.style.top = '100%';
        this.menu.style.left = '0';
        this.menu.style.marginTop = '0.125rem';
        break;
    }
  }

  private focusNextItem(): void {
    const items = Array.from(this.menu.querySelectorAll('.smart-dropdown__item:not([disabled])')) as HTMLElement[];
    const currentIndex = items.findIndex(item => item === document.activeElement);
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex]?.focus();
  }

  private focusPreviousItem(): void {
    const items = Array.from(this.menu.querySelectorAll('.smart-dropdown__item:not([disabled])')) as HTMLElement[];
    const currentIndex = items.findIndex(item => item === document.activeElement);
    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    items[prevIndex]?.focus();
  }

  public addItem(item: any, index?: number): void {
    const menuItem = this.createMenuItem(item, this.config.items.length);
    
    if (index !== undefined && index >= 0 && index <= this.config.items.length) {
      this.config.items.splice(index, 0, item);
      const nextSibling = this.menu.children[index];
      this.menu.insertBefore(menuItem, nextSibling);
    } else {
      this.config.items.push(item);
      this.menu.appendChild(menuItem);
    }
  }

  public removeItem(index: number): boolean {
    if (index < 0 || index >= this.config.items.length) {
      return false;
    }

    this.config.items.splice(index, 1);
    const menuItem = this.menu.children[index];
    if (menuItem) {
      menuItem.remove();
    }
    
    return true;
  }

  public updateItem(index: number, newItem: any): boolean {
    if (index < 0 || index >= this.config.items.length) {
      return false;
    }

    this.config.items[index] = newItem;
    const menuItem = this.menu.children[index] as HTMLButtonElement;
    if (menuItem) {
      menuItem.textContent = newItem.text;
      menuItem.disabled = newItem.disabled || false;
    }
    
    return true;
  }

  public getElement(): HTMLDivElement {
    return this.element;
  }

  public getButton(): SmartButton {
    return this.button;
  }

  public getMenu(): HTMLDivElement {
    return this.menu;
  }

  public getConfig(): DropdownButtonConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<DropdownButtonConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    this.menu.className = this.buildMenuClassName();
    
    if (newConfig.trigger) {
      this.destroy();
      this.attachEventListeners();
    }
  }

  public destroy(): void {
    if (this.isDestroyed) return;
    
    this.eventListeners.forEach((handler, event) => {
      if (event === 'documentClick') {
        document.removeEventListener('click', handler);
      } else {
        removeEventListener(this.element, event, handler);
      }
    });
    this.eventListeners.clear();
    
    this.button.destroy();
    
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    
    this.isDestroyed = true;
  }

  public isDestroyedState(): boolean {
    return this.isDestroyed;
  }
}

export default DropdownButton;
