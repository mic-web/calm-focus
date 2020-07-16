# Description

"Calm Focus" is a simple timer for improving focus on any tasks.
The concept is partially based on the principles of the well-known [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique)

But the use cases are not limited working. The web-app can be useful for:

- Focus on work / study
- Workout - especially useful for HIIT training (when activating the "AutoPlay" option)
- Cooking
- Meditation

The design focuses on avoiding distraction until time is over (by default after 25 minutes).

# Features

![Demo picture](docs/demo-initial-v3.png)
![Demo picture](docs/demo-running-v3.png)
![Demo picture](docs/demo-menu-v3.png)

- Notifications: get notified when time is over (needs browser permission)
- Sounds: hear a sound when time is over
- Installation as PWA (only possible when PWAs are supported - so mostly on Android devices and Google Chrome)

# Technologies used

I used this repository mainly for learning purposes. There are already some pomodoro timer projects.
The reason I still wanted to create my own was that this type of project is small enough to be able to refactor it quickly, but complex enough to try out multiple programming patterns and technologies (e.g. Web Workers, WebAssembly, Service Worker, etc.) and check cross-device / cross-browser compatiblity.

As I'm using the pomodoro technique
I'm using the pomodoro technique on my own which helps me with discovering some use case.
in comparison to a one-time-built-and-never-used project.

My plan is to try out further libraries / tools / code patterns within this repository in the future.

So here are the things I tried out with this project:

- Service Worker, Progressive Web Application (for installation and offline/caching capability)
- Web Worker for calculating timing:
  - Reasoning: setInterval is not reliable enough, thus a 25 minutes timer can result in e.g. a 25 minutes + x seconds timer. It can also happen that a tab gets completely inactive and thus the timer gets paused for quite some time. To fix this I used a Web Worker, which is not affected by this pausing. And just out of interest, I decided to try out running a WebAssembly built with Rust inside this WebWorker. Works really well
- Browser notification API
- Cross-browser compatiblity, also for mobile
- React + almost all React Hooks: useContext, useReducer, useCallback etc.
- Typescript
- Material UI, CSS-in-JS (was trying out styled-components first, but switched to Material UI)
- Local Storage
- CI: Host with Netlify, deploy on Github commits on master
- Programming patterns
  - Compound components
  - Custom Hooks
  - Observer pattern
  - global state vs. local state
- Web Workers and WebAssembly with Rust
  - I wanted to see if the setInterval could be implemented with WebAssembly/Rust well.
    Basically it was possible and cool to try out, but there was no real benefit of it, just more loading time.
    That's why I removed it - for reference how to integrate WebAssembly+Rust, see commit #bdadafe.
