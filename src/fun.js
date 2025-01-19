function toggleSidebar(event) {
    // Prevent the click event from closing the sidebar when clicking the menu icon
    event.stopPropagation();
    document.getElementById('sidebar').classList.toggle('left-0');
    document.getElementById('sidebar').classList.toggle('left-[-250px]');
}

// Close the sidebar
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('left-0');
    document.getElementById('sidebar').classList.add('left-[-250px]');
}

// Close the sidebar if clicked outside
function closeSidebarOnClickOutside(event) {
    // Close the sidebar if the click is not on the sidebar itself or the menu icon
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.querySelector('.material-symbols-outlined');

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        closeSidebar();
    }
}

// Adding event listener for clicks outside the sidebar to close it
document.body.addEventListener('click', closeSidebarOnClickOutside);

// const repeatButton = document.getElementById('repeatButton');
// const repeatOptions = document.getElementById('repeatOptions');
// const todayOption = document.getElementById('todayOption');

// repeatButton.addEventListener('click', () => {
//     repeatOptions.classList.toggle('hidden');
// });

// // Set the default option to 'Today' and highlight it
// todayOption.classList.add('bg-gray-100');

// // Add functionality to highlight the selected repeat option
// const options = repeatOptions.querySelectorAll('button');
// options.forEach(option => {
//     option.addEventListener('click', () => {
//         options.forEach(btn => btn.classList.remove('bg-gray-100'));
//         option.classList.add('bg-gray-100');
//         repeatOptions.classList.add('hidden'); // Hide options after selection
//     });
// });



document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profileIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    profileIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!profileIcon.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    // Handle Logout button click
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Implement your logout functionality here
            console.log('Logging out...');
            // Redirect to login or perform other actions
        });
    }
});
