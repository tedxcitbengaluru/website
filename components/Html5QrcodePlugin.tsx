import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number;
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
}

const createConfig = (props: Html5QrcodePluginProps) => {
    let config: any = {};
    if (props.fps) config.fps = props.fps;
    if (props.qrbox) config.qrbox = props.qrbox;
    if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
    if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
    return config;
};

const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;

        const dummyErrorCallback = (errorMessage: string) => {
            console.warn(`QR Code scanning error: ${errorMessage}`);
        };

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);

        html5QrcodeScanner.render(
            (decodedText, decodedResult) => {
                props.qrCodeSuccessCallback(decodedText, decodedResult);
                html5QrcodeScanner.clear().catch(console.error);
            },
            dummyErrorCallback
        );

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [props]);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;