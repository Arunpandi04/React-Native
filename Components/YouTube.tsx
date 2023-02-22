import YoutubePlayer from 'react-native-youtube-iframe';
import { YouTubeProps } from "../Types/video";

const YouTubeComponent = (props: YouTubeProps) => {
    return(
        <>
        <YoutubePlayer 
         height={300}
        videoId={props.route.params?.video?.id?.videoId} // The YouTube video ID
        play = {true}
        />
        </>
    )
}

export default YouTubeComponent;