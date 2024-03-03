import Navigation from './components/Navigation/Navigation'
import Rank from './components/Rank/Rank.tsx'
import ImageForm from './components/ImageForm/ImageForm.tsx'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.tsx'
import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [imagePosition, setImagePosition] = useState({top: 0, left: 0, right: 0, bottom: 0})

  return (
    <div className='bg-stone-50 h-screen flex flex-col gap- text-black'>
      <Navigation />
      <div className='p-6 flex flex-col items-center gap-4'>
        <Rank />
        <ImageForm setImagePosition={setImagePosition} inputValue={inputValue} setInputValue={setInputValue}/>
        <FaceRecognition imagePosition={imagePosition} inputValue={inputValue}/>
        <div className='absolute bottom-0 m-10 text-xs flex flex-col items-center text-gray-400'>
          <p>Sample link:</p>
          <p>https://yt3.googleusercontent.com/N43uMDX-Xs5XXjhswYp6uHdYbSZxYv7TO7PoCyfHayTNl5W3vgWEB3DudtLrxbFrXBBlKTBFiQ=s900-c-k-c0x00ffffff-no-rj</p>
        </div>
      </div>
    </div>
  )
}

export default App
