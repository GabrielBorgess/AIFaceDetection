import './FaceRecognition.css'

interface FaceRecognitionProps {
    inputValue: string;
    imagePosition: {
        top: number,
        left: number,
        bottom: number,
        right: number
    }
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ inputValue, imagePosition }) => {
    return(
        <div style={{position: 'absolute'}}>
            <img id="image" src={inputValue}/>
            <div className="boundBox" style={{top: imagePosition.top, left: imagePosition.left, bottom: imagePosition.bottom, right: imagePosition.right}}></div>
        </div>
    )
};

export default FaceRecognition;