const inputForm = document.getElementById('input-form');
const userInput = document.getElementById('user-input');
const conversation = document.getElementById('conversation');

inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const userMessage = userInput.value;
    appendMessage(userMessage, 'user');
    userInput.value = '';
    generateResponse(userMessage);
});

function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    conversation.appendChild(messageElement);
    conversation.scrollTop = conversation.scrollHeight;
}

function generateResponse(input) {
    // Check for mathematical expressions
    const mathExpressionRegex = /^-?\d+(\.\d+)?\s*[\+\-\*\/]\s*-?\d+(\.\d+)?$/;

    // Check if the input is a number
    if (!isNaN(input) && input.trim() !== '') {
        appendMessage(`${input} is a number.`, 'bot');
        return;
    }

    // Check if the input is an alphabet
    if (/^[a-zA-Z]$/.test(input)) {
        appendMessage(`${input} is an alphabet.`, 'bot');
        return;
    }
     // Check for more complex calculations (e.g., "2 + 3 * 4")
     const complexMathExpressionRegex = /^-?\d+(\.\d+)?(\s*[\+\-\*\/]\s*-?\d+(\.\d+)?)+$/;
     if (complexMathExpressionRegex.test(input)) {
         try {
             const result = eval(input);
             appendMessage(`The result of ${input} is ${result}.`, 'bot');
             return;
         } catch (error) {
             appendMessage("Sorry, I couldn't calculate that.", 'bot');
             return;
         }
     }

    // Check for predefined responses
    const botResponses = {
        "hello": "Hi there! How can I assist you?",
        "how are you": "I'm just a chatbot, but I'm doing well!",
        "what is your name": "I'm your friendly chatbot! You can call me Chatbot.",
        "can you help me": "I can assist you with information, answer your questions, and help you find what you need!",
        "what are your hours of operation": "I'm available 24/7, so you can chat with me anytime!",
        "tell me a joke": "Sure! Why did the bicycle fall over? Because it was two-tired!",
        "how do I reset my password": "To reset your password, go to the login page and click on 'Forgot Password?' Follow the instructions sent to your email.",
        "what services do you offer": "Chatbots can provide a variety of tasks, from answering frequently asked questions to automating routine tasks.",
        "where are you located": "I'm a virtual assistant, so I exist online! You can reach me from anywhere.",
        "can you help me with my order": "Of course! Please provide me with your order number, and I'll look it up for you.",
        "what is your favorite color": "I don't have a favorite color, but I think all colors are beautiful!",
        "what is the weather today": "I can't check the weather, but you can use a weather app or website for the latest updates!",
        "your favorite food": "I don't eat, but I hear pizza is a popular choice among humans!",
        "what is a chatbot": "Chatbots are computer programs designed to simulate human conversation using natural language understanding.",
        "how can you assist me today": "Chatbots help users find answers quickly within a conversational interface.",
        "what are your operating hours": "Chatbots are available 24/7, providing instant support and information.",
        "can you guide me through your features": "Chatbots can walk users through their functionalities, ensuring they understand how to use them effectively.",
        "goodbye": "Goodbye! Have a great day!",
        "default": "I'm sorry, I don't understand that.",
        "how are you": "I'm doing well, thank you for asking. How about you?",
        "what's up": "Not much, just here and ready to answer your questions. What's on your mind?"
    };

    const response = botResponses[input.toLowerCase()] || botResponses["default"];
    setTimeout(() => appendMessage(response, 'bot'), 1000);
}