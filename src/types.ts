
export type ButtonType = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'light' 
  | 'dark'
  | 'ghost'
  | 'gradient'
  | '3d';

export type ButtonSize = 
  | 'xs' 
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl';

export type ButtonShape = 
  | 'square' 
  | 'rounded' 
  | 'pill' 
  | 'circle';

export type ButtonEffect = 
  | 'ripple' 
  | 'bounce' 
  | 'shake' 
  | 'pulse' 
  | 'glow' 
  | 'float' 
  | 'none';

export type GradientDirection = 
  | 'to-right' 
  | 'to-left' 
  | 'to-top' 
  | 'to-bottom' 
  | 'to-top-right' 
  | 'to-top-left' 
  | 'to-bottom-right' 
  | 'to-bottom-left';

export interface IconConfig {
  name: string;
  position: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  color?: string;
}

export interface GradientConfig {
  colors: string[];
  direction: GradientDirection;
  angle?: number;
}

export interface EffectConfig {
  type: ButtonEffect;
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export interface SmartButtonConfig {
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  width?: string | number;
  height?: string | number;
  
  icon?: string | IconConfig;
  
  gradient?: GradientConfig;
  
  effect?: ButtonEffect | EffectConfig;
  
  onClick?: (event: MouseEvent) => void;
  onHover?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  
  customClass?: string;
  customStyle?: Partial<CSSStyleDeclaration>;
  
  rippleColor?: string;
  shadowColor?: string;
  shadowIntensity?: 'low' | 'medium' | 'high';
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

export interface ButtonGroupConfig {
  buttons: SmartButtonConfig[];
  direction?: 'horizontal' | 'vertical';
  spacing?: string;
  alignment?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

export interface DropdownButtonConfig extends SmartButtonConfig {
  items: Array<{
    text: string;
    icon?: string;
    onClick: (event: MouseEvent) => void;
    disabled?: boolean;
    divider?: boolean;
  }>;
  position?: 'bottom' | 'top' | 'left' | 'right';
  trigger?: 'click' | 'hover';
}

export interface LoadingButtonConfig extends SmartButtonConfig {
  loadingText?: string;
  spinnerColor?: string;
  spinnerSize?: string;
  spinnerType?: 'dots' | 'spinner' | 'bars' | 'pulse';
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  light: string;
  dark: string;
}

export interface ThemeConfig {
  name: string;
  colors: ColorScheme;
  borderRadius: string;
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    low: string;
    medium: string;
    high: string;
  };
}

export interface SmartButtonsConfig {
  theme?: ThemeConfig;
  defaultType?: ButtonType;
  defaultSize?: ButtonSize;
  defaultShape?: ButtonShape;
  defaultEffect?: ButtonEffect;
  rtl?: boolean;
  prefix?: string;
}

export type ButtonEvent = 'click' | 'hover' | 'focus' | 'blur' | 'mousedown' | 'mouseup' | 'mouseenter' | 'mouseleave';

export interface ButtonEventData {
  type: ButtonEvent;
  button: HTMLElement;
  config: SmartButtonConfig;
  originalEvent: Event;
}

export interface ButtonResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface CustomizationOptions {
  cssVariables?: Record<string, string>;
  animations?: Record<string, string>;
  breakpoints?: Record<string, string>;
  zIndex?: Record<string, number>;
}
