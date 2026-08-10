This is just a little unicode drawing app which will become the basis for my map designer in [AtheriZ](https://github.com/electroglyph/atheriz)

diagonal line drawing is a bit janky, but i can't be arsed to fix it right now

probably still a few other bugs to work out

`npm run build` to build, and `npm run dev` to run it locally.

The build also includes the TypeScript AtheriZ webclient at `dist/webclient/`.
To deploy both browser applications into an AtheriZ game web directory, set
`ATHERIZ_WEB_ROOT` to that directory and run `npm run deploy:atheriz`.

note: this is almost entirely AI generated code, though i've attempted to do it sanely
