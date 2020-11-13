/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MoneystreamAudio {
        "monetizationrequired": boolean;
        "payTo": string;
        "src": string;
    }
    interface MoneystreamDash {
        "debug": boolean;
        "getStatus": () => Promise<{ hasExtension: boolean; extension: any; monetizationstatus: string; monetizationamount: number; }>;
        "payTo": string;
        "showControls": boolean;
        "start": () => Promise<void>;
        "stop": () => Promise<void>;
    }
    interface MoneystreamVideo {
        "monetizationrequired": boolean;
        "payTo": string;
        "vid": string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
declare global {
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
    interface HTMLMoneystreamVideoElement extends Components.MoneystreamVideo, HTMLStencilElement {
    }
    var HTMLMoneystreamVideoElement: {
        prototype: HTMLMoneystreamVideoElement;
        new (): HTMLMoneystreamVideoElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "moneystream-audio": HTMLMoneystreamAudioElement;
        "moneystream-dash": HTMLMoneystreamDashElement;
        "moneystream-video": HTMLMoneystreamVideoElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface MoneystreamAudio {
        "monetizationrequired"?: boolean;
        "payTo"?: string;
        "src"?: string;
    }
    interface MoneystreamDash {
        "debug"?: boolean;
        "onMonetizationProgress"?: (event: CustomEvent<any>) => void;
        "onMonetizationStarted"?: (event: CustomEvent<string>) => void;
        "onMonetizationStopped"?: (event: CustomEvent<string>) => void;
        "payTo"?: string;
        "showControls"?: boolean;
    }
    interface MoneystreamVideo {
        "monetizationrequired"?: boolean;
        "payTo"?: string;
        "vid"?: string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "moneystream-audio": MoneystreamAudio;
        "moneystream-dash": MoneystreamDash;
        "moneystream-video": MoneystreamVideo;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "moneystream-audio": LocalJSX.MoneystreamAudio & JSXBase.HTMLAttributes<HTMLMoneystreamAudioElement>;
            "moneystream-dash": LocalJSX.MoneystreamDash & JSXBase.HTMLAttributes<HTMLMoneystreamDashElement>;
            "moneystream-video": LocalJSX.MoneystreamVideo & JSXBase.HTMLAttributes<HTMLMoneystreamVideoElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}
