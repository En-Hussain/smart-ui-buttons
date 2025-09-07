# Smart UI Buttons Library

A comprehensive TypeScript library for creating interactive and beautiful buttons with advanced effects and full RTL support.

## Features

- **11 Button Types**: primary, secondary, success, warning, danger, info, light, dark, ghost, gradient, 3d
- **6 Interactive Effects**: ripple, bounce, shake, pulse, glow, float
- **5 Size Options**: xs, sm, md, lg, xl
- **4 Shape Variants**: square, rounded, pill, circle
- **Full RTL Support**: Complete Arabic language and right-to-left text direction support
- **Responsive Design**: Works perfectly on all devices and screen sizes
- **High Performance**: Lightweight and optimized for speed
- **TypeScript Support**: Full type definitions included
- **Modern CSS**: Uses CSS3 features with fallbacks for older browsers

## Installation

```bash
npm install smart-ui-buttons
```

## Basic Usage

### HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="node_modules/smart-ui-buttons/dist/smart-ui-buttons.css">
</head>
<body>
    <script src="node_modules/smart-ui-buttons/dist/smart-ui-buttons.js"></script>
    <script>
        // Your code here
    </script>
</body>
</html>
```

### JavaScript Usage

```javascript
// Basic button
const button = new SmartUIButtons.SmartButton({
    type: 'primary',
    text: 'Click me',
    onClick: (event) => {
        console.log('Button clicked!');
    }
});
document.body.appendChild(button.getElement());

// Button with ripple effect
const rippleButton = new SmartUIButtons.SmartButton({
    type: 'success',
    effect: 'ripple',
    text: 'Ripple Effect',
    rippleColor: 'rgba(255, 255, 255, 0.5)'
});

// Gradient button
const gradientButton = new SmartUIButtons.SmartButton({
    type: 'gradient',
    gradient: {
        colors: ['#ff6b6b', '#4ecdc4'],
        direction: 'to-right'
    },
    text: 'Gradient Button'
});

// Button group
const buttonGroup = new SmartUIButtons.ButtonGroup({
    buttons: [
        { type: 'primary', text: 'Save' },
        { type: 'secondary', text: 'Edit' },
        { type: 'danger', text: 'Delete' }
    ],
    direction: 'horizontal'
});

// Dropdown button
const dropdownButton = new SmartUIButtons.DropdownButton({
    type: 'primary',
    text: 'Dropdown Menu',
    items: [
        { text: 'Option 1', onClick: () => alert('Option 1') },
        { text: 'Option 2', onClick: () => alert('Option 2') },
        { text: 'Option 3', onClick: () => alert('Option 3') }
    ]
});
```

### ES6 Modules

```javascript
import { SmartButton, ButtonGroup, DropdownButton } from 'smart-ui-buttons';

const button = new SmartButton({
    type: 'primary',
    text: 'ES6 Button'
});
```

### Node.js

```javascript
const { SmartButton } = require('smart-ui-buttons');

const button = new SmartButton({
    type: 'primary',
    text: 'Node.js Button'
});
```

## API Reference

### SmartButton

#### Constructor

```javascript
new SmartButton(config: SmartButtonConfig)
```

#### Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | ButtonType | 'primary' | Button type (primary, secondary, success, warning, danger, info, light, dark, ghost, gradient, 3d) |
| `size` | ButtonSize | 'md' | Button size (xs, sm, md, lg, xl) |
| `shape` | ButtonShape | 'rounded' | Button shape (square, rounded, pill, circle) |
| `text` | string | '' | Button text content |
| `disabled` | boolean | false | Disable button |
| `loading` | boolean | false | Show loading state |
| `effect` | ButtonEffect | 'none' | Interactive effect (ripple, bounce, shake, pulse, glow, float, none) |
| `icon` | string \| IconConfig | undefined | Icon configuration |
| `gradient` | GradientConfig | undefined | Gradient configuration |
| `onClick` | function | undefined | Click event handler |
| `onHover` | function | undefined | Hover event handler |
| `onFocus` | function | undefined | Focus event handler |
| `onBlur` | function | undefined | Blur event handler |
| `customClass` | string | undefined | Custom CSS class |
| `customStyle` | object | undefined | Custom inline styles |

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setLoading(loading: boolean)` | loading: boolean | Set loading state |
| `setText(text: string)` | text: string | Set button text |
| `setType(type: ButtonType)` | type: ButtonType | Set button type |
| `setSize(size: ButtonSize)` | size: ButtonSize | Set button size |
| `setShape(shape: ButtonShape)` | shape: ButtonShape | Set button shape |
| `setEffect(effect: ButtonEffect)` | effect: ButtonEffect | Set button effect |
| `setEnabled(enabled: boolean)` | enabled: boolean | Enable/disable button |
| `getElement()` | - | Get button DOM element |
| `getConfig()` | - | Get current configuration |
| `updateConfig(config: Partial<SmartButtonConfig>)` | config: object | Update configuration |
| `addEventListener(event: string, handler: function)` | event: string, handler: function | Add custom event listener |
| `removeEventListener(event: string)` | event: string | Remove event listener |
| `dispatchEvent(eventType: string, detail: any)` | eventType: string, detail: any | Dispatch custom event |
| `destroy()` | - | Destroy button and cleanup |

### ButtonGroup

#### Constructor

```javascript
new ButtonGroup(config: ButtonGroupConfig)
```

#### Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `buttons` | SmartButtonConfig[] | [] | Array of button configurations |
| `direction` | 'horizontal' \| 'vertical' | 'horizontal' | Group direction |
| `spacing` | string | '0.5rem' | Space between buttons |
| `alignment` | 'start' \| 'center' \| 'end' | 'start' | Button alignment |
| `wrap` | boolean | false | Allow button wrapping |

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `addButton(config: SmartButtonConfig, index?: number)` | config: object, index?: number | Add new button |
| `removeButton(index: number)` | index: number | Remove button by index |
| `getButton(index: number)` | index: number | Get button by index |
| `getButtons()` | - | Get all buttons |
| `setEnabled(enabled: boolean)` | enabled: boolean | Enable/disable all buttons |
| `updateConfig(config: Partial<ButtonGroupConfig>)` | config: object | Update configuration |
| `destroy()` | - | Destroy group and cleanup |

### DropdownButton

#### Constructor

```javascript
new DropdownButton(config: DropdownButtonConfig)
```

#### Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | DropdownItem[] | [] | Array of dropdown items |
| `position` | 'bottom' \| 'top' \| 'left' \| 'right' | 'bottom' | Dropdown position |
| `trigger` | 'click' \| 'hover' | 'click' | Open trigger |

#### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `open()` | - | Open dropdown |
| `close()` | - | Close dropdown |
| `toggle()` | - | Toggle dropdown |
| `addItem(item: DropdownItem, index?: number)` | item: object, index?: number | Add new item |
| `removeItem(index: number)` | index: number | Remove item by index |
| `updateItem(index: number, item: DropdownItem)` | index: number, item: object | Update item |
| `destroy()` | - | Destroy dropdown and cleanup |

## Advanced Usage

### Custom Styling

```javascript
const customButton = new SmartButton({
    type: 'primary',
    text: 'Custom Button',
    customClass: 'my-custom-button',
    customStyle: {
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
    }
});
```

### Event Handling

```javascript
const button = new SmartButton({
    type: 'primary',
    text: 'Event Button',
    onClick: (event) => {
        console.log('Clicked:', event);
    },
    onHover: (event) => {
        console.log('Hovered:', event);
    },
    onFocus: (event) => {
        console.log('Focused:', event);
    }
});

// Add custom event listener
button.addEventListener('customEvent', (event) => {
    console.log('Custom event:', event.detail);
});

// Dispatch custom event
button.dispatchEvent('customEvent', { data: 'Hello World' });
```

### Dynamic Updates

```javascript
const button = new SmartButton({
    type: 'primary',
    text: 'Dynamic Button'
});

// Update button properties
button.setText('New Text');
button.setType('success');
button.setSize('lg');
button.setEffect('ripple');

// Update configuration
button.updateConfig({
    type: 'gradient',
    gradient: {
        colors: ['#667eea', '#764ba2'],
        direction: 'to-right'
    }
});
```

### Loading States

```javascript
const button = new SmartButton({
    type: 'primary',
    text: 'Submit',
    onClick: async () => {
        button.setLoading(true);
        try {
            await fetch('/api/submit');
            button.setText('Success!');
        } catch (error) {
            button.setText('Error!');
        } finally {
            button.setLoading(false);
        }
    }
});
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |

## TypeScript Support

The library includes full TypeScript definitions:

```typescript
import { SmartButton, ButtonType, ButtonSize, ButtonShape } from 'smart-ui-buttons';

const button: SmartButton = new SmartButton({
    type: 'primary' as ButtonType,
    size: 'md' as ButtonSize,
    shape: 'rounded' as ButtonShape,
    text: 'TypeScript Button'
});
```

## Performance

- **Bundle Size**: ~15KB gzipped
- **Zero Dependencies**: No external dependencies
- **Tree Shaking**: Full ES6 module support
- **Memory Efficient**: Automatic cleanup and garbage collection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

[En-Hussain](https://github.com/En-Hussain)