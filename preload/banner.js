const { exec } = require('child_process');

const banner = `\x1b[0m

[Info]\tWelcome to ls.terminal.ink!

\x1b[0m
  \x1b[0m  \x1b[1m\x1b[32m\x1b[46m\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593\u2593\u2593\u2593\u2592\u2592\u2592\u2592\u2592\u2592\u2591\u2591\u2591\u2591\u2591\u2591      \x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2588\u2588\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2588\u2588\x1b[0m   ▞                          \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2588\u2588\x1b[0m  ▟▙▖                         \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2593\u2593\x1b[0m   ▛                          \x1b[1m\x1b[36m\x1b[44m\u2593\u2593\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2593\u2593\x1b[0m  ▝   \x1b[5m▀▀▀\x1b[0m                     \x1b[1m\x1b[36m\x1b[44m\u2593\u2593\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2593\u2593\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2593\u2593\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2592\u2592\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2592\u2592\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2592\u2592\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2592\u2592\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2592\u2592\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2592\u2592\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2591\u2591\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2591\u2591\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2591\u2591\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2591\u2591\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m\u2591\u2591\x1b[0m                              \x1b[1m\x1b[36m\x1b[44m\u2591\u2591\x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m  \x1b[0m                              \x1b[1m\x1b[36m\x1b[44m  \x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m  \x1b[0m                              \x1b[1m\x1b[36m\x1b[44m  \x1b[0m
  \x1b[0m\x1b[1m\x1b[32m\x1b[46m  \x1b[0m                              \x1b[1m\x1b[36m\x1b[44m  \x1b[0m
  \x1b[0m  \x1b[1m\x1b[36m\x1b[44m\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593\u2593\u2593\u2593\u2592\u2592\u2592\u2592\u2592\u2592\u2591\u2591\u2591\u2591\u2591\u2591      \x1b[0m
\x1b[0m

[Info]\tCopyright (C) 2015 - 2018 Moustacheminer Server Services
[Info]\tCopyright (C) 2017 - 2018 ls.terminal.ink`;

// Print out version
exec('git rev-parse --short HEAD', (error, stdout, stderr) => {
	const version = stderr || error ? 'Unknown' : stdout;
	console.log(`Version ${version}`);
});

console.log(banner);
