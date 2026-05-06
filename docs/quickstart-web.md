---
title: Web Quick Start
sidebar_position: 2
---

# Web Quick Start

This guide shows the current browser integration flow for `@wfloat/wfloat-web`.

## 1. Install

`@wfloat/wfloat-web` is installed from npm:

```bash
npm install @wfloat/wfloat-web
```

```bash
yarn add @wfloat/wfloat-web
```

## 2. Get your model ID

Your `modelId` is the **Model Credential** shown in your Wfloat account page after [signing up](https://wfloat.com/users/register).

```ts
const modelId = "your-model-credential";
```

## 3. Load the model

Call `SpeechClient.loadModel(...)` before generating speech.

```ts
import { SpeechClient } from "@wfloat/wfloat-web";

const modelId = "your-model-credential";

await SpeechClient.loadModel(modelId, {
  onProgressCallback(event) {
    if (event.status === "downloading") {
      console.log("Downloading", Math.round(event.progress * 100) + "%");
      return;
    }

    if (event.status === "loading") {
      console.log("Initializing runtime");
      return;
    }

    if (event.status === "completed") {
      console.log("Model ready");
    }
  },
});
```

The first load downloads the model and browser runtime assets needed for on-device speech generation.

## 4. Generate speech

Generate a single utterance with `SpeechClient.generate(...)`.

```ts
await SpeechClient.generate({
  text: "The signal is clean. Start the recording.",
  voiceId: "narrator_woman",
  emotion: "neutral",
  intensity: 0.5,
  speed: 1,
  silencePaddingSec: 0.1,
  onProgressCallback(event) {
    console.log("progress", event.progress);
    console.log("isPlaying", event.isPlaying);
    console.log("highlight", event.textHighlightStart, event.textHighlightEnd);
    console.log("chunkText", event.text);
  },
  onFinishedPlayingCallback() {
    console.log("Playback finished");
  },
});
```

## 5. Available callbacks

### `loadModel(..., { onProgressCallback })`

The load callback receives one of these events:

```ts
{ status: "downloading", progress: number }
{ status: "loading" }
{ status: "completed" }
```

### `generate(..., { onProgressCallback, onFinishedPlayingCallback })`

### `generateDialogue(..., { onProgressCallback, onFinishedPlayingCallback })`

The speech progress callback receives:

```ts
{
  progress: number;
  isPlaying: boolean;
  textHighlightStart: number;
  textHighlightEnd: number;
  text: string;
}
```

Use `onFinishedPlayingCallback` to know when the current request has fully finished playback.

## 6. Playback control

If you need explicit playback control for the active request:

```ts
await SpeechClient.pause();
await SpeechClient.play();
```

## 7. Dialogue generation

For multi-speaker output, use `generateDialogue(...)`.

```ts
await SpeechClient.generateDialogue({
  silenceBetweenSegmentsSec: 0.2,
  onProgressCallback(event) {
    console.log(event.progress);
  },
  onFinishedPlayingCallback() {
    console.log("Dialogue finished");
  },
  segments: [
    {
      text: "The door is locked.",
      voiceId: "narrator_man",
      emotion: "neutral",
    },
    {
      text: "Then we open it the loud way.",
      voiceId: "strong_hero_woman",
      emotion: "joy",
      intensity: 0.65,
    },
  ],
});
```

## 8. Browser note

Start generation from a user gesture such as a button click. Browsers can restrict audio playback until the page has received a user interaction.
