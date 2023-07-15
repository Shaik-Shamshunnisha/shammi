document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('city-search');
  const searchButton = document.getElementById('search-button');
  const suggestionsList = document.getElementById('suggestions');
  const cityTitle = document.getElementById('city-title');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  let citiesData = []; // Store the loaded cities data
  let selectedCity = null; // Store the currently selected city

  // Load data from JSON file
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      citiesData = data;
      displaySuggestions([]);
    })
    .catch(error => console.error('Error loading data:', error));

  // Display suggestions for matching cities
  function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    if (suggestions.length > 0) {
      suggestions.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city.name;
        li.addEventListener('click', function() {
          selectCity(city);
        });
        suggestionsList.appendChild(li);
      });
      suggestionsList.style.display = 'block';
    } else {
      suggestionsList.style.display = 'none';
    }
  }

  // Perform prefix match search on cities data
  function searchCities(query) {
    const searchTerm = query.trim().toLowerCase();
    const matchedCities = citiesData.filter(city =>
      city.name.toLowerCase().startsWith(searchTerm)
    );
    displaySuggestions(matchedCities);
  }

  // Update selected city and display its information
  function selectCity(city) {
    selectedCity = city;
    cityTitle.textContent = `${city.name} (${city.weather.temperature}°C)`;
    // Update background image and weather information
    // based on city.backgroundImage and city.weather
    // ...
    filterData();
  }

  // Filter data based on selected tab and city
  function filterData() {
    const activeTab = document.querySelector('.tab.active');
    const activeTabId = activeTab.getAttribute('data-tab');
    const activeTabContent = document.getElementById(`${activeTabId.toLowerCase()}-tab`);

    // Clear existing data in active tab content
    activeTabContent.innerHTML = '';

    if (selectedCity) {
      // Filter and display data based on the selected tab
      switch (activeTabId) {
        case 'PLACES':
          // Filter and display places data for the selected city
          // ...
          break;
        case 'HOTELS':
          // Filter and display hotels data for the selected city
          // ...
          break;
        case 'RESTAURANTS':
          // Filter and display restaurants data for the selected city
          // ...
          break;
        case 'OFFICES':
          // Filter and display offices data for the selected city
          // ...
          break;
      }
    }
  }

  // Handle search button click event
  searchButton.addEventListener('click', function() {
    const query = searchInput.value;
    searchCities(query);
  });

  // Handle search input keyup event
  searchInput.addEventListener('keyup', function() {
    const query = searchInput.value;
    searchCities(query);
  });

  // Handle tab click event
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      const clickedTabContent = document.getElementById(`${tabId.toLowerCase()}-tab`);

      // Update active tab
      tabs.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');

      // Show clicked tab content and hide others
      tabContents.forEach(content => content.classList.remove('active'));
      clickedTabContent.classList.add('active');

      // Filter and display data for the selected tab
      filterData();
    });
  });
});