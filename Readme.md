# AI-Powered Express Server

This project is an AI-powered Express.js server that integrates with Google Generative AI (Gemini) to provide various functionalities such as text-based responses, chat conversations, JSON generation, and image-to-text processing.

## About This Project

I am currently learning how to integrate AI APIs into projects. This server is a hands-on practice to understand how AI models interact with different inputs and provide meaningful responses.

## Features

- **Text-to-Text Response**: Generates AI-based responses based on user-provided prompts.
- **Chat Conversations**: Maintains a contextual conversation with predefined history.
- **JSON Generation**: Creates JSON output based on user input.
- **Image-to-Text Analysis**: Generates textual descriptions for images from URLs.

## Technologies Used

- **Node.js**
- **Express.js**
- **Google Generative AI (Gemini 1.5)**
- **Axios**
- **dotenv**
- **CORS**
- **MongoDB**

- **Node.js**
- **Express.js**
- **Google Generative AI (Gemini 1.5)**
- **Axios**
- **dotenv**
- **CORS**

## Installation

### Dependencies

```json
"dependencies": {
    "@google/generative-ai": "^0.21.0",
    "axios": "^1.7.9",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongodb": "^6.13.0"
}
```

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd ai-powered-express-server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add your API key:
   ```sh
   GEMINI_API_KEY=your_google_generative_ai_key
   PORT=5000  # or any desired port
   ```
5. Start the server:

   ```sh
   node index.js  # or nodemon index.js if you have nodemon installed
   ```

6. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
7. Navigate to the project directory:
   ```sh
   cd ai-powered-express-server
   ```
8. Install dependencies:
   ```sh
   npm install
   ```
9. Create a `.env` file in the root directory and add your API key:
   ```sh
   GEMINI_API_KEY=your_google_generative_ai_key
   PORT=5000  # or any desired port
   ```
10. Start the server:
    ```sh
    node index.js  # or nodemon index.js if you have nodemon installed
    ```

## API Endpoints

### 1. Text-to-Text Response

#### Endpoint:

```sh
GET /test?prompt=<your_prompt>
```

#### Example Request:

```sh
GET http://localhost:5000/test?prompt=Tell+me+about+AI
```

#### Response:

```json
{
  "ans": "AI is the simulation of human intelligence in machines..."
}
```

### 2. Chat Conversations

#### Endpoint:

```sh
GET /chat?prompt=<your_prompt>
```

#### Example Request:

```sh
GET http://localhost:5000/chat?prompt=Is+the+earth+flat?
```

#### Response:

```json
{
  "answer": "False, the Earth is an oblate spheroid."
}
```

### 3. JSON Generation (Limited Functionality)

#### Endpoint:

```sh
GET /json?prompt=<your_prompt>
```

#### Example Request:

```sh
GET http://localhost:5000/json?prompt=Generate+a+list+of+fruits
```

#### Response:

```json
[{ "key": "Apple" }, { "key": "Banana" }, { "key": "Orange" }]
```

### 4. Image-to-Text Analysis

#### Endpoint:

```sh
GET /image?prompt=<image_url>
```

#### Example Request:

```sh
GET http://localhost:5000/image?prompt=https://example.com/sample.jpg
```

#### Response:

```json
{
  "Description": "The image shows a beautiful sunset over the ocean..."
}
```

## Known Issues

- **JSON Generation**: Cannot handle complex prompts or more than 2 tokens.
- **Image-to-Text**: Non-image URLs can crash the app.

## Contributing

Feel free to fork this repository and submit pull requests for improvements or bug fixes.
