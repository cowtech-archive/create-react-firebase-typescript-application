export interface Environment{
  environment: string;
  backgrounds: number;
  serviceWorkerEnabled: boolean;
  title: string;
  description: string;
  keywords: string;
  author: string;
  email: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
  };
}
