const http = require('http');

const PORT = process.env.PORT || 3000;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: #111827;
      padding: 16px;
    }
    .login-card {
      background: #ffffff;
      padding: 36px 32px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 420px;
      border: 1px solid #e5e7eb;
    }
    .login-card h2 {
      margin-bottom: 8px;
      text-align: center;
      color: #111827;
      font-size: 26px;
      font-weight: 700;
    }
    .login-card .subtitle {
      text-align: center;
      color: #4b5563;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .form-group input {
      width: 100%;
      padding: 12px 14px;
      background-color: #ffffff;
      color: #111827;
      border: 2px solid #cbd5e1;
      border-radius: 8px;
      font-size: 16px;
      line-height: 1.5;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-group input::placeholder {
      color: #94a3b8;
    }
    .form-group input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
    .toggle-password {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: #4b5563;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 4px;
    }
    .toggle-password:hover {
      color: #111827;
      background-color: #f1f5f9;
    }
    .btn-submit {
      width: 100%;
      padding: 14px;
      background-color: #2563eb;
      border: none;
      border-radius: 8px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s;
      margin-top: 8px;
    }
    .btn-submit:hover {
      background-color: #1d4ed8;
    }
    .btn-submit:active {
      transform: scale(0.99);
    }
  </style>
</head>
<body>
  <div class="login-card">
    <h2>Sign In</h2>
    <p class="subtitle">Please enter your username and password below</p>
    <form action="/login" method="POST">
      <div class="form-group">
        <label for="username">
          <span>Username</span>
        </label>
        <div class="input-wrapper">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="e.g. john_doe"
            required
            autocomplete="username"
          >
        </div>
      </div>
      <div class="form-group">
        <label for="password">
          <span>Password</span>
        </label>
        <div class="input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            autocomplete="current-password"
          >
          <button type="button" class="toggle-password" id="togglePassword" aria-label="Toggle password visibility">Show</button>
        </div>
      </div>
      <button type="submit" class="btn-submit">Sign In</button>
    </form>
  </div>

  <script>
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
      });
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/login')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlContent);
  } else if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const username = params.get('username') || '';
      const passwordInput = params.get('password') || '';
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sign In Submitted</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      color: #333;
    }
    .card {
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    a {
      color: #0066cc;
      text-decoration: none;
      margin-top: 15px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>Welcome, ${username}!</h2>
    <h2>${passwordInput}</h2>
    <p>Sign-in submitted successfully.</p>
    <a href="/">Back to Sign In</a>
  </div>
</body>
</html>`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, 'localhost', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
