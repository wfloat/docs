---
title: Introduction
sidebar_position: 1
slug: /
---

# Introduction

Wfloat lets you ship text-to-speech that runs inference inside your app rather than sending text to a hosted inference endpoint.

Wfloat currently ships two packages:

- `@wfloat/wfloat-web` for browser applications
- `@wfloat/react-native-wfloat` for React Native applications on iOS and Android

At a high level, both packages are built around the same product flow:

1. You get a `modelId` from your Wfloat account.
2. A device loads the model. The model is downloaded if the device does not already have it cached.
3. Speech is generated locally in the app.

## Your `modelId`

`modelId` means your Wfloat model credential.

You can find it in your account page after purchase. The UI labels it as **Model Credential**.

## What happens on first load

The first time a device loads a model, the package downloads the model assets it needs onto the device. The model stays cached on the device, so when that user comes back later the package can use the local model again instead of downloading it each time. Speech runs locally in the app rather than sending text to a hosted inference endpoint.

## Packages

The Web package and React Native package are intentionally close to each other at a product level so teams can work with the same model, voices, and overall integration pattern across platforms.

If you are ready to integrate, continue to the package-specific quick starts:

- [Web Quick Start](./quickstart-web)
- [React Native Quick Start](./quickstart-react-native)

## Voice IDs

The current model exposes these voice IDs:

- `skilled_hero_man`
- `skilled_hero_woman`
- `fun_hero_man`
- `fun_hero_woman`
- `strong_hero_man`
- `strong_hero_woman`
- `mad_scientist_man`
- `mad_scientist_woman`
- `clever_villain_man`
- `clever_villain_woman`
- `narrator_man`
- `narrator_woman`
- `wise_elder_man`
- `wise_elder_woman`
- `outgoing_anime_man`
- `outgoing_anime_woman`
- `scary_villain_man`
- `scary_villain_woman`
- `news_reporter_man`
- `news_reporter_woman`

## Emotions

The current model supports these emotions:

- `neutral`
- `joy`
- `sadness`
- `anger`
- `fear`
- `surprise`
- `dismissive`
- `confusion`

## Intensity

Intensity controls how strongly the selected emotion is expressed. It is a value between `0` and `1`.

## Speed

Speed controls the speaking rate. `1.0` is the default speed, `0.75` is slower, and `1.25` is faster.

## Pricing

Wfloat pricing tiers are tied to your app's monthly active users.

For this product, an MAU is counted as someone who has used loaded the text-to-speech model onto their device in the last 30 days.
