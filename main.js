// Notification system
(function() {
  let notificationCount = 0;
  const notificationArea = document.getElementById('notificationArea');
  const counter = document.getElementById('notificationCount');

  function updateCounter() {
    counter.textContent = notificationCount;
  }

  document.getElementById('notifyButton').addEventListener('click', () => {
    const messages = [
      "New user registered",
      "Server maintenance scheduled",
      "Database backup completed",
      "Security alert detected",
      "New message received",
      "System update available"
    ];

    const event = new CustomEvent('newNotification', {
      detail: {
        message: messages[Math.floor(Math.random() * messages.length)],
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      }
    });

    document.dispatchEvent(event);
  });

  document.getElementById('clearNotifications').addEventListener('click', () => {
    notificationArea.innerHTML = '<div class="notification notification-empty">No notifications yet</div>';
    notificationCount = 0;
    updateCounter();
  });

  document.addEventListener('newNotification', (e) => {
    const { message, time, date } = e.detail;
    
    if (document.querySelector('.notification-empty')) {
      notificationArea.innerHTML = '';
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div class="notification-time">${date} at ${time}</div>
      <div class="notification-message">${message}</div>
    `;

    notificationArea.prepend(notification);
    notificationCount++;
    updateCounter();

    notification.style.backgroundColor = '#e3f2fd';
    setTimeout(() => notification.style.backgroundColor = '', 500);
  });
})();

// Search with debounce
(function() {
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const fakeSearch = (query) => {
    if (!query.trim()) {
      searchResults.textContent = '';
      return;
    }

    const responses = [
      `Found 5 results for "${query}"`,
      `No exact matches for "${query}"`,
      `Showing top 3 results for "${query}"`,
      `Search "${query}" returned 12 items`
    ];

    searchResults.textContent = responses[Math.floor(Math.random() * responses.length)];
  };

  searchInput.addEventListener('input', debounce((e) => {
    fakeSearch(e.target.value);
  }, 500));
})();

// Scroll position tracker
(function() {
  function throttle(func, limit) {
    let waiting = false;
    return function() {
      if (!waiting) {
        func.apply(this, arguments);
        waiting = true;
        setTimeout(() => waiting = false, limit);
      }
    };
  }

  const positionDisplay = document.getElementById('scrollPosition');

  window.addEventListener('scroll', throttle(() => {
    const pos = window.scrollY;
    positionDisplay.textContent = pos;
  }, 1000));
})();

// Data fetcher with error handling
(function() {
  const errorDisplay = document.getElementById('errorDisplay');

  async function getData() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (Math.random() > 0.5) {
      const errors = [
        'Network Error: Failed to connect to server',
        'API Error: 503 Service Unavailable',
        'Authentication Error: Invalid token',
        'Database Error: Connection timeout'
      ];
      throw new Error(errors[Math.floor(Math.random() * errors.length)]);
    }

    const successMessages = [
      'User data loaded successfully',
      'Configuration updated',
      'Dashboard stats refreshed'
    ];

    return {
      success: true,
      message: successMessages[Math.floor(Math.random() * successMessages.length)]
    };
  }

  document.getElementById('fetchDataButton').addEventListener('click', async () => {
    errorDisplay.style.display = 'none';
    
    try {
      const result = await getData();
      errorDisplay.textContent = `✓ ${result.message}`;
      errorDisplay.style.color = '#28a745';
      errorDisplay.style.display = 'block';
    } catch (err) {
      errorDisplay.textContent = `⚠ ${err.message}`;
      errorDisplay.style.color = '#dc3545';
      errorDisplay.style.display = 'block';
    }
  });

  window.onerror = function(message) {
    errorDisplay.textContent = `⚠ Unhandled Error: ${message}`;
    errorDisplay.style.color = '#dc3545';
    errorDisplay.style.display = 'block';
    return true;
  };
})();