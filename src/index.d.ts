
export * from './types';

export { SmartButton, default as SmartButtonDefault } from './SmartButton';
export { ButtonGroup, default as ButtonGroupDefault } from './ButtonGroup';
export { DropdownButton, default as DropdownButtonDefault } from './DropdownButton';

export * from './utils';

declare const SmartButtons: {
  SmartButton: typeof SmartButtonDefault;
  ButtonGroup: typeof ButtonGroupDefault;
  DropdownButton: typeof DropdownButtonDefault;
};

export default SmartButtons;
