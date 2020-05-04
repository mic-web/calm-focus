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
  - [ ] refer to creator: https://unsplash.com/s/photos/nature
        'Photo by Gemma Evans on Unsplash'
        '<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@stayandroam?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Gemma Evans"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Gemma Evans</span></a>'
- [ ] PWA
- [ ] Publish with Heroku
- [ ] Test PWA and installation on mobile
- [ ] Allow push notification on mobile
- [ ] Fix:
  - [ ] timing of animation and timer start
- [ ] Add impressum
- [ ] Add gsvo
- [ ] Refactor: Move time related code into own component
- [ ] Improve Typography
- [ ] Favicon
- [ ] Improve theme (spacing, font-size, graphics)
- [ ] Continuous deployment
      https://www.gauntface.com/blog/2020/static-site-hosting-on-aws/
- [ ] Improve UX: additional circle in the circle which visualizes seconds? (animation is clearer)
  - [ ] Show checkmark instead of 0 when finished
- [ ] Allow activating a 5 min "pause" round (button next to the pause hint text)
