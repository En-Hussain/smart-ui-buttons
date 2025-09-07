
import { ButtonType, ButtonSize, ButtonShape, GradientDirection, EffectConfig } from './types';

export function generateId(): string {
  return 'sb_' + Math.random().toString(36).substr(2, 9);
}

export function mergeClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(element.style, styles);
}

export function createGradient(colors: string[], direction: GradientDirection, angle?: number): string {
  const angleMap: Record<GradientDirection, string> = {
    'to-right': '90deg',
    'to-left': '270deg',
    'to-top': '0deg',
    'to-bottom': '180deg',
    'to-top-right': '45deg',
    'to-top-left': '315deg',
    'to-bottom-right': '135deg',
    'to-bottom-left': '225deg'
  };

  const gradientAngle = angle ? `${angle}deg` : angleMap[direction];
  const colorStops = colors.join(', ');
  
  return `linear-gradient(${gradientAngle}, ${colorStops})`;
}

export function createRippleEffect(event: MouseEvent, element: HTMLElement, color: string = 'rgba(255, 255, 255, 0.3)'): void {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: ${color};
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;

  if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  element.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

export function createIcon(iconName: string, size: string = '1rem', color?: string): HTMLElement {
  const icon = document.createElement('i');
  icon.className = `smart-button__icon ${iconName}`;
  icon.style.fontSize = size;
  if (color) {
    icon.style.color = color;
  }
  return icon;
}

export function createLoadingText(text: string = 'جاري التحميل...'): HTMLElement {
  const loadingText = document.createElement('span');
  loadingText.textContent = text;
  loadingText.className = 'smart-button__loading-text';
  return loadingText;
}

export function createLoadingSpinner(type: 'dots' | 'spinner' | 'bars' | 'pulse' = 'spinner'): HTMLElement {
  const spinner = document.createElement('div');
  spinner.className = `smart-button__spinner smart-button__spinner--${type}`;
  
  switch (type) {
    case 'dots':
      spinner.innerHTML = '<span></span><span></span><span></span>';
      break;
    case 'bars':
      spinner.innerHTML = '<span></span><span></span><span></span><span></span>';
      break;
    case 'pulse':
      spinner.innerHTML = '<span></span><span></span><span></span>';
      break;
    default:
      break;
  }
  
  return spinner;
}

export function validateConfig(config: any): boolean {
  if (!config || typeof config !== 'object') {
    console.warn('Smart Buttons: Invalid configuration provided');
    return false;
  }
  return true;
}

export function applyEffect(element: HTMLElement, effect: EffectConfig): void {
  if (effect.type === 'none') return;

  element.classList.add(`smart-button--${effect.type}`);
  
  if (effect.duration) {
    element.style.transitionDuration = `${effect.duration}ms`;
  }
  
  if (effect.color) {
    element.style.setProperty('--effect-color', effect.color);
  }
}

export function removeEffect(element: HTMLElement, effect: EffectConfig): void {
  element.classList.remove(`smart-button--${effect.type}`);
}

export function createCustomEvent(type: string, detail: any = {}): CustomEvent {
  return new CustomEvent(type, {
    detail,
    bubbles: true,
    cancelable: true
  });
}

export function addEventListener(
  element: HTMLElement, 
  event: string, 
  handler: EventListener, 
  options: AddEventListenerOptions = {}
): void {
  element.addEventListener(event, handler, options);
}

export function removeEventListener(
  element: HTMLElement, 
  event: string, 
  handler: EventListener
): void {
  element.removeEventListener(event, handler);
}

export function checkBrowserSupport(): boolean {
  return !!(
    window.CSS &&
    window.CSS.supports &&
    window.CSS.supports('display', 'flex') &&
    window.CSS.supports('animation', 'name 1s')
  );
}

export function applyTheme(theme: any): void {
  const root = document.documentElement;
  
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--sb-${key}`, value as string);
    });
  }
  
  if (theme.fontFamily) {
    root.style.setProperty('--sb-font-family', theme.fontFamily);
  }
  
  if (theme.borderRadius) {
    root.style.setProperty('--sb-border-radius', theme.borderRadius);
  }
}

export function createCustomCSS(css: string): void {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

export function convertValue(value: string | number, unit: string = 'px'): string {
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }
  return value;
}

export function createShadow(
  color: string = '#000', 
  intensity: 'low' | 'medium' | 'high' = 'medium'
): string {
  const intensityMap = {
    low: '0 2px 4px',
    medium: '0 4px 8px',
    high: '0 8px 16px'
  };
  
  return `${intensityMap[intensity]} ${color}20`;
}

export function createGlow(color: string, size: string = '10px'): string {
  return `0 0 ${size} ${color}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function createTransition(
  properties: string[] = ['all'],
  duration: number = 300,
  easing: string = 'ease-in-out'
): string {
  return properties
    .map(prop => `${prop} ${duration}ms ${easing}`)
    .join(', ');
}

export function createWaveEffect(element: HTMLElement, color: string = 'rgba(255, 255, 255, 0.3)'): void {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  
  const wave = document.createElement('div');
  wave.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, ${color} 0%, transparent 70%);
    border-radius: 50%;
    animation: wave 0.6s ease-out;
    pointer-events: none;
  `;

  if (!document.querySelector('#wave-animation')) {
    const style = document.createElement('style');
    style.id = 'wave-animation';
    style.textContent = `
      @keyframes wave {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  element.appendChild(wave);

  setTimeout(() => {
    if (wave.parentNode) {
      wave.parentNode.removeChild(wave);
    }
  }, 600);
}

export function createPulseEffect(element: HTMLElement, color: string = 'currentColor'): void {
  element.style.animation = 'pulse 1s ease-in-out infinite';
  element.style.setProperty('--pulse-color', color);
}

export function removePulseEffect(element: HTMLElement): void {
  element.style.animation = '';
  element.style.removeProperty('--pulse-color');
}
