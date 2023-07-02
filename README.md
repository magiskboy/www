# WWW

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=www)

Code for [nkthanh.dev](https://nkthanh.dev)

## Prerequisites

- NodeJS >= 17
- NextJS >= 13

## Install

```bash
$ npm run install
```

## Usage

Run the website locally

```bash
$ npm run dev
```

Run automatic code formatting:

```bash
$ npm run lint
```

Build website
```bash
$ npm run build
```

The run on production

```bash
$ npm run start
```

## Settings

All configuration is in `next.config.js` and `next-i18next.config.js`.

| Variable                          | Description                                                                                                                                                                                                                       | Default |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| .i18n                             | You can config what languages you want to support on your site, checkout `next-i18next.config.js`.                                                                                                                                | en      |
| .publicRuntimeConfig.utterancRepo | Website use [utterances](https://github.com/utterance/utterances) for comment system, which is show on bottom of the page. If visitors comment on a page, `utterances-bot` will create a new issue on markdown file of this page. |         |
| .publicRuntimeConfig.theme        | Theme color can switched between `light` and `dark`.                                                                                                                                                                              | light   |
| .publicRuntimeConfig.socials      | These are socials link of yours. You can config `title` and `link` and then they are shown on top-right of all pages.                                                                                                             | []      |
| .publicRuntimeConfig.navs         | These are categories link of your website. They are placed on top-center of pages.                                                                                                                                                |         |
| .images                           | If you use external image resources like medium,... I must append resource to `.images` to display images.                                                                                                                        | []      |

You can view detail NextJS configuration [here](https://nextjs.org/docs/pages/api-reference/next-config-js)

## Deployment

My website is deployed automatically by Vercel.

If you want to self-deploy, you only need to do:

- build application

```bash
$ npm run install
$ npm run build
```
- start application
```bash
$ npm run start
```

## License

- Code is licensed under MIT.
- Writings are my own.
