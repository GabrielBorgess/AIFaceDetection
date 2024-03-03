import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo.tsx'
import Rank from './components/Rank/Rank.tsx'
import ImageForm from './components/ImageForm/ImageForm.tsx'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.tsx'
import { useState } from 'react'

//Link se eu precisar: https://s2-quem.glbimg.com/n58L98PBhlPp0YeOoKI9YzZuYgE=/0x195:1080x876/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2023/f/A/jbUHBASUuhJaZK7CahIA/cela-399520442-1508899306601416-246660457385176695-n.jpg

function App() {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <>
      <Navigation />
      <Logo />
      <Rank />
      <ImageForm inputValue={inputValue} setInputValue={setInputValue}/>
      <FaceRecognition inputValue={inputValue}/>
    </>
  )
}

export default App
