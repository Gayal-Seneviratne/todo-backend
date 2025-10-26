import { fileURLToPath } from 'url';
import { dirname } from 'path';

// @ts-ignore
global.__filename = (url: string) => fileURLToPath(url);
// @ts-ignore
global.__dirname = (url: string) => dirname(fileURLToPath(url));