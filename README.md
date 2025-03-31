# Personal Homepage

A beautiful and responsive personal homepage/start page inspired by showby.top.

![Screenshot](assets/images/avatar.png)

## Features

- Beautiful animated background with parallax effect
- Real-time clock and date display
- Quote display with fade transitions
- Social media links
- Navigation grid for quick access to your favorite sites
- Fully responsive design
- Custom cursor effects
- Weather data placeholder (can be connected to a weather API)

## How to Use

1. Simply open the `index.html` file in your browser to view the website
2. Customize the content by editing the HTML, CSS, and JavaScript files

## Customization Options

### Changing the Background

The background image is currently using Bing's daily image. You can change it in the CSS file:

```css
.background {
    background-image: url('your-image-path.jpg');
}
```

### Updating Social Links

Edit the social icons in the `index.html` file:

```html
<div class="social-icons">
    <a href="your-link-here" class="social-icon"><i class="fa fa-github"></i></a>
    <!-- Add more social icons as needed -->
</div>
```

### Changing Navigation Links

Modify the navigation grid in the `index.html` file:

```html
<a href="your-link-here" class="nav-item">
    <i class="fa fa-your-icon"></i>
    <span>Your Label</span>
</a>
```

### Adding More Quotes

Add more quotes in the `script.js` file:

```javascript
const quotes = [
    { text: "Your Quote", subtext: "Your Subtext" },
    // Add more quotes here
];
```

## Weather API Integration

To add real weather data, you can integrate a weather API like OpenWeatherMap:

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add a function in the JavaScript file to fetch and display weather data
3. Update the weather info element in the HTML with the fetched data

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome for icons

## Credits

- Original design inspired by [showby.top](https://showby.top)
- Background image from Bing Daily Image
- Fonts from Google Fonts
- Icons from Font Awesome 