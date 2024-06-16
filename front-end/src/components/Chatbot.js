// Chatbot.js
import React, { useState } from 'react';
import openai from 'openai';

openai.apiKey = 'sk-proj-F2DPEaOlGi671ax1UH2XT3BlbkFJWm6wlx8T5NoLvZTeoSlK';

const Chatbot = ({ cveDetail }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const chatResponse = await openai.Completion.create({
                engine: "text-davinci-003",
                prompt: `How can I remediate the vulnerability with CVE number ${cveDetail.cve_number}?`,
                max_tokens: 150
            });
            setResponse(chatResponse.choices[0].text.trim());
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
            setResponse('There was an error getting the response.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about remediation..."
                />
                <button type="submit">Ask</button>
            </form>
            {response && <div><strong>Response:</strong> {response}</div>}
        </div>
    );
};

export default Chatbot;
