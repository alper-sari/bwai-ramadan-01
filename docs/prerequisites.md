# 🧩 Prerequisites

Before starting, make sure the following tools are installed on your system:

| Tool | Description | Installation Guide |
|------|--------------|--------------------|
| [**gcloud**](https://cloud.google.com/sdk/docs/install) | Google Cloud SDK used for authentication, project setup, and resource management. | [Install gcloud →](https://cloud.google.com/sdk/docs/install) |
| [**Gemini CLI**](https://www.npmjs.com/package/@google/gemini-cli) | Command-line tool for deploying and managing Gemini projects on Google Cloud. | [Install Gemini CLI →](https://www.npmjs.com/package/@google/gemini-cli) |
| [**npm / Node.js**](https://nodejs.org/en/download/) | Required to install the Gemini CLI and other Node-based tools. | [Install npm →](https://nodejs.org/en/download/) |

---

✅ Once all three are installed, verify with:

```bash
gcloud version
npm -v
gemini --version
```

Make sure all commands return a version number.



## 🔌 Install Gemini Extensions

If Gemini CLI is installed successfully, install the required extensions for Google Cloud just copying the commands below and paste them into your terminal:

### Install gcloud MCP 
```bash
gemini extensions install https://github.com/gemini-cli-extensions/gcloud
```

You can verify installed extensions with:

```gemini extensions list```


✨ You’re now ready to deploy and manage your workloads using Gemini CLI on Google Cloud!
