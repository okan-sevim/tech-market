document.addEventListener('DOMContentLoaded', function() {
    // Filter toggle for mobile
    const filterToggleBtn = document.getElementById('filterToggle');
    const filterSidebar = document.querySelector('.filter-sidebar');
    
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', function() {
            filterSidebar.classList.toggle('active');
        });
    }
    
    // Clear all filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Clear checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Clear radio buttons
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            
            // Clear price inputs
            document.getElementById('priceMin').value = '';
            document.getElementById('priceMax').value = '';
        });
    }
    
    // Product filtering and sorting functionality would go here
    // This would typically involve fetching products from a backend API
    // and implementing filter logic based on the selected options
    
    // For demo purposes, we're showing static content
    
    // Example of sort functionality
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sort products by:', this.value);
            // Actual implementation would sort the products based on the selected value
        });
    }
});
