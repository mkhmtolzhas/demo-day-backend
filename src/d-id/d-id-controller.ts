import { Request, Response } from "express";
import axios from "axios";

class DIDController {
    async generateVideo(request: Request, response: Response) {
        try {
            const { input, source_url } = request.body;
            console.log(input, source_url);

            const body = {
                script: {
                    type: 'text',
                    subtitles: 'false',
                    provider: {
                        type: 'microsoft',
                        voice_id: 'en-US-JennyNeural',
                    },
                    ssml: false,
                    input: input,
                },
                config: {
                    fluent: 'false',
                    pad_audio: '0.0',
                },
                source_url: source_url,
            };

            const answer = await axios.post('https://api.d-id.com/talks', body, {
                headers: {
                    'Authorization': `Basic ${process.env.DID_API_KEY}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            console.log(answer.data);
            const id = answer.data.id;
            console.log(id);

            let video;
            const maxAttempts = 40; // максимальное количество попыток
            let attempts = 0;

            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            while (attempts < maxAttempts) {
                video = await axios.get(`https://api.d-id.com/talks/${id}`, {
                    headers: {
                        'Authorization': `Basic ${process.env.DID_API_KEY}`,
                        'Accept': 'application/json',
                    }
                });

                if (video.data.status === 'done') {
                    break;
                }

                attempts++;
                await delay(100); 
            }

            if (video.data.status === 'done') {
                response.status(200).json(video.data);
            } else {
                response.status(500).json({ message: 'Video generation timed out.' });
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: error });
        }
    }

    async getVideo(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const video = await axios.get(`https://api.d-id.com/talks/${id}`, {
                headers: {
                    'Authorization': `Basic ${process.env.DID_API_KEY}`,
                    'Accept': 'application/json',
                }
            });
            response.status(200).json(video.data);
        } catch (error) {
            response.status(500).json({ message: error });
            console.error(error);
        }
    }
}

export default new DIDController();
