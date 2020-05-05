# Description

This projects provides a simple, clean 25-minutes-timer in the style of the Pomodoro technique.

The app design is focused on avoiding distraction until the time is over (after 25 minutes).
If you have enough screens available, it's encouraged to keep this app open on one side-screen, e.g. on the laptop, as it won't clame your attention until time is over.

# Features

- Smart and private memory: Remembers start time in browser so that you can continue with the timer if you closed or refreshed the window accidentally.

![Demo picture](docs/demo-initial-v2.png)
![Demo picture](docs/demo-completed-v2.png)

# Roadmap

- [x] Refactor components
- [x] Use styled components
- [x] Remember start time in local storage
- [x] Show notification when time is over
  - [x] https://developer.mozilla.org/en-US/docs/Web/API/notification
  - [x] add button for enabling
- [x] add image
  - [x] refer to creator
- [x] Favicon
- [x] PWA
- [x] Installable PWA for mobile
- [x] Allow push notification on mobile
- [x] Refactor: Move time related code into own component
- [ ] Fix:
  - [ ] timing of animation and timer start
- [ ] Add impressum
- [ ] Add gsvo
- [ ] Improve Typography
- [ ] Improve theme (spacing, font-size, graphics)
- [ ] Continuous deployment
      https://www.gauntface.com/blog/2020/static-site-hosting-on-aws/
- [ ] Improve UX: additional circle in the circle which visualizes seconds? (animation is clearer)
  - [ ] Show checkmark instead of 0 when finished
- [ ] Allow activating a 5 min "pause" round (button next to the pause hint text)
