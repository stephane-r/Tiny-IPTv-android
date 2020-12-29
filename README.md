<!-- <p align="center"><img src="./docs/logo.png" width="150" /></p> -->
<h2 align="center">Tiny IPTv</h2>
<p align="center">
    <a href="https://github.com/stephane-r/Tiny-IPTv/tags"><img src="https://travis-ci.org/google/clasp.svg?branch=master" alt="Build Status"></a>
    <a href="https://github.com/stephane-r/Tiny-IPTv/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="Build Status"></a>
</p>

<hr>

Tiny IPTv is a minimalist Android application that allows you to watch IPTv streams. It's based on a file in m3u format which will first be parsed by a NodeJS server. [See Tiny IPTv Server repo](https://github.com/stephane-r/Tiny-IPTv-Server).

The design is suitable for **mobile**, **tablet** and **TV**.

## Why ?

All of the IPTv apps I've tried are slow and not very UX. So, why not develop one that meets my needs and expectations ? Also, I was able to develop my first application on Android TV by launching myself on this small project :)

### Why use react-native-vlc instead of react-native-video ?

`react-native-vlc` add quite a bit of weight. However, `react-native-video` does not natively support the mpeg2 format, and causes errors on some versions of Android (native player or expo).

## Android version compatibility

This application works from version **5** to latest **11**, tested with mulateur and real device. Also, Tiny IPTv work on Android TV (tested with Amazon Fire TV).

## Features

TODO

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[See React Native doc prerequisites](https://reactnative.dev/docs/getting-started#prerequisites)

### Installing

First, copy env file

`cp .env.dist .env`

Android dependencies is optionnal, set if you work on multiple OS/env. You need set **API_URL**.

Then

`npm start`

## Built With

- [React Native](https://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org/)
- [React Native VLC](https://www.npmjs.com/package/@imokhles/react-native-vlc)
- [React Native Paper](https://callstack.github.io/react-native-paper/index.html)
- [TypeScript](https://www.typescriptlang.org/)

And more.

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the [MIT License](./LICENSE.md).
