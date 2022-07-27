# Jazzify

## [Live Demo](https://findmejazz.herokuapp.com/) • [Video](https://www.youtube.com/watch?v=wkLdCrWnmng)

A MERN stack jazz discovery app using TypeScript, the Spotify API and web SDK, React Router Dom, Redux Toolkit, MongoDB and Mongoose.

### Current Features:

- [x] Sign-in using the Spotify Authorisation Code Flow
- [x] Token storage and automatic refreshing (single sign-in)
- [x] Search (my) database for tracks by instrument
- [x] Play retrieved tracks in-browser using the Spotify web SDK
- [x] Playback controls (play/pause, track skip, forwards and back 10secs)
- [x] Toggle add track to favourites
- [x] Lazy loading artist biographies from Wikipedia
- [x] Mobile UI with transition effects

### Future features:

- [ ] Error handling
- [ ] Desktop view
- [ ] Further instruments (clarinet, percussion, harmonica etc.) when database is robust enough
- [ ] Search by (discovered) artist (possible restructuring of database relations)
- [ ] Admin panel with CRUD functionality
- [ ] Refactor / fill in missing TypeScript type declarations

## Challenges

I love using new technologies in personal projects which I want to learn. This is my first TypeScript app, but in retrospect I was destined to add some `@ts-ignore` as Spotify doesn't provide types for their web SDK.

Functionality of the app is quite simple, but the effort was put in to the code for a clean user interface (something I considered a challenge) and seamless authorisation. I've also designed this 'mobile first', especially as the dip-in-and-out nature of the app suits mobile use far more than desktop.

This project was made in 2 and a half weeks working in the evenings around the [School of Applied Technology](https://www.salt.study/our-hubs) coding bootcamp.
