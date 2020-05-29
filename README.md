# Description

This projects provides a simple, clean 25-minutes-timer in the style of the Pomodoro technique.

The app design is focused on avoiding distraction until the time is over (after 25 minutes).
If you have enough screens available, it's encouraged to keep this app open on one side-screen, e.g. on the laptop, as it won't clame your attention until time is over.

# Features

![Demo picture](docs/demo-initial-v2.png)
![Demo picture](docs/demo-completed-v2.png)

# Notes

- Notifications have to be allowed
- Installation is only possible when PWAs are supported - so mostly on Android devices

# Technologies used

I used this repository mainly for learning purposes. There are already a lot of pomodoro timer projects. The reason I still wanted to creat my own was that this type of project is small enough to be able to refactor it quickly, but complex enough to try out multiple programming patterns, technologies etc. Furthermore I'm using the pomodoro technique on my own frequently. This leads to a lot of long-term manual testing and learnings from that, in comparison to a one-time-built-and-never-used project.

So here are the things I tried out with this project:

- Web Workers and WebAssembly with Rust
- Progressive Web Application (for installation and offline/caching capability)
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
