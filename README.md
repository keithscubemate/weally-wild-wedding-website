# My Wedding Website :)

# Developing

- `bun run dev`: reggie run
- `bun run build`: build
- `bun run preview`: prod test build
- `bun run prepare`: sync svelte
- `bun run check`: check
- `bun run lint`: lint check
- `bun run format`: apply lints
- `bun run db:push`: gen and run migrations
- `bun run db:generate`: gen migration
- `bun run db:migrate`: run migration
- `bun run db:studio`: open drizzle studio
- `bun run test`: run tests
- `bun run test:watch`: run tests in watch mode

# Plan

## Front end

- [ ] Layout
    - [x] Mobile
    - [x] Desktop
    - [x] make routes
    - [ ] Pretty
    - [x] Theme
        - [x] Golden Glow
        - [x] Spring Garden
        - [x] Dark Sunset
- [ ] Home
    - [ ] When
    - [ ] Where
    - [ ] Who
    - [ ] Schedule
- [x] RSVP
    - [ ] Search for party by guest name
    - [ ] Select party
    - [x] Edit party (attendance, notes)
    - [x] Save or finalize
    - [ ] Good-faith protection (cookie TBD)
- [ ] Registry
    - [ ] Zola?
    - [ ] Embedded link to aggregator
- [ ] FAQ
    - [ ] Attire
    - [ ] Plus Ones <- invites will list all invitees
    - [ ] Alcohol
    - [ ] Photos
- [ ] About
    - [ ] Us
    - [ ] Cats
    - [ ] How we met
    - [ ] Proposal story
- [x] Admin
    - [x] db:studio for local editing
    - [n] Admin route (if non-technical access needed)
- [ ] Photos
    - [ ] get a list

## Back end

- [x] RSVP
    - [x] get party
    - [x] update party
- [x] Party
    - id
    - name
    - finalized
    - notes
- [x] Guest
    - id
    - name
    - party_id
    - is_adult
    - is_rsvp

## Testing

- [x] Unit tests for rsvp/[id] route
    - [x] load function (happy path, 404)
    - [x] form action (happy path, 404, 409)
    - [x] security (cross-party manipulation, finalize clamping)
