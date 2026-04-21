import { Client, Account, Databases } from "appwrite";
import { environment } from "../../environments/environment";

const client = new Client()
    .setEndpoint(environment.appwrite.endpoint)
    .setProject(environment.appwrite.projectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
