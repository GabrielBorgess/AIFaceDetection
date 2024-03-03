interface FaceRecognitionProps {
    inputValue: string;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ inputValue }) => {
    return(
        <div>
            <img src={inputValue}/>
        </div>
    )
};

export default FaceRecognition;