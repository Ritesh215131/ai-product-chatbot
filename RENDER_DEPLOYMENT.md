# 🚀 Deploying ProductAI to Render.com

This guide provides step-by-step instructions to deploy **ProductAI** on [Render](https://render.com) for free.

The project is pre-configured with **Unified Production Mode**, meaning both the React frontend and Node.js Express API run as a **single Render Web Service** on the exact same domain. This completely eliminates CORS issues and fits 100% within Render's Free Tier!

---

## 📋 Prerequisites
1. A free account on [Render.com](https://render.com).
2. A free account on [GitHub.com](https://github.com).
3. Your Google Gemini API Key (get from [Google AI Studio](https://aistudio.google.com/app/apikey)).

---

## ⚡ Method 1: Blueprint Deployment (1-Click Automated) — Recommended

ProductAI includes a pre-configured [`render.yaml`](./render.yaml) blueprint file in the repository root.

### Step 1: Push the Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `ai-product-chatbot` (or `productai`).
2. Initialize and push your code:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ProductAI shopping assistant with Gemini and Render config"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ai-product-chatbot.git
   git push -u origin main
   ```

### Step 2: Deploy Blueprint on Render
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** at the top right and select **Blueprint**.
3. Connect your GitHub repository (`ai-product-chatbot`).
4. Render will automatically read [`render.yaml`](./render.yaml) and detect the service:
   * **Service Name**: `productai-shopping-assistant`
   * **Environment**: `Node`
   * **Plan**: `Free`
   * **Build Command**: `npm run render-build`
   * **Start Command**: `npm run render-start`
   * **Health Check**: `/api/health`
5. Click **Apply**.
6. Render will install dependencies, build the frontend, and launch the service!
7. Once the build finishes, your live app URL will be displayed (e.g. `https://productai-shopping-assistant.onrender.com`).

---

## 🛠️ Method 2: Manual Web Service Deployment

If you prefer creating the service manually from the Render dashboard:

### Step 1: Create a New Web Service
1. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
2. Select **Build and deploy from a Git repository**.
3. Choose your repository and click **Connect**.

### Step 2: Configure Service Settings
Fill in the following values in the configuration form:

| Setting | Value |
| :--- | :--- |
| **Name** | `productai` (or any name you choose) |
| **Region** | Choose closest to your audience (e.g., `Singapore` or `Oregon`) |
| **Branch** | `main` |
| **Root Directory** | *(Leave blank — root)* |
| **Runtime** | `Node` |
| **Build Command** | `npm run render-build` |
| **Start Command** | `npm run render-start` |
| **Instance Type** | `Free` |

### Step 3: Configure Environment Variables
Scroll down to the **Environment Variables** section and add:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production caching & static file serving |
| `GEMINI_API_KEY` | `<YOUR_GEMINI_API_KEY>` | Live Google Gemini 3.6 Flash engine access |
| `AI_MODEL_PROVIDER` | `gemini` | Prioritizes Gemini as the primary AI engine |
| `JWT_SECRET` | `productai_super_secret_jwt_key_btech_2026` | Any secure random string |

*(Optional)* If you have a MongoDB Atlas connection string, add:
| `MONGODB_URI` | `mongodb+srv://...` | Optional! If omitted, system runs smoothly using in-memory DAO |

### Step 4: Add Health Check Path
Under **Advanced** settings:
* Set **Health Check Path** to `/api/health`.

### Step 5: Click "Create Web Service"
Render will trigger the deployment. Within 2-3 minutes, your application will be live!

---

## 🔍 How to Verify Your Render Deployment

Once Render displays **Status: Live**:

1. **Open Frontend**: Visit `https://<YOUR_APP_NAME>.onrender.com/`
   - You will see the ProductAI Landing Page.
   - Click **Explore as Aarav Sharma (Shopper Demo)** to log in instantly.
2. **Test Real AI Search**:
   - Ask: *"Suggest 3 best 1.5 ton 5-star inverter air conditioners in India under ₹45,000"*
   - Ask: *"Compare iPhone 16 Pro and Samsung Galaxy S24 Ultra"*
   - Verify that Gemini generates structured cards with ₹ INR pricing, specs, and pros/cons.
3. **Verify Health Endpoint**:
   - Visit `https://<YOUR_APP_NAME>.onrender.com/api/health`
   - You should see:
     ```json
     {
       "status": "online",
       "service": "ProductAI — Intelligent AI Product Recommendation & Shopping Assistant",
       "mode": "Dual-Mode Production Ready",
       "aiEngine": {
         "status": "active",
         "hasExternalLLM": true,
         "provider": "Google Gemini (Real-Time AI)",
         "model": "gemini-3.6-flash"
       }
     }
     ```

---

## 💡 Important Render Free Tier Notes

* **Free Tier Spin-Down**: Render's free tier services spin down after 15 minutes of inactivity. The first request after spin-down may take ~30-50 seconds while the container wakes up. Subsequent requests respond in milliseconds.
* **Database Resilience**: ProductAI operates in **Dual Mode**. Even if no MongoDB is connected, the high-speed in-memory store and Gemini live search work 100% out of the box with zero crashes!
