import { test as base } from '@playwright/test';
import { RequestHandler } from '../utils/request-handler'; 

export type testOptions = {
    api: RequestHandler;
}

export const test = base.extend<testOptions>({
    api: async ({}, use) => {
        const requestHandler = new RequestHandler();
        await use(requestHandler);
    }
});