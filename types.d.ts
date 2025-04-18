declare module 'tesseract.js' {
  export interface RecognizeResult {
    data: {
      text: string;
      hocr?: string;
      tsv?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface Worker {
    load(): Promise<any>;
    loadLanguage(lang: string): Promise<any>;
    initialize(lang: string): Promise<any>;
    recognize(image: any): Promise<RecognizeResult>;
    terminate(): Promise<any>;
    [key: string]: any;
  }

  export interface WorkerOptions {
    logger?: (log: any) => void;
    [key: string]: any;
  }

  export function createWorker(options?: WorkerOptions): Promise<Worker>;
  export function createScheduler(): any;
  export const setLogging: (logging: boolean) => void;
}
