## This Project was made for [Google Gen AI Hackathon](https://devfolio.co/google-genaiexchange) | Below video is a generated from our project.
Video Link: https://drive.google.com/file/d/1_mw-jeZ373G7fIsf2zKwztOMYBS2BPm9/view

# AI Media Generation Platform

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Setup](#environment-setup)
4. [Usage](#usage)
   - [Generate Story](#generate-story)
   - [Generate Image](#generate-image)
   - [Generate Video](#generate-video)
   - [Generate Audio](#generate-audio)
   - [Translate Text](#translate-text)
   - [Text to Speech](#text-to-speech)
   - [Speech to Text](#speech-to-text)
   - [Generate Transcribe](#generate-transcribe)
5. [API Reference](#api-reference)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

Welcome to our AI Media Generation Platform! This cutting-edge application harnesses the power of artificial intelligence to provide a wide range of media generation and manipulation tools. From creating stories to transcribing audio, our platform offers a comprehensive suite of AI-powered features to enhance your creative and productive workflows.

## Features

Our platform offers the following key features:

1. **Generate Story**: AI-powered story generation based on user prompts.
2. **Generate Image**: Create unique images using AI algorithms.
3. **Generate Video**: Produce video content with AI assistance.
4. **Generate Audio**: Create audio content using AI technology.
5. **Translate Text**: Translate text between multiple languages.
6. **Text to Speech**: Convert written text into spoken words.
7. **Speech to Text**: Transcribe audio content into written text.
8. **Generate Transcribe**: Transcribe and detect language from audio files.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-media-generation.git
   ```

2. Navigate to the project directory:
   ```
   cd ai-media-generation
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Environment Setup

1. Create a `.env.local` file in the root directory of the project.
2. Add the following environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url_here
   ```
   Replace `your_api_base_url_here` with the actual base URL of your API.

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Usage

### Generate Story

Navigate to `/generate-story` to access the story generation feature. Enter your prompt and let the AI create a unique story for you.

### Generate Image

Visit `/generate-image` to create AI-generated images based on your descriptions or prompts.

### Generate Video

Access `/generate-video` to produce video content with AI assistance. Provide your requirements and let the AI handle the video creation process.

### Generate Audio

Go to `/generate-audio` to create audio content using AI technology. Specify your needs and the AI will generate the audio accordingly.

### Translate Text

Navigate to `/translate-text` to translate text between multiple languages. Select your source and target languages, input your text, and receive the translation.

### Text to Speech

Visit `/text-to-speech` to convert written text into spoken words. Choose your preferred language and voice options for the output.

### Speech to Text

Access `/speech-to-text` to transcribe audio content into written text. Upload your audio file and receive an accurate transcription.

### Generate Transcribe

Go to `/generate-transcribe` to transcribe audio files and detect the language. This feature provides both the transcript and the detected language of the audio content.

## API Reference

Our platform integrates with various AI APIs to provide its functionality. The base URL for all API endpoints is set in the `NEXT_PUBLIC_API_BASE_URL` environment variable. Here are some key API endpoints:

- Speech to Text API: `${NEXT_PUBLIC_API_BASE_URL}/api/speech-to-text`
- Translate Text API: `${NEXT_PUBLIC_API_BASE_URL}/api/translate-text`
- Speech to Text and Translate API: `${NEXT_PUBLIC_API_BASE_URL}/api/speech-to-text-translate`

For detailed API documentation, please refer to our API Documentation (link to be added).

## Contributing

We welcome contributions to our AI Media Generation Platform! If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
