import type { NavigationScreenProps } from '@react-navigation/native-stack';
import { YouTubeRoute } from './Navigator';

export interface Video {
    kind?: string,
    etag?: string,
    id?: {
        kind: string,
        videoId: string
    },
    snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            },
            medium: {
                url: string,
                width: number,
                height: number
            },
            high: {
                url: string,
                width: number,
                height: number
            }
        },
        channelTitle: string,
        liveBroadcastContent: string,
        publishTime: string
    }
}


export interface YouTubeProps extends NavigationScreenProps<NavStateParams> {
    route: YouTubeRoute
}