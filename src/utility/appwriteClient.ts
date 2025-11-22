import { Account, Appwrite, Storage } from "@refinedev/appwrite";

const APPWRITE_URL = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT = "69214d3d003de369905e";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };
