/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MoneystreamAd {
        "vid": string;
    }
    interface MoneystreamAudio {
        "duration": string;
        "mediaType": string;
        "monetizationstrategy": string;
        "moneystreamdisplay": string;
        "payto": string;
        "price": number;
        "src": string;
        "title": string;
    }
    interface MoneystreamDash {
        "debug": boolean;
        "getStatus": () => Promise<{ hasExtension: boolean; extension: any; monetizationstatus: string; monetizationamount: number; }>;
        "payto": string;
        "showControls": boolean;
        "start": (offer: any) => Promise<void>;
        "stop": () => Promise<void>;
    }
    interface MoneystreamOffer {
        "duration": string;
        "price": string;
        "title": string;
    }
    interface MoneystreamVideo {
        "duration": string;
        "monetizationstrategy": string;
        "moneystreamdisplay": string;
        "payto": string;
        "price": number;
        "provider": string;
        "title": string;
        "type": string;
        "vid": string;
    }
    interface MoneystreamWatchdog {
        "interval": number;
        "start": () => Promise<void>;
        "stop": () => Promise<void>;
    }
}
declare global {
    interface HTMLMoneystreamAdElement extends Components.MoneystreamAd, HTMLStencilElement {
    }
    var HTMLMoneystreamAdElement: {
        prototype: HTMLMoneystreamAdElement;
        new (): HTMLMoneystreamAdElement;
    };
    interface HTMLMoneystreamAudioElement extends Components.MoneystreamAudio, HTMLStencilElement {
    }
    var HTMLMoneystreamAudioElement: {
        prototype: HTMLMoneystreamAudioElement;
        new (): HTMLMoneystreamAudioElement;
    };
    interface HTMLMoneystreamDashElement extends Components.MoneystreamDash, HTMLStencilElement {
    }
    var HTMLMoneystreamDashElement: {
        prototype: HTMLMoneystreamDashElement;
        new (): HTMLMoneystreamDashElement;
    };
    interface HTMLMoneystreamOfferElement extends Components.MoneystreamOffer, HTMLStencilElement {
    }
    var HTMLMoneystreamOfferElement: {
        prototype: HTMLMoneystreamOfferElement;
        new (): HTMLMoneystreamOfferElement;
    };
    interface HTMLMoneystreamVideoElement extends Components.MoneystreamVideo, HTMLStencilElement {
    }
    var HTMLMoneystreamVideoElement: {
        prototype: HTMLMoneystreamVideoElement;
        new (): HTMLMoneystreamVideoElement;
    };
    interface HTMLMoneystreamWatchdogElement extends Components.MoneystreamWatchdog, HTMLStencilElement {
    }
    var HTMLMoneystreamWatchdogElement: {
        prototype: HTMLMoneystreamWatchdogElement;
        new (): HTMLMoneystreamWatchdogElement;
    };
    interface HTMLElementTagNameMap {
        "moneystream-ad": HTMLMoneystreamAdElement;
        "moneystream-audio": HTMLMoneystreamAudioElement;
        "moneystream-dash": HTMLMoneystreamDashElement;
        "moneystream-offer": HTMLMoneystreamOfferElement;
        "moneystream-video": HTMLMoneystreamVideoElement;
        "moneystream-watchdog": HTMLMoneystreamWatchdogElement;
    }
}
declare namespace LocalJSX {
    interface MoneystreamAd {
        "vid"?: string;
    }
    interface MoneystreamAudio {
        "duration"?: string;
        "mediaType"?: string;
        "monetizationstrategy"?: string;
        "moneystreamdisplay"?: string;
        "payto"?: string;
        "price"?: number;
        "src"?: string;
        "title"?: string;
    }
    interface MoneystreamDash {
        "debug"?: boolean;
        "onMonetizationProgress"?: (event: CustomEvent<any>) => void;
        "onMonetizationStarted"?: (event: CustomEvent<string>) => void;
        "onMonetizationStopped"?: (event: CustomEvent<string>) => void;
        "payto"?: string;
        "showControls"?: boolean;
    }
    interface MoneystreamOffer {
        "duration"?: string;
        "price"?: string;
        "title"?: string;
    }
    interface MoneystreamVideo {
        "duration"?: string;
        "monetizationstrategy"?: string;
        "moneystreamdisplay"?: string;
        "payto"?: string;
        "price"?: number;
        "provider"?: string;
        "title"?: string;
        "type"?: string;
        "vid"?: string;
    }
    interface MoneystreamWatchdog {
        "interval"?: number;
        "onMonetizationWatchdog"?: (event: CustomEvent<string>) => void;
    }
    interface IntrinsicElements {
        "moneystream-ad": MoneystreamAd;
        "moneystream-audio": MoneystreamAudio;
        "moneystream-dash": MoneystreamDash;
        "moneystream-offer": MoneystreamOffer;
        "moneystream-video": MoneystreamVideo;
        "moneystream-watchdog": MoneystreamWatchdog;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "moneystream-ad": LocalJSX.MoneystreamAd & JSXBase.HTMLAttributes<HTMLMoneystreamAdElement>;
            "moneystream-audio": LocalJSX.MoneystreamAudio & JSXBase.HTMLAttributes<HTMLMoneystreamAudioElement>;
            "moneystream-dash": LocalJSX.MoneystreamDash & JSXBase.HTMLAttributes<HTMLMoneystreamDashElement>;
            "moneystream-offer": LocalJSX.MoneystreamOffer & JSXBase.HTMLAttributes<HTMLMoneystreamOfferElement>;
            "moneystream-video": LocalJSX.MoneystreamVideo & JSXBase.HTMLAttributes<HTMLMoneystreamVideoElement>;
            "moneystream-watchdog": LocalJSX.MoneystreamWatchdog & JSXBase.HTMLAttributes<HTMLMoneystreamWatchdogElement>;
        }
    }
}
