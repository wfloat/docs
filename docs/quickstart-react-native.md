---
title: React Native Quick Start
sidebar_position: 3
---

# React Native Quick Start

This guide covers the current setup for `@wfloat/react-native-wfloat` on iOS and Android.

## 1. Install the package

```bash
npm install @wfloat/react-native-wfloat
```

```bash
yarn add @wfloat/react-native-wfloat
```

## 2. iOS setup

Install CocoaPods dependencies from your app's `ios/` directory:

```bash
cd ios
pod install
cd ..
```

React Native autolinking handles the package integration on Android. There is no separate Android consumer setup step beyond installing the package.

## 3. Get your model ID

Your `modelId` is the **Model Credential** shown in your Wfloat account page after purchase.

```ts
const modelId = "your-model-credential";
```

## 4. Load the model

```tsx
import { SpeechClient } from "@wfloat/react-native-wfloat";

const modelId = "your-model-credential";

await SpeechClient.loadModel(modelId, {
  onProgressCallback(event) {
    if (event.status === "downloading") {
      console.log("Downloading", Math.round(event.progress * 100) + "%");
      return;
    }

    if (event.status === "loading") {
      console.log("Initializing native runtime");
      return;
    }

    if (event.status === "completed") {
      console.log("Model ready");
    }
  },
});
```

On first load, the package downloads the model and native support assets for the current platform.

## 5. Generate speech

```tsx
await SpeechClient.generate({
  text: "All systems are stable. You can begin the launch sequence.",
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

## 6. Available callbacks

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

## 7. Playback control

Use playback controls for the active request:

```tsx
await SpeechClient.pause();
await SpeechClient.play();
```

`SpeechClient.getStatus()` returns the current state:

```ts
"off" | "loading-model" | "generating" | "idle" | "terminating-generate"
```

## 8. Dialogue generation

```tsx
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
      text: "We only get one pass at this.",
      voiceId: "narrator_man",
      emotion: "neutral",
    },
    {
      text: "Then let's make the first pass count.",
      voiceId: "strong_hero_woman",
      emotion: "joy",
      intensity: 0.65,
    },
  ],
});
```

## 9. Useful exports

The React Native package also exports:

- `SPEAKER_IDS`
- `VALID_EMOTIONS`
- `VALID_SIDS`

Use those when building voice pickers or validating user input in your app.
