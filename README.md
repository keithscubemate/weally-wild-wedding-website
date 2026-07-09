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
- `bun run auth:schema`: generate the auth schema

# Plan

## Front end

- [ ] Layout
    + [x] Mobile
    + [x] Desktop
    + [x] make routes
    + [ ] Pretty
    + [ ] Theme
- [ ] Home
    + [ ] When
    + [ ] Where
    + [ ] Who
    + [ ] Schedge
- [ ] RSVP
    + [ ] Get group
    + [ ] Flow
- [ ] Registry
    + [ ] Zola?
    + [ ] Embedded link to aggregator
- [ ] FAQ
    + [ ] Attire
    + [ ] Plus Ones <- invites will list all invitees
    + [ ] Alcohol
    + [ ] Photos
- [ ] About
    + [ ] us
    + [ ] cats
    + [ ] how we met
    + [ ] proposal story
- [ ] Admin
    + [ ] view
    + [ ] edit
    + [ ] maybe this can just be dev tools
- [ ] photos
    + get a list

## Back end

- [ ] RSVP
    + [ ] get group
    + [ ] push group
- [ ] guests
    + [ ] get all
    + [ ] get group
    + [ ] get group
- [ ] group
    + id
    + name
    + rsvp'd
- [ ] guest
    + id
    + name
    + group_id
    + adult?
    + rsvp'd
