import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import msbadgedark from '../assets/msbadgedark.png';
import twitterLogo from '../assets/icons8-twitter-69.png';
import { useState } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) => {
  // console.log(event.target.value);
  setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>AMA - Ask Marcus Anything</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ask Marcus Anything</h1>
          </div>
          <div className="header-subtitle">
            <h2>ask one of the best known stoics in the world questions about life</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="What would you like to ask Marcus Aurelius?"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  
                </div>
                <span className="output-content" >
                <p className="simptip-position-bottom simptip-fade" data-tooltip="Tweet this answer (coming soon)">{apiOutput}</p>
                  <Image className='twitterLogo' src={twitterLogo} alt="buildspace logo" />
                </span>
              </div>
            )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
      <div className="msbadge-container">
        <a
          href="https://foundershub.startups.microsoft.com"
          target="_blank"
          rel="noreferrer"
        ><Image src={msbadgedark} className='msbadge' alt="Microsoft Startup Partner" /> 
        </a>
      </div>
    </div>
  );
};

export default Home;
