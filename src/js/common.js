// Initialize the font size multiplier
let fontSizeMultiplier = 1.0;

// Define the increment/decrement value
const step = 0.1;

// Function to adjust the font size
const adjustFontSize = (event) => {
    if (event === 'increase') {
        fontSizeMultiplier += step;
    } else if (event === 'decrease') {
        fontSizeMultiplier -= step;
    }

    // Ensure the multiplier does not go below or higher  a certain value
    let minFont = 0.5;
    let maxFont = 1.8;
    fontSizeMultiplier = Math.min(Math.max(minFont, fontSizeMultiplier), maxFont);

    // Update font size for all elements
    document.documentElement.style.fontSize = `${fontSizeMultiplier}em`;
};

/**
 * Open the current clicked menu and close the other menus
 * @param {object} event - The DOM event
 */
const openMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const currentDropDownButton = event.target;
    const currentDropDownMenu = currentDropDownButton.parentNode.querySelector('.dropdown-menu');
    const isOpen = currentDropDownMenu.classList.contains('show');
    const dropDownMenus = document.querySelectorAll('#nav-bar-content .dropdown .dropdown-menu');
    const dropDownToggles = document.querySelectorAll('#nav-bar-content .dropdown-toggle');
    

    // Close all dropdown menus and reset their aria-expanded attributes
    dropDownMenus.forEach((menu) => menu.classList.remove('show'));
    dropDownToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));

    // Toggle the clicked menu and update its aria-expanded attribute
    if (!isOpen) {
        currentDropDownMenu.classList.add('show');
        currentDropDownButton.setAttribute('aria-expanded', 'true');
        currentDropDownMenu.addEventListener('keydown', handleMenuEscKeyPress, false);
    }

    currentDropDownButton.focus();

    
};

function handleMenuSpaceKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMenu(event);
    }
}

function handleMenuEscKeyPress(event) {
    if (event.key === 'Escape') {
        const currentDropDownMenu = event.target.closest('.dropdown-menu');
        const currentDropDownButton = currentDropDownMenu.parentNode.querySelector('.dropdown-toggle');

        currentDropDownMenu.classList.remove('show');
        currentDropDownButton.setAttribute('aria-expanded', 'false');
        currentDropDownButton.focus();
    }
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
const toggleNavigation = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const navbarToggler = event.target;
    const content = document.getElementById('nav-bar-content');
    const isCollapsed = content.classList.toggle('collapse');
    navbarToggler.setAttribute('aria-expanded', !isCollapsed);
};

// Add event listeners after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dropdown event listeners
    const dropDownToggles = document.querySelectorAll('#nav-bar-content .dropdown-toggle');

    dropDownToggles.forEach((toggle) => {
        toggle.addEventListener('click', openMenu, false);
        toggle.addEventListener('keydown', handleMenuSpaceKeyPress, false);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
    });
    
    document.querySelector('.navbar-toggler').addEventListener('click', toggleNavigation, false);

    // Add event listeners to the buttons for font size adjustment
    const increaseTextBtn = document.querySelectorAll('.font-increase-button');
    const decreaseTextBtn = document.querySelectorAll('.font-decrease-button');


    increaseTextBtn.forEach((e) => {
        e.addEventListener('click', () => adjustFontSize('increase'))
    })

    decreaseTextBtn.forEach((e) => {
        e.addEventListener('click', () => adjustFontSize('decrease'))
    })

}, false);
